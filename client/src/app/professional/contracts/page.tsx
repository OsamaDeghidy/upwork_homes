'use client';

import { useState, useEffect } from 'react';
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
  Loader2
} from 'lucide-react';
import { contractsService } from '@/lib/contracts';
import { Contract, ContractFilters } from '@/lib/types';
import { useAuthStore } from '@/lib/store';

export default function ProfessionalContractsPage() {
  const { user } = useAuthStore();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total_contracts: 0,
    active_contracts: 0,
    completed_contracts: 0,
    total_value: 0,
    paid_amount: 0,
    completion_rate: 0
  });
  const [, setSelectedContract] = useState<Contract | null>(null);
  const [, setShowContractModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  // Fetch contracts from API
  const fetchContracts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const filters: ContractFilters = {
        status: selectedFilter === 'all' ? undefined : selectedFilter,
        search: searchQuery || undefined,
        page: pagination.page,
        limit: pagination.limit
      };
      
      const response = await contractsService.getProfessionalContracts(filters);
      setContracts(response.results || []);
      setPagination(prev => ({
        ...prev,
        total: response.count || 0
      }));
    } catch (err) {
      setError('Failed to load contracts. Please try again.');
      console.error('Error fetching contracts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch contract statistics
  const fetchStats = async () => {
    try {
      const response = await contractsService.getContractStats();
      setStats(response);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (user) {
      fetchContracts();
      fetchStats();
    }
  }, [user]);

  // Debounced search and filter
  useEffect(() => {
    if (user) {
      const timeoutId = setTimeout(() => {
        fetchContracts();
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, selectedFilter, pagination.page, user]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'signed': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'terminated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Format contract data for display
  const formatContractForDisplay = (contract: Contract) => {
    return {
      ...contract,
      contractValue: `$${contract.total_amount?.toLocaleString() || '0'}`,
      paidAmount: `$${contract.paid_amount?.toLocaleString() || '0'}`,
      remainingAmount: `$${((contract.total_amount || 0) - (contract.paid_amount || 0)).toLocaleString()}`,
      startDate: contract.start_date ? new Date(contract.start_date).toLocaleDateString() : 'Not set',
      endDate: contract.end_date ? new Date(contract.end_date).toLocaleDateString() : 'Not set',
      signedDate: contract.created_at ? new Date(contract.created_at).toLocaleDateString() : null,
      location: contract.location || 'Location not specified',
      paymentTerms: contract.payment_terms || 'Standard terms',
      warranty: contract.warranty_terms || 'Standard warranty'
    };
  };

  const formattedContracts = contracts.map(formatContractForDisplay);

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
                <p className="text-2xl font-bold text-dark-900">${stats.paid_amount?.toLocaleString() || '0'}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-dark-900">${stats.total_value?.toLocaleString() || '0'}</p>
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
                <p className="text-2xl font-bold text-dark-900">{stats.active_contracts || 0}</p>
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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            <span className="ml-2 text-gray-600">Loading contracts...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => fetchContracts()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Contracts List */}
        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6">
            {formattedContracts.map((contract) => (
              <div key={contract.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-dark-900">{contract.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                        {contract.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>Client #{contract.client}</span>
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
                    <p className="text-gray-700 mb-4">{contract.description || 'No description available'}</p>
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
                      {contract.paidAmount} / {contract.contractValue}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${contract.completion_percentage || 0}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{contract.completion_percentage || 0}% Complete</span>
                    <span>{contract.remainingAmount} Remaining</span>
                  </div>
                </div>

                {/* Contract Details */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Contract Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-dark-900">Payment Type</p>
                        <p className="text-xs text-gray-600 capitalize">{contract.payment_type || 'Fixed'}</p>
                      </div>
                    </div>
                    {contract.hourly_rate && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-dark-900">Hourly Rate</p>
                          <p className="text-xs text-gray-600">${contract.hourly_rate}/hr</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-dark-900">Payment Terms</p>
                        <p className="text-xs text-gray-600">{contract.paymentTerms}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`http://localhost:3000/client/contracts/10`}
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2 text-sm"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
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
        )}

        {formattedContracts.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contracts found</h3>
            <p className="text-gray-600">Start by creating your first contract or adjust your filters.</p>
          </div>
        )}
      </div>


    </div>
  );
}