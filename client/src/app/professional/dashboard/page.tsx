'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  MessageCircle,
  Star,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Heart,
  FileText,
  Filter,
  Search,
  Bell,
  ChevronRight,
  MapPin,
  Award,
  Shield,
  Send,
  Camera,
  Target,
  Zap,
  PlusCircle,
  Activity,
  Bookmark,
  Settings
} from 'lucide-react';

export default function ProfessionalDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  // بيانات وهمية للإحصائيات
  const stats = [
    { 
      label: 'Active Jobs', 
      value: '5', 
      change: '+2 from last month',
      icon: Briefcase, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trend: 'up'
    },
    { 
      label: 'Total Earned', 
      value: '$8,750', 
      change: '+25% from last month',
      icon: DollarSign, 
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trend: 'up'
    },
    { 
      label: 'Proposals Sent', 
      value: '12', 
      change: '+4 from last month',
      icon: Send, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      trend: 'up'
    },
    { 
      label: 'Success Rate', 
      value: '87%', 
      change: '+5% from last month',
      icon: Target, 
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      trend: 'up'
    },
  ];

  // الوظائف النشطة
  const activeJobs = [
    {
      id: 1,
      title: 'Kitchen Renovation',
      client: 'John Smith',
      clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      status: 'In Progress',
      progress: 75,
      budget: '$8,500',
      deadline: '2024-02-15',
      location: 'Los Angeles, CA',
      category: 'Kitchen Remodeling',
      priority: 'high',
      lastUpdate: '2 hours ago',
      contractType: 'Fixed Price'
    },
    {
      id: 2,
      title: 'Bathroom Plumbing Fix',
      client: 'Sarah Johnson',
      clientAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      status: 'Waiting for Materials',
      progress: 30,
      budget: '$1,200',
      deadline: '2024-01-28',
      location: 'Los Angeles, CA',
      category: 'Plumbing',
      priority: 'medium',
      lastUpdate: '1 day ago',
      contractType: 'Hourly'
    },
    {
      id: 3,
      title: 'Garden Landscaping',
      client: 'Mike Davis',
      clientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      status: 'Planning Phase',
      progress: 15,
      budget: '$3,200',
      deadline: '2024-03-01',
      location: 'Los Angeles, CA',
      category: 'Landscaping',
      priority: 'low',
      lastUpdate: '3 days ago',
      contractType: 'Milestone'
    }
  ];

  // الوظائف المتاحة الجديدة
  const newJobs = [
    {
      id: 4,
      title: 'Electrical Wiring for Home Addition',
      client: 'Anonymous',
      budget: '$2,500 - $4,000',
      location: 'Los Angeles, CA',
      category: 'Electrical Work',
      postedTime: '2 hours ago',
      proposals: 3,
      timeLeft: '5 days',
      verified: true,
      urgent: false
    },
    {
      id: 5,
      title: 'Bathroom Tile Installation',
      client: 'Anonymous',
      budget: '$1,800 - $2,500',
      location: 'Beverly Hills, CA',
      category: 'Flooring',
      postedTime: '1 day ago',
      proposals: 7,
      timeLeft: '3 days',
      verified: true,
      urgent: true
    },
    {
      id: 6,
      title: 'Kitchen Cabinet Refinishing',
      client: 'Anonymous',
      budget: '$800 - $1,200',
      location: 'Santa Monica, CA',
      category: 'Carpentry',
      postedTime: '3 days ago',
      proposals: 12,
      timeLeft: '1 day',
      verified: false,
      urgent: false
    }
  ];

  // الرسائل الأخيرة
  const recentMessages = [
    {
      id: 1,
      from: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      message: 'Great work on the kitchen! When can we schedule the final walkthrough?',
      time: '1 hour ago',
      unread: true,
      project: 'Kitchen Renovation'
    },
    {
      id: 2,
      from: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      message: 'The materials arrived today. Should we proceed with the installation?',
      time: '3 hours ago',
      unread: false,
      project: 'Bathroom Plumbing Fix'
    },
    {
      id: 3,
      from: 'Mike Davis',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      message: 'I approved the design. When can we start the landscaping work?',
      time: '1 day ago',
      unread: false,
      project: 'Garden Landscaping'
    }
  ];

  // الأرباح الأخيرة
  const recentEarnings = [
    {
      id: 1,
      project: 'Kitchen Renovation',
      client: 'John Smith',
      amount: '$2,125',
      date: '2024-01-15',
      status: 'Completed',
      type: 'Milestone Payment'
    },
    {
      id: 2,
      project: 'Bathroom Plumbing Fix',
      client: 'Sarah Johnson',
      amount: '$480',
      date: '2024-01-12',
      status: 'In Progress',
      type: 'Hourly Payment'
    },
    {
      id: 3,
      project: 'Deck Construction',
      client: 'Robert Wilson',
      amount: '$1,800',
      date: '2024-01-08',
      status: 'Completed',
      type: 'Final Payment'
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
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
                Welcome back, Sarah! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Here's your professional dashboard overview
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/professional/proposals/new"
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Submit Proposal</span>
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
          {/* Active Jobs */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-semibold text-xl text-dark-900">
                  Active Jobs
                </h2>
                <Link
                  href="/my-jobs"
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {activeJobs.map((job) => (
                  <div
                    key={job.id}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={job.clientAvatar}
                          alt={job.client}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-dark-900">{job.title}</h3>
                          <p className="text-sm text-gray-600">Client: {job.client}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(job.priority)}`}>
                          {job.priority}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{job.budget}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{job.deadline}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{job.contractType}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{job.lastUpdate}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-medium text-dark-900">{job.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(job.progress)}`}
                          style={{ width: `${job.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{job.location}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={`/professional/jobs/${job.id}`}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          View Details
                        </Link>
                        <Link
                          href={`/messages?project=${job.id}`}
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

            {/* New Job Opportunities */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-semibold text-xl text-dark-900">
                  New Job Opportunities
                </h2>
                <Link
                  href="/find-work"
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1"
                >
                  <span>Browse All</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {newJobs.map((job) => (
                  <div
                    key={job.id}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-dark-900">{job.title}</h3>
                          {job.verified && (
                            <Shield className="h-4 w-4 text-green-600" />
                          )}
                          {job.urgent && (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                              Urgent
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{job.category}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span>{job.budget}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{job.postedTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600 mb-1">
                          {job.proposals} proposals
                        </div>
                        <div className="text-sm text-red-600 font-medium">
                          {job.timeLeft} left
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Posted {job.postedTime}</span>
                      </div>
                      <Link
                        href={`/projects/${job.id}`}
                        className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200"
                      >
                        Submit Proposal
                      </Link>
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

            {/* Recent Earnings */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-lg text-dark-900">
                  Recent Earnings
                </h3>
                <Link
                  href="/professional/earnings"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {recentEarnings.map((earning) => (
                  <div
                    key={earning.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-dark-900 text-sm">{earning.project}</p>
                      <p className="text-xs text-gray-600">{earning.client}</p>
                      <p className="text-xs text-gray-500">{earning.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{earning.amount}</p>
                      <p className="text-xs text-gray-500">{earning.date}</p>
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
                  href="/find-work"
                  className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-200"
                >
                  <Search className="h-5 w-5 text-primary-600" />
                  <span className="text-primary-700 font-medium">Browse Jobs</span>
                </Link>
                <Link
                  href="/professional/calendar"
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <Calendar className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">View Calendar</span>
                </Link>
                <Link
                  href="/professional/time-tracker"
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <Clock className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Time Tracker</span>
                </Link>
                <Link
                  href="/professional/tasks"
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <CheckCircle className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Manage Tasks</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 