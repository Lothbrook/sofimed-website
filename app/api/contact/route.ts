import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Stockage en mémoire des tentatives (en production, utilisez Redis ou une base de données)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Configuration des limites
const RATE_LIMIT = {
  maxAttempts: 3, // Maximum 3 tentatives
  windowMs: 15 * 60 * 1000, // Fenêtre de 15 minutes
  blockDurationMs: 60 * 60 * 1000, // Blocage de 1 heure après dépassement
}

function getRateLimitKey(request: NextRequest): string {
  // Utilise l'IP du client
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'
  return `contact_${ip}`
}

function checkRateLimit(key: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now()
  const record = rateLimitMap.get(key)

  if (!record) {
    // Première tentative
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT.windowMs })
    return { allowed: true }
  }

  if (now > record.resetTime) {
    // La fenêtre de temps est expirée, reset
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT.windowMs })
    return { allowed: true }
  }

  if (record.count >= RATE_LIMIT.maxAttempts) {
    // Limite dépassée
    return { allowed: false, resetTime: record.resetTime }
  }

  // Incrémenter le compteur
  record.count++
  return { allowed: true }
}

// Fonction pour détecter le contenu suspect
function detectSuspiciousContent(data: any): boolean {
  const suspiciousPatterns = [
    /https?:\/\//gi, // URLs
    /<[^>]*>/gi, // Tags HTML
    /\b(viagra|casino|lottery|winner|congratulations|click here|free money)\b/gi,
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, // Emails multiples dans le message
  ]

  const textToCheck = `${data.firstName} ${data.lastName} ${data.subject} ${data.message} ${data.company || ''}`
  
  return suspiciousPatterns.some(pattern => {
    const matches = textToCheck.match(pattern)
    return matches && matches.length > (pattern.source.includes('email') ? 1 : 0)
  })
}

