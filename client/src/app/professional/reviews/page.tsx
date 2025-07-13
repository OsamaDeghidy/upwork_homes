'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Star,
  StarHalf,
  TrendingUp,
  TrendingDown,
  Filter,
  Search,
  Calendar,
  User,
  MapPin,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Flag,
  Share2,
  Download,
  Eye,
  BarChart3,
  PieChart,
  Activity,
  Award,
  Target,
  Zap,
  Heart,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Plus,
  Minus,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  MoreVertical,
  Edit2,
  Trash2,
  Settings,
  Bell,
  Bookmark,
  Tag,
  Image,
  FileText,
  Phone,
  Mail,
  Globe,
  ExternalLink,
  Copy,
  RefreshCw,
  Save,
  X,
  Check,
  Upload,
  Download as DownloadIcon,
  Printer,
  Share,
  Send,
  Archive,
  Folder,
  FolderOpen,
  File,
  FileImage,
  FileVideo,
  FileAudio,
  FilePdf,
  FileSpreadsheet,
  FileCode,
  FileZip,
  Home,
  Building,
  Briefcase,
  Users,
  UserCheck,
  UserX,
  UserPlus,
  UserMinus,
  Crown,
  Shield,
  Medal,
  Trophy,
  Ribbon,
  Gift,
  Package,
  ShoppingCart,
  ShoppingBag,
  CreditCard,
  Wallet,
  Receipt,
  Banknote,
  Coins,
  DollarSign,
  Percent,
  Calculator,
  Scale,
  Balance,
  Gauge,
  Meter,
  Thermometer,
  Battery,
  Wifi,
  Signal,
  Bluetooth,
  Usb,
  Plug,
  Power,
  Zap as ZapIcon,
  Flame,
  Snowflake,
  Droplets,
  Wind,
  Cloud,
  Sun,
  Moon,
  Umbrella,
  Rainbow,
  Sunrise,
  Sunset,
  Mountain,
  Tree,
  Leaf,
  Flower,
  Seedling,
  Cactus,
  Palmtree,
  Evergreen,
  Deciduous,
  Grass,
  Clover,
  Mushroom,
  Carrot,
  Apple,
  Orange,
  Banana,
  Grape,
  Cherry,
  Strawberry,
  Lemon,
  Lime,
  Pineapple,
  Coconut,
  Avocado,
  Eggplant,
  Broccoli,
  Corn,
  Pepper,
  Tomato,
  Potato,
  Onion,
  Garlic,
  Ginger,
  Chili,
  Herbs,
  Spices,
  Salt,
  Sugar,
  Honey,
  Milk,
  Cheese,
  Butter,
  Bread,
  Cake,
  Cookie,
  Donut,
  Pizza,
  Burger,
  Hotdog,
  Sandwich,
  Taco,
  Burrito,
  Sushi,
  Ramen,
  Soup,
  Salad,
  Pasta,
  Rice,
  Noodles,
  Meat,
  Fish,
  Chicken,
  Egg,
  Bacon,
  Steak,
  Lobster,
  Shrimp,
  Crab,
  Oyster,
  Clam,
  Scallop,
  Mussel,
  Squid,
  Octopus,
  Jellyfish,
  Shark,
  Whale,
  Dolphin,
  Seal,
  Penguin,
  Polar,
  Bear,
  Lion,
  Tiger,
  Elephant,
  Giraffe,
  Zebra,
  Horse,
  Cow,
  Pig,
  Sheep,
  Goat,
  Chicken as ChickenIcon,
  Duck,
  Turkey,
  Rabbit,
  Squirrel,
  Hedgehog,
  Bat,
  Wolf,
  Fox,
  Cat,
  Dog,
  Mouse,
  Hamster,
  Guinea,
  Ferret,
  Parrot,
  Eagle,
  Owl,
  Peacock,
  Flamingo,
  Swan,
  Goose,
  Pelican,
  Heron,
  Stork,
  Crane,
  Vulture,
  Hawk,
  Falcon,
  Kestrel,
  Osprey,
  Condor,
  Albatross,
  Petrel,
  Gull,
  Tern,
  Puffin,
  Cormorant,
  Gannet,
  Booby,
  Frigate,
  Tropicbird,
  Skua,
  Jaeger,
  Auk,
  Guillemot,
  Murre,
  Razorbill,
  Dovekie,
  Pigeon,
  Dove,
  Cuckoo,
  Nightjar,
  Swift,
  Hummingbird,
  Kingfisher,
  Bee,
  Wasp,
  Hornet,
  Ant,
  Termite,
  Cockroach,
  Beetle,
  Ladybug,
  Firefly,
  Dragonfly,
  Damselfly,
  Mayfly,
  Caddisfly,
  Lacewing,
  Antlion,
  Mantis,
  Walkingstick,
  Grasshopper,
  Cricket,
  Katydid,
  Cicada,
  Aphid,
  Whitefly,
  Thrips,
  Mite,
  Tick,
  Spider,
  Scorpion,
  Harvestman,
  Pseudoscorpion,
  Solifuge,
  Whipscorpion,
  Amblypygi,
  Ricinulei,
  Schizomida,
  Palpigradi,
  Opiliones,
  Acari,
  Araneae,
  Scorpiones,
  Pseudoscorpiones,
  Solifugae,
  Uropygi,
  Amblypygi as AmblypygiIcon,
  Ricinulei as RicinuleiIcon,
  Schizomida as SchizomidaIcon,
  Palpigradi as PalpigradIcon
} from 'lucide-react';

