import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = ({ notes, setNotes }) => {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editPriority, setEditPriority] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleStatus = (id) => {
    const noteToUpdate = notes.find(note => note._id === id);
    if (!noteToUpdate) return;

    const updatedStatus = noteToUpdate.status === 'pending' ? 'completed' : 'pending';

    axios.put(`${import.meta.env.VITE_REACT_URL}/api/taskupdate/${id}`, {
      ...noteToUpdate,
      status: updatedStatus
    })
      .then((response) => {
        const updatedNotes = notes.map(note =>
          note._id === id ? response.data.data : note
        );
        setNotes(sortNotesByStatus(updatedNotes));
      })
      .catch(error => console.error('Error updating status:', error));
  };

  const deleteNote = (id) => {
    axios.delete(`${import.meta.env.VITE_REACT_URL}/api/taskdelete/${id}`)
      .then(() => {
        setNotes(notes.filter(note => note._id !== id));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const startEditing = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditContent(note.description);
    setEditPriority(note.priority);
  };

  const saveUpdate = (id) => {
    axios.put(`${import.meta.env.VITE_REACT_URL}/api/taskupdate/${id}`, {
      title: editTitle,
      description: editContent,
      priority: editPriority
    })
      .then((response) => {
        const updatedNotes = notes.map(note =>
          note._id === id ? response.data.data : note
        );
        setNotes(sortNotesByStatus(updatedNotes));
        setEditingId(null);
      })
      .catch(error => console.error('Error updating task:', error));
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'border-red-500';
      case 'medium': return 'border-yellow-500';
      case 'low': return 'border-green-500';
      default: return 'border-gray-300';
    }
  };

  const sortNotesByStatus = (arr) => {
    return [...arr].sort((a, b) => {
      if (a.status === b.status) return 0;
      return a.status === 'pending' ? -1 : 1;
    });
  };

  const sortedNotes = sortNotesByStatus(notes);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen text-black dark:text-white transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Notes</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded bg-gray-800 text-white dark:bg-white dark:text-black transition-colors"
        >
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        <AnimatePresence>
          {sortedNotes && sortedNotes.length > 0 ? (
            sortedNotes.map((note) => (
              <motion.div
                layout
                key={note._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`bg-white dark:bg-gray-700 border-l-4 ${getPriorityColor(note.priority)} rounded-lg px-6 py-4 shadow-md`}
              >
                {editingId === note._id ? (
                  <>
                    <input
                      className="text-lg font-bold w-full bg-transparent dark:text-white"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <textarea
                      className="w-full bg-transparent dark:text-white mt-2"
                      rows={4}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                    <select
                      value={editPriority}
                      onChange={(e) => setEditPriority(e.target.value)}
                      className="mt-2 bg-gray-100 dark:bg-gray-600 text-black dark:text-white w-full px-2 py-1 rounded"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                    <button onClick={() => saveUpdate(note._id)} className="bg-green-600 text-white px-2 py-1 rounded mt-2">
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <h2 className="font-bold text-lg">{note.title}</h2>
                      <span className={`text-sm font-semibold ${note.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                        {note.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Priority: {note.priority}</p>
                    <p className="text-gray-800 dark:text-gray-100 mb-2">{note.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => toggleStatus(note._id)}
                        className={`${note.status === 'completed' ? 'bg-green-600' : 'bg-yellow-500'} text-white px-2 py-1 rounded`}
                      >
                        {note.status === 'completed' ? 'Mark Pending' : 'Mark Completed'}
                      </button>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditing(note)}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => deleteNote(note._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-10 text-gray-600 dark:text-gray-300"
            >
              <h2 className="text-xl font-semibold mb-2">No tasks yet...</h2>
              <p className="text-md italic">"The secret of getting ahead is getting started." – Mark Twain</p>
              <p className="mt-4">Why not create your first task now?</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={() => (window.location.href = '/create')}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg text-lg font-semibold"
      >
        +
      </button>
    </div>
  );
};

export default Hero;