export async function POST(request: NextRequest) {
  try {
    // Vérification du rate limiting
    const rateLimitKey = getRateLimitKey(request)
    const rateLimitResult = checkRateLimit(rateLimitKey)
    
    if (!rateLimitResult.allowed) {
      const resetTime = rateLimitResult.resetTime
      const waitTime = resetTime ? Math.ceil((resetTime - Date.now()) / 1000 / 60) : 60
      
      return NextResponse.json(
        { 
          error: `Trop de tentatives. Veuillez réessayer dans ${waitTime} minutes.`,
          retryAfter: waitTime
        }, 
        { 
          status: 429,
          headers: {
            'Retry-After': waitTime.toString()
          }
        }
      )
    }

    const { firstName, lastName, email, phone, company, subject, message } = await request.json()

    // Validation des champs requis
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: "Tous les champs obligatoires doivent être remplis" }, { status: 400 })
    }

    // Validation des longueurs pour éviter le spam
    if (firstName.length > 50 || lastName.length > 50 || subject.length > 200 || message.length > 2000) {
      return NextResponse.json({ error: "Un ou plusieurs champs dépassent la longueur autorisée" }, { status: 400 })
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Adresse email invalide" }, { status: 400 })
    }

    // Détection de contenu suspect
    if (detectSuspiciousContent({ firstName, lastName, email, phone, company, subject, message })) {
      console.log('Contenu suspect détecté:', { email, subject })
      return NextResponse.json({ error: "Votre message contient du contenu non autorisé" }, { status: 400 })
    }

    // Vérification des variables d'environnement
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error("Variables SMTP manquantes")
      return NextResponse.json({ error: "Configuration email manquante" }, { status: 500 })
    }

    // Configuration du transporteur email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    // Test de la connexion
    await transporter.verify()
    console.log("Connexion SMTP réussie")

    // Template HTML corrigé pour l'email
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouveau message de contact - SOFIMED</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333333;
                background-color: #f4f4f4;
                padding: 20px;
            }
            
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            
            .header {
                background-color: #085C91;
                color: #ffffff;
                padding: 30px;
                text-align: center;
            }
            
            .logo {
                background-color: #ffffff;
                width: 80px;
                height: 80px;
                border-radius: 50%;
                margin: 0 auto 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 24px;
                color: #085C91;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            }
            
            .header h1 {
                color: #ffffff;
                font-size: 24px;
                margin-bottom: 10px;
            }
            
            .header p {
                color: #ffffff;
                font-size: 16px;
                opacity: 0.9;
            }
            
            .content {
                padding: 30px;
            }
            
            .alert-badge {
                background-color: #dc2626;
                color: #ffffff;
                padding: 12px 20px;
                border-radius: 8px;
                text-align: center;
                margin-bottom: 25px;
                font-weight: bold;
            }
            
            .info-card {
                background-color: #f8f9fa;
                border: 1px solid #e9ecef;
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 20px;
                border-left: 4px solid #085C91;
            }
            
            .info-card h3 {
                color: #085C91;
                font-size: 18px;
                margin-bottom: 15px;
            }
            
            .info-row {
                display: flex;
                margin-bottom: 10px;
                align-items: flex-start;
            }
            
            .info-label {
                font-weight: bold;
                color: #666666;
                min-width: 120px;
                margin-right: 10px;
            }
            
            .info-value {
                color: #333333;
                flex: 1;
            }
            
            .info-value a {
                color: #085C91;
                text-decoration: none;
            }
            
            .info-value a:hover {
                text-decoration: underline;
            }
            
            .message-card {
                background-color: #ffffff;
                border: 1px solid #e9ecef;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
            }
            
            .message-title {
                color: #085C91;
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 15px;
                padding-bottom: 10px;
                border-bottom: 2px solid #e9ecef;
            }
            
            .message-content {
                color: #333333;
                line-height: 1.6;
                white-space: pre-wrap;
                background-color: #f8f9fa;
                padding: 15px;
                border-radius: 6px;
                border: 1px solid #e9ecef;
            }
            
            .action-card {
                background-color: #e3f2fd;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
                border: 1px solid #bbdefb;
            }
            
            .action-card h4 {
                color: #1565c0;
                margin-bottom: 15px;
            }
            
            .action-list {
                list-style: none;
                padding: 0;
            }
            
            .action-list li {
                color: #1565c0;
                padding: 8px 0;
                border-bottom: 1px solid rgba(187, 222, 251, 0.5);
            }
            
            .action-list li:last-child {
                border-bottom: none;
            }
            
            .footer {
                background-color: #f8f9fa;
                padding: 25px;
                text-align: center;
                border-top: 1px solid #e9ecef;
            }
            
            .company-name {
                font-size: 20px;
                font-weight: bold;
                color: #085C91;
                margin-bottom: 8px;
            }
            
            .company-details {
                color: #666666;
                font-size: 14px;
                line-height: 1.5;
            }
            
            .disclaimer {
                font-size: 12px;
                color: #999999;
                margin-top: 20px;
                padding-top: 15px;
                border-top: 1px solid #e9ecef;
            }
            
            @media (max-width: 600px) {
                .email-container {
                    margin: 10px;
                }
                
                .header, .content, .footer {
                    padding: 20px;
                }
                
                .info-row {
                    flex-direction: column;
                }
                
                .info-label {
                    margin-bottom: 5px;
                    min-width: auto;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <div class="logo">S</div>
                <h1>📧 Nouveau Message de Contact</h1>
                <p>Formulaire de contact du site web SOFIMED</p>
            </div>
            
            <div class="content">
                <div class="alert-badge">
                    🚨 Nouveau message reçu - Réponse requise dans les 24h
                </div>
                
                <div class="info-card">
                    <h3>👤 Informations du Contact</h3>
                    <div class="info-row">
                        <span class="info-label">Nom complet:</span>
                        <span class="info-value">${firstName} ${lastName}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Email:</span>
                        <span class="info-value"><a href="mailto:${email}">${email}</a></span>
                    </div>
                    ${phone ? `
                    <div class="info-row">
                        <span class="info-label">Téléphone:</span>
                        <span class="info-value"><a href="tel:${phone}">${phone}</a></span>
                    </div>
                    ` : ''}
                    ${company ? `
                    <div class="info-row">
                        <span class="info-label">Entreprise:</span>
                        <span class="info-value">${company}</span>
                    </div>
                    ` : ''}
                    <div class="info-row">
                        <span class="info-label">Date:</span>
                        <span class="info-value">${new Date().toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                    </div>
                </div>
                
                <div class="message-card">
                    <div class="message-title">📋 Sujet: ${subject}</div>
                    <div class="message-content">${message}</div>
                </div>
                
                <div class="action-card">
                    <h4>🎯 Actions Recommandées</h4>
                    <ul class="action-list">
                        <li>Répondre au client dans les 24 heures</li>
                        <li>Enregistrer les informations dans le CRM</li>
                        <li>Programmer un suivi si nécessaire</li>
                        <li>Évaluer les besoins du client</li>
                    </ul>
                </div>
            </div>
            
            <div class="footer">
                <div class="company-info">
                    <div class="company-name">SOFIMED</div>
                    <div class="company-details">
                        Solutions industrielles et équipements techniques<br>
                        Email: contact@sofimedmaroc.com<br>
                        Téléphone: +212 522 240 101
                    </div>
                </div>
                
                <div class="disclaimer">
                    Ce message a été généré automatiquement par le formulaire de contact du site web SOFIMED.
                    Veuillez ne pas répondre directement à cet email.
                </div>
            </div>
        </div>
    </body>
    </html>
    `

    // Configuration de l'email
    const mailOptions = {
      from: `"Formulaire Contact SOFIMED" <${process.env.SMTP_USER}>`,
      to: "o.benzouina@sofimedmaroc.com",
      subject: `🔔 Nouveau contact: ${subject} - ${firstName} ${lastName}`,
      html: htmlTemplate,
      text: `Nouveau message de contact\n\nNom: ${firstName} ${lastName}\nEmail: ${email}\nTéléphone: ${phone || "Non renseigné"}\nEntreprise: ${company || "Non renseignée"}\nSujet: ${subject}\n\nMessage:\n${message}\n\nDate: ${new Date().toLocaleString("fr-FR")}`,
    }

    // Envoi de l'email
    await transporter.sendMail(mailOptions)
    console.log("Email envoyé avec succès")

    return NextResponse.json({ message: "Email envoyé avec succès" }, { status: 200 })
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error)
    return NextResponse.json(
      { error: `Erreur lors de l'envoi de l'email: ${error instanceof Error ? error.message : "Erreur inconnue"}` },
      { status: 500 },
    )
  }
}
