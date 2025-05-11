import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { mockEvents } from '../data/mockEvents';

export type Event = {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  keywords: string[];
  date: Date;
  time: string;
  location: string;
  city: string;
  price: number | null;
  image: string;
  url: string;
};

interface EventState {
  events: Event[];
  savedEvents: string[];
  notifiedEvents: string[];
  fetchEvents: (city: string, categories?: string[]) => Promise<Event[]>;
  saveEvent: (eventId: string) => void;
  unsaveEvent: (eventId: string) => void;
  markAsNotified: (eventId: string) => void;
}

export const useEventStore = create<EventState>()((set, get) => ({
  events: mockEvents,
  savedEvents: [],
  notifiedEvents: [],
  fetchEvents: async (city, categories) => {
    // In a real app, we would fetch events from an API
    // For the MVP, we'll filter the mock data
    const filtered = mockEvents.filter(
      (event) => 
        event.city.toLowerCase() === city.toLowerCase() && 
        (!categories?.length || categories.includes(event.category))
    );
    set({ events: filtered });
    return filtered;
  },
  saveEvent: (eventId) => 
    set((state) => ({
      savedEvents: [...state.savedEvents, eventId]
    })),
  unsaveEvent: (eventId) => 
    set((state) => ({
      savedEvents: state.savedEvents.filter(id => id !== eventId)
    })),
  markAsNotified: (eventId) => 
    set((state) => ({
      notifiedEvents: [...state.notifiedEvents, eventId]
    })),
}));