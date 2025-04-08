// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Hero from './pages/Hero';
import Create from './pages/Create';
import Nav from './components/Nav';

const BASE_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [isDark, setIsDark] = useState(true);
  const [notes, setNotes] = useState([]);

  // Fetch tasks from backend
  useEffect(() => {
    axios.get(`${BASE_URL}/api/tasks`)
      .then(response => {
        setNotes(response.data.data);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  // Sync theme
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors">
      <Nav isDark={isDark} setIsDark={setIsDark} />
      <Routes>
        <Route path="/" element={<Hero notes={notes} setNotes={setNotes} />} />
        <Route path="/create" element={<Create setNotes={setNotes} />} />
      </Routes>
    </div>
  );
};

export default App;
