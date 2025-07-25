'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { authService } from '@/lib/auth';
import { toast } from 'react-hot-toast';

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(true);
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Call logout API
        await authService.logout();
        
        // Clear local state
        logout();
        
        setIsLoggingOut(false);
        setLoggedOut(true);
        
        toast.success('تم تسجيل الخروج بنجاح');
        
        // Redirect to home page after 3 seconds
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } catch (error: any) {
        console.error('Logout error:', error);
        
        // Even if API call fails, clear local state
        logout();
        
        setIsLoggingOut(false);
        setLoggedOut(true);
        
        toast.error('حدث خطأ أثناء تسجيل الخروج، ولكن تم تسجيل الخروج محلياً');
        
        // Still redirect to home
        setTimeout(() => {
          router.push('/');
        }, 3000);
      }
    };

    handleLogout();
  }, [logout, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-upwork-lg border border-gray-200 p-8">
          {/* Icon */}
          <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-6 ${
             isLoggingOut ? 'bg-blue-100' : 'bg-green-100'
           }`}>
            {isLoggingOut ? (
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            ) : (
              <CheckCircle className="h-8 w-8 text-green-600" />
            )}
          </div>

          {/* Content */}
          <h1 className="font-heading font-bold text-2xl text-dark-900 mb-4">
            {isLoggingOut ? 'جاري تسجيل الخروج...' : 'تم تسجيل الخروج بنجاح'}
          </h1>
          <p className="text-dark-600 mb-8">
            {isLoggingOut 
              ? 'يرجى الانتظار بينما نقوم بتسجيل خروجك بأمان'
              : 'تم تسجيل خروجك بأمان من حساب A-List Home Pros'
            }
          </p>

          {/* Actions */}
          {loggedOut && (
            <div className="space-y-4">
              <Link
                href="/login"
                className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200 inline-block"
              >
                تسجيل الدخول مرة أخرى
              </Link>
              <Link
                href="/"
                className="w-full bg-gray-100 text-dark-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 inline-block"
              >
                الذهاب للصفحة الرئيسية
              </Link>
            </div>
          )}

          {/* Auto redirect message */}
          {loggedOut && (
            <p className="text-sm text-gray-500 mt-6">
              سيتم توجيهك للصفحة الرئيسية خلال ثوانٍ قليلة...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}