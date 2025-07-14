'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Star, CheckCircle, Heart, Filter, DollarSign, Clock, Award, Mail, Map, Grid3x3 } from 'lucide-react';

export default function ProfessionalsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'

  const categories = [
    'All Categories',
    'Kitchen Remodeling',
    'Bathroom Renovation',
    'Electrical Work',
    'Plumbing',
    'Roofing',
    'HVAC Services',
    'Landscaping',
    'Painting',
    'Flooring',
    'Carpentry'
  ];

  const ratingFilters = [
    'All Ratings',
    '5 Stars',
    '4+ Stars',
    '3+ Stars'
  ];

  const budgetFilters = [
    'All Budgets',
    'Under $50/hr',
    '$50-75/hr',
    '$75-100/hr',
    '$100-150/hr',
    '$150-200/hr',
    '$200+/hr'
  ];

  const roleFilters = [
    'All Roles',
    'Home Pro',
    'A-List Specialist',
    'Crew Member'
  ];

  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviews' },
    { value: 'price-low', label: 'Lowest Rate' },
    { value: 'price-high', label: 'Highest Rate' },
    { value: 'response', label: 'Fastest Response' },
    { value: 'recent', label: 'Recently Active' },
    { value: 'projects', label: 'Most Projects' }
  ];

  const [selectedSort, setSelectedSort] = useState('rating');

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedRating('all');
    setSelectedBudget('all');
    setSelectedRole('all');
    setSearchQuery('');
    setSelectedLocation('');
  };

  // Sample professionals data
  const professionals = [
    {
      id: 1,
      name: "Sarah Mitchell",
      title: "Kitchen Designer & Contractor",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      reviews: 127,
      hourlyRate: "$85",
      location: "Los Angeles, CA",
      category: "Kitchen Remodeling",
      role: "Home Pro",
      verified: true,
      topRated: true,
      online: true,
      responseTime: "2 hours",
      completedProjects: 45,
      successRate: 98,
      description: "Experienced kitchen designer with 8+ years specializing in modern renovations. Licensed contractor with expertise in custom cabinetry and high-end finishes.",
      skills: ["Custom Cabinetry", "Modern Design", "Project Management", "3D Rendering"],
      portfolio: [
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1556909114-8c9b3e3d9e9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ],
      badges: ["Top Rated", "Licensed", "Insured"],
      languages: ["English", "Spanish"]
    },
    {
      id: 2,
      name: "David Rodriguez",
      title: "Master Electrician",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 5.0,
      reviews: 89,
      hourlyRate: "$95",
      location: "Miami, FL",
      category: "Electrical Work",
      role: "Home Pro",
      verified: true,
      topRated: true,
      online: false,
      responseTime: "1 hour",
      completedProjects: 67,
      successRate: 100,
      description: "Licensed master electrician with 12 years of experience. Specializing in residential upgrades, smart home installations, and electrical panel updates.",
      skills: ["Panel Upgrades", "Smart Home", "Code Compliance", "Emergency Service"],
      portfolio: [
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ],
      badges: ["Master Licensed", "Insured", "Emergency Service"],
      languages: ["English", "Spanish"]
    },
    {
      id: 3,
      name: "Maria Santos",
      title: "Interior Designer",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 156,
      hourlyRate: "$75",
      location: "Chicago, IL",
      category: "Interior Design",
      role: "A-List Specialist",
      verified: true,
      topRated: false,
      online: true,
      responseTime: "3 hours",
      completedProjects: 78,
      successRate: 96,
      description: "Creative interior designer with a passion for transforming spaces. Specializing in modern and contemporary designs with sustainable materials.",
      skills: ["Space Planning", "Color Consultation", "Sustainable Design", "Furniture Selection"],
      portfolio: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ],
      badges: ["Verified", "Eco-Friendly"],
      languages: ["English", "Spanish", "Portuguese"]
    },
    {
      id: 4,
      name: "James Wilson",
      title: "Plumbing Expert",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      reviews: 203,
      hourlyRate: "$88",
      location: "Phoenix, AZ",
      category: "Plumbing",
      role: "Home Pro",
      verified: true,
      topRated: true,
      online: true,
      responseTime: "1 hour",
      completedProjects: 112,
      successRate: 99,
      description: "Professional plumber with 15+ years of experience. Licensed and bonded, specializing in bathroom renovations and water heater installations.",
      skills: ["Bathroom Renovations", "Water Heaters", "Pipe Repair", "Emergency Service"],
      portfolio: [
        "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ],
      badges: ["Licensed", "Bonded", "24/7 Service"],
      languages: ["English"]
    },
    {
      id: 5,
      name: "Emily Chen",
      title: "Landscape Designer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.7,
      reviews: 92,
      hourlyRate: "$70",
      location: "Denver, CO",
      category: "Landscaping",
      role: "A-List Specialist",
      verified: true,
      topRated: false,
      online: false,
      responseTime: "4 hours",
      completedProjects: 56,
      successRate: 95,
      description: "Certified landscape designer with expertise in sustainable gardening and outdoor living spaces. Creating beautiful, eco-friendly landscapes.",
      skills: ["Garden Design", "Irrigation Systems", "Native Plants", "Outdoor Living"],
      portfolio: [
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ],
      badges: ["Certified", "Eco-Friendly"],
      languages: ["English", "Mandarin"]
    },
    {
      id: 6,
      name: "Robert Kim",
      title: "Roofing Contractor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 134,
      hourlyRate: "$92",
      location: "Seattle, WA",
      category: "Roofing",
      role: "Crew Member",
      verified: true,
      topRated: true,
      online: true,
      responseTime: "2 hours",
      completedProjects: 89,
      successRate: 97,
      description: "Licensed roofing contractor with 20+ years of experience. Specializing in residential roofing, repairs, and storm damage restoration.",
      skills: ["Roof Installation", "Storm Damage", "Gutter Systems", "Skylight Installation"],
      portfolio: [
        "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ],
      badges: ["Licensed", "Insured", "Storm Certified"],
      languages: ["English", "Korean"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,191,255,0.1),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,206,0,0.08),transparent_60%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-dark-900 leading-tight">
                Find Trusted
                <span className="block text-gradient-primary">Home Professionals</span>
              </h1>
              <p className="text-xl lg:text-2xl text-dark-600 leading-relaxed max-w-3xl mx-auto">
                Browse verified professionals with proven track records. Read reviews, compare rates, and hire with confidence.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-upwork-lg p-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Search Input */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      What service do you need?
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="e.g., Kitchen designer, Electrician..."
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        placeholder="Enter city or zip"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Search Button */}
                  <div className="flex items-end">
                    <button className="w-full bg-gradient-primary text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      Find Pros
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {[
                { value: '5,000+', label: 'Verified Pros' },
                { value: '4.9★', label: 'Average Rating' },
                { value: '50,000+', label: 'Completed Projects' },
                { value: '2h', label: 'Avg Response' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gradient-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-dark-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-80">
              <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading font-semibold text-lg text-dark-900">Filters</h3>
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden p-2 text-gray-600 hover:text-primary-500 rounded-lg"
                  >
                    <Filter className="h-5 w-5" />
                  </button>
                </div>

                <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-3">Category</label>
                    <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {categories.map((category, index) => (
                        <option key={index} value={category.toLowerCase().replace(/\s+/g, '-')}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-3">Minimum Rating</label>
                    <select 
                      value={selectedRating}
                      onChange={(e) => setSelectedRating(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {ratingFilters.map((rating, index) => (
                        <option key={index} value={rating.toLowerCase().replace(/\s+/g, '-')}>
                          {rating}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget Filter */}
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-3">Hourly Rate</label>
                    <select 
                      value={selectedBudget}
                      onChange={(e) => setSelectedBudget(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {budgetFilters.map((budget, index) => (
                        <option key={index} value={budget.toLowerCase().replace(/\s+/g, '-')}>
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Role Filter */}
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-3">Professional Role</label>
                    <select 
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {roleFilters.map((role, index) => (
                        <option key={index} value={role.toLowerCase().replace(/\s+/g, '-')}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quick Filters */}
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-3">Quick Filters</label>
                    <div className="space-y-2">
                      {[
                        { id: 'top-rated', label: 'Top Rated Only', icon: '⭐' },
                        { id: 'online', label: 'Currently Online', icon: '🟢' },
                        { id: 'fast-response', label: 'Fast Response (< 2hrs)', icon: '⚡' },
                        { id: 'licensed', label: 'Licensed & Insured', icon: '🛡️' },
                        { id: 'emergency', label: 'Emergency Service', icon: '🚨' },
                        { id: 'eco-friendly', label: 'Eco-Friendly', icon: '🌱' }
                      ].map((filter) => (
                        <label key={filter.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500" 
                          />
                          <span className="text-sm">{filter.icon}</span>
                          <span className="text-sm text-dark-700">{filter.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Location Range */}
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-3">Travel Distance</label>
                    <div className="space-y-2">
                      {[
                        'Within 5 miles',
                        'Within 10 miles',
                        'Within 25 miles',
                        'Within 50 miles',
                        'Any distance'
                      ].map((distance, index) => (
                        <label key={index} className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            name="distance" 
                            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500" 
                          />
                          <span className="text-sm text-dark-700">{distance}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <button 
                    onClick={clearAllFilters}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-dark-700 font-medium text-sm py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-heading font-semibold text-2xl text-dark-900">Available Professionals</h2>
                  <p className="text-dark-600 mt-1">{professionals.length} professionals found</p>
                </div>
                <div className="flex items-center space-x-4">
                  {/* View Mode Toggle */}
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-all duration-200 ${
                        viewMode === 'grid' 
                          ? 'bg-white text-primary-600 shadow-sm' 
                          : 'text-gray-600 hover:text-primary-600'
                      }`}
                    >
                      <Grid3x3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('map')}
                      className={`p-2 rounded-md transition-all duration-200 ${
                        viewMode === 'map' 
                          ? 'bg-white text-primary-600 shadow-sm' 
                          : 'text-gray-600 hover:text-primary-600'
                      }`}
                    >
                      <Map className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <select 
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Map View */}
              {viewMode === 'map' && (
                <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 overflow-hidden mb-6">
                  <div className="h-96 relative bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-dark-900 mb-2">Professional Locations</h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Interactive map showing professional locations will be displayed here.
                        This requires Google Maps API or similar mapping service integration.
                      </p>
                    </div>
                    
                    {/* Simulated map markers */}
                    <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-3 border border-gray-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                        <span className="text-sm font-medium text-dark-900">Home Pro</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
                        <span className="text-sm font-medium text-dark-900">A-List Specialist</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-dark-900">Crew Member</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid View */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {professionals.map((pro) => (
                    <div key={pro.id} className="bg-white rounded-2xl shadow-upwork hover:shadow-upwork-lg transition-all duration-300 border border-gray-200 overflow-hidden group">
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <img
                                src={pro.avatar}
                                alt={pro.name}
                                className="w-16 h-16 rounded-xl object-cover"
                              />
                              {pro.online && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></div>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-heading font-semibold text-lg text-dark-900 group-hover:text-primary-600 transition-colors duration-200">
                                  <Link href={`/professionals/${pro.id}`}>
                                    {pro.name}
                                  </Link>
                                </h3>
                                {pro.verified && (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                )}
                                {pro.topRated && (
                                  <Award className="h-5 w-5 text-yellow-500" />
                                )}
                              </div>
                              <p className="text-dark-600 font-medium">{pro.title}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                                  {pro.role}
                                </span>
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="text-sm font-medium text-dark-900">{pro.rating}</span>
                                  <span className="text-sm text-dark-600">({pro.reviews} reviews)</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                            <Heart className="h-5 w-5" />
                          </button>
                        </div>

                        {/* Description */}
                        <p className="text-dark-600 leading-relaxed mb-4">
                          {pro.description}
                        </p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {pro.skills.slice(0, 4).map((skill, index) => (
                            <span key={index} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center bg-gray-50 rounded-lg p-3">
                            <div className="text-lg font-bold text-dark-900">{pro.completedProjects}</div>
                            <div className="text-xs text-dark-600">Projects</div>
                          </div>
                          <div className="text-center bg-gray-50 rounded-lg p-3">
                            <div className="text-lg font-bold text-dark-900">{pro.successRate}%</div>
                            <div className="text-xs text-dark-600">Success Rate</div>
                          </div>
                        </div>

                        {/* Portfolio Preview */}
                        {pro.portfolio.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-dark-900 mb-2">Recent Work</h4>
                            <div className="flex space-x-2">
                              {pro.portfolio.slice(0, 3).map((image, index) => (
                                <img
                                  key={index}
                                  src={image}
                                  alt={`Work by ${pro.name}`}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {pro.badges.map((badge, index) => (
                            <span key={index} className="bg-accent-50 text-accent-700 px-2 py-1 rounded-full text-xs font-medium">
                              {badge}
                            </span>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-4 text-sm text-dark-600">
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              <span className="font-medium">{pro.hourlyRate}/hr</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{pro.responseTime}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{pro.location}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-600 hover:text-primary-600 border border-gray-300 rounded-lg transition-colors duration-200">
                              <Mail className="h-4 w-4" />
                            </button>
                            <Link
                              href={`/professionals/${pro.id}`}
                              className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200"
                            >
                              View Profile
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Load More - Only for grid view */}
              {viewMode === 'grid' && (
                <div className="text-center mt-12">
                  <button className="bg-white border border-gray-300 text-dark-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                    Load More Professionals
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 