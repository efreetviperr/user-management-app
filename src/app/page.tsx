'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Home() {
  const router = useRouter();
  const [isLoading] = useState(true);

  useEffect(() => {
    const authCookie = Cookies.get('auth');
    
    if (authCookie) {
      try {
        const auth = JSON.parse(authCookie);
        if (auth.isAuthenticated) {
          router.push('/dashboard');
          return;
        }
      } catch (error) {
        console.error('Error parsing auth cookie:', error);
      }
    }
  
    router.push('/login');
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return null;
}
