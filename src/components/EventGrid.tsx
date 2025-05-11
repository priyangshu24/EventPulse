import React from 'react';
import EventCard from './EventCard';
import { Event } from '../stores/eventStore';

interface EventGridProps {
  events: Event[];
  loading?: boolean;
}

const EventGrid: React.FC<EventGridProps> = ({ events, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="card h-80 animate-pulse">
            <div className="bg-gray-300 dark:bg-gray-700 w-full h-48 rounded-t-xl" />
            <div className="p-4 space-y-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-full" />
              <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          No events found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try changing your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {events.map((event) => (
        <div key={event.id} className="animate-slide-up">
          <EventCard event={event} />
        </div>
      ))}
    </div>
  );
};

export default EventGrid;