import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useThemeStore } from './stores/themeStore';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PreferencesPage from './pages/PreferencesPage';
import EventsPage from './pages/EventsPage';
import ChatPage from './pages/ChatPage';
import NotificationsPage from './pages/NotificationsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const { darkMode } = useThemeStore();
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="preferences" element={<PreferencesPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;