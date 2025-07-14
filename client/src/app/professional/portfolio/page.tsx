'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Camera, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Heart, 
  Share2, 
  Upload,
  Grid,
  List,
  Search,
  Star,
  Calendar,
  MapPin,
  DollarSign,
  Award,
  TrendingUp
} from 'lucide-react';

export default function PortfolioPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('recent');

  const portfolioItems = [
    {
      id: 1,
      title: 'Modern Kitchen Transformation',
      category: 'Kitchen Remodeling',
      description: 'Complete kitchen renovation with custom cabinets, quartz countertops, and stainless steel appliances',
      images: [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1556909045-f18c06d3e1d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      videos: ['kitchen_timelapse.mp4'],
      location: 'Beverly Hills, CA',
      duration: '6 weeks',
      budget: '$45,000',
      client: 'John & Sarah Smith',
      completionDate: '2024-01-15',
      rating: 5.0,
      review: 'Absolutely amazing work! The kitchen exceeded our expectations.',
      likes: 24,
      views: 156,
      featured: true,
      tags: ['Modern', 'Quartz', 'Custom Cabinets', 'Stainless Steel'],
      beforeAfter: true
    },
    {
      id: 2,
      title: 'Luxury Bathroom Renovation',
      category: 'Bathroom Renovation',
      description: 'Master bathroom renovation with marble tiles, rainfall shower, and custom vanity',
      images: [
        'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      videos: [],
      location: 'Manhattan Beach, CA',
      duration: '4 weeks',
      budget: '$28,000',
      client: 'Michael Johnson',
      completionDate: '2023-12-20',
      rating: 4.8,
      review: 'Professional work and attention to detail. Highly recommend!',
      likes: 18,
      views: 98,
      featured: false,
      tags: ['Marble', 'Rainfall Shower', 'Custom Vanity', 'Luxury'],
      beforeAfter: true
    },
    {
      id: 3,
      title: 'Outdoor Deck Construction',
      category: 'Carpentry',
      description: 'Custom wooden deck with built-in seating and fire pit area',
      images: [
        'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      videos: [],
      location: 'Santa Monica, CA',
      duration: '3 weeks',
      budget: '$15,000',
      client: 'Emma Wilson',
      completionDate: '2023-11-10',
      rating: 4.9,
      review: 'Beautiful deck that transformed our backyard. Great craftsmanship!',
      likes: 15,
      views: 87,
      featured: true,
      tags: ['Wooden Deck', 'Fire Pit', 'Built-in Seating', 'Outdoor'],
      beforeAfter: false
    },
    {
      id: 4,
      title: 'Electrical Panel Upgrade',
      category: 'Electrical Work',
      description: 'Complete electrical panel upgrade from 100A to 200A service with new circuits',
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      videos: [],
      location: 'Los Angeles, CA',
      duration: '2 days',
      budget: '$3,500',
      client: 'Robert Davis',
      completionDate: '2023-10-25',
      rating: 5.0,
      review: 'Fast, professional, and clean work. Power issues resolved!',
      likes: 8,
      views: 45,
      featured: false,
      tags: ['Electrical Panel', 'Safety', 'Code Compliance', 'Upgrade'],
      beforeAfter: false
    },
    {
      id: 5,
      title: 'Garden Landscaping Project',
      category: 'Landscaping',
      description: 'Complete backyard transformation with drought-resistant plants and modern hardscape',
      images: [
        'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      videos: [],
      location: 'Pasadena, CA',
      duration: '5 weeks',
      budget: '$22,000',
      client: 'Lisa Chen',
      completionDate: '2023-09-15',
      rating: 4.7,
      review: 'Love the new garden! Low maintenance and beautiful design.',
      likes: 12,
      views: 73,
      featured: false,
      tags: ['Drought Resistant', 'Hardscape', 'Modern', 'Sustainable'],
      beforeAfter: true
    }
  ];

  const stats = [
    {
      label: 'Total Projects',
      value: portfolioItems.length.toString(),
      change: '+2 this month',
      icon: Camera,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Total Views',
      value: portfolioItems.reduce((sum, item) => sum + item.views, 0).toString(),
      change: '+45 this week',
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Total Likes',
      value: portfolioItems.reduce((sum, item) => sum + item.likes, 0).toString(),
      change: '+8 this week',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      label: 'Average Rating',
      value: (portfolioItems.reduce((sum, item) => sum + item.rating, 0) / portfolioItems.length).toFixed(1),
      change: 'Excellent work!',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ];

  const categories = [
    'All Categories',
    'Kitchen Remodeling',
    'Bathroom Renovation',
    'Carpentry',
    'Electrical Work',
    'Landscaping'
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'budget', label: 'Highest Budget' }
  ];

  const filteredItems = portfolioItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                           item.category.toLowerCase() === selectedCategory.toLowerCase() ||
                           selectedCategory === 'All Categories';
    
    return matchesSearch && matchesCategory;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (selectedSort) {
      case 'popular':
        return b.views - a.views;
      case 'rating':
        return b.rating - a.rating;
      case 'budget':
        return parseInt(b.budget.replace(/[$,]/g, '')) - parseInt(a.budget.replace(/[$,]/g, ''));
      default:
        return new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime();
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-heading font-bold text-3xl text-dark-900">
                My Portfolio
              </h1>
              <p className="text-gray-600 mt-1">
                Showcase your best work and attract new clients
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Bulk Upload</span>
              </button>
              <Link
                href="/professional/portfolio/new"
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add Project</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-dark-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
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

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
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

            {/* Results Count */}
            <div className="flex items-center justify-center">
              <span className="text-sm text-gray-600">
                {sortedItems.length} projects found
              </span>
            </div>
          </div>
        </div>

        {/* Portfolio Items */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-upwork border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                {/* Image Gallery */}
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {item.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <Award className="h-3 w-3" />
                        <span>Featured</span>
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                      {item.images.length} photos
                    </span>
                    {item.videos.length > 0 && (
                      <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                        {item.videos.length} videos
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <button className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-opacity duration-200">
                      <Heart className="h-4 w-4 text-red-500" />
                    </button>
                    <button className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-opacity duration-200">
                      <Share2 className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-heading font-semibold text-lg text-dark-900 line-clamp-2">
                      {item.title}
                    </h3>
                    <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{item.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{item.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{item.budget}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-gray-600">{item.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{item.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{item.likes}</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{item.completionDate}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 2 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                          +{item.tags.length - 2}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/professional/portfolio/${item.id}`}
                        className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200"
                      >
                        View
                      </Link>
                      <button className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200">
                        <Edit2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-200">
              {sortedItems.map((item) => (
                <div
                  key={item.id}
                  className="p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-start space-x-6">
                    <div className="relative w-32 h-24 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      {item.featured && (
                        <div className="absolute top-1 left-1">
                          <Award className="h-4 w-4 text-yellow-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-heading font-semibold text-xl text-dark-900">
                          {item.title}
                        </h3>
                        <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{item.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{item.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{item.budget}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm text-gray-600">{item.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{item.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{item.likes}</span>
                          </div>
                          <span className="text-sm text-gray-500">{item.completionDate}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/professional/portfolio/${item.id}`}
                            className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200"
                          >
                            View Details
                          </Link>
                          <button className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Items Found */}
        {sortedItems.length === 0 && (
          <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-12 text-center">
            <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-xl text-dark-900 mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search query, or add your first project to get started.
            </p>
            <Link
              href="/professional/portfolio/new"
              className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-200"
            >
              Add Your First Project
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 