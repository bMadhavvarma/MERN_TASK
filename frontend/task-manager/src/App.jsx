// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Hero from './pages/Hero';
import Create from './pages/Create';
import Nav from './components/Nav';

const App = () => {
  const [isDark, setIsDark] = useState(true);
  const [notes, setNotes] = useState([]);

  // Fetch tasks from backend when component mounts
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_REACT_URL}/api/tasks`)
      .then(response => {
        // Assuming your API response is structured as { message: string, data: [ ... ] }
        setNotes(response.data.data);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  // Change theme as before
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
