'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  CreditCard, 
  Receipt, 
  Download, 
  DollarSign, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  XCircle,
  User,
  Search,
  Plus,
  TrendingUp,
  Wallet
} from 'lucide-react';

export default function PaymentsPage() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const payments = [
    {
      id: 1,
      paymentId: 'PAY-2024-001',
      projectTitle: 'Kitchen Renovation',
      professional: {
        name: 'Sarah Mitchell',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      amount: '$2,125',
      status: 'Completed',
      paymentDate: '2024-01-20',
      dueDate: '2024-01-20',
      paymentMethod: 'Credit Card',
      cardLast4: '4567',
      milestone: 'Electrical & Plumbing',
      category: 'Kitchen Remodeling',
      transactionId: 'TXN-2024-001-KIT',
      invoice: 'INV-2024-001',
      taxAmount: '$127.50',
      totalAmount: '$2,252.50',
      description: 'Payment for electrical and plumbing work completion'
    },
    {
      id: 2,
      paymentId: 'PAY-2024-002',
      projectTitle: 'Bathroom Plumbing Fix',
      professional: {
        name: 'David Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      amount: '$1,200',
      status: 'Completed',
      paymentDate: '2024-01-18',
      dueDate: '2024-01-18',
      paymentMethod: 'Bank Transfer',
      cardLast4: null,
      milestone: 'Plumbing Fix Complete',
      category: 'Plumbing',
      transactionId: 'TXN-2024-002-PLU',
      invoice: 'INV-2024-002',
      taxAmount: '$72.00',
      totalAmount: '$1,272.00',
      description: 'Final payment for bathroom plumbing repair'
    },
    {
      id: 3,
      paymentId: 'PAY-2024-003',
      projectTitle: 'Kitchen Renovation',
      professional: {
        name: 'Sarah Mitchell',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      amount: '$2,500',
      status: 'Pending',
      paymentDate: null,
      dueDate: '2024-01-28',
      paymentMethod: 'Credit Card',
      cardLast4: '4567',
      milestone: 'Cabinet Installation',
      category: 'Kitchen Remodeling',
      transactionId: null,
      invoice: 'INV-2024-003',
      taxAmount: '$150.00',
      totalAmount: '$2,650.00',
      description: 'Payment for cabinet installation milestone'
    },
    {
      id: 4,
      paymentId: 'PAY-2024-004',
      projectTitle: 'Electrical Panel Upgrade',
      professional: {
        name: 'Michael Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      amount: '$2,800',
      status: 'Completed',
      paymentDate: '2024-01-10',
      dueDate: '2024-01-10',
      paymentMethod: 'Check',
      cardLast4: null,
      milestone: 'Panel Installation Complete',
      category: 'Electrical Work',
      transactionId: 'TXN-2024-004-ELE',
      invoice: 'INV-2024-004',
      taxAmount: '$168.00',
      totalAmount: '$2,968.00',
      description: 'Payment for electrical panel upgrade'
    },
    {
      id: 5,
      paymentId: 'PAY-2024-005',
      projectTitle: 'Garden Landscaping',
      professional: {
        name: 'Maria Santos',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      amount: '$800',
      status: 'Overdue',
      paymentDate: null,
      dueDate: '2024-01-25',
      paymentMethod: 'Credit Card',
      cardLast4: '4567',
      milestone: 'Design Planning',
      category: 'Landscaping',
      transactionId: null,
      invoice: 'INV-2024-005',
      taxAmount: '$48.00',
      totalAmount: '$848.00',
      description: 'Payment for landscaping design planning'
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Payments', count: payments.length },
    { id: 'completed', label: 'Completed', count: payments.filter(p => p.status === 'Completed').length },
    { id: 'pending', label: 'Pending', count: payments.filter(p => p.status === 'Pending').length },
    { id: 'overdue', label: 'Overdue', count: payments.filter(p => p.status === 'Overdue').length }
  ];

  const stats = [
    {
      label: 'Total Paid',
      value: `$${payments.filter(p => p.status === 'Completed').reduce((sum, p) => sum + parseFloat(p.totalAmount.replace('$', '').replace(',', '')), 0).toLocaleString()}`,
      change: '+$3,200 this month',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Pending Payments',
      value: `$${payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + parseFloat(p.totalAmount.replace('$', '').replace(',', '')), 0).toLocaleString()}`,
      change: 'Due this month',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      label: 'Overdue Amount',
      value: `$${payments.filter(p => p.status === 'Overdue').reduce((sum, p) => sum + parseFloat(p.totalAmount.replace('$', '').replace(',', '')), 0).toLocaleString()}`,
      change: 'Immediate action needed',
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      label: 'Total Transactions',
      value: payments.length.toString(),
      change: '+5 this month',
      icon: Receipt,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'Credit Card',
      name: 'Visa ending in 4567',
      icon: CreditCard,
      isDefault: true,
      expiryDate: '12/26'
    },
    {
      id: 2,
      type: 'Bank Account',
      name: 'Bank of America ****1234',
      icon: Wallet,
      isDefault: false,
      expiryDate: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Overdue':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'Failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Receipt className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.professional.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.paymentId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = selectedTab === 'all' || payment.status.toLowerCase() === selectedTab;
    const matchesFilter = selectedFilter === 'all' || payment.category.toLowerCase().includes(selectedFilter.toLowerCase());
    
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
                Payments & Billing
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your payments, invoices, and billing information
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/client/payments/methods"
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Payment Methods
              </Link>
              <Link
                href="/client/payments/new"
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Make Payment</span>
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
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
                    placeholder="Search payments..."
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
                    {filteredPayments.length} payments found
                  </span>
                </div>
              </div>
            </div>

            {/* Payments List */}
            <div className="space-y-4">
              {filteredPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl ${payment.status === 'Completed' ? 'bg-green-50' : payment.status === 'Pending' ? 'bg-yellow-50' : 'bg-red-50'}`}>
                        {getStatusIcon(payment.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg text-dark-900">
                            {payment.projectTitle}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                            {payment.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{payment.milestone}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{payment.professional.name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Due: {payment.dueDate}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Receipt className="h-4 w-4" />
                            <span>{payment.paymentId}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-dark-900 mb-1">
                        {payment.totalAmount}
                      </div>
                      <div className="text-sm text-gray-600">
                        {payment.paymentMethod}
                        {payment.cardLast4 && ` ****${payment.cardLast4}`}
                      </div>
                      {payment.paymentDate && (
                        <div className="text-xs text-gray-500 mt-1">
                          Paid on {payment.paymentDate}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-dark-900 mb-2">Payment Details</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-medium">{payment.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax:</span>
                          <span className="font-medium">{payment.taxAmount}</span>
                        </div>
                        <div className="flex justify-between border-t pt-1">
                          <span className="text-gray-600">Total:</span>
                          <span className="font-semibold">{payment.totalAmount}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-dark-900 mb-2">Transaction Info</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Invoice:</span>
                          <span className="font-medium">{payment.invoice}</span>
                        </div>
                        {payment.transactionId && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Transaction ID:</span>
                            <span className="font-medium">{payment.transactionId}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span className="font-medium">{payment.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-600 mb-4">{payment.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/client/payments/${payment.id}`}
                          className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200"
                        >
                          View Details
                        </Link>
                        <button className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200">
                          <Receipt className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* A-List Balance */}
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl shadow-upwork border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-lg text-dark-900">
                  A-List Balance
                </h3>
                <div className="flex items-center space-x-2">
                  <Wallet className="h-5 w-5 text-primary-600" />
                  <span className="text-primary-600 text-sm font-medium">Active</span>
                </div>
              </div>
              <div className="text-center mb-4">
                <p className="text-4xl font-bold text-dark-900 mb-2">$1,245.60</p>
                <p className="text-sm text-gray-600">Available Balance</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pending Credits:</span>
                  <span className="text-sm font-medium text-yellow-600">$320.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This Month Usage:</span>
                  <span className="text-sm font-medium text-green-600">$980.40</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200">
                      Add Funds
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200">
                      View History
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-lg text-dark-900">
                  Payment Methods
                </h3>
                <Link
                  href="/client/payments/methods"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Manage
                </Link>
              </div>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <method.icon className="h-5 w-5 text-gray-600" />
                    <div className="flex-1">
                      <p className="font-medium text-dark-900">{method.name}</p>
                      <p className="text-sm text-gray-600">{method.type}</p>
                    </div>
                    {method.isDefault && (
                      <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                        Default
                      </span>
                    )}
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
                  href="/client/payments/new"
                  className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-200"
                >
                  <Plus className="h-5 w-5 text-primary-600" />
                  <span className="text-primary-700 font-medium">Make Payment</span>
                </Link>
                <Link
                  href="/client/payments/history"
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <Receipt className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Payment History</span>
                </Link>
                <Link
                  href="/client/payments/reports"
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <Download className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Download Reports</span>
                </Link>
              </div>
            </div>

            {/* Upcoming Payments */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <h3 className="font-heading font-semibold text-lg text-dark-900 mb-4">
                Upcoming Payments
              </h3>
              <div className="space-y-4">
                {payments.filter(p => p.status === 'Pending' || p.status === 'Overdue').map((payment) => (
                  <div key={payment.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-lg ${payment.status === 'Overdue' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                      {getStatusIcon(payment.status)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-dark-900 text-sm">{payment.projectTitle}</p>
                      <p className="text-xs text-gray-600">{payment.milestone}</p>
                      <p className="text-xs text-gray-500">Due: {payment.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-dark-900 text-sm">{payment.totalAmount}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* No Payments Found */}
        {filteredPayments.length === 0 && (
          <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-12 text-center">
            <Receipt className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-xl text-dark-900 mb-2">
              No payments found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search query to find payments.
            </p>
            <Link
              href="/client/payments/new"
              className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-200"
            >
              Make Your First Payment
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 