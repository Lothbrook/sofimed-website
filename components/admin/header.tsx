'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

interface AdminHeaderProps {
  user: any;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">
          Backoffice SOFIMED
        </h1>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span>{user?.name || user?.email}</span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {(user as any)?.role}
            </span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </div>
    </header>
  );
}