import React, { useState, useEffect } from 'react';
import { useEventStore } from '../stores/eventStore';
import { useUserStore } from '../stores/userStore';
import EventGrid from '../components/EventGrid';
import CategoryFilter from '../components/CategoryFilter';
import { Search, MapPin, Filter } from 'lucide-react';

const EventsPage: React.FC = () => {
  const { city } = useUserStore();
  const { events, fetchEvents } = useEventStore();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState(city || 'Worldwide');
  const [showFilters, setShowFilters] = useState(false);
  
  // Available categories
  const categories = [
    'All', 'Music', 'Arts', 'Technology', 'Food', 
    'Sports', 'Business', 'Health', 'Film', 'Entertainment'
  ];

  // Available locations
  const locations = ['Worldwide', 'Australia', 'San Francisco', 'New York', 'Chicago', 'Los Angeles'];
  
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      await fetchEvents(selectedLocation);
      setLoading(false);
    };
    
    loadEvents();
  }, [selectedLocation, fetchEvents]);
  
  const handleCategoryChange = (category: string) => {
    if (category === 'All') {
      setSelectedCategories([]);
      return;
    }
    
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
  };
  
  const filteredEvents = events.filter(event => {
    // Filter by search term
    const matchesSearch = searchTerm === '' || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by categories
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(event.category);

    // Filter by location
    const matchesLocation = selectedLocation === 'Worldwide' || 
      (selectedLocation === 'Australia' && 
        ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Gold Coast'].includes(event.city)) ||
      selectedLocation === event.city;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Upcoming Events</h1>
        
        <div className="w-full md:w-auto flex items-center">
          <div className="relative flex-grow md:flex-grow-0 md:w-64">
            <input
              type="text"
              placeholder="Search events..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="ml-2 p-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200"
            aria-label="Toggle filters"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="mb-4 flex items-center text-gray-600 dark:text-gray-400">
        <MapPin className="w-4 h-4 mr-1" />
        <span>Events in {selectedLocation}</span>
      </div>
      
      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg animate-slide-in">
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationChange={handleLocationChange}
          />
        </div>
      )}
      
      <EventGrid events={filteredEvents} loading={loading} />
      
      {!loading && filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No events found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try changing your filters or search terms
          </p>
        </div>
      )}
    </div>
  );
};

export default EventsPage;