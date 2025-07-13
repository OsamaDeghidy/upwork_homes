'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Download, 
  Filter, 
  Eye, 
  CreditCard, 
  Wallet, 
  PiggyBank,
  BarChart3,
  LineChart,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  FileText,
  Settings
} from 'lucide-react';

export default function EarningsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2024');

  // بيانات الإحصائيات
  const earningsStats = [
    {
      label: 'Total Earnings',
      value: '$24,750',
      change: '+15.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      period: 'Last 30 days'
    },
    {
      label: 'Available Balance',
      value: '$4,125',
      change: '+$850',
      trend: 'up',
      icon: Wallet,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      period: 'Ready to withdraw'
    },
    {
      label: 'In Progress',
      value: '$6,200',
      change: '+$1,200',
      trend: 'up',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      period: 'Pending completion'
    },
    {
      label: 'Average per Job',
      value: '$2,058',
      change: '+8.5%',
      trend: 'up',
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      period: 'Last 12 jobs'
    }
  ];

  // بيانات الأرباح الشهرية
  const monthlyEarnings = [
    { month: 'Jan', earnings: 3200, jobs: 2 },
    { month: 'Feb', earnings: 4100, jobs: 3 },
    { month: 'Mar', earnings: 2800, jobs: 2 },
    { month: 'Apr', earnings: 5200, jobs: 4 },
    { month: 'May', earnings: 4800, jobs: 3 },
    { month: 'Jun', earnings: 3900, jobs: 2 },
    { month: 'Jul', earnings: 6100, jobs: 4 },
    { month: 'Aug', earnings: 5500, jobs: 3 },
    { month: 'Sep', earnings: 4200, jobs: 2 },
    { month: 'Oct', earnings: 7200, jobs: 5 },
    { month: 'Nov', earnings: 6800, jobs: 4 },
    { month: 'Dec', earnings: 5300, jobs: 3 }
  ];

  // تاريخ الدفعات
  const paymentHistory = [
    {
      id: 1,
      project: 'Kitchen Renovation',
      client: 'John Smith',
      amount: '$2,125',
      date: '2024-01-15',
      status: 'Completed',
      type: 'Milestone Payment',
      method: 'Bank Transfer',
      transactionId: 'TXN-2024-001'
    },
    {
      id: 2,
      project: 'Bathroom Plumbing Fix',
      client: 'Sarah Johnson',
      amount: '$480',
      date: '2024-01-12',
      status: 'Processing',
      type: 'Hourly Payment',
      method: 'PayPal',
      transactionId: 'TXN-2024-002'
    },
    {
      id: 3,
      project: 'Electrical Panel Upgrade',
      client: 'Mike Davis',
      amount: '$1,400',
      date: '2024-01-10',
      status: 'Completed',
      type: 'Final Payment',
      method: 'Bank Transfer',
      transactionId: 'TXN-2024-003'
    },
    {
      id: 4,
      project: 'Deck Construction',
      client: 'Robert Wilson',
      amount: '$1,800',
      date: '2024-01-08',
      status: 'Completed',
      type: 'Final Payment',
      method: 'Check',
      transactionId: 'TXN-2024-004'
    },
    {
      id: 5,
      project: 'Roof Repair',
      client: 'Emma Brown',
      amount: '$950',
      date: '2024-01-05',
      status: 'Pending',
      type: 'Initial Payment',
      method: 'Credit Card',
      transactionId: 'TXN-2024-005'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending':
        return 'bg-orange-100 text-orange-800';
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
      case 'Processing':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Pending':
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case 'Failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const maxEarnings = Math.max(...monthlyEarnings.map(item => item.earnings));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-heading font-bold text-3xl text-dark-900">
                Earnings Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Track your income and payment history
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </button>
              <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2">
                <Wallet className="h-5 w-5" />
                <span>Withdraw Funds</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {earningsStats.map((stat, index) => (
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
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{stat.period}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Monthly Earnings Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-semibold text-xl text-dark-900">
                  Monthly Earnings
                </h2>
                <div className="flex items-center space-x-2">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                  </select>
                </div>
              </div>

              {/* Simple Bar Chart */}
              <div className="space-y-4">
                {monthlyEarnings.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium text-gray-600">
                      {item.month}
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-primary-600 h-8 rounded-full flex items-center justify-end pr-3"
                        style={{ width: `${(item.earnings / maxEarnings) * 100}%` }}
                      >
                        <span className="text-white text-sm font-medium">
                          ${item.earnings.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="w-16 text-sm text-gray-600">
                      {item.jobs} jobs
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-dark-900">
                      ${monthlyEarnings.reduce((sum, item) => sum + item.earnings, 0).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Total Earnings</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-dark-900">
                      ${Math.round(monthlyEarnings.reduce((sum, item) => sum + item.earnings, 0) / monthlyEarnings.length).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Average Monthly</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-dark-900">
                      {monthlyEarnings.reduce((sum, item) => sum + item.jobs, 0)}
                    </p>
                    <p className="text-sm text-gray-600">Total Jobs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Account Balance */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <h3 className="font-heading font-semibold text-lg text-dark-900 mb-4">
                Account Balance
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Wallet className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-dark-900">Available</p>
                      <p className="text-sm text-gray-600">Ready to withdraw</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-green-600">$4,125</p>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Clock className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-dark-900">Pending</p>
                      <p className="text-sm text-gray-600">In progress</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-yellow-600">$6,200</p>
                </div>

                <button className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-200">
                  Withdraw Available Balance
                </button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-lg text-dark-900">
                  Payment Methods
                </h3>
                <Link
                  href="/settings/payments"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Manage
                </Link>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <CreditCard className="h-5 w-5 text-gray-600" />
                  <div className="flex-1">
                    <p className="font-medium text-dark-900">Bank Transfer</p>
                    <p className="text-sm text-gray-600">**** 1234</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <Wallet className="h-5 w-5 text-gray-600" />
                  <div className="flex-1">
                    <p className="font-medium text-dark-900">PayPal</p>
                    <p className="text-sm text-gray-600">sarah@example.com</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="mt-8 bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-semibold text-xl text-dark-900">
              Payment History
            </h2>
            <div className="flex items-center space-x-4">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Payments</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Project</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Client</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Method</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paymentHistory.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-dark-900">{payment.project}</p>
                        <p className="text-sm text-gray-600">{payment.transactionId}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{payment.client}</td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-dark-900">{payment.amount}</span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{payment.date}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(payment.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{payment.type}</td>
                    <td className="py-4 px-4 text-gray-600">{payment.method}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                          Receipt
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 