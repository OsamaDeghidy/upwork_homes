'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  DollarSign,
  Calendar,
  MapPin,
  Search,
  Plus,
  Shield,
  Star,
  TrendingUp,
  XCircle,
  MessageCircle,
  CreditCard
} from 'lucide-react';

export default function ContractsPage() {
  const [selectedTab, setSelectedTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const contracts = [
    {
      id: 1,
      contractNumber: 'CON-2024-001',
      title: 'Kitchen Renovation Contract',
      professional: {
        name: 'Sarah Mitchell',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 4.9,
        reviews: 127,
        verified: true
      },
      status: 'Active',
      contractValue: '$8,500',
      paidAmount: '$6,375',
      remainingAmount: '$2,125',
      startDate: '2024-01-01',
      endDate: '2024-02-15',
      signedDate: '2023-12-28',
      category: 'Kitchen Remodeling',
      location: 'Los Angeles, CA',
      paymentTerms: 'Milestone-based',
      warranty: '2 years',
      milestones: [
        { name: 'Design & Planning', amount: '$1,700', status: 'Paid' },
        { name: 'Demolition', amount: '$1,200', status: 'Paid' },
        { name: 'Electrical & Plumbing', amount: '$1,800', status: 'In Progress' },
        { name: 'Cabinet Installation', amount: '$2,500', status: 'Pending' },
        { name: 'Final Touches', amount: '$1,300', status: 'Pending' }
      ],
      documents: [
        { name: 'Main Contract', type: 'PDF', size: '2.4 MB', signed: true },
        { name: 'Material Specifications', type: 'PDF', size: '1.8 MB', signed: false },
        { name: 'Payment Schedule', type: 'PDF', size: '0.9 MB', signed: true }
      ]
    },
    {
      id: 2,
      contractNumber: 'CON-2024-002',
      title: 'Bathroom Plumbing Contract',
      professional: {
        name: 'David Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 5.0,
        reviews: 89,
        verified: true
      },
      status: 'Completed',
      contractValue: '$1,200',
      paidAmount: '$1,200',
      remainingAmount: '$0',
      startDate: '2024-01-15',
      endDate: '2024-01-18',
      signedDate: '2024-01-12',
      category: 'Plumbing',
      location: 'Beverly Hills, CA',
      paymentTerms: 'Upon completion',
      warranty: '1 year',
      milestones: [
        { name: 'Plumbing Fix', amount: '$1,200', status: 'Paid' }
      ],
      documents: [
        { name: 'Service Contract', type: 'PDF', size: '1.5 MB', signed: true },
        { name: 'Completion Certificate', type: 'PDF', size: '0.8 MB', signed: true }
      ]
    },
    {
      id: 3,
      contractNumber: 'CON-2024-003',
      title: 'Garden Landscaping Contract',
      professional: {
        name: 'Maria Santos',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 4.8,
        reviews: 156,
        verified: true
      },
      status: 'Pending Signature',
      contractValue: '$3,200',
      paidAmount: '$0',
      remainingAmount: '$3,200',
      startDate: '2024-01-25',
      endDate: '2024-03-01',
      signedDate: null,
      category: 'Landscaping',
      location: 'Santa Monica, CA',
      paymentTerms: 'Weekly payments',
      warranty: '6 months',
      milestones: [
        { name: 'Design Planning', amount: '$800', status: 'Pending' },
        { name: 'Site Preparation', amount: '$1,000', status: 'Pending' },
        { name: 'Plant Installation', amount: '$1,000', status: 'Pending' },
        { name: 'Final Landscaping', amount: '$400', status: 'Pending' }
      ],
      documents: [
        { name: 'Landscaping Contract', type: 'PDF', size: '2.1 MB', signed: false },
        { name: 'Design Plans', type: 'PDF', size: '3.5 MB', signed: false }
      ]
    },
    {
      id: 4,
      contractNumber: 'CON-2023-045',
      title: 'Electrical Panel Upgrade',
      professional: {
        name: 'Michael Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 4.7,
        reviews: 74,
        verified: true
      },
      status: 'Completed',
      contractValue: '$2,800',
      paidAmount: '$2,800',
      remainingAmount: '$0',
      startDate: '2023-12-20',
      endDate: '2024-01-10',
      signedDate: '2023-12-18',
      category: 'Electrical Work',
      location: 'Los Angeles, CA',
      paymentTerms: 'Milestone-based',
      warranty: '3 years',
      milestones: [
        { name: 'Panel Installation', amount: '$2,800', status: 'Paid' }
      ],
      documents: [
        { name: 'Electrical Contract', type: 'PDF', size: '1.9 MB', signed: true },
        { name: 'Safety Certificate', type: 'PDF', size: '0.7 MB', signed: true },
        { name: 'Warranty Document', type: 'PDF', size: '0.6 MB', signed: true }
      ]
    }
  ];

  const tabs = [
    { id: 'active', label: 'Active', count: contracts.filter(c => c.status === 'Active').length },
    { id: 'completed', label: 'Completed', count: contracts.filter(c => c.status === 'Completed').length },
    { id: 'pending', label: 'Pending', count: contracts.filter(c => c.status === 'Pending Signature').length },
    { id: 'all', label: 'All', count: contracts.length }
  ];

  const stats = [
    {
      label: 'Total Contracts',
      value: contracts.length.toString(),
      change: '+3 this year',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Active Contracts',
      value: contracts.filter(c => c.status === 'Active').length.toString(),
      change: 'In progress',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      label: 'Total Value',
      value: `$${contracts.reduce((sum, c) => sum + parseFloat(c.contractValue.replace('$', '').replace(',', '')), 0).toLocaleString()}`,
      change: '+$8,500 this year',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Completion Rate',
      value: `${Math.round((contracts.filter(c => c.status === 'Completed').length / contracts.length) * 100)}%`,
      change: 'On track',
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending Signature':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Pending Signature':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'Cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contract.professional.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contract.contractNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = selectedTab === 'all' || 
                      (selectedTab === 'active' && contract.status === 'Active') ||
                      (selectedTab === 'completed' && contract.status === 'Completed') ||
                      (selectedTab === 'pending' && contract.status === 'Pending Signature');
    
    const matchesFilter = selectedFilter === 'all' || contract.category.toLowerCase().includes(selectedFilter.toLowerCase());
    
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
                My Contracts
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and track all your project contracts
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/post-project"
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Create New Contract</span>
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
                placeholder="Search contracts..."
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
              <option value="landscaping">Landscaping</option>
            </select>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {filteredContracts.length} contracts found
              </span>
            </div>
          </div>
        </div>

        {/* Contracts List */}
        <div className="space-y-6">
          {filteredContracts.map((contract) => (
            <div
              key={contract.id}
              className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg">
                    <FileText className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-heading font-semibold text-xl text-dark-900">
                        {contract.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(contract.status)}`}>
                        {contract.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">Contract #{contract.contractNumber}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{contract.startDate} - {contract.endDate}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{contract.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-dark-900 mb-1">
                    {contract.contractValue}
                  </div>
                  <div className="text-sm text-gray-600">
                    Paid: {contract.paidAmount}
                  </div>
                  <div className="text-sm text-gray-600">
                    Remaining: {contract.remainingAmount}
                  </div>
                </div>
              </div>

              {/* Professional Info */}
              <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Image
                    src={contract.professional.avatar}
                    alt={contract.professional.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-dark-900">{contract.professional.name}</p>
                      {contract.professional.verified && (
                        <Shield className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-400" />
                      <span className="text-xs text-gray-600">
                        {contract.professional.rating} ({contract.professional.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/professionals/${contract.professional.name}`}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    View Profile
                  </Link>
                  <Link
                    href={`/messages?professional=${contract.professional.name}`}
                    className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Contract Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-dark-900 mb-3">Contract Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Payment Terms:</span>
                      <span className="font-medium">{contract.paymentTerms}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Warranty:</span>
                      <span className="font-medium">{contract.warranty}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Signed Date:</span>
                      <span className="font-medium">{contract.signedDate || 'Not signed'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-dark-900 mb-3">Milestones</h4>
                  <div className="space-y-2">
                    {contract.milestones.slice(0, 3).map((milestone, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{milestone.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{milestone.amount}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMilestoneStatusColor(milestone.status)}`}>
                            {milestone.status}
                          </span>
                        </div>
                      </div>
                    ))}
                    {contract.milestones.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{contract.milestones.length - 3} more milestones
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="mb-6">
                <h4 className="font-semibold text-dark-900 mb-3">Documents</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {contract.documents.map((doc, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                      <FileText className="h-8 w-8 text-primary-600" />
                      <div className="flex-1">
                        <p className="font-medium text-dark-900 text-sm">{doc.name}</p>
                        <p className="text-xs text-gray-600">{doc.type} • {doc.size}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {doc.signed && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors duration-200">
                          <Eye className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors duration-200">
                          <Download className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(contract.status)}
                  <span className="text-sm text-gray-600">Status: {contract.status}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/client/contracts/${contract.id}`}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/client/projects/${contract.id}`}
                    className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/client/payments?contract=${contract.id}`}
                    className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <CreditCard className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Contracts Found */}
        {filteredContracts.length === 0 && (
          <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-12 text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-xl text-dark-900 mb-2">
              No contracts found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search query to find contracts.
            </p>
            <Link
              href="/post-project"
              className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-200"
            >
              Create Your First Contract
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 