import React from 'react';
import { Tag, Trash } from 'lucide-react';
import { Preference, useUserStore } from '../stores/userStore';

interface PreferenceCardProps {
  preference: Preference;
}

const PreferenceCard: React.FC<PreferenceCardProps> = ({ preference }) => {
  const { removePreference } = useUserStore();
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  return (
    <div className="card hover:shadow-md transition-all duration-200">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <Tag className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
          <h3 className="font-semibold">{preference.category}</h3>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {formatDate(preference.createdAt)}
        </span>
      </div>
      
      <div className="p-4">
        {preference.keywords.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Interested In:
            </h4>
            <div className="flex flex-wrap gap-2">
              {preference.keywords.map((keyword) => (
                <span key={keyword} className="badge-primary">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {preference.excludeKeywords.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Not Interested In:
            </h4>
            <div className="flex flex-wrap gap-2">
              {preference.excludeKeywords.map((keyword) => (
                <span key={keyword} className="badge-accent">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <button
          onClick={() => removePreference(preference.id)}
          className="w-full mt-2 btn-outline text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-900/30 flex items-center justify-center"
        >
          <Trash className="w-4 h-4 mr-2" />
          Remove
        </button>
      </div>
    </div>
  );
};

export default PreferenceCard;