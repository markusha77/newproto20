import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, MessageSquare, Eye } from 'lucide-react'
import { formatDate } from '../../utils/dateUtils'
import { saveScrollPosition } from '../../utils/scrollUtils'

interface Author {
  name: string;
  avatar: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  author: Author;
  likes: number;
  comments: number;
  views: number;
  tags: string[];
  createdAt: string;
}

interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'community'; // Add variant prop to control layout
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project,
  variant = 'default' // Default variant for main Community Page
}) => {
  const navigate = useNavigate();
  
  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on a link or button inside the card
    if ((e.target as HTMLElement).closest('a, button')) {
      return;
    }
    
    // Save current scroll position before navigating
    saveScrollPosition('scrollPosition-/community');
    
    // Navigate to project detail page
    navigate(`/community/project/${project.id}`);
  };
  
  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    saveScrollPosition('scrollPosition-/community');
  };
  
  return (    
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            // Fallback image if the project image fails to load
            e.currentTarget.src = "https://images.unsplash.com/photo-1555421689-3f034debb7a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
          }}
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
          <Link 
            to={`/community/project/${project.id}`}
            onClick={handleTitleClick}
            className="block"
          >
            {project.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex items-center mb-4">
          <img 
            src={project.author.avatar} 
            alt={project.author.name}
            className="h-8 w-8 rounded-full mr-2"
            onError={(e) => {
              // Fallback avatar if the author avatar fails to load
              e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80";
            }}
          />
          <span className="text-sm text-gray-700">{project.author.name}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
        
        {/* Conditional rendering based on variant */}
        {variant === 'community' ? (
          // Community page variant with aligned date and metrics
          <div className="flex items-center justify-between text-gray-500 text-sm">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-1 text-red-500" />
                <span>{project.likes}</span>
              </div>
              
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1 text-blue-500" />
                <span>{project.comments}</span>
              </div>
              
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1 text-green-500" />
                <span>{project.views}</span>
              </div>
            </div>
            <span>{formatDate(project.createdAt)}</span>
          </div>
        ) : (
          // Default variant for main Community Page (original layout)
          <div className="flex items-center justify-between text-gray-500 text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-1 text-red-500" />
                <span>{project.likes}</span>
              </div>
              
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1 text-blue-500" />
                <span>{project.comments}</span>
              </div>
              
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1 text-green-500" />
                <span>{project.views}</span>
              </div>
            </div>
            <span>{formatDate(project.createdAt)}</span>
          </div>
        )}
      </div>
    </div>
  )
}
