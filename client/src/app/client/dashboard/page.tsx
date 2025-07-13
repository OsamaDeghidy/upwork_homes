'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  DollarSign, 
  Plus, 
  Calendar, 
  MessageCircle,
  Star,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Eye,
  Heart,
  FileText,
  Filter,
  Search,
  Bell,
  ChevronRight,
  MapPin,
  Award,
  Shield
} from 'lucide-react';

export default function ClientDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  // بيانات وهمية للإحصائيات
  const stats = [
    { 
      label: 'Active Projects', 
      value: '3', 
      change: '+2 from last month',
      icon: Briefcase, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trend: 'up'
    },
    { 
      label: 'Total Spent', 
      value: '$12,450', 
      change: '+15% from last month',
      icon: DollarSign, 
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trend: 'up'
    },
    { 
      label: 'Professionals Hired', 
      value: '8', 
      change: '+3 from last month',
      icon: Users, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      trend: 'up'
    },
    { 
      label: 'Projects Completed', 
      value: '12', 
      change: '+4 from last month',
      icon: CheckCircle, 
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      trend: 'up'
    },
  ];

  // المشاريع النشطة
  const activeProjects = [
    {
      id: 1,
      title: 'Kitchen Renovation',
      professional: 'Sarah Mitchell',
      professionalAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      status: 'In Progress',
      progress: 75,
      budget: '$8,500',
      deadline: '2024-02-15',
      location: 'Los Angeles, CA',
      category: 'Kitchen Remodeling',
      rating: 4.9,
      lastUpdate: '2 hours ago'
    },
    {
      id: 2,
      title: 'Bathroom Plumbing Fix',
      professional: 'David Rodriguez',
      professionalAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      status: 'Waiting for Materials',
      progress: 30,
      budget: '$1,200',
      deadline: '2024-01-28',
      location: 'Los Angeles, CA',
      category: 'Plumbing',
      rating: 5.0,
      lastUpdate: '1 day ago'
    },
    {
      id: 3,
      title: 'Garden Landscaping',
      professional: 'Maria Santos',
      professionalAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      status: 'Planning Phase',
      progress: 15,
      budget: '$3,200',
      deadline: '2024-03-01',
      location: 'Los Angeles, CA',
      category: 'Landscaping',
      rating: 4.8,
      lastUpdate: '3 days ago'
    }
  ];

  // الرسائل الأخيرة
  const recentMessages = [
    {
      id: 1,
      from: 'Sarah Mitchell',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      message: 'The kitchen cabinets will be delivered tomorrow. We can start installation right away.',
      time: '2 hours ago',
      unread: true,
      project: 'Kitchen Renovation'
    },
    {
      id: 2,
      from: 'David Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      message: 'I need to reschedule tomorrow\'s appointment. Can we meet on Friday instead?',
      time: '1 day ago',
      unread: false,
      project: 'Bathroom Plumbing Fix'
    },
    {
      id: 3,
      from: 'Maria Santos',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      message: 'Here are the design options for your garden. Let me know which one you prefer.',
      time: '3 days ago',
      unread: false,
      project: 'Garden Landscaping'
    }
  ];

  // المحترفون المفضلون
  const favoriteProfessionals = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      title: 'Kitchen Designer & Contractor',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.9,
      reviews: 127,
      completedJobs: 3,
      specialties: ['Kitchen Remodeling', 'Bathroom Renovation'],
      status: 'Available'
    },
    {
      id: 2,
      name: 'David Rodriguez',
      title: 'Master Electrician',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 5.0,
      reviews: 89,
      completedJobs: 2,
      specialties: ['Electrical Work', 'Home Automation'],
      status: 'Busy'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Waiting for Materials':
        return 'bg-yellow-100 text-yellow-800';
      case 'Planning Phase':
        return 'bg-purple-100 text-purple-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-heading font-bold text-3xl text-dark-900">
                Welcome back, John! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Here's what's happening with your projects today
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/post-project"
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Post New Project</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-dark-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Projects */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-semibold text-xl text-dark-900">
                  Active Projects
                </h2>
                <Link
                  href="/client/projects"
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {activeProjects.map((project) => (
                  <div
                    key={project.id}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={project.professionalAvatar}
                          alt={project.professional}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-dark-900">{project.title}</h3>
                          <p className="text-sm text-gray-600">by {project.professional}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{project.budget}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{project.deadline}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-gray-600">{project.rating}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{project.lastUpdate}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-medium text-dark-900">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{project.location}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={`/client/projects/${project.id}`}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          View Details
                        </Link>
                        <Link
                          href={`/messages?project=${project.id}`}
                          className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                        >
                          Message
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Messages */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-lg text-dark-900">
                  Recent Messages
                </h3>
                <Link
                  href="/messages"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg ${
                      message.unread ? 'bg-primary-50 border border-primary-200' : 'hover:bg-gray-50'
                    }`}
                  >
                    <img
                      src={message.avatar}
                      alt={message.from}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-dark-900 text-sm">{message.from}</p>
                        <span className="text-xs text-gray-500">{message.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
                      <p className="text-xs text-primary-600 mt-1">{message.project}</p>
                    </div>
                    {message.unread && (
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Favorite Professionals */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-lg text-dark-900">
                  Favorite Professionals
                </h3>
                <Link
                  href="/client/favorites"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {favoriteProfessionals.map((professional) => (
                  <div
                    key={professional.id}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
                  >
                    <img
                      src={professional.avatar}
                      alt={professional.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-dark-900 text-sm">{professional.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          professional.status === 'Available' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {professional.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{professional.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-400" />
                          <span className="text-xs text-gray-600">{professional.rating}</span>
                        </div>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-600">{professional.completedJobs} jobs</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <h3 className="font-heading font-semibold text-lg text-dark-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  href="/post-project"
                  className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-200"
                >
                  <Plus className="h-5 w-5 text-primary-600" />
                  <span className="text-primary-700 font-medium">Post New Project</span>
                </Link>
                <Link
                  href="/professionals"
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <Users className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Browse Professionals</span>
                </Link>
                <Link
                  href="/client/reviews"
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <Star className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Leave a Review</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 