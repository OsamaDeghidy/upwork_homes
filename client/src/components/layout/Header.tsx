'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, ChevronDown, Bell, User, Briefcase, Users, MessageCircle, Settings, Plus, Crown, Search, BarChart3, DollarSign, Heart, FileText, Home, Info, Phone, HelpCircle, Calendar, Clock, CheckSquare, Timer } from 'lucide-react';
import { getMainNavRoutes, type UserRole } from '@/lib/routes';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // For demo purposes, we'll simulate user role detection
  // In a real app, this would come from authentication context
  const getUserRole = (): UserRole => {
    // Check if we're on a client path
    if (pathname.startsWith('/client/')) return 'client';
    // Check if we're on a professional path (all professionals use same routes)
    if (pathname.startsWith('/professional/') || pathname.startsWith('/my-jobs') || pathname.startsWith('/find-work')) return 'home-pro';
    // Default to client for general pages
    return 'client';
  };

  const userRole = getUserRole();
  const navigationRoutes = getMainNavRoutes(userRole);

  // Icon mapping
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    'BarChart3': BarChart3,
    'Plus': Plus,
    'Briefcase': Briefcase,
    'Users': Users,
    'MessageCircle': MessageCircle,
    'Search': Search,
    'DollarSign': DollarSign,
    'Calendar': Calendar,
    'Timer': Timer,
    'CheckSquare': CheckSquare,
    'Clock': Clock,
    'HelpCircle': HelpCircle,
    'Info': Info,
    'Home': Home,
    'Phone': Phone,
    'User': User,
    'Settings': Settings,
    'Heart': Heart,
    'FileText': FileText
  };

  const navigation = navigationRoutes.map(route => ({
    name: route.name,
    href: route.href,
    icon: route.icon ? iconMap[route.icon] || Users : Users
  }));

  const userNavigation = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Sign Out', href: '/logout' },
  ];

  const isActivePage = (href: string) => {
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-50/30 to-accent-50/20 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="A-List Home Pros" 
                className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="font-heading font-bold text-2xl">
              <span className="text-gradient-primary">A-List</span>
              <span className="text-dark-700"> Home Pros</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative px-3 py-2 font-medium text-xs rounded-lg transition-all duration-300 ${
                  isActivePage(item.href)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-dark-600 hover:text-primary-600 hover:bg-primary-50/50'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {isActivePage(item.href) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-lg"></div>
                )}
                {!isActivePage(item.href) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-2">
            {/* Dynamic Action Button */}
            <Link
              href={userRole === 'client' ? '/post-project' : '/find-work'}
              className="hidden md:flex items-center bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {userRole === 'client' ? (
                <>
                  <Plus className="h-3 w-3 mr-1" />
                  Post Project
                </>
              ) : (
                <>
                  <Search className="h-3 w-3 mr-1" />
                  Find Work
                </>
              )}
            </Link>

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-primary-500 transition-all duration-300 rounded-lg hover:bg-primary-50/50 group">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold text-[10px]">
                2
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </button>

            {/* User Menu or Auth Buttons */}
            {/* For demo purposes, we'll show auth buttons. In a real app, this would be conditional based on authentication state */}
            <div className="hidden lg:flex items-center space-x-2">
              <Link
                href="/login"
                className="text-dark-600 hover:text-primary-600 text-sm font-medium transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-accent-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-600 transition-colors duration-200"
              >
                Sign Up
              </Link>
            </div>

            {/* Authenticated User Menu (commented out for demo) */}
            {/* 
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 p-2 text-dark-700 hover:text-primary-500 transition-all duration-300 rounded-xl hover:bg-primary-50/50 group"
              >
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                    alt="User"
                    className="h-10 w-10 rounded-xl object-cover border-2 border-gray-200 group-hover:border-primary-300 transition-all duration-300"
                  />
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-sm font-semibold">John Doe</div>
                  <div className="text-xs text-gray-500">Pro Member</div>
                </div>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/70 py-2 z-50 animate-slide-down">
                  <div className="px-4 py-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                        alt="User"
                        className="h-12 w-12 rounded-xl object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-dark-900">John Doe</p>
                        <p className="text-xs text-gray-500">john@example.com</p>
                        <div className="flex items-center mt-1">
                          <Crown className="h-3 w-3 text-yellow-500 mr-1" />
                          <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                            Pro Member
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-4 py-3 text-sm text-dark-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 hover:text-primary-600 transition-all duration-300 group"
                    >
                      {item.icon && <item.icon className="h-4 w-4 mr-3 text-gray-400 group-hover:text-primary-500" />}
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            */}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 text-gray-600 hover:text-primary-500 transition-all duration-300 rounded-xl hover:bg-primary-50/50 group"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-lg animate-slide-down">
          <div className="px-4 py-4 space-y-2">
            {/* Mobile Auth Buttons */}
            <div className="flex space-x-3 mb-4">
              <Link
                href="/login"
                className="flex-1 text-center border border-primary-500 text-primary-600 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="flex-1 text-center bg-accent-500 text-white py-2 rounded-lg font-medium hover:bg-accent-600 transition-colors duration-200"
              >
                Sign Up
              </Link>
            </div>

            {/* Dynamic Action Button - Mobile */}
            <Link
              href={userRole === 'client' ? '/post-project' : '/find-work'}
              className="flex items-center justify-center bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg mb-4"
            >
              {userRole === 'client' ? (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Post Project
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Find Work
                </>
              )}
            </Link>

            {/* Mobile Navigation */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActivePage(item.href)
                    ? 'bg-gradient-to-r from-primary-50 to-accent-50 text-primary-600'
                    : 'text-dark-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 hover:text-primary-600'
                }`}
              >
                <item.icon className={`h-5 w-5 ${
                  isActivePage(item.href) ? 'text-primary-500' : 'text-gray-400 group-hover:text-primary-500'
                }`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
} 