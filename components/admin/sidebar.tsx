'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  FileText,
  Briefcase,
  Users,
  Settings,
  LogOut
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    title: 'Catalogues',
    href: '/admin/catalogues',
    icon: Package
  },
  {
    title: 'Articles',
    href: '/admin/articles',
    icon: FileText
  },
  {
    title: 'Offres d\'emploi',
    href: '/admin/jobs',
    icon: Briefcase
  },
  {
    title: 'Utilisateurs',
    href: '/admin/users',
    icon: Users
  },
  {
    title: 'Paramètres',
    href: '/admin/settings',
    icon: Settings
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">SOFIMED Admin</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Déconnexion */}
      <div className="p-4 border-t">
        <Button
          variant="outline"
          className="w-full flex items-center space-x-2"
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
        >
          <LogOut className="h-4 w-4" />
          <span>Déconnexion</span>
        </Button>
      </div>
    </div>
  );
}