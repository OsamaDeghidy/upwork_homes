import Link from 'next/link';
import { Search, MapPin, ChevronDown, Shield } from 'lucide-react';

export default function Hero() {
  const popularServices = [
    'Kitchen Remodeling',
    'Bathroom Renovation', 
    'Electrical Work',
    'Plumbing',
    'Roofing',
    'HVAC Services',
    'Landscaping',
    'Painting'
  ];

  const serviceCategories = [
    'All Services',
    'Kitchen Remodeling',
    'Bathroom Renovation',
    'Electrical Work',
    'Plumbing',
    'Roofing',
    'HVAC Services',
    'Landscaping',
    'Painting',
    'Flooring',
    'Carpentry'
  ];

  const stats = [
    { value: '50,000+', label: 'Trusted Professionals' },
    { value: '98%', label: 'Customer Satisfaction' },
    { value: '1M+', label: 'Projects Completed' },
    { value: '24/7', label: 'Support Available' },
  ];

  const trustedCompanies = [
    { name: 'Home Depot', logo: 'https://logos-world.net/wp-content/uploads/2020/05/Home-Depot-Logo.png' },
    { name: 'Lowes', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Lowes-Logo.png' },
    { name: 'Angie List', logo: 'https://cdn.worldvectorlogo.com/logos/angies-list-1.svg' },
  ];

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,191,255,0.1),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,206,0,0.08),transparent_60%)]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-primary-200/30 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-accent-200/20 rounded-full blur-2xl animate-float-delay"></div>
      
      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="text-center space-y-12">
          {/* Headline */}
          <div className="space-y-6">
            <div className="inline-flex items-center bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
              <Shield className="h-4 w-4 mr-2" />
              Verified & Trusted Professionals
            </div>
            
            <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-dark-900 leading-tight">
              Find Trusted Professionals
              <span className="block text-gradient-primary">For Your Home</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-dark-600 leading-relaxed max-w-4xl mx-auto">
              Connect with vetted home service professionals in your area. From kitchen remodels to electrical work, 
              find the right expert for your project today.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-upwork-lg p-6 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Service Type */}
                <div className="relative">
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    What service do you need?
                  </label>
                  <div className="relative">
                    <select className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none">
                      {serviceCategories.map((service, index) => (
                        <option key={index} value={service.toLowerCase().replace(/\s+/g, '-')}>
                          {service}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Location */}
                <div className="relative">
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Where do you need it?
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your zip code or city"
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <button className="w-full bg-gradient-primary text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                    <Search className="h-5 w-5 mr-2" />
                    Search Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Services */}
          <div className="space-y-6">
            <p className="text-sm text-dark-600 font-medium">Popular Services:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularServices.map((service, index) => (
                <Link
                  key={index}
                  href={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group inline-flex items-center bg-white/80 backdrop-blur-sm text-dark-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-50 hover:text-primary-700 hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-primary-300"
                >
                  <span className="relative">
                    {service}
                    <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-gradient-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-dark-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Trusted Companies */}
          <div className="space-y-6 pt-8">
            <p className="text-sm text-dark-600 font-medium">Trusted by leading companies</p>
            <div className="flex items-center justify-center space-x-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              {trustedCompanies.map((company, index) => (
                <img
                  key={index}
                  src={company.logo}
                  alt={company.name}
                  className="h-8 hover:scale-110 transition-transform duration-300"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 