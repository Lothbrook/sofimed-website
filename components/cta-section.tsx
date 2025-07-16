"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CTASectionProps {
  dict: any;
  locale: string;
}

export default function CTASection({ dict, locale }: CTASectionProps) {
  return (
    <section className="bg-[#085C91] py-16 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          {dict.cta.title}
        </h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          {dict.cta.description}
        </p>
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-colors"
            asChild
          >
            <Link href={`/${locale}/contact`}>
              {dict.cta.contactButton}
            </Link>
          </Button>
          <Button
            className="bg-white text-black hover:bg-[#B91C1C] hover:text-white transition-colors hover:border-white"
            asChild
          >
            <Link href={`/${locale}/produits`}>
              {dict.cta.productsButton}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}