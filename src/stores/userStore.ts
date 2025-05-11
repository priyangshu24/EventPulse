import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export type Preference = {
  id: string;
  category: string;
  subcategories: string[];
  keywords: string[];
  excludeKeywords: string[];
  createdAt: Date;
};

interface UserState {
  userId: string;
  name: string;
  city: string;
  preferences: Preference[];
  setName: (name: string) => void;
  setCity: (city: string) => void;
  addPreference: (preference: Omit<Preference, 'id' | 'createdAt'>) => void;
  updatePreference: (id: string, preference: Partial<Preference>) => void;
  removePreference: (id: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: uuidv4(),
      name: '',
      city: '',
      preferences: [],
      setName: (name) => set({ name }),
      setCity: (city) => set({ city }),
      addPreference: (preference) =>
        set((state) => ({
          preferences: [
            ...state.preferences,
            {
              ...preference,
              id: uuidv4(),
              createdAt: new Date(),
            },
          ],
        })),
      updatePreference: (id, updatedPreference) =>
        set((state) => ({
          preferences: state.preferences.map((pref) =>
            pref.id === id ? { ...pref, ...updatedPreference } : pref
          ),
        })),
      removePreference: (id) =>
        set((state) => ({
          preferences: state.preferences.filter((pref) => pref.id !== id),
        })),
    }),
    {
      name: 'user-storage',
    }
  )
);