import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import AuthButtons from '../navigation/AuthButtons'
import logo from '../../assets/logo.svg'
import { Users, CircleDot, Home } from 'lucide-react'

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<'community' | 'communities' | 'openspaces'>('community');
  const location = useLocation();
  const navigate = useNavigate();

  // Set active tab based on current route
  useEffect(() => {
    if (location.pathname.includes('/open-spaces')) {
      setActiveTab('openspaces');
    } else if (location.pathname.includes('/communities')) {
      setActiveTab('communities');
    } else if (location.pathname.includes('/community/')) {
      // This is the key change - when viewing a specific community detail page
      // we want to highlight the Communities tab
      setActiveTab('communities');
    } else if (location.pathname === '/community' || location.pathname === '/community/') {
      setActiveTab('community');
    }
  }, [location.pathname]);

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Handle tab click
  const handleTabClick = (tab: 'community' | 'communities' | 'openspaces') => {
    setActiveTab(tab);
    
    // Navigate to the appropriate route
    if (tab === 'community') {
      navigate('/community');
    } else if (tab === 'communities') {
      navigate('/communities');
    } else if (tab === 'openspaces') {
      navigate('/open-spaces');
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100' 
          : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="ChatAndBuild Logo" className="h-8 w-8 mr-2" />
                <span className="text-xl font-bold text-indigo-600">ChatAndBuild</span>
              </Link>
              
              <nav className="hidden md:ml-10 md:flex">
                <div className="flex items-center">
                  <button 
                    className={`flex items-center px-4 py-2 text-base font-medium transition-all duration-200 border-b-2 ${
                      activeTab === 'community' 
                        ? 'text-black border-blue-500' 
                        : 'text-gray-500 border-transparent hover:text-gray-900'
                    }`}
                    onClick={() => handleTabClick('community')}
                  >
                    <Home className="mr-2 h-5 w-5" />
                    Home
                  </button>
                  
                  <button 
                    className={`flex items-center px-4 py-2 text-base font-medium transition-all duration-200 border-b-2 ${
                      activeTab === 'communities' 
                        ? 'text-black border-blue-500' 
                        : 'text-gray-500 border-transparent hover:text-gray-900'
                    }`}
                    onClick={() => handleTabClick('communities')}
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Communities
                  </button>
                  
                  <button 
                    className={`flex items-center px-4 py-2 text-base font-medium transition-all duration-200 border-b-2 ${
                      activeTab === 'openspaces' 
                        ? 'text-black border-blue-500' 
                        : 'text-gray-500 border-transparent hover:text-gray-900'
                    }`}
                    onClick={() => handleTabClick('openspaces')}
                  >
                    <CircleDot className="mr-2 h-5 w-5" />
                    Open Spaces
                  </button>
                </div>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              {/* Auth buttons */}
              <AuthButtons />
            </div>
          </div>
        </div>
      </header>
      {/* Add padding to account for fixed header */}
      <div className="h-16"></div>
    </>
  )
}
