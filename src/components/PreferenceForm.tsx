import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useUserStore } from '../stores/userStore';

const PreferenceForm: React.FC = () => {
  const { addPreference } = useUserStore();
  
  const [category, setCategory] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [excludeKeywords, setExcludeKeywords] = useState<string[]>([]);
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [currentExcludeKeyword, setCurrentExcludeKeyword] = useState('');
  
  const categories = [
    'Any', 'Music', 'Arts', 'Technology', 'Food', 
    'Sports', 'Business', 'Health', 'Film', 'Entertainment'
  ];
  
  const handleAddKeyword = () => {
    if (currentKeyword.trim() && !keywords.includes(currentKeyword.trim())) {
      setKeywords([...keywords, currentKeyword.trim()]);
      setCurrentKeyword('');
    }
  };
  
  const handleAddExcludeKeyword = () => {
    if (currentExcludeKeyword.trim() && !excludeKeywords.includes(currentExcludeKeyword.trim())) {
      setExcludeKeywords([...excludeKeywords, currentExcludeKeyword.trim()]);
      setCurrentExcludeKeyword('');
    }
  };
  
  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };
  
  const handleRemoveExcludeKeyword = (keyword: string) => {
    setExcludeKeywords(excludeKeywords.filter(k => k !== keyword));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category) return;
    
    addPreference({
      category,
      subcategories: [],
      keywords,
      excludeKeywords
    });
    
    // Reset form
    setCategory('');
    setKeywords([]);
    setExcludeKeywords([]);
  };
  
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Add New Preference</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Event Category
          </label>
          <select
            id="category"
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Interest Keywords (optional)
          </label>
          <div className="flex items-center">
            <input
              type="text"
              className="input rounded-r-none"
              placeholder="Add keywords (e.g., jazz, outdoor)"
              value={currentKeyword}
              onChange={(e) => setCurrentKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
            />
            <button
              type="button"
              className="btn bg-primary-600 hover:bg-primary-700 text-white rounded-l-none"
              onClick={handleAddKeyword}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {keywords.map((keyword) => (
              <div key={keyword} className="badge-primary flex items-center">
                {keyword}
                <button
                  type="button"
                  onClick={() => handleRemoveKeyword(keyword)}
                  className="ml-1.5 text-primary-700 dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Exclude Keywords (optional)
          </label>
          <div className="flex items-center">
            <input
              type="text"
              className="input rounded-r-none"
              placeholder="Add exclusions (e.g., expensive, kids)"
              value={currentExcludeKeyword}
              onChange={(e) => setCurrentExcludeKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddExcludeKeyword())}
            />
            <button
              type="button"
              className="btn bg-primary-600 hover:bg-primary-700 text-white rounded-l-none"
              onClick={handleAddExcludeKeyword}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {excludeKeywords.map((keyword) => (
              <div key={keyword} className="badge-accent flex items-center">
                {keyword}
                <button
                  type="button"
                  onClick={() => handleRemoveExcludeKeyword(keyword)}
                  className="ml-1.5 text-accent-700 dark:text-accent-300 hover:text-accent-800 dark:hover:text-accent-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={!category}
        >
          Save Preference
        </button>
      </form>
    </div>
  );
};

export default PreferenceForm;