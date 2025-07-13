'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  CreditCard,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Shield,
  Star,
  Building,
  Wallet,
  Smartphone,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Settings,
  Info,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Percent,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  Flag,
  Copy,
  ExternalLink,
  RefreshCw,
  Download,
  Upload,
  Save,
  Bell,
  Award,
  Target,
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
  Timer,
  Bookmark,
  Tag,
  Archive,
  Folder,
  FolderOpen,
  File,
  FileText,
  Image,
  Video,
  Mic,
  Speaker,
  Headphones,
  Keyboard,
  Mouse,
  Monitor,
  Tablet,
  Laptop,
  Printer,
  Camera,
  Home,
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
  Receipt,
  Banknote,
  Coins,
  Calculator,
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

export default function PaymentMethodsPage() {
  const [showAddMethod, setShowAddMethod] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<any>(null);
  const [newMethod, setNewMethod] = useState({
    type: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    },
    bankAccount: '',
    routingNumber: '',
    paypalEmail: ''
  });

  const paymentMethods = [
    {
      id: 1,
      type: 'Credit Card',
      provider: 'Visa',
      last4: '4567',
      expiryDate: '12/26',
      cardholderName: 'John Smith',
      isDefault: true,
      isVerified: true,
      addedDate: '2023-10-15',
      icon: CreditCard
    },
    {
      id: 2,
      type: 'Credit Card',
      provider: 'Mastercard',
      last4: '8901',
      expiryDate: '08/25',
      cardholderName: 'John Smith',
      isDefault: false,
      isVerified: true,
      addedDate: '2023-09-20',
      icon: CreditCard
    },
    {
      id: 3,
      type: 'PayPal',
      provider: 'PayPal',
      email: 'john.smith@email.com',
      isDefault: false,
      isVerified: true,
      addedDate: '2023-08-10',
      icon: Wallet
    },
    {
      id: 4,
      type: 'Bank Account',
      provider: 'Bank of America',
      last4: '3456',
      accountType: 'Checking',
      isDefault: false,
      isVerified: false,
      addedDate: '2024-01-05',
      icon: Building
    }
  ];

  const handleAddMethod = () => {
    // Here you would submit the new payment method to your backend
    console.log('Adding payment method:', newMethod);
    setShowAddMethod(false);
    setNewMethod({
      type: 'card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      billingAddress: {
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      },
      bankAccount: '',
      routingNumber: '',
      paypalEmail: ''
    });
  };

  const handleDeleteMethod = () => {
    // Here you would delete the payment method
    console.log('Deleting payment method:', selectedMethod);
    setShowDeleteModal(false);
    setSelectedMethod(null);
  };

  const setAsDefault = (methodId: number) => {
    // Here you would set the method as default
    console.log('Setting method as default:', methodId);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
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
              <h1 className="text-2xl font-bold text-dark-900">Payment Methods</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAddMethod(true)}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Method</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-800">Secure Payment Processing</h3>
              <p className="text-sm text-blue-700 mt-1">
                Your payment information is encrypted and securely stored. We never store your full card details on our servers.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Methods List */}
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <method.icon className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-dark-900">
                        {method.type === 'Credit Card' ? `${method.provider} •••• ${method.last4}` :
                         method.type === 'PayPal' ? method.email :
                         `${method.provider} •••• ${method.last4}`}
                      </h3>
                      {method.isDefault && (
                        <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-medium">
                          Default
                        </span>
                      )}
                      {method.isVerified ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-orange-500" />
                      )}
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      {method.type === 'Credit Card' && (
                        <>
                          <p>Expires {method.expiryDate}</p>
                          <p>Cardholder: {method.cardholderName}</p>
                        </>
                      )}
                      {method.type === 'Bank Account' && (
                        <p>{method.accountType} Account</p>
                      )}
                      <p>Added on {method.addedDate}</p>
                      <p className={`inline-flex items-center space-x-1 ${method.isVerified ? 'text-green-600' : 'text-orange-600'}`}>
                        {method.isVerified ? (
                          <>
                            <CheckCircle className="h-3 w-3" />
                            <span>Verified</span>
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3" />
                            <span>Pending Verification</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {!method.isDefault && (
                    <button
                      onClick={() => setAsDefault(method.id)}
                      className="text-primary-600 hover:text-primary-700 px-3 py-1 rounded-lg hover:bg-primary-50 transition-colors duration-200 text-sm"
                    >
                      Set as Default
                    </button>
                  )}
                  <button className="text-gray-600 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMethod(method);
                      setShowDeleteModal(true);
                    }}
                    className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {paymentMethods.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No payment methods</h3>
            <p className="text-gray-600 mb-4">Add a payment method to start making payments.</p>
            <button
              onClick={() => setShowAddMethod(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              Add Your First Payment Method
            </button>
          </div>
        )}
      </div>

      {/* Add Payment Method Modal */}
      {showAddMethod && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-dark-900">Add Payment Method</h3>
              <button
                onClick={() => setShowAddMethod(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Payment Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setNewMethod(prev => ({ ...prev, type: 'card' }))}
                    className={`p-4 border rounded-lg text-center transition-colors ${
                      newMethod.type === 'card' 
                        ? 'border-primary-500 bg-primary-50 text-primary-700' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">Credit Card</span>
                  </button>
                  <button
                    onClick={() => setNewMethod(prev => ({ ...prev, type: 'bank' }))}
                    className={`p-4 border rounded-lg text-center transition-colors ${
                      newMethod.type === 'bank' 
                        ? 'border-primary-500 bg-primary-50 text-primary-700' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Building className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">Bank Account</span>
                  </button>
                  <button
                    onClick={() => setNewMethod(prev => ({ ...prev, type: 'paypal' }))}
                    className={`p-4 border rounded-lg text-center transition-colors ${
                      newMethod.type === 'paypal' 
                        ? 'border-primary-500 bg-primary-50 text-primary-700' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Wallet className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">PayPal</span>
                  </button>
                </div>
              </div>

              {/* Credit Card Form */}
              {newMethod.type === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={newMethod.cardNumber}
                      onChange={(e) => setNewMethod(prev => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={newMethod.expiryDate}
                        onChange={(e) => setNewMethod(prev => ({ ...prev, expiryDate: formatExpiryDate(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={newMethod.cvv}
                        onChange={(e) => setNewMethod(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '') }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={newMethod.cardholderName}
                      onChange={(e) => setNewMethod(prev => ({ ...prev, cardholderName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              {/* Bank Account Form */}
              {newMethod.type === 'bank' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={newMethod.bankAccount}
                      onChange={(e) => setNewMethod(prev => ({ ...prev, bankAccount: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Account Number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Routing Number
                    </label>
                    <input
                      type="text"
                      value={newMethod.routingNumber}
                      onChange={(e) => setNewMethod(prev => ({ ...prev, routingNumber: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Routing Number"
                    />
                  </div>
                </div>
              )}

              {/* PayPal Form */}
              {newMethod.type === 'paypal' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PayPal Email
                  </label>
                  <input
                    type="email"
                    value={newMethod.paypalEmail}
                    onChange={(e) => setNewMethod(prev => ({ ...prev, paypalEmail: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              )}

              {/* Billing Address */}
              {newMethod.type === 'card' && (
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Billing Address</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        value={newMethod.billingAddress.street}
                        onChange={(e) => setNewMethod(prev => ({ 
                          ...prev, 
                          billingAddress: { ...prev.billingAddress, street: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="123 Main Street"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          value={newMethod.billingAddress.city}
                          onChange={(e) => setNewMethod(prev => ({ 
                            ...prev, 
                            billingAddress: { ...prev.billingAddress, city: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Los Angeles"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          value={newMethod.billingAddress.state}
                          onChange={(e) => setNewMethod(prev => ({ 
                            ...prev, 
                            billingAddress: { ...prev.billingAddress, state: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="CA"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          value={newMethod.billingAddress.zip}
                          onChange={(e) => setNewMethod(prev => ({ 
                            ...prev, 
                            billingAddress: { ...prev.billingAddress, zip: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="90210"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        <select
                          value={newMethod.billingAddress.country}
                          onChange={(e) => setNewMethod(prev => ({ 
                            ...prev, 
                            billingAddress: { ...prev.billingAddress, country: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="">Select Country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowAddMethod(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMethod}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  Add Payment Method
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedMethod && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-dark-900">Delete Payment Method</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-red-800">This action cannot be undone</p>
                  <p className="text-sm text-red-700">
                    Are you sure you want to delete {selectedMethod.type === 'Credit Card' ? `${selectedMethod.provider} •••• ${selectedMethod.last4}` : selectedMethod.email || `${selectedMethod.provider} •••• ${selectedMethod.last4}`}?
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteMethod}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 