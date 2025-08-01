'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import Button from './Button';

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('auth');
    toast.success('Logged out successfully!');
    router.push('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">User Management App</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              type="button"
              variant="danger"
              onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
} 