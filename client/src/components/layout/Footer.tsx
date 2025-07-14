import Link from 'next/link';
import Image from 'next/image';
import { Home, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const footerSections = {
    'For Clients': [
      { name: 'How to Hire', href: '/how-to-hire' },
      { name: 'Talent Marketplace', href: '/talent-marketplace' },
      { name: 'Project Catalog', href: '/project-catalog' },
      { name: 'Enterprise', href: '/enterprise' },
    ],
    'For Professionals': [
      { name: 'How to Find Work', href: '/how-to-find-work' },
      { name: 'Direct Contracts', href: '/direct-contracts' },
      { name: 'Find Freelance Jobs', href: '/find-freelance-jobs' },
      { name: 'Success Stories', href: '/success-stories' },
    ],
    'Resources': [
      { name: 'Help & Support', href: '/help' },
      { name: 'Trust & Safety', href: '/trust-safety' },
      { name: 'Quality Guide', href: '/quality-guide' },
      { name: 'Community', href: '/community' },
    ],
    'Company': [
      { name: 'About Us', href: '/about' },
      { name: 'Leadership', href: '/leadership' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Instagram', href: '#', icon: Instagram },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <Home className="h-8 w-8 text-primary-400" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary-400 rounded-full"></div>
              </div>
              <div className="font-heading font-bold text-xl">
                A-List
                <span className="text-primary-400"> Home Pros</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              The world&apos;s work marketplace. We connect businesses with independent professionals and agencies around the globe.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                >
                  <span className="sr-only">{social.name}</span>
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white mb-4 text-sm">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Apps and Recognition */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Download our app</h4>
              <div className="flex space-x-4">
                <Link href="#" className="block">
                  <Image
                    src="https://cdn.worldvectorlogo.com/logos/download-on-the-app-store-apple.svg"
                    alt="Download on App Store"
                    width={120}
                    height={40}
                    className="h-10"
                  />
                </Link>
                <Link href="#" className="block">
                  <Image
                    src="https://cdn.worldvectorlogo.com/logos/get-it-on-google-play.svg"
                    alt="Get it on Google Play"
                    width={120}
                    height={40}
                    className="h-10"
                  />
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Recognition</h4>
              <div className="flex space-x-6 items-center">
                <Image
                  src="https://logos-world.net/wp-content/uploads/2020/11/G2-Logo.png"
                  alt="G2 Crowd"
                  width={60}
                  height={32}
                  className="h-8 opacity-70 hover:opacity-100 transition-opacity"
                />
                <Image
                  src="https://cdn.worldvectorlogo.com/logos/trustpilot-1.svg"
                  alt="Trustpilot"
                  width={80}
                  height={32}
                  className="h-8 opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © 2024 A-List Home Professionals Inc. All Rights Reserved
          </div>
          <div className="flex flex-wrap gap-6">
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies"
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
            >
              Cookie Settings
            </Link>
            <Link
              href="/accessibility"
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 