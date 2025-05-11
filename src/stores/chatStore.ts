import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export type MessageRole = 'user' | 'assistant' | 'system';

export type Message = {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
};

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  addMessage: (role: MessageRole, content: string) => void;
  clearMessages: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useChatStore = create<ChatState>()((set) => ({
  messages: [],
  isLoading: false,
  addMessage: (role, content) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: uuidv4(),
          role,
          content,
          timestamp: new Date(),
        },
      ],
    })),
  clearMessages: () => set({ messages: [] }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));