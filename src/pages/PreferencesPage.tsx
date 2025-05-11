import React, { useState } from 'react';
import { useUserStore } from '../stores/userStore';
import PreferenceForm from '../components/PreferenceForm';
import PreferenceCard from '../components/PreferenceCard';
import { MapPin, User } from 'lucide-react';

const PreferencesPage: React.FC = () => {
  const { name, city, preferences, setName, setCity } = useUserStore();
  const [editMode, setEditMode] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempCity, setTempCity] = useState(city);
  
  const handleSaveProfile = () => {
    setName(tempName);
    setCity(tempCity);
    setEditMode(false);
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <section className="mb-8">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        
        <div className="card p-6">
          {!editMode ? (
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center mb-3">
                  <User className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
                  <h2 className="text-lg font-medium">
                    {name ? name : 'Name not set'}
                  </h2>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
                  <h2 className="text-lg font-medium">
                    {city ? city : 'City not set'}
                  </h2>
                </div>
              </div>
              
              <button
                onClick={() => setEditMode(true)}
                className="btn-primary"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="input"
                  placeholder="Enter your name"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your City
                </label>
                <input
                  type="text"
                  id="city"
                  className="input"
                  placeholder="Enter your city (e.g., San Francisco)"
                  value={tempCity}
                  onChange={(e) => setTempCity(e.target.value)}
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleSaveProfile}
                  className="btn-primary"
                >
                  Save Profile
                </button>
                
                <button
                  onClick={() => {
                    setTempName(name);
                    setTempCity(city);
                    setEditMode(false);
                  }}
                  className="btn-outline"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      
      <section className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Event Preferences</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form to add new preferences */}
          <PreferenceForm />
          
          {/* List of existing preferences */}
          <div className="space-y-4">
            {preferences.length > 0 ? (
              preferences.map((preference) => (
                <PreferenceCard key={preference.id} preference={preference} />
              ))
            ) : (
              <div className="card p-8 text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  You don't have any event preferences yet.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Add preferences to get personalized event recommendations and notifications.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <div className="card p-6 bg-secondary-50 dark:bg-secondary-900/20 border border-secondary-100 dark:border-secondary-800">
          <h2 className="text-xl font-semibold mb-4">About Event Preferences</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Your preferences help us determine which events to recommend and notify you about. You can set multiple preferences for different types of events.
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>Select a category to focus on specific types of events</li>
            <li>Add keywords to further refine your interests</li>
            <li>Exclude keywords for topics you want to avoid</li>
            <li>Update your city to find local events</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default PreferencesPage;