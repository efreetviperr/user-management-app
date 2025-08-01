'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import LoginForm from '../components/LoginForm';

interface LoginData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (data: LoginData) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?email=${data.email}&username=${data.password}`
      );

      const users = await response.json();
      if (users && users.length > 0) {
        const user = users[0];
        Cookies.set('auth', JSON.stringify({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
          },
          isAuthenticated: true,
        }), { expires: 7 });
        toast.success('Login successful!');
        router.push('/dashboard');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return <LoginForm onSubmit={handleLogin} isLoading={isLoading} />;
} 