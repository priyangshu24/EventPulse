import { useChatStore } from '../stores/chatStore';
import { useUserStore } from '../stores/userStore';
import { useEventStore } from '../stores/eventStore';
import { Event } from '../stores/eventStore';
import { NotificationService } from './notification';

export class LLMService {
  static async processUserMessage(message: string): Promise<string> {
    // In a real application, this would use LangChain to process the message
    // For the MVP, we'll simulate responses based on keywords
    
    const chatStore = useChatStore.getState();
    const userStore = useUserStore.getState();
    const eventStore = useEventStore.getState();
    
    chatStore.setIsLoading(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const messageLower = message.toLowerCase();
    let response = '';
    
    if (messageLower.includes('hello') || messageLower.includes('hi')) {
      response = `Hello${userStore.name ? ' ' + userStore.name : ''}! How can I help you discover events today?`;
    } 
    else if (messageLower.includes('event') && (messageLower.includes('like') || messageLower.includes('prefer'))) {
      // Extract preferences
      const categories = this.extractCategories(message);
      
      if (categories.length > 0) {
        const preferenceToAdd = {
          category: categories[0],
          subcategories: [],
          keywords: this.extractKeywords(message),
          excludeKeywords: []
        };
        
        userStore.addPreference(preferenceToAdd);
        
        response = `Great! I've added your preference for ${categories[0]} events. I'll notify you when relevant events are happening in ${userStore.city || 'your city'}.`;
      } else {
        response = "I couldn't quite understand what type of events you're interested in. Can you tell me more specifically?";
      }
    }
    else if (messageLower.includes('recommend') || messageLower.includes('suggestion')) {
      if (!userStore.city) {
        response = "I'd be happy to recommend events, but first I need to know which city you're in. Please set your city in the preferences section.";
      } else {
        const events = await eventStore.fetchEvents(userStore.city);
        const matchingEvents = await NotificationService.checkEventsForUser(
          userStore.preferences, 
          events, 
          userStore.city
        );
        
        if (matchingEvents.length > 0) {
          response = `Based on your preferences, here are some events in ${userStore.city} you might enjoy:\n\n` +
            matchingEvents.slice(0, 3).map(event => 
              `• ${event.title} - ${this.formatDate(event.date)}, ${event.time}`
            ).join('\n');
        } else {
          response = `I don't see any events matching your preferences in ${userStore.city} right now. Try updating your preferences or check back later for new events.`;
        }
      }
    }
    else if (messageLower.includes('set') && messageLower.includes('city')) {
      const cities = ['new york', 'san francisco', 'chicago', 'los angeles', 'portland', 'denver', 'san diego'];
      const matchedCity = cities.find(city => messageLower.includes(city.toLowerCase()));
      
      if (matchedCity) {
        userStore.setCity(matchedCity);
        response = `Great! I've set your city to ${matchedCity}. I'll now look for events in that area.`;
      } else {
        response = "I couldn't identify which city you want to set. Please try again by saying something like 'Set my city to San Francisco'.";
      }
    }
    else if (messageLower.includes('notification')) {
      response = "I'll send you notifications via WhatsApp/Telegram when events matching your preferences are happening in your city.";
    }
    else if (messageLower.includes('thank')) {
      response = "You're welcome! Feel free to ask me about events anytime.";
    }
    else {
      response = "I'm your event assistant. I can help you discover events based on your preferences, recommend events in your city, or notify you about upcoming events. What would you like to know?";
    }
    
    chatStore.setIsLoading(false);
    return response;
  }
  
  private static extractCategories(message: string): string[] {
    const categories = [
      'Music', 'Arts', 'Technology', 'Food', 'Sports', 
      'Business', 'Health', 'Film', 'Entertainment'
    ];
    
    const messageLower = message.toLowerCase();
    return categories.filter(category => 
      messageLower.includes(category.toLowerCase())
    );
  }
  
  private static extractKeywords(message: string): string[] {
    // Simple keyword extraction
    // In a real app, we would use NLP techniques
    const messageLower = message.toLowerCase();
    const keywords: string[] = [];
    
    const potentialKeywords = [
      'concert', 'festival', 'exhibition', 'conference', 'workshop', 
      'networking', 'outdoor', 'free', 'family', 'weekend', 'evening'
    ];
    
    potentialKeywords.forEach(keyword => {
      if (messageLower.includes(keyword)) {
        keywords.push(keyword);
      }
    });
    
    return keywords;
  }
  
  private static formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  }
}