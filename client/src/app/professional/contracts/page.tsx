'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FileText,
  Calendar,
  DollarSign,
  Clock,
  Eye,
  Download,
  Search,
  Plus,
  User,
  MapPin,
  ArrowRight,
  MoreVertical,
  Share2,
  X
} from 'lucide-react';

interface Contract {
  id: number;
  projectName: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  projectType: string;
  status: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  location: string;
  description: string;
  milestones: Array<{
    id: number;
    title: string;
    amount: number;
    status: string;
    dueDate: string;
  }>;
  documents: Array<{
    id: number;
    name: string;
    type: string;
    url: string;
  }>;
  rating: number;
  createdAt: string;
}

export default function ProfessionalContractsPage() {
  const [, setSelectedContract] = useState<Contract | null>(null);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [, setShowContractModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample contracts data
  const contracts = [
    {
      id: 1,
      projectName: 'Kitchen Renovation',
      clientName: 'John Smith',
      clientEmail: 'john.smith@email.com',
      clientPhone: '+1 (555) 123-4567',
      projectType: 'Kitchen Remodeling',
      status: 'Active',
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      totalAmount: 15000,
      paidAmount: 7500,
      remainingAmount: 7500,
      location: '123 Main St, Los Angeles, CA',
      description: 'Complete kitchen renovation including cabinets, countertops, appliances, and flooring.',
      milestones: [
        { id: 1, title: 'Design Phase', amount: 3000, status: 'paid', dueDate: '2024-01-20' },
        { id: 2, title: 'Demolition', amount: 2000, status: 'paid', dueDate: '2024-01-25' },
        { id: 3, title: 'Installation', amount: 5000, status: 'pending', dueDate: '2024-02-15' },
        { id: 4, title: 'Final Touches', amount: 5000, status: 'pending', dueDate: '2024-03-10' }
      ],
      documents: [
        { id: 1, name: 'Contract Agreement', type: 'pdf', url: '#' },
        { id: 2, name: 'Project Specifications', type: 'pdf', url: '#' },
        { id: 3, name: 'Material List', type: 'xlsx', url: '#' }
      ],
      rating: 4.8,
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      projectName: 'Bathroom Renovation',
      clientName: 'Sarah Johnson',
      clientEmail: 'sarah.johnson@email.com',
      clientPhone: '+1 (555) 987-6543',
      projectType: 'Bathroom Renovation',
      status: 'In Progress',
      startDate: '2024-01-20',
      endDate: '2024-02-20',
      totalAmount: 8500,
      paidAmount: 4250,
      remainingAmount: 4250,
      location: '456 Oak Ave, Beverly Hills, CA',
      description: 'Master bathroom renovation with new fixtures, tiles, and plumbing.',
      milestones: [
        { id: 1, title: 'Planning', amount: 1500, status: 'paid', dueDate: '2024-01-22' },
        { id: 2, title: 'Demolition', amount: 1750, status: 'paid', dueDate: '2024-01-28' },
        { id: 3, title: 'Plumbing & Electrical', amount: 2500, status: 'pending', dueDate: '2024-02-05' },
        { id: 4, title: 'Finishing', amount: 2750, status: 'pending', dueDate: '2024-02-18' }
      ],
      documents: [
        { id: 1, name: 'Contract Agreement', type: 'pdf', url: '#' },
        { id: 2, name: 'Permit Documentation', type: 'pdf', url: '#' }
      ],
      rating: 4.9,
      createdAt: '2024-01-15'
    },
    {
      id: 3,
      projectName: 'Electrical Panel Upgrade',
      clientName: 'Mike Davis',
      clientEmail: 'mike.davis@email.com',
      clientPhone: '+1 (555) 456-7890',
      projectType: 'Electrical Work',
      status: 'Completed',
      startDate: '2024-01-05',
      endDate: '2024-01-12',
      totalAmount: 3200,
      paidAmount: 3200,
      remainingAmount: 0,
      location: '789 Pine St, Santa Monica, CA',
      description: 'Upgrade electrical panel and install new circuits for home addition.',
      milestones: [
        { id: 1, title: 'Assessment', amount: 800, status: 'paid', dueDate: '2024-01-06' },
        { id: 2, title: 'Installation', amount: 1600, status: 'paid', dueDate: '2024-01-10' },
        { id: 3, title: 'Testing & Inspection', amount: 800, status: 'paid', dueDate: '2024-01-12' }
      ],
      documents: [
        { id: 1, name: 'Contract Agreement', type: 'pdf', url: '#' },
        { id: 2, name: 'Electrical Permit', type: 'pdf', url: '#' },
        { id: 3, name: 'Inspection Report', type: 'pdf', url: '#' }
      ],
      rating: 5.0,
      createdAt: '2024-01-01'
    }
  ];

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contract.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'active') return matchesSearch && contract.status === 'Active';
    if (selectedFilter === 'in-progress') return matchesSearch && contract.status === 'In Progress';
    if (selectedFilter === 'completed') return matchesSearch && contract.status === 'Completed';
    if (selectedFilter === 'pending-payment') return matchesSearch && contract.remainingAmount > 0;
    
    return matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalEarnings = contracts.reduce((sum, contract) => sum + contract.paidAmount, 0);
  const pendingPayments = contracts.reduce((sum, contract) => sum + contract.remainingAmount, 0);
  const activeContracts = contracts.filter(c => c.status === 'Active' || c.status === 'In Progress').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/professional/dashboard" className="text-gray-600 hover:text-primary-600">
                <ArrowRight className="h-5 w-5 rotate-180" />
              </Link>
              <h1 className="text-2xl font-bold text-dark-900">Contracts</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowContractModal(true)}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>New Contract</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-dark-900">${totalEarnings.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-dark-900">${pendingPayments.toLocaleString()}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Contracts</p>
                <p className="text-2xl font-bold text-dark-900">{activeContracts}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contracts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Contracts</option>
                <option value="active">Active</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="pending-payment">Pending Payment</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contracts List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredContracts.map((contract) => (
            <div key={contract.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-dark-900">{contract.projectName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                      {contract.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{contract.clientName}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{contract.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{contract.startDate} - {contract.endDate}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{contract.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedContract(contract)}
                    className="text-primary-600 hover:text-primary-700 p-2 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Payment Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Payment Progress</span>
                  <span className="text-sm font-medium text-dark-900">
                    ${contract.paidAmount.toLocaleString()} / ${contract.totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(contract.paidAmount / contract.totalAmount) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{Math.round((contract.paidAmount / contract.totalAmount) * 100)}% Paid</span>
                  <span>${contract.remainingAmount.toLocaleString()} Remaining</span>
                </div>
              </div>

              {/* Milestones */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Milestones</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {contract.milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-dark-900">{milestone.title}</p>
                        <p className="text-xs text-gray-600">${milestone.amount.toLocaleString()}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMilestoneStatusColor(milestone.status)}`}>
                        {milestone.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowAddPaymentModal(true)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2 text-sm"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Request Payment</span>
                  </button>
                  <Link
                    href={`/client/projects/${contract.id}`}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2 text-sm"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Project</span>
                  </Link>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-600 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <Download className="h-4 w-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredContracts.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contracts found</h3>
            <p className="text-gray-600">Start by creating your first contract or adjust your filters.</p>
          </div>
        )}
      </div>

      {/* Add Payment Modal */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-dark-900">Request Payment</h3>
              <button
                onClick={() => setShowAddPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Milestone
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option>Design Phase - $3,000</option>
                  <option>Installation - $5,000</option>
                  <option>Final Touches - $5,000</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Payment description..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowAddPaymentModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddPaymentModal(false)}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 