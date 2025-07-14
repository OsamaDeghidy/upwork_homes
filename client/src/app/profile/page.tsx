'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit2, 
  Camera, 
  Shield, 
  Award, 
  Calendar,
  Briefcase,
  Star,
  Settings,
  Bell,
  CreditCard,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  // Sample user data
  const user = {
    id: 1,
    name: "John Smith",
    title: "Licensed Contractor & Home Renovation Expert",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    location: "Los Angeles, CA",
    role: "Home Pro",
    memberSince: "2019",
    verified: true,
    topRated: true,
    rating: 4.9,
    reviews: 127,
    completedProjects: 45,
    totalEarned: "$285,000",
    responseTime: "2 hours",
    successRate: 98,
    bio: "Experienced contractor with 15+ years in residential renovation. Specializing in kitchen and bathroom remodeling, I bring quality craftsmanship and attention to detail to every project. Licensed, insured, and committed to customer satisfaction.",
    skills: ["Kitchen Remodeling", "Bathroom Renovation", "Electrical Work", "Plumbing", "Project Management"],
    certifications: ["Licensed Contractor", "EPA RRP Certified", "OSHA 10 Certified"],
    languages: ["English", "Spanish"],
    serviceArea: "Los Angeles County, Orange County",
    availability: "Available for new projects"
  };

  const stats = [
    { label: "Projects Completed", value: user.completedProjects, icon: Briefcase, color: "text-blue-600" },
    { label: "Client Rating", value: `${user.rating}/5.0`, icon: Star, color: "text-yellow-600" },
    { label: "Response Time", value: user.responseTime, icon: Calendar, color: "text-green-600" },
    { label: "Success Rate", value: `${user.successRate}%`, icon: TrendingUp, color: "text-primary-600" }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-xl object-cover border-4 border-primary-100"
                />
                <button className="absolute -bottom-2 -right-2 bg-primary-500 text-white p-2 rounded-full shadow-lg hover:bg-primary-600 transition-colors duration-200">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="font-heading font-bold text-2xl text-dark-900">{user.name}</h1>
                  {user.verified && (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  )}
                  {user.topRated && (
                    <Award className="h-6 w-6 text-yellow-500" />
                  )}
                </div>
                <p className="text-lg text-dark-600 font-medium mb-2">{user.title}</p>
                <div className="flex items-center space-x-4 text-dark-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Member since {user.memberSince}</span>
                  </div>
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200 flex items-center space-x-2"
              >
                <Edit2 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
              <Link
                href="/profile/settings"
                className="bg-gray-100 text-dark-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dark-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-dark-900">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-600 hover:text-primary-600'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* About Section */}
                <div>
                  <h3 className="font-heading font-semibold text-xl text-dark-900 mb-4">About</h3>
                  <p className="text-dark-600 leading-relaxed">{user.bio}</p>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="font-heading font-semibold text-xl text-dark-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-dark-900">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium text-dark-900">{user.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills & Certifications */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-heading font-semibold text-xl text-dark-900 mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill, index) => (
                        <span key={index} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-heading font-semibold text-xl text-dark-900 mb-4">Certifications</h3>
                    <div className="space-y-2">
                      {user.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-green-500" />
                          <span className="text-dark-700">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div>
                <h3 className="font-heading font-semibold text-xl text-dark-900 mb-4">Recent Projects</h3>
                <div className="text-center py-12">
                  <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Your project portfolio will appear here</p>
                  <Link
                    href="/my-jobs"
                    className="inline-block mt-4 bg-primary-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200"
                  >
                    View All Projects
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="font-heading font-semibold text-xl text-dark-900 mb-4">Client Reviews</h3>
                <div className="text-center py-12">
                  <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Client reviews will appear here as you complete projects</p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h3 className="font-heading font-semibold text-xl text-dark-900 mb-4">Quick Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link
                    href="/profile/settings"
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Settings className="h-6 w-6 text-gray-600 mb-2" />
                    <h4 className="font-semibold text-dark-900 mb-1">Account Settings</h4>
                    <p className="text-sm text-gray-600">Manage your account preferences</p>
                  </Link>
                  
                  <Link
                    href="/profile/notifications"
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Bell className="h-6 w-6 text-gray-600 mb-2" />
                    <h4 className="font-semibold text-dark-900 mb-1">Notifications</h4>
                    <p className="text-sm text-gray-600">Configure notification preferences</p>
                  </Link>
                  
                  <Link
                    href="/profile/billing"
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <CreditCard className="h-6 w-6 text-gray-600 mb-2" />
                    <h4 className="font-semibold text-dark-900 mb-1">Billing</h4>
                    <p className="text-sm text-gray-600">Manage payment methods</p>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 