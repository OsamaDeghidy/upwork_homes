'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft,
  FileText,
  Download,
  Eye,
  Edit2,
  CheckCircle,
  Clock,
  CreditCard,
  Printer,
  Share2,
  Plus,
  Star,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  Flag,
  Target,
  File,
  Check,
  Timer,
  Receipt
} from 'lucide-react';

export default function ContractDetailPage() {
  const params = useParams();
  const contractId = params.id as string;

  const [activeTab, setActiveTab] = useState('overview');

  // Sample contract data (in real app, this would come from API based on contractId)
  const contract = {
    id: contractId,
    contractNumber: 'CON-2024-001',
    title: 'Kitchen Renovation Contract',
    professional: {
      name: 'Sarah Mitchell',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.9,
      reviews: 127,
      verified: true,
      company: 'Mitchell Design & Build',
      license: 'CA-123456',
      insurance: 'GL-789012',
      phone: '+1 (555) 123-4567',
      email: 'sarah.mitchell@email.com',
      address: '123 Design Ave, Los Angeles, CA 90210'
    },
    client: {
      name: 'John & Jane Smith',
      email: 'smith.family@email.com',
      phone: '+1 (555) 987-6543',
      address: '456 Oak Street, Los Angeles, CA 90211'
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
    description: 'Complete kitchen renovation including demolition, electrical and plumbing updates, cabinet installation, countertop installation, and final finishing work.',
    termsAndConditions: [
      'All work to be completed according to California building codes',
      'Materials and workmanship guaranteed for 2 years',
      'Client to provide clear access to work area',
      'Professional to clean up daily and dispose of debris',
      'Changes to scope require written approval and may affect timeline and cost',
      'Final payment due upon client satisfaction and project completion'
    ],
    milestones: [
      {
        id: 1,
        name: 'Design & Planning',
        description: 'Initial consultation, measurements, design development, and permit acquisition',
        amount: '$1,700',
        status: 'Paid',
        startDate: '2024-01-01',
        completedDate: '2024-01-05',
        dueDate: '2024-01-05',
        paymentDate: '2024-01-05'
      },
      {
        id: 2,
        name: 'Demolition',
        description: 'Remove existing cabinets, countertops, and prepare space',
        amount: '$1,200',
        status: 'Paid',
        startDate: '2024-01-06',
        completedDate: '2024-01-08',
        dueDate: '2024-01-10',
        paymentDate: '2024-01-08'
      },
      {
        id: 3,
        name: 'Electrical & Plumbing',
        description: 'Update electrical outlets, install new lighting, and plumbing connections',
        amount: '$1,800',
        status: 'In Progress',
        startDate: '2024-01-09',
        completedDate: null,
        dueDate: '2024-01-20',
        paymentDate: null,
        progress: 75
      },
      {
        id: 4,
        name: 'Cabinet Installation',
        description: 'Install new cabinets and hardware',
        amount: '$2,500',
        status: 'Pending',
        startDate: null,
        completedDate: null,
        dueDate: '2024-01-28',
        paymentDate: null
      },
      {
        id: 5,
        name: 'Countertops & Backsplash',
        description: 'Install quartz countertops and tile backsplash',
        amount: '$1,800',
        status: 'Pending',
        startDate: null,
        completedDate: null,
        dueDate: '2024-02-05',
        paymentDate: null
      },
      {
        id: 6,
        name: 'Final Touches',
        description: 'Install appliances, final cleanup, and walkthrough',
        amount: '$500',
        status: 'Pending',
        startDate: null,
        completedDate: null,
        dueDate: '2024-02-15',
        paymentDate: null
      }
    ],
    documents: [
      { 
        id: 1,
        name: 'Main Contract Agreement', 
        type: 'PDF', 
        size: '2.4 MB', 
        signed: true,
        signedDate: '2023-12-28',
        signedBy: ['John Smith', 'Jane Smith', 'Sarah Mitchell'],
        url: '#'
      },
      { 
        id: 2,
        name: 'Material Specifications', 
        type: 'PDF', 
        size: '1.8 MB', 
        signed: false,
        url: '#'
      },
      { 
        id: 3,
        name: 'Payment Schedule', 
        type: 'PDF', 
        size: '0.9 MB', 
        signed: true,
        signedDate: '2023-12-28',
        signedBy: ['John Smith', 'Sarah Mitchell'],
        url: '#'
      },
      { 
        id: 4,
        name: 'Building Permits', 
        type: 'PDF', 
        size: '1.2 MB', 
        signed: false,
        url: '#'
      },
      { 
        id: 5,
        name: 'Insurance Certificate', 
        type: 'PDF', 
        size: '0.7 MB', 
        signed: false,
        url: '#'
      }
    ],
    amendments: [
      {
        id: 1,
        title: 'Additional Electrical Outlet',
        description: 'Added one additional GFCI outlet near kitchen island',
        amount: '+$150',
        date: '2024-01-10',
        status: 'Approved',
        approvedBy: 'John Smith'
      }
    ],
    payments: [
      {
        id: 1,
        milestone: 'Design & Planning',
        amount: '$1,700',
        date: '2024-01-05',
        method: 'Credit Card',
        status: 'Completed',
        reference: 'TXN-001'
      },
      {
        id: 2,
        milestone: 'Demolition',
        amount: '$1,200',
        date: '2024-01-08',
        method: 'Bank Transfer',
        status: 'Completed',
        reference: 'TXN-002'
      }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'milestones', label: 'Milestones', icon: CheckCircle },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'documents', label: 'Documents', icon: File },
    { id: 'amendments', label: 'Amendments', icon: Edit2 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Suspended':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };



  const totalPaid = contract.milestones.filter(m => m.status === 'Paid').reduce((sum, m) => sum + parseFloat(m.amount.replace('$', '').replace(',', '')), 0);
  const totalPending = contract.milestones.filter(m => m.status === 'Pending' || m.status === 'In Progress').reduce((sum, m) => sum + parseFloat(m.amount.replace('$', '').replace(',', '')), 0);
  const completedMilestones = contract.milestones.filter(m => m.status === 'Paid').length;
  const totalMilestones = contract.milestones.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/client/contracts" className="text-gray-600 hover:text-primary-600">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-dark-900">{contract.title}</h1>
                <p className="text-sm text-gray-600">{contract.contractNumber}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(contract.status)}`}>
                {contract.status}
              </span>
              <div className="flex items-center space-x-2">
                <button className="text-gray-600 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Printer className="h-5 w-5" />
                </button>
                <button className="text-gray-600 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Download className="h-5 w-5" />
                </button>
                <button className="text-gray-600 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Contract Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-dark-900">${totalPaid.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Total Paid</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">${totalPending.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Remaining</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{completedMilestones}/{totalMilestones}</div>
                  <p className="text-sm text-gray-600">Milestones</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{Math.round((completedMilestones / totalMilestones) * 100)}%</div>
                  <p className="text-sm text-gray-600">Complete</p>
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
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-dark-900 mb-4">Contract Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Contract Number</label>
                            <p className="text-gray-900">{contract.contractNumber}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Project Category</label>
                            <p className="text-gray-900">{contract.category}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Location</label>
                            <p className="text-gray-900">{contract.location}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Contract Value</label>
                            <p className="text-gray-900 font-semibold">{contract.contractValue}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Start Date</label>
                            <p className="text-gray-900">{contract.startDate}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">End Date</label>
                            <p className="text-gray-900">{contract.endDate}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Payment Terms</label>
                            <p className="text-gray-900">{contract.paymentTerms}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Warranty</label>
                            <p className="text-gray-900">{contract.warranty}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-dark-900 mb-4">Project Description</h3>
                      <p className="text-gray-700">{contract.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-dark-900 mb-4">Terms & Conditions</h3>
                      <ul className="space-y-2">
                        {contract.termsAndConditions.map((term, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm">{term}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Milestones Tab */}
                {activeTab === 'milestones' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-dark-900">Project Milestones</h3>
                      <div className="text-sm text-gray-600">
                        {completedMilestones} of {totalMilestones} completed
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {contract.milestones.map((milestone) => (
                        <div key={milestone.id} className="border border-gray-200 rounded-xl p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4 flex-1">
                              <div className="flex-shrink-0">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  milestone.status === 'Paid' ? 'bg-green-100' :
                                  milestone.status === 'In Progress' ? 'bg-blue-100' : 'bg-gray-100'
                                }`}>
                                  {milestone.status === 'Paid' ? (
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                  ) : milestone.status === 'In Progress' ? (
                                    <Timer className="h-5 w-5 text-blue-600" />
                                  ) : (
                                    <Clock className="h-5 w-5 text-gray-600" />
                                  )}
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="font-medium text-dark-900">{milestone.name}</h4>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMilestoneStatusColor(milestone.status)}`}>
                                    {milestone.status}
                                  </span>
                                </div>
                                <p className="text-gray-600 text-sm mb-2">{milestone.description}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span>Due: {milestone.dueDate}</span>
                                  {milestone.completedDate && (
                                    <span>Completed: {milestone.completedDate}</span>
                                  )}
                                  {milestone.progress && (
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
                            <div className="text-right">
                              <div className="font-semibold text-dark-900">{milestone.amount}</div>
                              {milestone.paymentDate && (
                                <div className="text-xs text-green-600">Paid on {milestone.paymentDate}</div>
                              )}
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
                      <h3 className="text-lg font-semibold text-dark-900">Payment History</h3>
                      <Link
                        href="/client/payments"
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        View All Payments
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                            <p className="text-sm text-orange-700">Remaining</p>
                            <p className="text-xl font-bold text-orange-900">${totalPending.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Receipt className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-blue-700">Transactions</p>
                            <p className="text-xl font-bold text-blue-900">{contract.payments.length}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {contract.payments.map((payment) => (
                        <div key={payment.id} className="border border-gray-200 rounded-xl p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="bg-green-100 p-2 rounded-full">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-dark-900">{payment.milestone}</h4>
                                <p className="text-sm text-gray-600">
                                  {payment.date} • {payment.method} • Ref: {payment.reference}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-green-600">{payment.amount}</div>
                              <div className="text-xs text-gray-500">{payment.status}</div>
                            </div>
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
                      <h3 className="text-lg font-semibold text-dark-900">Contract Documents</h3>
                      <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2">
                        <Plus className="h-4 w-4" />
                        <span>Upload Document</span>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {contract.documents.map((doc) => (
                        <div key={doc.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-center space-x-3 mb-3">
                            <FileText className="h-8 w-8 text-primary-600" />
                            <div className="flex-1">
                              <h4 className="font-medium text-dark-900">{doc.name}</h4>
                              <p className="text-sm text-gray-600">{doc.type} • {doc.size}</p>
                            </div>
                            {doc.signed && (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            )}
                          </div>
                          
                          {doc.signed && doc.signedBy && (
                            <div className="mb-3 p-2 bg-green-50 rounded-lg">
                              <p className="text-xs text-green-700">
                                Signed on {doc.signedDate} by: {doc.signedBy.join(', ')}
                              </p>
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-2">
                            <button className="flex-1 bg-primary-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200">
                              View
                            </button>
                            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                              <Download className="h-4 w-4 text-gray-600" />
                            </button>
                            {!doc.signed && (
                              <button 
                                onClick={() => {/* Sign modal functionality to be implemented */}}
                                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Amendments Tab */}
                {activeTab === 'amendments' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-dark-900">Contract Amendments</h3>
                      <button 
                        onClick={() => {/* Amendment modal functionality to be implemented */}}
                        className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Request Amendment</span>
                      </button>
                    </div>
                    
                    {contract.amendments.length > 0 ? (
                      <div className="space-y-4">
                        {contract.amendments.map((amendment) => (
                          <div key={amendment.id} className="border border-gray-200 rounded-xl p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h4 className="font-medium text-dark-900">{amendment.title}</h4>
                                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                    {amendment.status}
                                  </span>
                                </div>
                                <p className="text-gray-600 text-sm mb-2">{amendment.description}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span>Date: {amendment.date}</span>
                                  <span>Approved by: {amendment.approvedBy}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-dark-900">{amendment.amount}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Edit2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">No Amendments</h4>
                        <p className="text-gray-600">No amendments have been made to this contract.</p>
                      </div>
                    )}
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
                  src={contract.professional.avatar}
                  alt={contract.professional.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-dark-900">{contract.professional.name}</h4>
                  <p className="text-sm text-gray-600">{contract.professional.company}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{contract.professional.rating} ({contract.professional.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">License:</span>
                  <span className="font-medium text-dark-900">{contract.professional.license}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Insurance:</span>
                  <span className="font-medium text-dark-900">{contract.professional.insurance}</span>
                </div>
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
                  href={`/client/projects/${contract.id}`}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>View Project</span>
                </Link>
                <Link
                  href={`/client/payments?contract=${contract.id}`}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>View Payments</span>
                </Link>
                <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download Contract</span>
                </button>
              </div>
            </div>

            {/* Contract Timeline */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-lg text-dark-900 mb-4">Timeline</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Signed: {contract.signedDate}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Flag className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Started: {contract.startDate}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Target className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Due: {contract.endDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 