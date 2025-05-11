import { Event } from '../stores/eventStore';
import { Preference } from '../stores/userStore';

export class NotificationService {
  static async sendNotification(user: { name: string }, event: Event): Promise<boolean> {
    // In a real application, this would call WhatsApp/Telegram APIs
    // For the MVP, we'll just simulate the process
    
    console.log(`Sending notification to ${user.name} about event: ${event.title}`);
    
    // Simulate network request
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Notification sent to ${user.name}`);
        resolve(true);
      }, 1000);
    });
  }
  
  static async checkEventsForUser(
    preferences: Preference[], 
    events: Event[], 
    city: string
  ): Promise<Event[]> {
    // Filter events based on user preferences and city
    if (!preferences.length || !city) return [];
    
    return events.filter(event => {
      // Match city
      if (event.city.toLowerCase() !== city.toLowerCase()) return false;
      
      // Check if any preference matches this event
      return preferences.some(preference => {
        // Match category
        if (preference.category !== 'Any' && 
            preference.category !== event.category) return false;
            
        // Match keywords
        const hasMatchingKeyword = preference.keywords.length === 0 || 
          preference.keywords.some(keyword => 
            event.title.toLowerCase().includes(keyword.toLowerCase()) ||
            event.description.toLowerCase().includes(keyword.toLowerCase()) ||
            event.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase()))
          );
            
        // Check exclude keywords
        const hasExcludedKeyword = preference.excludeKeywords.some(keyword => 
          event.title.toLowerCase().includes(keyword.toLowerCase()) ||
          event.description.toLowerCase().includes(keyword.toLowerCase()) ||
          event.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase()))
        );
        
        return hasMatchingKeyword && !hasExcludedKeyword;
      });
    });
  }
}