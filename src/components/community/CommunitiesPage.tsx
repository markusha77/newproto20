import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Users, Briefcase, ChevronRight } from 'lucide-react'

interface Community {
  id: string;
  name: string;
  logo: string;
  members: number;
  description: string;
  projects: number;
  joinStatus: 'join' | 'request' | 'joined';
}

const communities: Community[] = [
  {
    id: '1',
    name: 'EcoTech Innovators',
    logo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
    members: 3,
    description: 'A community of developers, designers, and entrepreneurs building technology solutions for environmental sustainability.',
    projects: 2,
    joinStatus: 'join'
  },
  {
    id: '2',
    name: 'AI Creators Collective',
    logo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
    members: 3,
    description: 'A collaborative community exploring the frontiers of artificial intelligence and machine learning applications.',
    projects: 1,
    joinStatus: 'request'
  },
  {
    id: '3',
    name: 'Design Systems Guild',
    logo: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
    members: 3,
    description: 'A professional community dedicated to advancing the practice of design systems and component-based design.',
    projects: 1,
    joinStatus: 'join'
  }
];

const CommunitiesPage: React.FC = () => {
  const [hoveredCommunity, setHoveredCommunity] = useState<string | null>(null);

  const renderJoinButton = (status: Community['joinStatus'], communityId: string) => {
    switch (status) {
      case 'join':
        return (
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Join
          </button>
        );
      case 'request':
        return (
          <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            Request Access
          </button>
        );
      case 'joined':
        return (
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md cursor-default">
            Joined
          </button>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      
      {/* Horizontal divider between navbar and header */}
      <div className="w-full h-px bg-gray-300"></div>
      
      {/* Header with border */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Communities</h1>
          <p className="text-gray-600 mt-2">
            Explore and join partner communities
          </p>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => (
            <Link 
              to={`/community/${community.id}`} 
              key={community.id}
              className="block h-full"
              onMouseEnter={() => setHoveredCommunity(community.id)}
              onMouseLeave={() => setHoveredCommunity(null)}
            >
              <div className={`bg-white border ${hoveredCommunity === community.id ? 'border-blue-300 shadow-md' : 'border-gray-200'} rounded-lg overflow-hidden transition-all duration-200 h-full flex flex-col`}>
                {/* Community header with gradient background */}
                <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
                  <div className="absolute -bottom-10 left-6">
                    <img 
                      src={community.logo} 
                      alt={community.name}
                      className="h-20 w-20 rounded-lg border-4 border-white shadow-sm object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80";
                      }}
                    />
                  </div>
                </div>
                
                {/* Community content */}
                <div className="pt-12 px-6 pb-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{community.name}</h3>
                    <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${hoveredCommunity === community.id ? 'transform translate-x-1' : ''}`} />
                  </div>
                  
                  <p className="text-gray-700 mb-4 line-clamp-2 h-12">
                    {community.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6">
                    <div className="flex space-x-4">
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-1" />
                        <span className="text-sm">{community.members} members</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Briefcase className="h-4 w-4 mr-1" />
                        <span className="text-sm">{community.projects} projects</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {renderJoinButton(community.joinStatus, community.id)}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export default CommunitiesPage
