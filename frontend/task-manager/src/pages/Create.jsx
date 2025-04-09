// src/pages/Create.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create = ({ setNotes }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('');
  const navigate = useNavigate();

  const handlePriorityChange = (value) => {
    setPriority(prev => (prev === value ? '' : value));
  };

  const handleSubmit = () => {
    const tags = priority ? [`#${priority.toLowerCase()}`] : [];
    const newNote = {
      title,
      description: content, // your backend expects "description"
      date: new Date().toLocaleDateString(),
      tags,
      pinned: true,
      status: 'pending',
      priority: priority ? priority.toLowerCase() : 'medium'
    };

    // Use PUT for creation per your API definition
    axios.put(`${import.meta.env.VITE_REACT_URL}/api/task`, newNote)
      .then((response) => {
        // Prepend the new note from the backend response to state
        setNotes(prev => [response.data.data, ...prev]);
        navigate('/');
      })
      .catch(error => console.error('Error creating task:', error));
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-2xl p-6 rounded-lg shadow-xl relative">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 text-2xl dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          ×
        </button>

        <div className="mb-4">
          <label className="block text-sm mb-1">TITLE</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-2xl font-semibold p-2 rounded-md dark:text-gray-100"
            placeholder="Enter title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2">DESCRIPTION</label>
          <textarea
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded-md resize-none dark:text-gray-100"
            placeholder="Description ..."
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">PRIORITY</label>
          <div className="flex gap-4">
            {['Low', 'Medium', 'High'].map((level) => (
              <label key={level} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={priority === level}
                  onChange={() => handlePriorityChange(level)}
                  className="accent-blue-500"
                />
                {level}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-lg"
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export default Create;
