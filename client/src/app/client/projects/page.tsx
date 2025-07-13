'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Filter, 
  Search, 
  Grid, 
  List, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Star, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  MessageCircle, 
  Eye, 
  Edit2, 
  Trash2, 
  Plus,
  ChevronDown,
  Users,
  Briefcase
} from 'lucide-react';

export default function ClientProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');

  const projects = [
    {
      id: 1,
      title: 'Kitchen Renovation',
      description: 'Complete kitchen remodel with new cabinets, countertops, and appliances',
      professional: {
        name: 'Sarah Mitchell',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 4.9,
        reviews: 127
      },
      status: 'In Progress',
      progress: 75,
      budget: '$8,500',
      spent: '$6,375',
      deadline: '2024-02-15',
      startDate: '2024-01-01',
      location: 'Los Angeles, CA',
      category: 'Kitchen Remodeling',
      priority: 'High',
      lastUpdate: '2 hours ago',
      messages: 12,
      images: [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1556909045-f18c06d3e1d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      ]
    },
    {
      id: 2,
      title: 'Bathroom Plumbing Fix',
      description: 'Fix leaking pipes and replace old fixtures',
      professional: {
        name: 'David Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 5.0,
        reviews: 89
      },
      status: 'Waiting for Materials',
      progress: 30,
      budget: '$1,200',
      spent: '$360',
      deadline: '2024-01-28',
      startDate: '2024-01-15',
      location: 'Los Angeles, CA',
      category: 'Plumbing',
      priority: 'Medium',
      lastUpdate: '1 day ago',
      messages: 8,
      images: [
        'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      ]
    },
    {
      id: 3,
      title: 'Garden Landscaping',
      description: 'Complete backyard makeover with new plants and hardscaping',
      professional: {
        name: 'Maria Santos',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 4.8,
        reviews: 156
      },
      status: 'Planning Phase',
      progress: 15,
      budget: '$3,200',
      spent: '$480',
      deadline: '2024-03-01',
      startDate: '2024-01-20',
      location: 'Los Angeles, CA',
      category: 'Landscaping',
      priority: 'Low',
      lastUpdate: '3 days ago',
      messages: 5,
      images: [
        'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      ]
    },
    {
      id: 4,
      title: 'Electrical Panel Upgrade',
      description: 'Upgrade main electrical panel and add new circuits',
      professional: {
        name: 'Michael Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 4.7,
        reviews: 74
      },
      status: 'Completed',
      progress: 100,
      budget: '$2,800',
      spent: '$2,800',
      deadline: '2024-01-10',
      startDate: '2023-12-20',
      location: 'Los Angeles, CA',
      category: 'Electrical Work',
      priority: 'High',
      lastUpdate: '1 week ago',
      messages: 15,
      images: []
    },
    {
      id: 5,
      title: 'Roof Repair',
      description: 'Fix damaged shingles and check for leaks',
      professional: {
        name: 'James Wilson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 4.9,
        reviews: 102
      },
      status: 'Cancelled',
      progress: 0,
      budget: '$1,500',
      spent: '$0',
      deadline: '2024-01-05',
      startDate: '2023-12-15',
      location: 'Los Angeles, CA',
      category: 'Roofing',
      priority: 'Medium',
      lastUpdate: '2 weeks ago',
      messages: 3,
      images: []
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'planning', label: 'Planning' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'kitchen', label: 'Kitchen Remodeling' },
    { value: 'bathroom', label: 'Bathroom Renovation' },
    { value: 'electrical', label: 'Electrical Work' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'landscaping', label: 'Landscaping' },
    { value: 'roofing', label: 'Roofing' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'deadline', label: 'Deadline' },
    { value: 'budget', label: 'Budget' },
    { value: 'progress', label: 'Progress' },
    { value: 'priority', label: 'Priority' }
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
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
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

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.professional.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'active' && ['In Progress', 'Waiting for Materials', 'Planning Phase'].includes(project.status)) ||
                         (selectedStatus === 'in-progress' && project.status === 'In Progress') ||
                         (selectedStatus === 'completed' && project.status === 'Completed') ||
                         (selectedStatus === 'cancelled' && project.status === 'Cancelled') ||
                         (selectedStatus === 'planning' && project.status === 'Planning Phase');
    
    const matchesCategory = selectedCategory === 'all' || 
                           project.category.toLowerCase().includes(selectedCategory.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-heading font-bold text-3xl text-dark-900">
                My Projects
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and track all your home improvement projects
              </p>
            </div>
            <Link
              href="/post-project"
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Post New Project</span>
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
              >
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    Sort by {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {filteredProjects.length} projects found
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-upwork border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                {/* Project Image */}
                {project.images.length > 0 && (
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                        {project.priority}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-heading font-semibold text-lg text-dark-900 line-clamp-2">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Professional Info */}
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={project.professional.avatar}
                      alt={project.professional.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-dark-900 text-sm">
                        {project.professional.name}
                      </p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400" />
                        <span className="text-xs text-gray-600">
                          {project.professional.rating} ({project.professional.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
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

                  {/* Project Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{project.budget}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{project.deadline}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{project.messages} messages</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/client/projects/${project.id}`}
                      className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200 text-center"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/messages?project=${project.id}`}
                      className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-200">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-heading font-semibold text-lg text-dark-900">
                          {project.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                          {project.priority}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex items-center space-x-6 mb-3">
                        <div className="flex items-center space-x-2">
                          <img
                            src={project.professional.avatar}
                            alt={project.professional.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-sm text-gray-600">{project.professional.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{project.budget}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{project.deadline}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{project.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex-1 max-w-xs">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">Progress</span>
                            <span className="text-xs font-medium text-dark-900">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">
                          Updated {project.lastUpdate}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-6">
                      <Link
                        href={`/client/projects/${project.id}`}
                        className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200"
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/messages?project=${project.id}`}
                        className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Projects Found */}
        {filteredProjects.length === 0 && (
          <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-12 text-center">
            <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-xl text-dark-900 mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search query to find projects.
            </p>
            <Link
              href="/post-project"
              className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-200"
            >
              Post Your First Project
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 