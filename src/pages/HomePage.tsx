import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Calendar, User, Settings, ArrowRight } from 'lucide-react';
import { useUserStore } from '../stores/userStore';

const HomePage: React.FC = () => {
  const { name, city } = useUserStore();
  
  return (
    <div className="max-w-4xl mx-auto">
      <section className="text-center py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
          Discover Events That Match Your Interests
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Our AI assistant helps you find local events you'll love and notifies you via text message when something exciting is happening.
        </p>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Link
          to="/chat"
          className="card p-6 hover:shadow-lg transition-all duration-300 flex flex-col h-full group"
        >
          <div className="mb-4">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 transition-colors duration-200">
              <MessageSquare className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Chat with Assistant</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Tell our AI what kinds of events you enjoy, and get personalized recommendations based on your preferences.
            </p>
          </div>
          
          <div className="flex items-center mt-auto text-primary-600 dark:text-primary-400 font-medium">
            Start chatting
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </Link>
        
        <Link
          to="/events"
          className="card p-6 hover:shadow-lg transition-all duration-300 flex flex-col h-full group"
        >
          <div className="mb-4">
            <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary-200 dark:group-hover:bg-secondary-800/50 transition-colors duration-200">
              <Calendar className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Browse Events</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Explore upcoming events in your area that match your interests and save the ones you want to attend.
            </p>
          </div>
          
          <div className="flex items-center mt-auto text-secondary-600 dark:text-secondary-400 font-medium">
            See events
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </Link>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Link
          to="/preferences"
          className="card p-6 hover:shadow-lg transition-all duration-300 flex flex-col h-full group"
        >
          <div className="mb-4">
            <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent-200 dark:group-hover:bg-accent-800/50 transition-colors duration-200">
              <Settings className="w-6 h-6 text-accent-600 dark:text-accent-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Set Your Preferences</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Update your event preferences and location to receive tailored recommendations and notifications.
            </p>
          </div>
          
          <div className="flex items-center mt-auto text-accent-600 dark:text-accent-400 font-medium">
            Update preferences
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </Link>
        
        <Link
          to="/notifications"
          className="card p-6 hover:shadow-lg transition-all duration-300 flex flex-col h-full group"
        >
          <div className="mb-4">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 transition-colors duration-200">
              <User className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Manage Notifications</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              View your notification history and manage how you receive alerts about upcoming events.
            </p>
          </div>
          
          <div className="flex items-center mt-auto text-primary-600 dark:text-primary-400 font-medium">
            View notifications
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </Link>
      </section>
      
      {(!name || !city) && (
        <section className="card p-6 mb-12 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30 border border-primary-100 dark:border-primary-800">
          <h2 className="text-xl font-semibold mb-4">Complete Your Profile</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            To get the most out of EventPulse, please set up your profile with your name and city. This will help us provide more relevant event recommendations.
          </p>
          <Link to="/preferences" className="btn-primary inline-flex items-center">
            Set Up Profile
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </section>
      )}
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">1</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Tell Us Your Interests</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Chat with our AI assistant or set preferences directly to let us know what kind of events interest you.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">2</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Get Personalized Matches</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Our AI matches your preferences with upcoming events in your city to find the perfect recommendations.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-accent-600 dark:text-accent-400">3</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Receive Notifications</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get text messages when events that match your interests are happening in your area.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;