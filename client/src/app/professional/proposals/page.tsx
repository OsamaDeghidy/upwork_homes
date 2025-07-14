'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Send, 
  Eye, 
  Edit2, 
  Trash2, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  DollarSign,
  Calendar,
  MapPin,
  Search,
  Plus,
  FileText,
  MessageCircle,
  TrendingUp,
  Target
} from 'lucide-react';

export default function ProposalsPage() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const proposals = [
    {
      id: 1,
      title: 'Kitchen Renovation',
      client: 'John Smith',
      clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Complete kitchen remodel with new cabinets, countertops, and appliances',
      proposedAmount: '$8,500',
      timeline: '6 weeks',
      status: 'Pending',
      submittedDate: '2024-01-20',
      category: 'Kitchen Remodeling',
      location: 'Los Angeles, CA',
      clientBudget: '$8,000 - $12,000',
      competitors: 5,
      responseTime: '2 days left',
      coverLetter: 'I have over 10 years of experience in kitchen renovations and would love to work on this project...',
      attachments: ['portfolio.pdf', 'references.pdf']
    },
    {
      id: 2,
      title: 'Bathroom Plumbing Fix',
      client: 'Sarah Johnson',
      clientAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Fix leaking pipes and replace old fixtures in master bathroom',
      proposedAmount: '$1,200',
      timeline: '3 days',
      status: 'Accepted',
      submittedDate: '2024-01-15',
      category: 'Plumbing',
      location: 'Beverly Hills, CA',
      clientBudget: '$1,000 - $1,500',
      competitors: 3,
      responseTime: 'Accepted',
      coverLetter: 'I\'m a licensed plumber with 15 years of experience. I can start immediately...',
      attachments: ['license.pdf', 'insurance.pdf']
    },
    {
      id: 3,
      title: 'Deck Construction',
      client: 'Mike Davis',
      clientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Build a new wooden deck in the backyard, approximately 400 sq ft',
      proposedAmount: '$4,200',
      timeline: '2 weeks',
      status: 'Rejected',
      submittedDate: '2024-01-10',
      category: 'Carpentry',
      location: 'Santa Monica, CA',
      clientBudget: '$3,500 - $5,000',
      competitors: 8,
      responseTime: 'Closed',
      coverLetter: 'I specialize in outdoor decking and have built over 50 decks in the LA area...',
      attachments: ['deck_portfolio.pdf']
    },
    {
      id: 4,
      title: 'Electrical Panel Upgrade',
      client: 'Emma Wilson',
      clientAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Upgrade main electrical panel from 100A to 200A service',
      proposedAmount: '$2,800',
      timeline: '2 days',
      status: 'Under Review',
      submittedDate: '2024-01-18',
      category: 'Electrical Work',
      location: 'Pasadena, CA',
      clientBudget: '$2,500 - $3,500',
      competitors: 4,
      responseTime: '5 days left',
      coverLetter: 'As a licensed electrician, I can safely upgrade your electrical panel...',
      attachments: ['electrical_license.pdf', 'recent_projects.pdf']
    },
    {
      id: 5,
      title: 'Roof Repair',
      client: 'Robert Johnson',
      clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Repair damaged shingles and check for leaks after recent storm',
      proposedAmount: '$1,800',
      timeline: '1 week',
      status: 'Withdrawn',
      submittedDate: '2024-01-08',
      category: 'Roofing',
      location: 'Long Beach, CA',
      clientBudget: '$1,500 - $2,500',
      competitors: 6,
      responseTime: 'Withdrawn',
      coverLetter: 'I have 20 years of roofing experience and can handle all types of repairs...',
      attachments: ['roofing_portfolio.pdf']
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Proposals', count: proposals.length },
    { id: 'pending', label: 'Pending', count: proposals.filter(p => p.status === 'Pending').length },
    { id: 'accepted', label: 'Accepted', count: proposals.filter(p => p.status === 'Accepted').length },
    { id: 'rejected', label: 'Rejected', count: proposals.filter(p => p.status === 'Rejected').length }
  ];

  const stats = [
    {
      label: 'Total Proposals',
      value: '28',
      change: '+5 this month',
      icon: Send,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Acceptance Rate',
      value: '64%',
      change: '+8% from last month',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Average Response',
      value: '2.3 days',
      change: 'Faster than 70% of pros',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      label: 'Total Value',
      value: '$45,200',
      change: '+$12,000 this month',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Accepted':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800';
      case 'Withdrawn':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Accepted':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'Under Review':
        return <Eye className="h-4 w-4 text-blue-600" />;
      case 'Withdrawn':
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         proposal.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         proposal.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = selectedTab === 'all' || proposal.status.toLowerCase() === selectedTab;
    const matchesFilter = selectedFilter === 'all' || proposal.category.toLowerCase().includes(selectedFilter.toLowerCase());
    
    return matchesSearch && matchesTab && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-heading font-bold text-3xl text-dark-900">
                My Proposals
              </h1>
              <p className="text-gray-600 mt-1">
                Track and manage your project proposals
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/find-work"
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Find New Projects</span>
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

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6 mb-8">
          {/* Tabs */}
          <div className="flex items-center space-x-6 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  selectedTab === tab.id
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{tab.label}</span>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search proposals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
            >
              <option value="all">All Categories</option>
              <option value="kitchen">Kitchen Remodeling</option>
              <option value="bathroom">Bathroom Renovation</option>
              <option value="electrical">Electrical Work</option>
              <option value="plumbing">Plumbing</option>
              <option value="carpentry">Carpentry</option>
              <option value="roofing">Roofing</option>
            </select>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {filteredProposals.length} proposals found
              </span>
            </div>
          </div>
        </div>

        {/* Proposals List */}
        <div className="space-y-6">
          {filteredProposals.map((proposal) => (
            <div
              key={proposal.id}
              className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={proposal.clientAvatar}
                    alt={proposal.client}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-heading font-semibold text-xl text-dark-900">
                        {proposal.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                        {proposal.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">Client: {proposal.client}</p>
                    <p className="text-gray-600 text-sm line-clamp-2">{proposal.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{proposal.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{proposal.category}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">Submitted: {proposal.submittedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    {getStatusIcon(proposal.status)}
                    <span className="text-sm text-gray-600">{proposal.responseTime}</span>
                  </div>
                  <div className="text-2xl font-bold text-dark-900 mb-1">
                    {proposal.proposedAmount}
                  </div>
                  <div className="text-sm text-gray-600">{proposal.timeline}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h4 className="font-semibold text-dark-900 mb-2">Proposal Details</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Client Budget:</span>
                      <span className="font-medium">{proposal.clientBudget}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Competitors:</span>
                      <span className="font-medium">{proposal.competitors} proposals</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Timeline:</span>
                      <span className="font-medium">{proposal.timeline}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-dark-900 mb-2">Attachments</h4>
                  <div className="space-y-1">
                    {proposal.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{attachment}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-dark-900 mb-2">Cover Letter</h4>
                <p className="text-gray-600 text-sm line-clamp-2">{proposal.coverLetter}</p>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(proposal.status)}`}>
                    {proposal.status}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/professional/proposals/${proposal.id}`}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200"
                  >
                    View Details
                  </Link>
                  {proposal.status === 'Pending' && (
                    <>
                      <button className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                  {proposal.status === 'Accepted' && (
                    <Link
                      href={`/messages?client=${proposal.client}`}
                      className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Proposals Found */}
        {filteredProposals.length === 0 && (
          <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-12 text-center">
            <Send className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-xl text-dark-900 mb-2">
              No proposals found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search query to find proposals.
            </p>
            <Link
              href="/find-work"
              className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-200"
            >
              Find New Projects
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 