import React from 'react';
import { Calendar, MapPin, DollarSign, Bookmark, BookmarkCheck } from 'lucide-react';
import { Event } from '../stores/eventStore';
import { useEventStore } from '../stores/eventStore';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { savedEvents, saveEvent, unsaveEvent } = useEventStore();
  const isSaved = savedEvents.includes(event.id);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const formatPrice = (price: number | null) => {
    if (price === null || price === 0) return 'Free';
    return `$${price}`;
  };
  
  const handleSaveToggle = () => {
    if (isSaved) {
      unsaveEvent(event.id);
    } else {
      saveEvent(event.id);
    }
  };

  return (
    <div className="card hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <div className="relative">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-xl">
          <div className="absolute bottom-4 left-4">
            <span className="badge-primary">
              {event.category}
            </span>
          </div>
        </div>
        <button
          onClick={handleSaveToggle}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
          aria-label={isSaved ? "Unsave event" : "Save event"}
        >
          {isSaved ? (
            <BookmarkCheck className="h-5 w-5 text-primary-600" />
          ) : (
            <Bookmark className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>
      
      <div className="flex-grow p-4 flex flex-col">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{event.title}</h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>
        
        <div className="mt-auto space-y-2">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formatDate(event.date)} • {event.time}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.location}, {event.city}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <DollarSign className="h-4 w-4 mr-2" />
            <span>{formatPrice(event.price)}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 pt-0">
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full text-center"
        >
          View Details
        </a>
      </div>
    </div>
  );
};

export default EventCard;