'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, CheckCircle } from 'lucide-react';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Here you would handle the actual logout logic
    // For now, we'll just simulate it
    const handleLogout = () => {
      // Clear any stored tokens, user data, etc.
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      
      // Redirect to home page after 3 seconds
      setTimeout(() => {
        router.push('/');
      }, 3000);
    };

    handleLogout();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-upwork-lg border border-gray-200 p-8">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>

          {/* Content */}
          <h1 className="font-heading font-bold text-2xl text-dark-900 mb-4">
            Successfully Logged Out
          </h1>
          <p className="text-dark-600 mb-8">
            You have been safely logged out of your A-List Home Pros account.
          </p>

          {/* Actions */}
          <div className="space-y-4">
            <Link
              href="/login"
              className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200 inline-block"
            >
              Sign In Again
            </Link>
            <Link
              href="/"
              className="w-full bg-gray-100 text-dark-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 inline-block"
            >
              Go to Homepage
            </Link>
          </div>

          {/* Auto redirect message */}
          <p className="text-sm text-gray-500 mt-6">
            You will be redirected to the homepage in a few seconds...
          </p>
        </div>
      </div>
    </div>
  );
} 