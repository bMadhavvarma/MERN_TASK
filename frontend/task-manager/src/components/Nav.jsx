import React from 'react';
import ToggleSwitch from './ToggleSwitch';

const Nav = ({ isDark, setIsDark }) => {
  return (
    <nav className="flex justify-between items-center fixed w-full bg-gray-200 dark:bg-gray-800 p-4 z-50">
      <h1 className="text-black dark:text-white text-2xl font-bold">Task Manager</h1>
      <div className="flex space-x-4">
        <ToggleSwitch isDark={isDark} setIsDark={setIsDark} />
      </div>
    </nav>
  );
};

export default Nav;
