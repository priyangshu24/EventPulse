import React from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Event } from '../stores/eventStore';

interface NotificationCardProps {
  event: Event;
  timestamp: Date;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ event, timestamp }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };
  
  const formatTimeSince = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="card hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="flex">
        <div className="w-1/3 md:w-1/4">
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-2/3 md:w-3/4 p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-base md:text-lg line-clamp-1">{event.title}</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
              {formatTimeSince(timestamp)}
            </span>
          </div>
          
          <div className="mt-2 space-y-1">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              <span>{formatDate(event.date)} • {event.time}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="h-3.5 w-3.5 mr-1.5" />
              <span className="line-clamp-1">{event.location}, {event.city}</span>
            </div>
          </div>
          
          <div className="mt-3 flex items-center">
            <span className="badge-primary mr-2">
              {event.category}
            </span>
            
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center"
            >
              Details
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;