export default function ProfessionalReviewsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [currentReply, setCurrentReply] = useState('');

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      clientName: 'John Smith',
      clientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      projectName: 'Kitchen Renovation',
      projectType: 'Kitchen Remodeling',
      rating: 5,
      date: '2024-01-15',
      review: 'Outstanding work! The kitchen transformation exceeded our expectations. Professional, timely, and attention to detail was incredible. Highly recommend!',
      images: [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1556909045-f18c06d3e1d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      ],
      helpful: 12,
      location: 'Los Angeles, CA',
      verified: true,
      response: null
    },
    {
      id: 2,
      clientName: 'Sarah Johnson',
      clientAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      projectName: 'Bathroom Renovation',
      projectType: 'Bathroom Renovation',
      rating: 4,
      date: '2024-01-10',
      review: 'Great job on the bathroom renovation. The work was completed on time and within budget. Very satisfied with the quality.',
      images: [],
      helpful: 8,
      location: 'Beverly Hills, CA',
      verified: true,
      response: 'Thank you for your kind words! It was a pleasure working with you on this project.'
    },
    {
      id: 3,
      clientName: 'Mike Davis',
      clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      projectName: 'Electrical Panel Upgrade',
      projectType: 'Electrical Work',
      rating: 5,
      date: '2024-01-05',
      review: 'Professional and knowledgeable electrician. The panel upgrade was done efficiently and all permits were handled properly.',
      images: [],
      helpful: 6,
      location: 'Santa Monica, CA',
      verified: true,
      response: null
    },
    {
      id: 4,
      clientName: 'Emily Chen',
      clientAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      projectName: 'Living Room Redesign',
      projectType: 'Interior Design',
      rating: 4,
      date: '2023-12-28',
      review: 'Creative design solutions and good project management. The living room looks amazing and the process was smooth.',
      images: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      ],
      helpful: 10,
      location: 'Hollywood, CA',
      verified: true,
      response: 'Thank you Emily! Your vision really brought the space to life. It was wonderful working with you.'
    },
    {
      id: 5,
      clientName: 'David Wilson',
      clientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      projectName: 'Plumbing Repairs',
      projectType: 'Plumbing',
      rating: 3,
      date: '2023-12-20',
      review: 'The work was completed but took longer than expected. Quality was good but communication could have been better.',
      images: [],
      helpful: 3,
      location: 'West Hollywood, CA',
      verified: true,
      response: 'Thank you for your feedback. We appreciate your patience and will work on improving our communication process.'
    }
  ];

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.review.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === '5-star') return matchesSearch && review.rating === 5;
    if (selectedFilter === '4-star') return matchesSearch && review.rating === 4;
    if (selectedFilter === '3-star') return matchesSearch && review.rating === 3;
    if (selectedFilter === '2-star') return matchesSearch && review.rating === 2;
    if (selectedFilter === '1-star') return matchesSearch && review.rating === 1;
    if (selectedFilter === 'with-images') return matchesSearch && review.images.length > 0;
    if (selectedFilter === 'no-response') return matchesSearch && !review.response;
    
    return matchesSearch;
  });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  const ratingDistribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length
  };

  const renderStars = (rating: number, size: string = 'h-4 w-4') => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className={`${size} fill-yellow-400 text-yellow-400`} />);
      } else {
        stars.push(<Star key={i} className={`${size} text-gray-300`} />);
      }
    }
    return stars;
  };

  const handleReply = (review: any) => {
    setSelectedReview(review);
    setShowReplyModal(true);
  };

  const submitReply = () => {
    // Here you would typically send the reply to your backend
    console.log('Reply submitted:', currentReply);
    setShowReplyModal(false);
    setCurrentReply('');
    setSelectedReview(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/professional/dashboard" className="text-gray-600 hover:text-primary-600">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-dark-900">My Reviews</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <Download className="h-5 w-5" />
              </button>
              <button className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Overall Rating */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-dark-900 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center space-x-1 mb-2">
                {renderStars(Math.round(averageRating), 'h-5 w-5')}
              </div>
              <p className="text-sm text-gray-600">
                Based on {totalReviews} reviews
              </p>
            </div>
          </div>
          
          {/* Rating Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-dark-900 mb-4">Rating Distribution</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 w-8">{rating}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(ratingDistribution[rating] / totalReviews) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{ratingDistribution[rating]}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-dark-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">With Images</span>
                <span className="text-sm font-medium text-dark-900">
                  {reviews.filter(r => r.images.length > 0).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Responded</span>
                <span className="text-sm font-medium text-dark-900">
                  {reviews.filter(r => r.response).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Verified</span>
                <span className="text-sm font-medium text-dark-900">
                  {reviews.filter(r => r.verified).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Helpful Votes</span>
                <span className="text-sm font-medium text-dark-900">
                  {reviews.reduce((sum, r) => sum + r.helpful, 0)}
                </span>
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
                  placeholder="Search reviews..."
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
                <option value="all">All Reviews</option>
                <option value="5-star">5 Star</option>
                <option value="4-star">4 Star</option>
                <option value="3-star">3 Star</option>
                <option value="2-star">2 Star</option>
                <option value="1-star">1 Star</option>
                <option value="with-images">With Images</option>
                <option value="no-response">No Response</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={review.clientAvatar}
                  alt={review.clientName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-dark-900">{review.clientName}</h3>
                      {review.verified && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>{review.projectName}</strong> • {review.projectType}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>{review.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{review.review}</p>
                  
                  {/* Review Images */}
                  {review.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                      {review.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Review ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Professional Response */}
                  {review.response && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                          <User className="h-3 w-3 text-primary-600" />
                        </div>
                        <span className="text-sm font-medium text-dark-900">Professional Response</span>
                      </div>
                      <p className="text-sm text-gray-700">{review.response}</p>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors">
                        <ThumbsUp className="h-4 w-4" />
                        <span className="text-sm">{review.helpful}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors">
                        <Share2 className="h-4 w-4" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!review.response && (
                        <button
                          onClick={() => handleReply(review)}
                          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2 text-sm"
                        >
                          <Reply className="h-4 w-4" />
                          <span>Reply</span>
                        </button>
                      )}
                      <button className="text-gray-600 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
            <p className="text-gray-600">Adjust your filters or search terms to find reviews.</p>
          </div>
        )}
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-dark-900">Reply to Review</h3>
              <button
                onClick={() => setShowReplyModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <img
                    src={selectedReview.clientAvatar}
                    alt={selectedReview.clientName}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-dark-900">{selectedReview.clientName}</span>
                  <div className="flex items-center space-x-1">
                    {renderStars(selectedReview.rating, 'h-3 w-3')}
                  </div>
                </div>
                <p className="text-sm text-gray-700 line-clamp-3">{selectedReview.review}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Response
                </label>
                <textarea
                  value={currentReply}
                  onChange={(e) => setCurrentReply(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Thank you for your review..."
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={submitReply}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 