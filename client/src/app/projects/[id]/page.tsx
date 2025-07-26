'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
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
  AlertCircle,
  Loader2
} from 'lucide-react';
import { projectsService } from '@/lib/projects';
import { proposalsService, Proposal } from '@/lib/proposals';
import { Project } from '@/lib/types';
import { useAuthStore } from '@/lib/store';

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const projectSlug = params.id as string;
  const { user } = useAuthStore();
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalData, setProposalData] = useState({
    coverLetter: '',
    timeline: '',
    budget: ''
  });
  const [proposalStatuses, setProposalStatuses] = useState<{[key: string]: string}>({});
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [proposalsLoading, setProposalsLoading] = useState(false);
  const [submittingProposal, setSubmittingProposal] = useState(false);


  // Helper function to extract project ID from slug
  const extractProjectId = (slug: string): number | null => {
    // Assuming slug format is like "project-title-123" where 123 is the ID
    const parts = slug.split('-');
    const lastPart = parts[parts.length - 1];
    const id = parseInt(lastPart);
    return isNaN(id) ? null : id;
  };

  // Fetch project data from backend
  useEffect(() => {
    const fetchProject = async (): Promise<Project | null> => {
      try {
        setLoading(true);
        const projectData = await projectsService.getProject(params.id);
        setProject(projectData);
        return projectData;
      } catch (err: any) {
        console.error('Error fetching project:', err);
        setError(err.response?.data?.message || 'Failed to load project data');
        return null;
      } finally {
        setLoading(false);
      }
    };

    const fetchProposals = async (projectData?: Project) => {
       try {
         setProposalsLoading(true);
         // Use project ID from the fetched project data
         const projectId = projectData?.id || project?.id;
         if (projectId) {
           const proposalsData = await proposalsService.getProjectProposals(projectId);
           setProposals(proposalsData.results);
         }
       } catch (err) {
         console.error('Error fetching proposals:', err);
       } finally {
         setProposalsLoading(false);
       }
     };

     const loadData = async () => {
       const projectData = await fetchProject();
       if (projectData) {
         await fetchProposals(projectData);
       }
     };
     
     loadData();
   }, [params.id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Project</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link 
            href="/find-work" 
            className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  // No project found
  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Project Not Found</h2>
          <p className="text-gray-600 mb-4">The requested project could not be found</p>
          <Link 
            href="/find-work" 
            className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  // Format project data for display
  const formatBudget = (project: Project) => {
    if (project.budget_display) {
      return project.budget_display;
    }
    if (project.budget_min && project.budget_max) {
      return `$${project.budget_min.toLocaleString()} - $${project.budget_max.toLocaleString()}`;
    }
    if (project.budget_min) {
      return `From $${project.budget_min.toLocaleString()}`;
    }
    return 'Negotiable';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      'published': 'Open',
      'in_progress': 'In Progress',
      'completed': 'Completed',
      'cancelled': 'Cancelled',
      'paused': 'Paused',
      'draft': 'Draft'
    };
    return statusMap[status] || status;
  };

  const getUrgencyText = (urgency: string) => {
    const urgencyMap: Record<string, string> = {
      'low': 'Not Urgent',
      'medium': 'Medium Priority',
      'high': 'High Priority',
      'urgent': 'Very Urgent'
    };
    return urgencyMap[urgency] || urgency;
  };

  // Use real project data
  const displayProject = {
    id: project.id,
    title: project.title,
    description: project.description,
    budget: formatBudget(project),
    location: project.location,
    postedTime: formatDate(project.created_at),
    category: project.category?.name || 'Not Specified',
    requiredRole: project.required_roles?.join(', ') || 'Not Specified',
    experienceLevel: 'Required Experience Level',
    status: getStatusText(project.status),
    featured: project.is_featured,
    client: {
      name: project.client?.first_name && project.client?.last_name 
        ? `${project.client.first_name} ${project.client.last_name}`
        : project.client?.username || 'Client',
      avatar: project.client?.avatar || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.8, // This would come from reviews system
      reviews: 23, // This would come from reviews system
      verified: project.client?.is_verified || false,
      paymentVerified: true, // This would come from payment system
      location: project.client?.location || project.location,
      memberSince: project.client?.date_joined ? new Date(project.client.date_joined).getFullYear().toString() : '2022',
      totalSpent: "$45,000", // This would come from payment history
      hireRate: "85%", // This would come from hiring statistics
      activeProjects: 2 // This would come from active projects count
    },
    tags: [...(project.required_skills || []), ...(project.required_roles || [])],
    proposals: project.proposals_count || 0,
    urgency: getUrgencyText(project.urgency),
    skills: project.required_skills || [],
    timeline: project.timeline || 'Not Specified',
    paymentMethod: "Protected by A-List Guarantee",
    attachments: project.attachments || [],
    images: project.images || []
  };



  const handleAcceptProposal = async (proposalId: number) => {
    try {
      setProposalStatuses(prev => ({
        ...prev,
        [proposalId]: 'accepting...'
      }));
      
      await proposalsService.acceptProposal(proposalId.toString());
      
      setProposalStatuses(prev => ({
        ...prev,
        [proposalId]: 'accepted'
      }));
      
      // Refresh proposals to get updated data
       if (project?.id) {
         const proposalsData = await proposalsService.getProjectProposals(project.id);
         setProposals(proposalsData.results);
       }
      
      console.log('Proposal accepted successfully');
    } catch (error) {
      console.error('Error accepting proposal:', error);
      setProposalStatuses(prev => ({
        ...prev,
        [proposalId]: 'pending'
      }));
      // You could show an error message to the user here
    }
  };

  const handleRejectProposal = async (proposalId: number, reason?: string) => {
    try {
      setProposalStatuses(prev => ({
        ...prev,
        [proposalId]: 'rejecting...'
      }));
      
      await proposalsService.rejectProposal(proposalId.toString(), reason);
      
      setProposalStatuses(prev => ({
        ...prev,
        [proposalId]: 'rejected'
      }));
      
      // Refresh proposals to get updated data
       if (project?.id) {
         const proposalsData = await proposalsService.getProjectProposals(project.id);
         setProposals(proposalsData.results);
       }
      
      console.log('Proposal rejected successfully');
    } catch (error) {
      console.error('Error rejecting proposal:', error);
      setProposalStatuses(prev => ({
        ...prev,
        [proposalId]: 'pending'
      }));
      // You could show an error message to the user here
    }
  };

  const handleMessageFreelancer = (freelancerId: number) => {
    // Navigate to messages page with the freelancer and project
    router.push(`/messages?freelancer=${freelancerId}&project=${project.id}`);
  };

  const handleProposalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!project?.id) {
      setError('Project ID not found');
      return;
    }

    try {
      setSubmittingProposal(true);
      setError(null); // Clear any previous errors
      
      // Parse budget amount from string (remove $ and commas)
      const budgetAmount = parseFloat(proposalData.budget.replace(/[$,]/g, ''));
      
      if (isNaN(budgetAmount) || budgetAmount <= 0) {
        alert('Please enter a valid budget amount');
        return;
      }

      const proposalPayload = {
        project: project.id,
        cover_letter: proposalData.coverLetter,
        amount: budgetAmount,
        currency: 'USD',
        timeline: proposalData.timeline,
        priority: 'normal' as const,
        response_time: '24 hours'
      };

      const newProposal = await proposalsService.createProposal(proposalPayload);
      
      // Update proposals list
      setProposals(prev => [newProposal, ...prev]);
      
      // Reset form and close modal
      setProposalData({
        coverLetter: '',
        timeline: '',
        budget: ''
      });
      setShowProposalForm(false);
      
      // Show success message (you can add a toast notification here)
      alert('Proposal submitted successfully!');
      
    } catch (err: any) {
      console.error('Error submitting proposal:', err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Failed to submit proposal. Please try again.';
      alert(errorMessage);
    } finally {
      setSubmittingProposal(false);
    }
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
                {displayProject.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <span>Posted {displayProject.postedTime}</span>
                <span>•</span>
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {displayProject.location}
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {project.views_count || 0} views
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
            {displayProject.featured && (
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl p-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span className="font-semibold">Featured Project</span>
                  <span className="text-primary-100">•</span>
                  <span className="text-primary-100">Priority Display</span>
                </div>
              </div>
            )}

            {/* Project Overview */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  {displayProject.category}
                </span>
                {displayProject.requiredRole && (
                  <span className="bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-sm font-medium">
                    {displayProject.requiredRole}
                  </span>
                )}
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                  {displayProject.experienceLevel}
                </span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {displayProject.status}
                </span>
                {project.urgency === 'urgent' && (
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>Urgent</span>
                  </span>
                )}
              </div>

              <h2 className="font-heading font-semibold text-xl text-dark-900 mb-4">Project Description</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-dark-600 leading-relaxed whitespace-pre-line">
                  {displayProject.description}
                </p>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="text-sm text-gray-600">Budget</div>
                    <div className="font-semibold text-green-600">{displayProject.budget}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-600">Timeline</div>
                    <div className="font-semibold text-dark-900">{displayProject.timeline}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <div>
                    <div className="text-sm text-gray-600">Deadline</div>
                    <div className="font-semibold text-dark-900">{displayProject.urgency}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="text-sm text-gray-600">Payment Method</div>
                    <div className="font-semibold text-dark-900">{displayProject.paymentMethod}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Required Skills */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <h3 className="font-heading font-semibold text-lg text-dark-900 mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {displayProject.skills.map((skill, index) => (
                  <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Images */}
            {project.images && project.images.length > 0 && (
              <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
                <h3 className="font-heading font-semibold text-lg text-dark-900 mb-4">Project Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {project.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.file}
                        alt={`Project Image ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200 group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Attachments */}
            {project.attachments && project.attachments.length > 0 && (
              <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
                <h3 className="font-heading font-semibold text-lg text-dark-900 mb-4">Attachments</h3>
                <div className="space-y-3">
                  {project.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <FileText className="h-5 w-5 text-gray-600" />
                      <div className="flex-1">
                        <div className="font-medium text-dark-900">{attachment.name}</div>
                        <div className="text-sm text-gray-600">{attachment.size}</div>
                      </div>
                      <a 
                        href={attachment.file}
                        download
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Proposals */}
            <div className="bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
              <h3 className="font-heading font-semibold text-lg text-dark-900 mb-4">
                Proposals ({proposals.length})
              </h3>
              {proposalsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading proposals...</p>
                </div>
              ) : proposals.length > 0 ? (
                <div className="space-y-6">
                  {proposals.map((proposal) => {
                    const currentStatus = proposalStatuses[proposal.id] || proposal.status;
                    return (
                    <div key={proposal.id} className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-start space-x-4">
                        <img
                          src={proposal.professional?.avatar || proposal.freelancer?.avatar || '/default-avatar.svg'}
                          alt={proposal.professional?.display_name || proposal.professional?.full_name || proposal.freelancer?.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="font-semibold text-dark-900">
                                  {proposal.professional?.display_name || proposal.professional?.full_name || proposal.freelancer?.name}
                                </h4>
                                {(proposal.professional?.is_verified || proposal.freelancer?.verified) && (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                )}
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span>
                                    {proposal.professional?.rating_average || proposal.freelancer?.rating || 0} 
                                    ({proposal.professional?.rating_count || proposal.freelancer?.reviews || 0} reviews)
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{proposal.professional?.location || proposal.freelancer?.location || 'Location not specified'}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-green-600">
                                {proposal.amount ? `${proposal.amount} ${proposal.currency || 'USD'}` : proposal.budget}
                              </div>
                              <div className="text-sm text-gray-600">{proposal.timeline}</div>
                            </div>
                          </div>
                          
                          <p className="text-dark-600 text-sm mb-4 leading-relaxed">
                            {proposal.cover_letter || proposal.coverLetter}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              Submitted {proposal.created_at ? new Date(proposal.created_at).toLocaleDateString() : proposal.submittedAt}
                            </span>
                            
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => handleMessageFreelancer(proposal.professional?.id || proposal.id)}
                                className="flex items-center space-x-2 px-4 py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                              >
                                <MessageCircle className="h-4 w-4" />
                                <span>Message</span>
                              </button>
                              
                              {/* Only show Accept/Reject buttons if current user is the project owner */}
                              {user && project.client?.id === user.id && currentStatus === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleRejectProposal(proposal.id)}
                                    disabled={currentStatus === 'accepting...' || currentStatus === 'rejecting...'}
                                    className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 disabled:opacity-50"
                                  >
                                    {currentStatus === 'rejecting...' ? 'Rejecting...' : 'Reject'}
                                  </button>
                                  <button
                                    onClick={() => handleAcceptProposal(proposal.id)}
                                    disabled={currentStatus === 'accepting...' || currentStatus === 'rejecting...'}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
                                  >
                                    {currentStatus === 'accepting...' ? 'Accepting...' : 'Accept'}
                                  </button>
                                </>
                              )}
                              
                              {currentStatus === 'accepted' && (
                                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
                                  Accepted
                                </span>
                              )}
                              
                              {currentStatus === 'rejected' && (
                                <span className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium">
                                  Rejected
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );  
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-500">
                    <p className="text-lg font-medium mb-2">No proposals yet</p>
                    <p className="text-sm">Be the first to submit a proposal for this project!</p>
                  </div>
                </div>
              )}
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
                  <span className="font-semibold text-dark-900">{proposals.length}</span>
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
                  src={project.client?.profile_picture || '/default-avatar.svg'}
                  alt={`${project.client?.first_name || ''} ${project.client?.last_name || ''}`}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-dark-900">
                      {project.client?.first_name} {project.client?.last_name}
                    </h4>
                    {project.client?.is_verified && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                    {project.client?.payment_verified && (
                      <Shield className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-dark-600">
                      {project.client?.rating || 'Not Rated'} ({project.client?.total_reviews || 0} reviews)
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <MapPin className="h-3 w-3" />
                    <span>{project.client?.location || 'Not Specified'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Member since:</span>
                  <span className="font-semibold text-dark-900">
                    {project.client?.date_joined ? new Date(project.client.date_joined).getFullYear() : 'Not Specified'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Total spent:</span>
                  <span className="font-semibold text-dark-900">{project.client?.total_spent || 'Not Specified'}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Hire rate:</span>
                  <span className="font-semibold text-dark-900">{project.client?.hire_rate || 'Not Specified'}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Active projects:</span>
                  <span className="font-semibold text-dark-900">{project.client?.active_projects || 0}</span>
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
                    disabled={submittingProposal}
                    className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submittingProposal ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    <span>{submittingProposal ? 'Submitting...' : 'Submit Proposal'}</span>
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