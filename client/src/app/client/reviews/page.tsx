'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Star,
  Plus,
  ArrowLeft,
  CheckCircle,
  Edit2,
  Share2,
  ThumbsUp,
  ThumbsDown,
  User,
  Eye,
  MessageCircle,
  X,
  Camera,
  Send,
  Search
} from 'lucide-react';

interface Project {
  id: number;
  name: string;
  professionalName: string;
  professionalAvatar: string;
  projectType: string;
  completedDate: string;
  canReview: boolean;
}

export default function ClientReviewsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    wouldRecommend: true,
    images: [] as { id: number; url: string; name: string; }[]
  });

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      projectName: 'Kitchen Renovation',
      professionalName: 'Sarah Mitchell',
      professionalAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 5,
      title: 'Outstanding Kitchen Transformation!',
      comment: 'Sarah exceeded our expectations with the kitchen renovation. Her attention to detail, professionalism, and creative solutions made the entire process smooth and enjoyable. The final result is absolutely stunning and we couldn\'t be happier!',
      date: '2024-01-20',
      status: 'Published',
      wouldRecommend: true,
      helpful: 12,
      images: [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1556909045-f18c06d3e1d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      ],
      projectType: 'Kitchen Remodeling',
      budget: '$8,500',
      duration: '6 weeks',
      location: 'Los Angeles, CA',
      verified: true,
      response: 'Thank you so much for your kind words! It was a pleasure working with you and your family. I\'m thrilled that you love your new kitchen!'
    },
    {
      id: 2,
      projectName: 'Bathroom Renovation',
      professionalName: 'Mike Johnson',
      professionalAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4,
      title: 'Great Work, Minor Delays',
      comment: 'Mike did excellent work on our bathroom renovation. The quality is top-notch and he was very professional throughout. There were some minor delays due to permit issues, but he handled everything well and kept us informed.',
      date: '2024-01-15',
      status: 'Published',
      wouldRecommend: true,
      helpful: 8,
      images: [
        'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      ],
      projectType: 'Bathroom Renovation',
      budget: '$5,200',
      duration: '4 weeks',
      location: 'Beverly Hills, CA',
      verified: true,
      response: 'Thank you for the review! I apologize for the delays with the permits. I\'m glad you\'re happy with the final result!'
    },
    {
      id: 3,
      projectName: 'Electrical Panel Upgrade',
      professionalName: 'David Rodriguez',
      professionalAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 5,
      title: 'Professional and Efficient',
      comment: 'David completed our electrical panel upgrade quickly and efficiently. He was knowledgeable, punctual, and cleaned up after himself. Highly recommend for any electrical work!',
      date: '2024-01-12',
      status: 'Published',
      wouldRecommend: true,
      helpful: 6,
      images: [],
      projectType: 'Electrical Work',
      budget: '$2,800',
      duration: '1 week',
      location: 'Santa Monica, CA',
      verified: true,
      response: null
    },
    {
      id: 4,
      projectName: 'Garden Landscaping',
      professionalName: 'Emily Chen',
      professionalAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 3,
      title: 'Good Work, Poor Communication',
      comment: 'The landscaping work was done well and the garden looks great. However, communication was lacking and there were several misunderstandings about the timeline and plant choices.',
      date: '2024-01-08',
      status: 'Published',
      wouldRecommend: false,
      helpful: 4,
      images: [
        'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      ],
      projectType: 'Landscaping',
      budget: '$3,500',
      duration: '3 weeks',
      location: 'Malibu, CA',
      verified: true,
      response: 'I apologize for the communication issues. I\'ve implemented new processes to ensure better communication with all my clients.'
    }
  ];

  // Sample projects that can be reviewed
  const completedProjects = [
    {
      id: 5,
      name: 'Living Room Redesign',
      professionalName: 'Maria Santos',
      professionalAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      completedDate: '2024-01-18',
      projectType: 'Interior Design',
      canReview: true
    },
    {
      id: 6,
      name: 'Deck Installation',
      professionalName: 'James Wilson',
      professionalAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      completedDate: '2024-01-16',
      projectType: 'Carpentry',
      canReview: true
    }
  ];

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.professionalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === '5-star') return matchesSearch && review.rating === 5;
    if (selectedFilter === '4-star') return matchesSearch && review.rating === 4;
    if (selectedFilter === '3-star') return matchesSearch && review.rating === 3;
    if (selectedFilter === '2-star') return matchesSearch && review.rating === 2;
    if (selectedFilter === '1-star') return matchesSearch && review.rating === 1;
    if (selectedFilter === 'with-response') return matchesSearch && review.response;
    if (selectedFilter === 'recent') return matchesSearch && new Date(review.date) > new Date('2024-01-15');
    
    return matchesSearch;
  });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  const renderStars = (rating: number, size: string = 'h-4 w-4', interactive: boolean = false, onRatingChange?: (rating: number) => void) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          onClick={() => interactive && onRatingChange && onRatingChange(i)}
          className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
          disabled={!interactive}
        >
          <Star className={`${size} ${i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
        </button>
      );
    }
    return stars;
  };

  const handleAddReview = (project: Project) => {
    setSelectedProject(project);
    setShowAddReviewModal(true);
  };

  const submitReview = () => {
    // Here you would submit the review to your backend
    console.log('Submitting review:', {
      project: selectedProject,
      review: newReview
    });
    setShowAddReviewModal(false);
    setSelectedProject(null);
    setNewReview({
      rating: 5,
      title: '',
      comment: '',
      wouldRecommend: true,
      images: []
    });
  };

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setNewReview(prev => ({
          ...prev,
          images: [...prev.images, { id: Date.now(), url: result, name: file.name }]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (imageId: number) => {
    setNewReview(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/client/dashboard" className="text-gray-600 hover:text-primary-600">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-dark-900">My Reviews</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAddReviewModal(true)}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Write Review</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Average Rating */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-dark-900 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center space-x-1 mb-2">
                {renderStars(Math.round(averageRating), 'h-5 w-5')}
              </div>
              <p className="text-sm text-gray-600">
                Your average rating
              </p>
            </div>
          </div>
          
          {/* Total Reviews */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-dark-900 mb-2">
                {totalReviews}
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Total reviews written
              </p>
              <div className="text-xs text-green-600">
                +2 this month
              </div>
            </div>
          </div>
          
          {/* Helpful Votes */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-dark-900 mb-2">
                {reviews.reduce((sum, r) => sum + r.helpful, 0)}
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Helpful votes received
              </p>
              <div className="text-xs text-blue-600">
                From {reviews.filter(r => r.helpful > 0).length} reviews
              </div>
            </div>
          </div>
        </div>

        {/* Pending Reviews */}
        {completedProjects.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-dark-900">Projects Awaiting Review</h2>
              <span className="bg-orange-100 text-orange-800 text-sm px-2 py-1 rounded-full">
                {completedProjects.length} pending
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedProjects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={project.professionalAvatar}
                      alt={project.professionalName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-dark-900">{project.name}</h3>
                      <p className="text-sm text-gray-600">{project.professionalName} • {project.projectType}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Completed</p>
                      <p className="text-xs text-gray-500">{project.completedDate}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddReview(project)}
                    className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm"
                  >
                    Write Review
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

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
                <option value="with-response">With Response</option>
                <option value="recent">Recent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  <img
                    src={review.professionalAvatar}
                    alt={review.professionalName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-dark-900">{review.title}</h3>
                      {review.verified && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        review.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {review.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <strong>{review.projectName}</strong> • {review.professionalName} • {review.projectType}
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                      <span>{review.budget}</span>
                      <span>{review.duration}</span>
                      <span>{review.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-600 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{review.comment}</p>
              
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
              
              {/* Recommendation */}
              <div className="flex items-center space-x-2 mb-4">
                <div className={`p-2 rounded-full ${review.wouldRecommend ? 'bg-green-100' : 'bg-red-100'}`}>
                  {review.wouldRecommend ? (
                    <ThumbsUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <ThumbsDown className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {review.wouldRecommend ? 'Would recommend' : 'Would not recommend'}
                </span>
              </div>
              
              {/* Professional Response */}
              {review.response && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="h-3 w-3 text-primary-600" />
                    </div>
                    <span className="text-sm font-medium text-dark-900">Response from {review.professionalName}</span>
                  </div>
                  <p className="text-sm text-gray-700">{review.response}</p>
                </div>
              )}
              
              {/* Review Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-sm">{review.helpful} helpful</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors">
                    <Share2 className="h-4 w-4" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Eye className="h-3 w-3" />
                  <span>Public review</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
            <p className="text-gray-600 mb-4">Adjust your filters or search terms to find reviews.</p>
            <button
              onClick={() => setShowAddReviewModal(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              Write Your First Review
            </button>
          </div>
        )}
      </div>

      {/* Add Review Modal */}
      {showAddReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-dark-900">
                {selectedProject ? `Review: ${selectedProject.name}` : 'Write a Review'}
              </h3>
              <button
                onClick={() => setShowAddReviewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {selectedProject && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg mb-6">
                <img
                  src={selectedProject.professionalAvatar}
                  alt={selectedProject.professionalName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-dark-900">{selectedProject.professionalName}</p>
                  <p className="text-sm text-gray-600">{selectedProject.projectType}</p>
                </div>
              </div>
            )}
            
            <div className="space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overall Rating *
                </label>
                <div className="flex items-center space-x-1">
                  {renderStars(newReview.rating, 'h-8 w-8', true, (rating) => 
                    setNewReview(prev => ({ ...prev, rating }))
                  )}
                  <span className="ml-3 text-sm text-gray-600">({newReview.rating} star{newReview.rating !== 1 ? 's' : ''})</span>
                </div>
              </div>
              
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Title *
                </label>
                <input
                  type="text"
                  value={newReview.title}
                  onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Summarize your experience"
                />
              </div>
              
              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Review *
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Share details about your experience..."
                />
              </div>
              
              {/* Recommendation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Would you recommend this professional?
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="recommend"
                      checked={newReview.wouldRecommend === true}
                      onChange={() => setNewReview(prev => ({ ...prev, wouldRecommend: true }))}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Yes, I would recommend</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="recommend"
                      checked={newReview.wouldRecommend === false}
                      onChange={() => setNewReview(prev => ({ ...prev, wouldRecommend: false }))}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">No, I would not recommend</span>
                  </label>
                </div>
              </div>
              
              {/* Photos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Photos (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Upload photos of the completed work</p>
                  <label className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 cursor-pointer">
                    Choose Photos
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files)}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {/* Image Preview */}
                {newReview.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                    {newReview.images.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeImage(image.id)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowAddReviewModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={submitReview}
                  disabled={!newReview.title || !newReview.comment}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Review</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 