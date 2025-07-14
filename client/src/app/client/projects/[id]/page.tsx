'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  Star, 
  Clock, 
  CheckCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  Download,
  Upload,
  FileText,
  Shield,
  CreditCard,
  Bell,
  X,
  AlertTriangle,
  ArrowRight,
  Flag,
  Info
} from 'lucide-react';

interface Milestone {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  completedDate?: string | null;
  amount: string;
  paid: boolean;
  paymentDate?: string;
  paymentMethod?: string;
  paymentRequested?: boolean;
  requestDate?: string;
  progress?: number;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  
  const [activeTab, setActiveTab] = useState('overview');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentNote, setPaymentNote] = useState('');

  // بيانات المشروع (يجب جلبها من API بناءً على projectId)
  const project = {
    id: projectId,
    title: 'Kitchen Renovation',
    description: 'Complete kitchen remodel with new cabinets, countertops, and appliances. We want to create a modern, functional space that maximizes storage and includes a breakfast bar.',
    professional: {
      name: 'Sarah Mitchell',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.9,
      reviews: 127,
      completedProjects: 45,
      responseTime: '2 hours',
      verified: true,
      badges: ['Top Rated', 'Licensed', 'Insured'],
      phone: '+1 (555) 123-4567',
      email: 'sarah.mitchell@email.com'
    },
    status: 'In Progress',
    progress: 75,
    budget: '$8,500',
    spent: '$6,375',
    remaining: '$2,125',
    deadline: '2024-02-15',
    startDate: '2024-01-01',
    location: 'Los Angeles, CA',
    category: 'Kitchen Remodeling',
    priority: 'High',
    lastUpdate: '2 hours ago',
    contractType: 'Fixed Price',
    paymentTerms: 'Milestone-based',
    warranty: '2 years',
    escrowAmount: '$1,700',
    paymentRequests: [
      {
        id: 1,
        milestone: 'Electrical & Plumbing',
        amount: '$1,800',
        requestDate: '2024-01-18',
        status: 'pending',
        dueDate: '2024-01-25',
        note: 'Electrical and plumbing work completed as scheduled. Ready for next phase.'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1556909045-f18c06d3e1d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ],
    documents: [
      { name: 'Contract Agreement', type: 'PDF', size: '2.4 MB', url: '#' },
      { name: 'Material List', type: 'Excel', size: '1.2 MB', url: '#' },
      { name: 'Design Plans', type: 'PDF', size: '5.8 MB', url: '#' },
      { name: 'Permit Documents', type: 'PDF', size: '1.8 MB', url: '#' },
      { name: 'Progress Photos', type: 'ZIP', size: '12.4 MB', url: '#' }
    ]
  };

  const milestones = [
    {
      id: 1,
      title: 'Project Planning & Design',
      description: 'Initial consultation, measurements, and design approval',
      status: 'Completed',
      dueDate: '2024-01-05',
      completedDate: '2024-01-04',
      amount: '$1,700',
      paid: true,
      paymentDate: '2024-01-05',
      paymentMethod: 'Credit Card'
    },
    {
      id: 2,
      title: 'Demolition & Preparation',
      description: 'Remove old cabinets, flooring, and prepare space',
      status: 'Completed',
      dueDate: '2024-01-12',
      completedDate: '2024-01-11',
      amount: '$1,200',
      paid: true,
      paymentDate: '2024-01-12',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 3,
      title: 'Electrical & Plumbing',
      description: 'Update electrical outlets and plumbing connections',
      status: 'Completed',
      dueDate: '2024-01-20',
      completedDate: '2024-01-19',
      amount: '$1,800',
      paid: false,
      paymentRequested: true,
      requestDate: '2024-01-20'
    },
    {
      id: 4,
      title: 'Cabinet Installation',
      description: 'Install new cabinets and hardware',
      status: 'In Progress',
      dueDate: '2024-01-28',
      completedDate: null,
      amount: '$2,500',
      paid: false,
      progress: 60
    },
    {
      id: 5,
      title: 'Countertops & Backsplash',
      description: 'Install quartz countertops and tile backsplash',
      status: 'Pending',
      dueDate: '2024-02-05',
      completedDate: null,
      amount: '$1,800',
      paid: false
    },
    {
      id: 6,
      title: 'Final Touches & Cleanup',
      description: 'Final installation, testing, and cleanup',
      status: 'Pending',
      dueDate: '2024-02-15',
      completedDate: null,
      amount: '$500',
      paid: false
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Sarah Mitchell',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      message: 'The cabinet installation is going well. We should be finished by tomorrow evening.',
      timestamp: '2024-01-20 14:30',
      type: 'text'
    },
    {
      id: 2,
      sender: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      message: 'Great! The kitchen is looking amazing. When can we discuss the backsplash options?',
      timestamp: '2024-01-20 15:45',
      type: 'text'
    },
    {
      id: 3,
      sender: 'Sarah Mitchell',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      message: 'I\'ll bring the tile samples tomorrow morning. We can review them together.',
      timestamp: '2024-01-20 16:00',
      type: 'text'
    },
    {
      id: 4,
      sender: 'System',
      avatar: '',
      message: 'Payment request submitted for "Electrical & Plumbing" milestone - $1,800',
      timestamp: '2024-01-20 17:30',
      type: 'payment'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'milestones', label: 'Milestones', icon: CheckCircle },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'documents', label: 'Documents', icon: FileText }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 70) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  const handlePayment = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    setPaymentAmount(milestone.amount.replace('$', ''));
    setShowPaymentModal(true);
  };

  const submitPayment = () => {
    // Here you would process the payment
    console.log('Processing payment:', {
      milestone: selectedMilestone,
      amount: paymentAmount,
      note: paymentNote
    });
    setShowPaymentModal(false);
    setSelectedMilestone(null);
    setPaymentAmount('');
    setPaymentNote('');
  };

  const totalPaid = milestones.filter(m => m.paid).reduce((sum, m) => sum + parseFloat(m.amount.replace('$', '').replace(',', '')), 0);
  const totalPending = milestones.filter(m => !m.paid).reduce((sum, m) => sum + parseFloat(m.amount.replace('$', '').replace(',', '')), 0);
  const pendingRequests = milestones.filter(m => m.paymentRequested && !m.paid);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/client/projects" className="text-gray-600 hover:text-primary-600">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-dark-900">{project.title}</h1>
                <p className="text-sm text-gray-600">{project.category}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {pendingRequests.length > 0 && (
                <div className="flex items-center space-x-2 bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm">
                  <Bell className="h-4 w-4" />
                  <span>{pendingRequests.length} Payment Request{pendingRequests.length > 1 ? 's' : ''}</span>
                </div>
              )}
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Payment Requests Alert */}
            {pendingRequests.length > 0 && (
              <div className="mb-6 bg-orange-50 border border-orange-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-orange-800">Payment Requests Pending</h3>
                    <p className="text-sm text-orange-700 mt-1">
                      You have {pendingRequests.length} payment request{pendingRequests.length > 1 ? 's' : ''} waiting for approval.
                    </p>
                    <div className="mt-3 space-y-2">
                      {pendingRequests.map((milestone) => (
                        <div key={milestone.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                          <div>
                            <p className="font-medium text-gray-900">{milestone.title}</p>
                            <p className="text-sm text-gray-600">Requested on {milestone.requestDate}</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="font-semibold text-gray-900">{milestone.amount}</span>
                            <button
                              onClick={() => handlePayment(milestone)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
                            >
                              Pay Now
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Project Progress */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-dark-900">Project Progress</h2>
                <span className="text-2xl font-bold text-dark-900">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(project.progress)}`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-dark-900">${totalPaid.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Paid</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">${totalPending.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{milestones.filter(m => m.status === 'Completed').length}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-600">{milestones.filter(m => m.status === 'Pending').length}</p>
                  <p className="text-sm text-gray-600">Remaining</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                      {tab.id === 'payments' && pendingRequests.length > 0 && (
                        <span className="bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {pendingRequests.length}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg text-dark-900 mb-3">Project Description</h3>
                      <p className="text-gray-600 leading-relaxed">{project.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-dark-900 mb-2">Project Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Budget:</span>
                            <span className="font-medium text-dark-900">{project.budget}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Start Date:</span>
                            <span className="font-medium text-dark-900">{project.startDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Deadline:</span>
                            <span className="font-medium text-dark-900">{project.deadline}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Priority:</span>
                            <span className="font-medium text-red-600">{project.priority}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Contract Type:</span>
                            <span className="font-medium text-dark-900">{project.contractType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Payment Terms:</span>
                            <span className="font-medium text-dark-900">{project.paymentTerms}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-dark-900 mb-2">Financial Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Budget:</span>
                            <span className="font-medium text-dark-900">{project.budget}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Amount Paid:</span>
                            <span className="font-medium text-green-600">${totalPaid.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Pending Payments:</span>
                            <span className="font-medium text-orange-600">${totalPending.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Escrow Amount:</span>
                            <span className="font-medium text-blue-600">{project.escrowAmount}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-gray-600">Payment Progress:</span>
                            <span className="font-medium text-dark-900">
                              {Math.round((totalPaid / (totalPaid + totalPending)) * 100)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project Images */}
                    <div>
                      <h4 className="font-medium text-dark-900 mb-3">Project Gallery</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {project.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Project ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Milestones Tab */}
                {activeTab === 'milestones' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg text-dark-900">Project Milestones</h3>
                      <div className="text-sm text-gray-600">
                        {milestones.filter(m => m.status === 'Completed').length} of {milestones.length} completed
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {milestones.map((milestone) => (
                        <div key={milestone.id} className="border border-gray-200 rounded-xl p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4 flex-1">
                              <div className="flex-shrink-0">
                                {milestone.status === 'Completed' ? (
                                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                  </div>
                                ) : milestone.status === 'In Progress' ? (
                                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Clock className="h-5 w-5 text-blue-600" />
                                  </div>
                                ) : (
                                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                    <Clock className="h-5 w-5 text-gray-600" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="font-medium text-dark-900">{milestone.title}</h4>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMilestoneStatusColor(milestone.status)}`}>
                                    {milestone.status}
                                  </span>
                                  {milestone.paymentRequested && !milestone.paid && (
                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                      Payment Requested
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-600 text-sm mb-2">{milestone.description}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span>Due: {milestone.dueDate}</span>
                                  {milestone.completedDate && (
                                    <span>Completed: {milestone.completedDate}</span>
                                  )}
                                  {milestone.progress && milestone.status === 'In Progress' && (
                                    <span>Progress: {milestone.progress}%</span>
                                  )}
                                </div>
                                {milestone.progress && milestone.status === 'In Progress' && (
                                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                      style={{ width: `${milestone.progress}%` }}
                                    ></div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                <div className="font-semibold text-dark-900">{milestone.amount}</div>
                                {milestone.paid ? (
                                  <div className="text-xs text-green-600 flex items-center space-x-1">
                                    <CheckCircle className="h-3 w-3" />
                                    <span>Paid on {milestone.paymentDate}</span>
                                  </div>
                                ) : milestone.paymentRequested ? (
                                  <button
                                    onClick={() => handlePayment(milestone)}
                                    className="text-xs bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition-colors"
                                  >
                                    Pay Now
                                  </button>
                                ) : (
                                  <div className="text-xs text-gray-500">Pending completion</div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payments Tab */}
                {activeTab === 'payments' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg text-dark-900">Payment Management</h3>
                      <Link
                        href="/client/payments"
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
                      >
                        <span>View All Payments</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>

                    {/* Payment Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-green-100 p-2 rounded-full">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-green-700">Total Paid</p>
                            <p className="text-xl font-bold text-green-900">${totalPaid.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-orange-100 p-2 rounded-full">
                            <Clock className="h-5 w-5 text-orange-600" />
                          </div>
                          <div>
                            <p className="text-sm text-orange-700">Pending</p>
                            <p className="text-xl font-bold text-orange-900">${totalPending.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Shield className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-blue-700">Escrow</p>
                            <p className="text-xl font-bold text-blue-900">{project.escrowAmount}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment History */}
                    <div>
                      <h4 className="font-medium text-dark-900 mb-4">Payment History</h4>
                      <div className="space-y-3">
                        {milestones.filter(m => m.paid || m.paymentRequested).map((milestone) => (
                          <div key={milestone.id} className="border border-gray-200 rounded-xl p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className={`p-2 rounded-full ${milestone.paid ? 'bg-green-100' : 'bg-orange-100'}`}>
                                  {milestone.paid ? (
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                  ) : (
                                    <Clock className="h-5 w-5 text-orange-600" />
                                  )}
                                </div>
                                <div>
                                  <h5 className="font-medium text-dark-900">{milestone.title}</h5>
                                  <p className="text-sm text-gray-600">
                                    {milestone.paid ? (
                                      `Paid on ${milestone.paymentDate} via ${milestone.paymentMethod}`
                                    ) : (
                                      `Payment requested on ${milestone.requestDate}`
                                    )}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                <span className="font-semibold text-dark-900">{milestone.amount}</span>
                                {!milestone.paid && (
                                  <button
                                    onClick={() => handlePayment(milestone)}
                                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm"
                                  >
                                    Pay Now
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Messages Tab */}
                {activeTab === 'messages' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg text-dark-900">Project Messages</h3>
                      <Link
                        href={`/messages?project=${project.id}`}
                        className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 text-sm"
                      >
                        View All Messages
                      </Link>
                    </div>
                    
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div key={message.id} className={`flex items-start space-x-3 ${message.type === 'payment' ? 'bg-blue-50 p-3 rounded-lg' : ''}`}>
                          {message.type !== 'payment' && (
                            <img
                              src={message.avatar}
                              alt={message.sender}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          )}
                          {message.type === 'payment' && (
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <CreditCard className="h-5 w-5 text-blue-600" />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-dark-900">{message.sender}</span>
                              <span className="text-xs text-gray-500">{message.timestamp}</span>
                              {message.type === 'payment' && (
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                  Payment Request
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 mt-1">{message.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Documents Tab */}
                {activeTab === 'documents' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg text-dark-900">Project Documents</h3>
                      <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2 text-sm">
                        <Upload className="h-4 w-4" />
                        <span>Upload Document</span>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {project.documents.map((doc, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-center space-x-3 mb-3">
                            <FileText className="h-8 w-8 text-primary-600" />
                            <div className="flex-1">
                              <h4 className="font-medium text-dark-900 text-sm">{doc.name}</h4>
                              <p className="text-xs text-gray-600">{doc.type} • {doc.size}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="flex-1 bg-primary-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200">
                              View
                            </button>
                            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                              <Download className="h-4 w-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Professional Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-lg text-dark-900 mb-4">Professional</h3>
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src={project.professional.avatar}
                  alt={project.professional.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-dark-900">{project.professional.name}</h4>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{project.professional.rating} ({project.professional.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Projects:</span>
                  <span className="font-medium text-dark-900">{project.professional.completedProjects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Response:</span>
                  <span className="font-medium text-dark-900">{project.professional.responseTime}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.professional.badges.map((badge, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {badge}
                  </span>
                ))}
              </div>
              
              <div className="space-y-2">
                <button className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Send Message</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-1">
                    <Phone className="h-4 w-4" />
                    <span>Call</span>
                  </button>
                  <button className="bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-lg text-dark-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href={`/client/contracts/${project.id}`}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <FileText className="h-4 w-4" />
                  <span>View Contract</span>
                </Link>
                <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download Reports</span>
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Flag className="h-4 w-4" />
                  <span>Report Issue</span>
                </button>
              </div>
            </div>

            {/* Project Timeline */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-lg text-dark-900 mb-4">Timeline</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Started: {project.startDate}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Flag className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Deadline: {project.deadline}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Last Update: {project.lastUpdate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedMilestone && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-dark-900">Process Payment</h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-dark-900">{selectedMilestone.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{selectedMilestone.description}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option>Credit Card (**** 1234)</option>
                  <option>Bank Transfer</option>
                  <option>PayPal</option>
                  <option>Escrow Release</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Note (Optional)
                </label>
                <textarea
                  value={paymentNote}
                  onChange={(e) => setPaymentNote(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Add a note for this payment..."
                />
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium">Payment Protection</p>
                    <p>Your payment is protected by our escrow service until the milestone is completed to your satisfaction.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={submitPayment}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Pay ${paymentAmount}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 