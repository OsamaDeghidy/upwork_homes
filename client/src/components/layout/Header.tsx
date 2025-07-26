'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Menu, X, Bell, User, Briefcase, Users, MessageCircle, Settings, Plus, Search, BarChart3, DollarSign, Heart, FileText, Home, Info, Phone, HelpCircle, Calendar, Clock, CheckSquare, Timer, ChevronDown, LogOut, Crown, FileCheck, Send, Star, Eye } from 'lucide-react';
import { getMainNavRoutes, type UserRole } from '@/lib/routes';
import { useAuthStore } from '@/lib/store';
import { authService } from '@/lib/auth';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  
  // Get user role from authenticated user or default to client
  const getUserRole = (): UserRole => {
    if (user) {
      // Map backend user types to frontend roles
      switch (user.user_type) {
        case 'home_pro':
        case 'specialist':
        case 'crew_member':
          return 'home-pro';
        case 'client':
        default:
          return 'client';
      }
    }
    
    // Fallback to path-based detection for non-authenticated users
    if (pathname.startsWith('/client/')) return 'client';
    if (pathname.startsWith('/professional/') || pathname.startsWith('/my-jobs') || pathname.startsWith('/find-work')) return 'home-pro';
    return 'client';
  };

  const userRole = getUserRole();
  const navigationRoutes = getMainNavRoutes(userRole);

  // Handle logout
  const handleLogout = async () => {
    try {
      await authService.logout();
      logout();
      toast.success('تم تسجيل الخروج بنجاح');
      router.push('/');
    } catch (error) {
      console.error('خطأ في تسجيل الخروج:', error);
      // Force logout even if API call fails
      logout();
      router.push('/');
    }
  };

  // Icon mapping
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
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
    'FileText': FileText,
    'Send': Send,
    'Star': Star,
    'Eye': Eye
  };

  const navigation = navigationRoutes.map(route => ({
    name: route.name,
    href: route.href,
    icon: route.icon ? iconMap[route.icon] || Users : Users
  }));



  const isActivePage = (href: string) => {
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-50/30 to-accent-50/20 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ogo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Image 
                src="/ogo.png" 
                alt="A-List Home Pros" 
                width={64}
                height={64}
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
            {isAuthenticated && (
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
            )}

            {/* Notifications - Only show for authenticated users */}
            {isAuthenticated && (
              <button className="relative p-2 text-gray-600 hover:text-primary-500 transition-all duration-300 rounded-lg hover:bg-primary-50/50 group">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold text-[10px]">
                  2
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </button>
            )}

            {/* User Menu or Auth Buttons */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 p-2 text-dark-700 hover:text-primary-500 transition-all duration-300 rounded-xl hover:bg-primary-50/50 group"
                >
                  <div className="relative">
                    <img
                      src={user.avatar || '/default-avatar.png'}
                      alt={`${user.first_name} ${user.last_name}`}
                      className="h-10 w-10 rounded-xl object-cover border-2 border-gray-200 group-hover:border-primary-300 transition-all duration-300"
                    />
                    <div className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-sm font-semibold">{user.first_name} {user.last_name}</div>
                    <div className="text-xs text-gray-500">
                      {user.user_type === 'client' ? 'Client' : 'Professional'}
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/70 py-2 z-50 animate-slide-down">
                    <div className="px-4 py-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.avatar || '/default-avatar.png'}
                          alt={`${user.first_name} ${user.last_name}`}
                          className="h-12 w-12 rounded-xl object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold text-dark-900">{user.first_name} {user.last_name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                          {user.is_verified && (
                            <div className="flex items-center mt-1">
                              <Crown className="h-3 w-3 text-yellow-500 mr-1" />
                              <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                                Verified
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* User Navigation Menu */}
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-3 text-sm text-dark-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 hover:text-primary-600 transition-all duration-300 group"
                    >
                      <User className="h-4 w-4 mr-3 text-gray-400 group-hover:text-primary-500" />
                      Profile
                    </Link>
                    
                    <Link
                      href="/settings"
                      className="flex items-center px-4 py-3 text-sm text-dark-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 hover:text-primary-600 transition-all duration-300 group"
                    >
                      <Settings className="h-4 w-4 mr-3 text-gray-400 group-hover:text-primary-500" />
                      Settings
                    </Link>
                    
                    {userRole !== 'client' && (
                      <>
                        <Link
                          href="/professional/calendar"
                          className="flex items-center px-4 py-3 text-sm text-dark-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 hover:text-primary-600 transition-all duration-300 group"
                        >
                          <Calendar className="h-4 w-4 mr-3 text-gray-400 group-hover:text-primary-500" />
                          Calendar
                        </Link>
                        
                        <Link
                          href="/professional/availability"
                          className="flex items-center px-4 py-3 text-sm text-dark-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 hover:text-primary-600 transition-all duration-300 group"
                        >
                          <Clock className="h-4 w-4 mr-3 text-gray-400 group-hover:text-primary-500" />
                          Availability
                        </Link>
                        
                        <Link
                          href="/professional/earnings"
                          className="flex items-center px-4 py-3 text-sm text-dark-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 hover:text-primary-600 transition-all duration-300 group"
                        >
                          <DollarSign className="h-4 w-4 mr-3 text-gray-400 group-hover:text-primary-500" />
                          Earnings
                        </Link>
                        
                        <Link
                          href="/professional/reviews"
                          className="flex items-center px-4 py-3 text-sm text-dark-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 hover:text-primary-600 transition-all duration-300 group"
                        >
                          <Star className="h-4 w-4 mr-3 text-gray-400 group-hover:text-primary-500" />
                          Reviews
                        </Link>
                      </>
                    )}
                    
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-300 group"
                      >
                        <LogOut className="h-4 w-4 mr-3 text-red-400 group-hover:text-red-500" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
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
            )}



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
            {!isAuthenticated ? (
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
            ) : (
              <div className="mb-4 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <img
                    src={user?.avatar || '/default-avatar.png'}
                    alt={`${user?.first_name} ${user?.last_name}`}
                    className="h-12 w-12 rounded-xl object-cover border-2 border-white shadow-md"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-dark-900">{user?.first_name} {user?.last_name}</p>
                    <p className="text-xs text-gray-600">{user?.email}</p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Link
                    href="/profile"
                    className="flex items-center justify-center px-3 py-2 bg-white rounded-lg text-sm font-medium text-primary-600 hover:bg-primary-50 transition-colors duration-200"
                  >
                    <User className="h-4 w-4 mr-1" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}

            {/* Dynamic Action Button - Mobile */}
            {isAuthenticated && (
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
            )}

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