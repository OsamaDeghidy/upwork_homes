'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  CreditCard,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Info,
  Shield,
  Lock,
  User,
  MapPin,
  Star,
  FileText,
  Receipt,
  Send,
  X,
  Check,
  Eye,
  Bank,
  Wallet,
  Calculator,
  Percent,
  Plus,
  Minus,
  Target,
  Flag,
  Timer,
  Award,
  TrendingUp,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Zap,
  Package,
  Truck,
  Construction,
  Hammer,
  Wrench,
  PaintBucket,
  Lightbulb,
  Gauge,
  Scale,
  Bookmark,
  Tag,
  Archive,
  Folder,
  FolderOpen,
  File,
  Image,
  Video,
  Mic,
  Speaker,
  Headphones,
  Keyboard,
  Mouse,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Printer,
  Camera,
  Home,
  Building,
  Briefcase,
  Users,
  UserCheck,
  UserX,
  UserPlus,
  UserMinus,
  Crown,
  Medal,
  Trophy,
  Ribbon,
  Gift,
  ShoppingCart,
  ShoppingBag,
  Banknote,
  Coins,
  Balance,
  Thermometer,
  Battery,
  Wifi,
  Signal,
  Bluetooth,
  Usb,
  Plug,
  Power,
  Flame,
  Snowflake,
  Droplets,
  Wind,
  Cloud,
  Sun,
  Moon,
  Umbrella
} from 'lucide-react';

