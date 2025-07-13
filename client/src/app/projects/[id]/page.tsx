'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar, 
  Star, 
  CheckCircle, 
  Shield, 
  Users, 
  Heart, 
  Award, 
  TrendingUp, 
  FileText, 
  Send,
  Flag,
  Share2,
  Bookmark,
  MessageCircle,
  Eye,
  ThumbsUp,
  AlertCircle
} from 'lucide-react';

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = params.id as string;
  
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalData, setProposalData] = useState({
    coverLetter: '',
    timeline: '',
    budget: '',
    attachments: [] as string[]
  });

  // Sample project data - in real app, this would be fetched based on projectId
  const project = {
    id: projectId,
    title: "Kitchen Renovation - Modern Design",
    description: "Looking for an experienced contractor to renovate our 150 sq ft kitchen. We want a modern design with quartz countertops, new cabinets, and updated lighting. The project includes demolition, electrical updates, plumbing modifications, and full installation of new fixtures and appliances.\n\nThe current kitchen is outdated with oak cabinets from the 1990s, laminate countertops, and fluorescent lighting. We're looking for a complete transformation to a modern, functional space.\n\nProject scope includes:\n- Complete demolition of existing kitchen\n- Electrical updates including new outlets and under-cabinet lighting\n- Plumbing modifications for new sink location\n- Installation of new quartz countertops\n- Custom cabinet installation\n- Tile backsplash installation\n- New appliance installation (appliances provided by us)\n- Painting and finishing work\n- Cleanup and disposal of old materials",
    budget: "$8,000 - $12,000",
    location: "Los Angeles, CA",
    postedTime: "2 hours ago",
    category: "Kitchen Remodeling",
    requiredRole: "Home Pro",
    experienceLevel: "Expert Level",
    status: "Open",
    featured: true,
    client: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 23,
      verified: true,
      paymentVerified: true,
      location: "Los Angeles, CA",
      memberSince: "2022",
      totalSpent: "$45,000",
      hireRate: "85%",
      activeProjects: 2
    },
    tags: ["Modern Design", "Quartz Countertops", "Lighting", "Licensed Required"],
    proposals: 12,
    urgency: "Within 2 weeks",
    skills: ["Licensed Professional Required", "Insurance Required", "Quality Materials"],
    timeline: "2-3 weeks",
    paymentMethod: "Escrow Protected",
    attachments: [
      {
        name: "Current Kitchen Photos",
        type: "images",
        count: 8
      },
      {
        name: "Inspiration Ideas",
        type: "images", 
        count: 5
      },
      {
        name: "Kitchen Layout Plan",
        type: "document",
        count: 1
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-8c9b3e3d9e9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-5b9d47f1c5e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  };

  const similarProjects = [
    {
      id: 2,
      title: "Bathroom Renovation - Master Suite",
      budget: "$5,000 - $8,000",
      location: "Beverly Hills, CA",
      category: "Bathroom Renovation",
      proposals: 8,
      postedTime: "1 day ago"
    },
    {
      id: 3,
      title: "Living Room Flooring Installation",
      budget: "$3,000 - $5,000",
      location: "Santa Monica, CA",
      category: "Flooring",
      proposals: 15,
      postedTime: "3 days ago"
    }
  ];

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle proposal submission
    console.log('Proposal submitted:', proposalData);
    setShowProposalForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/find-work" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex-1">
              <h1 className="font-heading font-bold text-xl md:text-2xl text-dark-900">
                {project.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <span>Posted {project.postedTime}</span>
                <span>•</span>
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {project.location}
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  24 views
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-primary-600 border border-gray-300 rounded-lg transition-colors duration-200">
                <Share2 className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-red-500 border border-gray-300 rounded-lg transition-colors duration-200">
                <Heart className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-yellow-500 border border-gray-300 rounded-lg transition-colors duration-200">
                <Bookmark className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-red-500 border border-gray-300 rounded-lg transition-colors duration-200">
                <Flag className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Status */}
            {project.featured && (
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl p-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span className="font-semibold">Featured Project</span>
                  <span className="text-primary-100">•</span>
                  <span className="text-primary-100">Priority visibility</span>
                </div>
              </div>
            )}

            {/* Project Overview */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  {project.category}
                </span>
                <span className="bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-sm font-medium">
                  {project.requiredRole}
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                  {project.experienceLevel}
                </span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {project.status}
                </span>
                {project.urgency === 'ASAP' && (
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>URGENT</span>
                  </span>
                )}
              </div>

              <h2 className="font-heading font-semibold text-xl text-dark-900 mb-4">Project Description</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-dark-600 leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="text-sm text-gray-600">Budget</div>
                    <div className="font-semibold text-green-600">{project.budget}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-600">Timeline</div>
                    <div className="font-semibold text-dark-900">{project.timeline}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <div>
                    <div className="text-sm text-gray-600">Deadline</div>
                    <div className="font-semibold text-dark-900">{project.urgency}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="text-sm text-gray-600">Payment</div>
                    <div className="font-semibold text-dark-900">{project.paymentMethod}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Required Skills */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <h3 className="font-heading font-semibold text-lg text-dark-900 mb-4">Required Skills & Qualifications</h3>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, index) => (
                  <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Images */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <h3 className="font-heading font-semibold text-lg text-dark-900 mb-4">Project Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Project image ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-200 group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Attachments */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <h3 className="font-heading font-semibold text-lg text-dark-900 mb-4">Attachments</h3>
              <div className="space-y-3">
                {project.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <div className="flex-1">
                      <div className="font-medium text-dark-900">{attachment.name}</div>
                      <div className="text-sm text-gray-600">{attachment.count} {attachment.type}</div>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Projects */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <h3 className="font-heading font-semibold text-lg text-dark-900 mb-4">Similar Projects</h3>
              <div className="space-y-4">
                {similarProjects.map((similarProject) => (
                  <div key={similarProject.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-dark-900 mb-2">
                          <Link href={`/projects/${similarProject.id}`} className="hover:text-primary-600">
                            {similarProject.title}
                          </Link>
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {similarProject.budget}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {similarProject.location}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {similarProject.proposals} proposals
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {similarProject.postedTime}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Panel */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-green-600 mb-1">{project.budget}</div>
                <div className="text-sm text-gray-600">Project Budget</div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Proposals:</span>
                  <span className="font-semibold text-dark-900">{project.proposals}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Timeline:</span>
                  <span className="font-semibold text-dark-900">{project.timeline}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-semibold text-dark-900">{project.location}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Experience:</span>
                  <span className="font-semibold text-dark-900">{project.experienceLevel}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => setShowProposalForm(!showProposalForm)}
                  className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200"
                >
                  Submit Proposal
                </button>
                <button className="w-full bg-gray-100 text-dark-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Message Client</span>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>Payment protected by A-List Guarantee</span>
                </div>
              </div>
            </div>

            {/* Client Information */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <h3 className="font-heading font-semibold text-lg text-dark-900 mb-4">About the Client</h3>
              
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={project.client.avatar}
                  alt={project.client.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-dark-900">{project.client.name}</h4>
                    {project.client.verified && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                    {project.client.paymentVerified && (
                      <Shield className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-dark-600">
                      {project.client.rating} ({project.client.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <MapPin className="h-3 w-3" />
                    <span>{project.client.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Member since:</span>
                  <span className="font-semibold text-dark-900">{project.client.memberSince}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Total spent:</span>
                  <span className="font-semibold text-dark-900">{project.client.totalSpent}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Hire rate:</span>
                  <span className="font-semibold text-dark-900">{project.client.hireRate}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Active projects:</span>
                  <span className="font-semibold text-dark-900">{project.client.activeProjects}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Proposal Form Modal */}
      {showProposalForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="font-heading font-semibold text-xl text-dark-900 mb-6">Submit Your Proposal</h3>
              
              <form onSubmit={handleProposalSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    value={proposalData.coverLetter}
                    onChange={(e) => setProposalData(prev => ({...prev, coverLetter: e.target.value}))}
                    rows={6}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Introduce yourself and explain why you're the best fit for this project..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Your Timeline *
                    </label>
                    <input
                      type="text"
                      value={proposalData.timeline}
                      onChange={(e) => setProposalData(prev => ({...prev, timeline: e.target.value}))}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="e.g., 2-3 weeks"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Your Budget *
                    </label>
                    <input
                      type="text"
                      value={proposalData.budget}
                      onChange={(e) => setProposalData(prev => ({...prev, budget: e.target.value}))}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="e.g., $9,500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Attachments
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload portfolio, certificates, or relevant documents</p>
                    <button type="button" className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Choose Files
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6">
                  <button
                    type="button"
                    onClick={() => setShowProposalForm(false)}
                    className="text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Submit Proposal</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 