import React, { useState, useEffect } from 'react';
import { useEventStore } from '../stores/eventStore';
import { useUserStore } from '../stores/userStore';
import { NotificationService } from '../services/notification';
import NotificationCard from '../components/NotificationCard';
import { MessageSquare, BellOff } from 'lucide-react';

const NotificationsPage: React.FC = () => {
  const { preferences, name, city } = useUserStore();
  const { events, notifiedEvents, markAsNotified } = useEventStore();
  const [relevantEvents, setRelevantEvents] = useState<{ event: any; timestamp: Date }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkForRelevantEvents = async () => {
      setLoading(true);
      
      if (!preferences.length || !city) {
        setRelevantEvents([]);
        setLoading(false);
        return;
      }
      
      // Find events that match user preferences
      const matchingEvents = await NotificationService.checkEventsForUser(
        preferences, 
        events, 
        city
      );
      
      // Create mock notification history
      const mockTimestamps = matchingEvents.map(event => {
        // Mark as notified if not already
        if (!notifiedEvents.includes(event.id)) {
          markAsNotified(event.id);
        }
        
        // Generate a random timestamp in the last 24 hours
        const timeAgo = Math.floor(Math.random() * 24 * 60); // minutes
        const timestamp = new Date();
        timestamp.setMinutes(timestamp.getMinutes() - timeAgo);
        
        return {
          event,
          timestamp
        };
      });
      
      // Sort by timestamp (newest first)
      mockTimestamps.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      
      setRelevantEvents(mockTimestamps);
      setLoading(false);
    };
    
    checkForRelevantEvents();
  }, [preferences, events, city, notifiedEvents, markAsNotified]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Notifications</h1>
      
      {name && city ? (
        <div className="mb-6 card p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 flex items-start">
          <MessageSquare className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3 mt-0.5" />
          <div>
            <p className="text-gray-800 dark:text-gray-200">
              <span className="font-medium">Text Notifications:</span> We'll send you messages via WhatsApp/Telegram when new events match your preferences.
            </p>
          </div>
        </div>
      ) : (
        <div className="mb-6 card p-4 bg-warning-50 dark:bg-warning-900/20 border border-warning-100 dark:border-warning-800 flex items-start">
          <BellOff className="w-6 h-6 text-warning-600 dark:text-warning-400 mr-3 mt-0.5" />
          <div>
            <p className="text-gray-800 dark:text-gray-200 mb-2">
              <span className="font-medium">Notifications not set up:</span> Please complete your profile to receive event notifications.
            </p>
            <a href="/preferences" className="btn-primary inline-block">Complete Profile</a>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {loading ? (
          // Loading skeleton
          [...Array(3)].map((_, index) => (
            <div key={index} className="card flex animate-pulse">
              <div className="w-1/3 md:w-1/4 bg-gray-300 dark:bg-gray-700 h-28" />
              <div className="w-2/3 md:w-3/4 p-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4" />
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-full mb-2" />
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
              </div>
            </div>
          ))
        ) : relevantEvents.length > 0 ? (
          relevantEvents.map(({ event, timestamp }) => (
            <NotificationCard 
              key={`${event.id}-${timestamp.getTime()}`}
              event={event}
              timestamp={timestamp}
            />
          ))
        ) : (
          <div className="card p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You don't have any notifications yet.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Update your preferences or browse events to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;