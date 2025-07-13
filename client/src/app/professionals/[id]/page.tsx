'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle, 
  Shield, 
  Award, 
  Phone, 
  Mail, 
  Globe, 
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Heart,
  Share2,
  Flag,
  MessageCircle,
  Briefcase,
  Camera,
  FileText,
  ThumbsUp,
  Eye,
  Filter,
  Grid,
  List
} from 'lucide-react';

export default function ProfessionalProfilePage() {
  const params = useParams();
  const professionalId = params.id as string;
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  
  // Sample professional data - using default data for all IDs for simplicity
  const professional = {
    id: professionalId,
    name: professionalId === '2' ? "David Rodriguez" : 
          professionalId === '3' ? "Maria Santos" : "Sarah Mitchell",
    title: professionalId === '2' ? "Master Electrician" : 
           professionalId === '3' ? "Interior Designer" : "Kitchen Designer & Contractor",
    avatar: professionalId === '2' ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" :
            professionalId === '3' ? "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" :
            "https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: professionalId === '2' ? 5.0 : 
            professionalId === '3' ? 4.8 : 4.9,
    reviews: professionalId === '2' ? 89 : 
             professionalId === '3' ? 156 : 127,
    hourlyRate: professionalId === '2' ? "$95" : 
                professionalId === '3' ? "$75" : "$85",
    location: professionalId === '2' ? "Miami, FL" : 
              professionalId === '3' ? "Chicago, IL" : "Los Angeles, CA",
    category: professionalId === '2' ? "Electrical Work" : 
              professionalId === '3' ? "Interior Design" : "Kitchen Remodeling",
    role: professionalId === '3' ? "A-List Specialist" : "Home Pro",
    verified: true,
    topRated: true,
    online: true,
    responseTime: "2 hours",
    completedProjects: 45,
    successRate: 98,
    memberSince: "2019",
    totalEarned: "$285,000",
    description: professionalId === '2' ? 
      "Licensed master electrician with 12 years of experience. Specializing in residential upgrades, smart home installations, and electrical panel updates. I provide safe, reliable electrical services with a focus on code compliance and customer satisfaction." :
      professionalId === '3' ?
      "Creative interior designer with a passion for transforming spaces. Specializing in modern and contemporary designs with sustainable materials. I work closely with clients to create functional and beautiful living spaces that reflect their personal style." :
      "Experienced kitchen designer with 8+ years specializing in modern renovations. Licensed contractor with expertise in custom cabinetry and high-end finishes. I work closely with clients to transform their vision into reality while maintaining the highest standards of quality and craftsmanship.",
    skills: professionalId === '2' ? 
      ["Panel Upgrades", "Smart Home", "Code Compliance", "Emergency Service", "Wiring", "Troubleshooting", "Safety Inspection", "Electrical Design"] :
      professionalId === '3' ?
      ["Space Planning", "Color Consultation", "Sustainable Design", "Furniture Selection", "Lighting Design", "Project Coordination", "3D Visualization", "Material Selection"] :
      ["Custom Cabinetry", "Modern Design", "Project Management", "3D Rendering", "Space Planning", "Lighting Design", "Tile Installation", "Countertop Installation"],
    specializations: professionalId === '2' ? 
      ["Electrical Work", "Smart Home Installation", "Panel Upgrades"] :
      professionalId === '3' ?
      ["Interior Design", "Space Planning", "Sustainable Design"] :
      ["Kitchen Remodeling", "Bathroom Renovation", "Interior Design"],
    certifications: professionalId === '2' ? 
      ["Master Licensed Electrician", "EPA Certified", "OSHA 10 Certified"] :
      professionalId === '3' ?
      ["NCIDQ Certified", "LEED Accredited Professional", "Sustainable Design Certified"] :
      ["Licensed Contractor", "NKBA Certified", "Lead-Safe Certified"],
    badges: ["Top Rated", "Licensed", "Insured", "Fast Response"],
    languages: ["English", "Spanish"],
    education: professionalId === '2' ? 
      "Electrical Engineering Technology, Trade School Certification" :
      professionalId === '3' ?
      "Bachelor of Fine Arts in Interior Design, Art Institute" :
      "Bachelor's in Interior Design, UCLA",
    experience: professionalId === '2' ? 
      "12+ years in electrical work" :
      professionalId === '3' ?
      "7+ years in interior design" :
      "8+ years in residential renovation",
    serviceArea: professionalId === '2' ? 
      "Miami-Dade County, Broward County" :
      professionalId === '3' ?
      "Chicago Metro Area, Cook County" :
      "Los Angeles County, Orange County",
    availability: "Available for new projects",
    portfolio: [
      {
        id: 1,
        title: "Modern Kitchen Renovation",
        category: "Kitchen Remodeling",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Complete kitchen transformation with custom cabinetry and quartz countertops",
        budget: "$12,000",
        duration: "3 weeks",
        year: "2024"
      },
      {
        id: 2,
        title: "Luxury Master Bathroom",
        category: "Bathroom Renovation",
        image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Spa-like bathroom with custom tile work and premium fixtures",
        budget: "$8,500",
        duration: "2 weeks",
        year: "2024"
      },
      {
        id: 3,
        title: "Contemporary Kitchen Design",
        category: "Kitchen Remodeling",
        image: "https://images.unsplash.com/photo-1556909114-8c9b3e3d9e9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Open concept kitchen with island and modern appliances",
        budget: "$15,000",
        duration: "4 weeks",
        year: "2023"
      },
      {
        id: 4,
        title: "Small Space Kitchen",
        category: "Kitchen Remodeling",
        image: "https://images.unsplash.com/photo-1556909114-5b9d47f1c5e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Maximizing storage in a compact kitchen space",
        budget: "$7,500",
        duration: "2 weeks",
        year: "2023"
      },
      {
        id: 5,
        title: "Guest Bathroom Makeover",
        category: "Bathroom Renovation",
        image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Elegant guest bathroom with vintage-inspired design",
        budget: "$4,500",
        duration: "1 week",
        year: "2023"
      },
      {
        id: 6,
        title: "Open Concept Living",
        category: "Interior Design",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Living room and kitchen integration with modern design",
        budget: "$20,000",
        duration: "5 weeks",
        year: "2023"
      }
    ],
    reviews: [
      {
        id: 1,
        client: {
          name: "Michael Johnson",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          location: "Beverly Hills, CA"
        },
        rating: 5,
        date: "2 weeks ago",
        project: "Kitchen Renovation",
        comment: "Sarah exceeded all expectations! The kitchen transformation is absolutely stunning. Her attention to detail and professional approach made the entire process smooth and enjoyable. The timeline was met exactly as promised, and the quality of work is exceptional. I've already recommended her to three friends!",
        helpful: 12
      },
      {
        id: 2,
        client: {
          name: "Lisa Chen",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          location: "Santa Monica, CA"
        },
        rating: 5,
        date: "1 month ago",
        project: "Bathroom Renovation",
        comment: "Working with Sarah was a fantastic experience. She really listened to our vision and brought creative solutions we hadn't considered. The bathroom looks like it belongs in a luxury hotel! Her communication throughout the project was excellent, and she kept us updated on every step.",
        helpful: 8
      },
      {
        id: 3,
        client: {
          name: "David Rodriguez",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          location: "Pasadena, CA"
        },
        rating: 4,
        date: "2 months ago",
        project: "Kitchen Design",
        comment: "Great work on our kitchen remodel. Sarah provided excellent design ideas and the execution was professional. The only minor issue was a slight delay due to material availability, but she communicated this well in advance and adjusted the timeline accordingly.",
        helpful: 5
      }
    ]
  };

  const portfolioCategories = ['all', 'Kitchen Remodeling', 'Bathroom Renovation', 'Interior Design'];
  
  const filteredPortfolio = selectedCategory === 'all' 
    ? professional.portfolio 
    : professional.portfolio.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/professionals" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex-1">
              <h1 className="font-heading font-bold text-xl md:text-2xl text-dark-900">
                {professional.name}
              </h1>
              <p className="text-gray-600 mt-1">{professional.title}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-primary-600 border border-gray-300 rounded-lg transition-colors duration-200">
                <Share2 className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-red-500 border border-gray-300 rounded-lg transition-colors duration-200">
                <Heart className="h-4 w-4" />
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
            {/* Profile Overview */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <div className="flex items-start space-x-6">
                <div className="relative">
                  <img
                    src={professional.avatar}
                    alt={professional.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  {professional.online && (
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 border-3 border-white rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="font-heading font-bold text-2xl text-dark-900">{professional.name}</h2>
                    {professional.verified && (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    )}
                    {professional.topRated && (
                      <Award className="h-6 w-6 text-yellow-500" />
                    )}
                  </div>
                  
                  <p className="text-lg text-dark-600 font-medium mb-3">{professional.title}</p>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="text-lg font-semibold text-dark-900">{professional.rating}</span>
                      <span className="text-dark-600">({professional.reviews.length} reviews)</span>
                    </div>
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      {professional.role}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-dark-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{professional.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Responds in {professional.responseTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Member since {professional.memberSince}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <h3 className="font-heading font-semibold text-xl text-dark-900 mb-4">About</h3>
              <div className="prose prose-gray max-w-none">
                <p className="text-dark-600 leading-relaxed whitespace-pre-line">
                  {professional.description}
                </p>
              </div>
            </div>

            {/* Skills & Specializations */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <h3 className="font-heading font-semibold text-xl text-dark-900 mb-4">Skills & Specializations</h3>
              
              <div className="mb-6">
                <h4 className="font-medium text-dark-900 mb-3">Core Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {professional.skills.map((skill, index) => (
                    <span key={index} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-dark-900 mb-3">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {professional.specializations.map((spec, index) => (
                    <span key={index} className="bg-accent-50 text-accent-700 px-3 py-1 rounded-full text-sm font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-dark-900 mb-3">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {professional.certifications.map((cert, index) => (
                    <span key={index} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-semibold text-xl text-dark-900">Portfolio</h3>
                <div className="flex items-center space-x-4">
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {portfolioCategories.map((category) => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                  
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-all duration-200 ${
                        viewMode === 'grid' 
                          ? 'bg-white text-primary-600 shadow-sm' 
                          : 'text-gray-600 hover:text-primary-600'
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-all duration-200 ${
                        viewMode === 'list' 
                          ? 'bg-white text-primary-600 shadow-sm' 
                          : 'text-gray-600 hover:text-primary-600'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPortfolio.map((item) => (
                    <div key={item.id} className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-xl mb-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                          <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium">
                          {item.category}
                        </div>
                      </div>
                      <h4 className="font-semibold text-dark-900 mb-2">{item.title}</h4>
                      <p className="text-dark-600 text-sm mb-3">{item.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{item.budget}</span>
                        <span>{item.duration}</span>
                        <span>{item.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPortfolio.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-dark-900 mb-1">{item.title}</h4>
                        <p className="text-dark-600 text-sm mb-2">{item.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{item.category}</span>
                          <span>{item.budget}</span>
                          <span>{item.duration}</span>
                          <span>{item.year}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <h3 className="font-heading font-semibold text-xl text-dark-900 mb-6">Client Reviews</h3>
              
              <div className="space-y-6">
                {professional.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.client.avatar}
                        alt={review.client.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-dark-900">{review.client.name}</h4>
                            <p className="text-sm text-gray-600">{review.client.location}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1 mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <p className="text-sm text-gray-600">{review.date}</p>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <span className="bg-primary-50 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                            {review.project}
                          </span>
                        </div>
                        
                        <p className="text-dark-600 leading-relaxed mb-3">{review.comment}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <button className="flex items-center space-x-1 hover:text-primary-600 transition-colors duration-200">
                            <ThumbsUp className="h-4 w-4" />
                            <span>Helpful ({review.helpful})</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary-600 mb-1">{professional.hourlyRate}/hr</div>
                <div className="text-sm text-gray-600">Starting Rate</div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Response Time:</span>
                  <span className="font-semibold text-dark-900">{professional.responseTime}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Success Rate:</span>
                  <span className="font-semibold text-dark-900">{professional.successRate}%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Completed Projects:</span>
                  <span className="font-semibold text-dark-900">{professional.completedProjects}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Total Earned:</span>
                  <span className="font-semibold text-dark-900">{professional.totalEarned}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200">
                  Hire Now
                </button>
                <button className="w-full bg-gray-100 text-dark-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Send Message</span>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4" />
                    <span>Payment protected</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Identity verified</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Award className="h-4 w-4" />
                    <span>Top rated professional</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Info */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <h3 className="font-heading font-semibold text-lg text-dark-900 mb-4">Professional Info</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-dark-900 mb-2">Education</h4>
                  <p className="text-dark-600 text-sm">{professional.education}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-dark-900 mb-2">Experience</h4>
                  <p className="text-dark-600 text-sm">{professional.experience}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-dark-900 mb-2">Service Area</h4>
                  <p className="text-dark-600 text-sm">{professional.serviceArea}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-dark-900 mb-2">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {professional.languages.map((lang, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-dark-900 mb-2">Availability</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-dark-600 text-sm">{professional.availability}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <h3 className="font-heading font-semibold text-lg text-dark-900 mb-4">Badges & Achievements</h3>
              
              <div className="grid grid-cols-2 gap-3">
                {professional.badges.map((badge, index) => (
                  <div key={index} className="bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200 rounded-lg p-3 text-center">
                    <Award className="h-6 w-6 text-primary-600 mx-auto mb-1" />
                    <span className="text-sm font-medium text-dark-900">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 