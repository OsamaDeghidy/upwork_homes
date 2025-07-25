'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store';
import { authService } from '@/lib/auth';
import Cookies from 'js-cookie';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, setLoading, logout } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const accessToken = Cookies.get('access_token');
        
        if (accessToken) {
          // إذا كان هناك token، جلب بيانات المستخدم
          const user = await authService.getCurrentUser();
          setUser(user);
        } else {
          // إذا لم يكن هناك token، المستخدم غير مسجل دخول
          setUser(null);
        }
      } catch (error) {
        console.error('خطأ في تهيئة المصادقة:', error);
        // في حالة الخطأ، تسجيل خروج المستخدم
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [setUser, setLoading, logout]);

  return <>{children}</>;
}