export default function MakePaymentPage() {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedMilestone, setSelectedMilestone] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentNote, setPaymentNote] = useState('');
  const [useCustomAmount, setUseCustomAmount] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Sample projects with pending payments
  const projects = [
    {
      id: 1,
      name: 'Kitchen Renovation',
      professional: 'Sarah Mitchell',
      status: 'Active',
      pendingAmount: '$2,500',
      milestones: [
        {
          id: 1,
          name: 'Cabinet Installation',
          amount: '$2,500',
          dueDate: '2024-01-28',
          status: 'Ready for Payment',
          description: 'Installation of custom kitchen cabinets and hardware'
        },
        {
          id: 2,
          name: 'Countertops & Backsplash',
          amount: '$1,800',
          dueDate: '2024-02-05',
          status: 'Future',
          description: 'Installation of quartz countertops and tile backsplash'
        }
      ]
    },
    {
      id: 2,
      name: 'Bathroom Renovation',
      professional: 'Mike Johnson',
      status: 'Active',
      pendingAmount: '$1,200',
      milestones: [
        {
          id: 3,
          name: 'Plumbing Installation',
          amount: '$1,200',
          dueDate: '2024-01-25',
          status: 'Ready for Payment',
          description: 'New plumbing fixtures and connections'
        }
      ]
    }
  ];

  // Sample payment methods
  const paymentMethods = [
    {
      id: 1,
      type: 'Credit Card',
      provider: 'Visa',
      last4: '4567',
      isDefault: true,
      icon: CreditCard
    },
    {
      id: 2,
      type: 'Credit Card',
      provider: 'Mastercard',
      last4: '8901',
      isDefault: false,
      icon: CreditCard
    },
    {
      id: 3,
      type: 'PayPal',
      email: 'john.smith@email.com',
      isDefault: false,
      icon: Wallet
    }
  ];

  const selectedProjectData = projects.find(p => p.id.toString() === selectedProject);
  const selectedMilestoneData = selectedProjectData?.milestones.find(m => m.id.toString() === selectedMilestone);
  const selectedPaymentMethodData = paymentMethods.find(pm => pm.id.toString() === selectedPaymentMethod);

  const calculateFees = (amount: number) => {
    const processingFee = amount * 0.029; // 2.9%
    const platformFee = 0.30; // $0.30
    const total = amount + processingFee + platformFee;
    return {
      amount,
      processingFee,
      platformFee,
      total
    };
  };

  const paymentAmountNum = parseFloat(paymentAmount) || 0;
  const fees = calculateFees(paymentAmountNum);

  const handleSubmitPayment = () => {
    setShowConfirmation(true);
  };

  const confirmPayment = () => {
    // Here you would process the payment
    console.log('Processing payment:', {
      project: selectedProjectData,
      milestone: selectedMilestoneData,
      paymentMethod: selectedPaymentMethodData,
      amount: paymentAmount,
      note: paymentNote,
      fees
    });
    
    // Redirect to success page or payments list
    window.location.href = '/client/payments';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/client/payments" className="text-gray-600 hover:text-primary-600">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-dark-900">Make Payment</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Selection */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-dark-900 mb-4">Select Project</h2>
              <div className="space-y-3">
                {projects.map((project) => (
                  <label key={project.id} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="project"
                      value={project.id}
                      checked={selectedProject === project.id.toString()}
                      onChange={(e) => {
                        setSelectedProject(e.target.value);
                        setSelectedMilestone('');
                        setPaymentAmount('');
                      }}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-dark-900">{project.name}</h3>
                        <span className="text-sm font-medium text-red-600">{project.pendingAmount} pending</span>
                      </div>
                      <p className="text-sm text-gray-600">Professional: {project.professional}</p>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Active' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Milestone Selection */}
            {selectedProjectData && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-dark-900 mb-4">Select Milestone</h2>
                <div className="space-y-3">
                  {selectedProjectData.milestones.map((milestone) => (
                    <label key={milestone.id} className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      milestone.status === 'Ready for Payment' 
                        ? 'border-gray-200 hover:bg-gray-50' 
                        : 'border-gray-100 bg-gray-50 cursor-not-allowed'
                    }`}>
                      <input
                        type="radio"
                        name="milestone"
                        value={milestone.id}
                        checked={selectedMilestone === milestone.id.toString()}
                        onChange={(e) => {
                          setSelectedMilestone(e.target.value);
                          setPaymentAmount(milestone.amount.replace('$', '').replace(',', ''));
                        }}
                        disabled={milestone.status !== 'Ready for Payment'}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-dark-900">{milestone.name}</h3>
                          <span className="text-lg font-semibold text-dark-900">{milestone.amount}</span>
                        </div>
                        <p className="text-sm text-gray-600">{milestone.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-gray-500">Due: {milestone.dueDate}</span>
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            milestone.status === 'Ready for Payment' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {milestone.status}
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Amount */}
            {selectedMilestoneData && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-dark-900 mb-4">Payment Amount</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="customAmount"
                      checked={useCustomAmount}
                      onChange={(e) => setUseCustomAmount(e.target.checked)}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="customAmount" className="text-sm text-gray-700">
                      Pay custom amount
                    </label>
                  </div>
                  
                  {useCustomAmount ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Custom Amount
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="number"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Maximum amount: {selectedMilestoneData.amount}
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Full milestone amount:</span>
                        <span className="text-2xl font-bold text-dark-900">{selectedMilestoneData.amount}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Payment Method */}
            {paymentAmount && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-dark-900">Payment Method</h2>
                  <Link 
                    href="/client/payments/methods" 
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Manage Methods
                  </Link>
                </div>
                
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <label key={method.id} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedPaymentMethod === method.id.toString()}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <div className="bg-gray-100 p-2 rounded">
                        <method.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-dark-900">
                            {method.type === 'PayPal' ? method.email : `${method.provider} •••• ${method.last4}`}
                          </span>
                          {method.isDefault && (
                            <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-medium">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{method.type}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Note */}
            {selectedPaymentMethod && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-dark-900 mb-4">Payment Note (Optional)</h2>
                <textarea
                  value={paymentNote}
                  onChange={(e) => setPaymentNote(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Add a note for this payment..."
                />
              </div>
            )}
          </div>

          {/* Payment Summary Sidebar */}
          <div className="space-y-6">
            {/* Payment Summary */}
            {paymentAmount && selectedPaymentMethodData && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-dark-900 mb-4">Payment Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Amount:</span>
                    <span className="font-medium text-dark-900">${fees.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Fee (2.9%):</span>
                    <span className="font-medium text-dark-900">${fees.processingFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform Fee:</span>
                    <span className="font-medium text-dark-900">${fees.platformFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-dark-900">Total:</span>
                      <span className="font-bold text-dark-900 text-lg">${fees.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {selectedProjectData && selectedMilestoneData && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-dark-900 mb-2">Payment Details</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-gray-600">Project:</span> {selectedProjectData.name}</p>
                      <p><span className="text-gray-600">Milestone:</span> {selectedMilestoneData.name}</p>
                      <p><span className="text-gray-600">Professional:</span> {selectedProjectData.professional}</p>
                      <p><span className="text-gray-600">Due Date:</span> {selectedMilestoneData.dueDate}</p>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleSubmitPayment}
                  disabled={!selectedProject || !selectedMilestone || !selectedPaymentMethod || !paymentAmount}
                  className="w-full mt-6 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Pay ${fees.total.toFixed(2)}</span>
                </button>
              </div>
            )}

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800">Secure Payment</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Your payment is protected by bank-level encryption and held in escrow until milestone completion.
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Protection */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-green-800">Payment Protection</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Funds are released only when you're satisfied with the work completed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-dark-900">Confirm Payment</h3>
              <button
                onClick={() => setShowConfirmation(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-dark-900 mb-3">Payment Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Project:</span>
                    <span className="font-medium">{selectedProjectData?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Milestone:</span>
                    <span className="font-medium">{selectedMilestoneData?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium">
                      {selectedPaymentMethodData?.type === 'PayPal' 
                        ? selectedPaymentMethodData.email 
                        : `${selectedPaymentMethodData?.provider} •••• ${selectedPaymentMethodData?.last4}`}
                    </span>
                  </div>
                  <div className="border-t pt-2 mt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total Amount:</span>
                      <span className="font-bold text-lg">${fees.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium">Payment will be held in escrow</p>
                    <p>Funds will be released when the milestone is marked as complete and you approve the work.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmPayment}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Confirm Payment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 