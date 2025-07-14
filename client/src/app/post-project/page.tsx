'use client';

import { useState } from 'react';
import { ChevronDown, Upload, MapPin, DollarSign, FileText, CheckCircle, Shield } from 'lucide-react';

export default function PostProjectPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    budget: '',
    timeline: '',
    skills: [] as string[],
    requiredRoles: [] as string[],
    images: [] as string[],
    urgency: 'flexible'
  });

  const categories = [
    'Kitchen Remodeling',
    'Bathroom Renovation',
    'Electrical Work',
    'Plumbing',
    'Roofing',
    'HVAC Services',
    'Landscaping',
    'Painting',
    'Flooring',
    'Carpentry',
    'Interior Design',
    'General Handyman'
  ];

  const budgetRanges = [
    'Under $500',
    '$500 - $1,000',
    '$1,000 - $2,500',
    '$2,500 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000+'
  ];

  const timelineOptions = [
    'ASAP (Within 1 week)',
    'Within 2 weeks',
    'Within 1 month',
    'Within 2-3 months',
    'More than 3 months',
    'Flexible timing'
  ];

  const skillsOptions = [
    'Licensed Professional Required',
    'Insurance Required',
    'Experience with Permits',
    'Quality Materials',
    'Cleanup Included',
    'Warranty Provided',
    'References Available',
    'Emergency Service'
  ];

  const roleOptions = [
    { value: 'home-pro', label: 'Home Pro', description: 'المحترف الذي ينفذ الخدمة' },
    { value: 'specialist', label: 'A-List Specialist', description: 'مستشار يقوم بالتنسيق والتخطيط' },
    { value: 'crew-member', label: 'Crew Member', description: 'عضو فريق يتم توظيفه في مهمات صغيرة أو مساعدات' }
  ];

  const steps = [
    { number: 1, title: 'Project Details', description: 'Tell us about your project' },
    { number: 2, title: 'Requirements', description: 'Specify your needs' },
    { number: 3, title: 'Budget & Timeline', description: 'Set your preferences' },
    { number: 4, title: 'Review & Post', description: 'Confirm and publish' }
  ];

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleRoleToggle = (role: string) => {
    setFormData(prev => ({
      ...prev,
      requiredRoles: prev.requiredRoles.includes(role)
        ? prev.requiredRoles.filter(r => r !== role)
        : [...prev.requiredRoles, role]
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-dark-900 mb-3">Project Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Kitchen Renovation - Modern Design"
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-600 mt-2">Be specific and descriptive to attract the right professionals</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-900 mb-3">Category *</label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                >
                  <option value="">Select a category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-900 mb-3">Project Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={6}
                placeholder="Describe your project in detail. Include dimensions, materials, specific requirements, and any other important information..."
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
              <p className="text-sm text-gray-600 mt-2">Minimum 50 characters. The more details you provide, the better proposals you&apos;ll receive.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-900 mb-3">Project Location *</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Enter city, state or zip code"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-dark-900 mb-4">Required Skills & Qualifications</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {skillsOptions.map((skill, index) => (
                  <label key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-xl hover:bg-primary-50 hover:border-primary-300 transition-all duration-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.skills.includes(skill)}
                      onChange={() => handleSkillToggle(skill)}
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-dark-700">{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-900 mb-4">Required Professional Roles</label>
              <p className="text-sm text-gray-600 mb-4">Select the types of professionals you need for this project</p>
              <div className="space-y-3">
                {roleOptions.map((role) => (
                  <label key={role.value} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-xl hover:bg-primary-50 hover:border-primary-300 transition-all duration-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.requiredRoles.includes(role.value)}
                      onChange={() => handleRoleToggle(role.value)}
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-dark-900 mb-1">{role.label}</div>
                      <div className="text-sm text-dark-600">{role.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-900 mb-3">Project Images</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-400 hover:bg-primary-50/30 transition-all duration-200">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-dark-900 mb-2">Upload Project Images</h3>
                <p className="text-gray-600 mb-4">Add photos of the space, inspiration images, or reference materials</p>
                <button className="bg-primary-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200">
                  Choose Files
                </button>
                <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB each</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-900 mb-3">Additional Requirements</label>
              <textarea
                rows={4}
                placeholder="Any specific requirements, materials preferences, or special instructions..."
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-dark-900 mb-3">Project Budget *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {budgetRanges.map((budget, index) => (
                  <label key={index} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:bg-primary-50 hover:border-primary-300 transition-all duration-200 cursor-pointer">
                    <input
                      type="radio"
                      name="budget"
                      value={budget}
                      checked={formData.budget === budget}
                      onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-dark-700">{budget}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-900 mb-3">Timeline *</label>
              <div className="space-y-3">
                {timelineOptions.map((timeline, index) => (
                  <label key={index} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:bg-primary-50 hover:border-primary-300 transition-all duration-200 cursor-pointer">
                    <input
                      type="radio"
                      name="timeline"
                      value={timeline}
                      checked={formData.timeline === timeline}
                      onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-dark-700">{timeline}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-900 mb-3">Project Urgency</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'urgent', label: 'Urgent', desc: 'Need to start immediately' },
                  { value: 'moderate', label: 'Moderate', desc: 'Can wait a few weeks' },
                  { value: 'flexible', label: 'Flexible', desc: 'No rush, quality matters' }
                ].map((urgency, index) => (
                  <label key={index} className="flex flex-col space-y-2 p-4 border border-gray-200 rounded-xl hover:bg-primary-50 hover:border-primary-300 transition-all duration-200 cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="urgency"
                        value={urgency.value}
                        checked={formData.urgency === urgency.value}
                        onChange={(e) => setFormData(prev => ({ ...prev, urgency: e.target.value }))}
                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                      />
                      <span className="text-sm font-semibold text-dark-900">{urgency.label}</span>
                    </div>
                    <span className="text-xs text-gray-600 ml-6">{urgency.desc}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary-200">
              <h3 className="font-heading font-semibold text-xl text-dark-900 mb-4">Project Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-dark-600">Title:</span>
                  <p className="text-dark-900 font-medium">{formData.title || 'Not specified'}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-dark-600">Category:</span>
                  <p className="text-dark-900 font-medium">{formData.category || 'Not specified'}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-dark-600">Location:</span>
                  <p className="text-dark-900 font-medium">{formData.location || 'Not specified'}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-dark-600">Budget:</span>
                  <p className="text-dark-900 font-medium">{formData.budget || 'Not specified'}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-dark-600">Timeline:</span>
                  <p className="text-dark-900 font-medium">{formData.timeline || 'Not specified'}</p>
                </div>
                
                {formData.skills.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-dark-600">Required Skills:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {formData.skills.map((skill, index) => (
                        <span key={index} className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {formData.requiredRoles.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-dark-600">Required Professional Roles:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {formData.requiredRoles.map((roleValue, index) => {
                        const role = roleOptions.find(r => r.value === roleValue);
                        return (
                          <span key={index} className="bg-accent-100 text-accent-700 px-2 py-1 rounded-full text-xs">
                            {role?.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h4 className="font-semibold text-lg text-dark-900 mb-4">What happens next?</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold text-sm">1</span>
                  </div>
                  <span className="text-dark-700">Your project will be posted and visible to professionals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold text-sm">2</span>
                  </div>
                  <span className="text-dark-700">Qualified professionals will submit proposals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold text-sm">3</span>
                  </div>
                  <span className="text-dark-700">Review proposals and hire the best professional</span>
                </div>
              </div>
            </div>

            <div className="bg-accent-50 border border-accent-200 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="h-6 w-6 text-accent-600" />
                <h4 className="font-semibold text-lg text-dark-900">Protected by A-List Guarantee</h4>
              </div>
              <ul className="space-y-2 text-sm text-dark-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Verified professional profiles</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Secure payment protection</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>24/7 customer support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Money-back guarantee</span>
                </li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,191,255,0.1),transparent_60%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="text-center space-y-6">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-dark-900 leading-tight">
              Post Your
              <span className="block text-gradient-primary">Home Project</span>
            </h1>
            <p className="text-xl lg:text-2xl text-dark-600 leading-relaxed max-w-3xl mx-auto">
              Get connected with skilled professionals for your home improvement needs. It&apos;s fast, secure, and completely free.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-200 ${
                    currentStep >= step.number
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.number}
                  </div>
                  <div className="text-center mt-2">
                    <div className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-primary-600' : 'text-gray-600'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500 hidden md:block">
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 transition-all duration-200 ${
                    currentStep > step.number ? 'bg-primary-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-upwork-lg border border-gray-200 overflow-hidden">
            <div className="p-8">
              <div className="mb-8">
                <h2 className="font-heading font-semibold text-2xl text-dark-900 mb-2">
                  {steps[currentStep - 1].title}
                </h2>
                <p className="text-dark-600">
                  {steps[currentStep - 1].description}
                </p>
              </div>

              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="bg-gray-50 px-8 py-6 flex items-center justify-between">
              <div>
                {currentStep > 1 && (
                  <button
                    onClick={handlePrevious}
                    className="text-gray-600 hover:text-dark-900 font-medium transition-colors duration-200"
                  >
                    ← Previous
                  </button>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Step {currentStep} of {steps.length}
                </span>
                {currentStep < 4 ? (
                  <button
                    onClick={handleNext}
                    className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Continue →
                  </button>
                ) : (
                  <button className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-accent-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Post Project
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-white rounded-2xl shadow-upwork border border-gray-200 p-6">
            <h3 className="font-semibold text-lg text-dark-900 mb-4">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <FileText className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                <h4 className="font-medium text-dark-900 mb-1">Writing Tips</h4>
                <p className="text-sm text-gray-600">Learn how to write effective project descriptions</p>
              </div>
              <div className="text-center p-4">
                <DollarSign className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                <h4 className="font-medium text-dark-900 mb-1">Budget Guide</h4>
                <p className="text-sm text-gray-600">Get help setting the right budget for your project</p>
              </div>
              <div className="text-center p-4">
                <Shield className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                <h4 className="font-medium text-dark-900 mb-1">Safety Tips</h4>
                <p className="text-sm text-gray-600">Learn how to verify professionals and stay safe</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 