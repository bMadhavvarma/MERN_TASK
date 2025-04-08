import React from 'react';

const ToggleSwitch = ({ isDark, setIsDark }) => {
  return (
    <label className="relative inline-block w-14 h-8 cursor-pointer">
      <input
        type="checkbox"
        checked={isDark}
        onChange={() => setIsDark(!isDark)}
        className="sr-only"
      />
      <span
        className={`absolute inset-0 transition rounded-full ${
          isDark ? 'bg-[#522ba7]' : 'bg-[#28096b]'
        }`}
      ></span>
      <span
        className="absolute left-[10%] bottom-[15%] h-[1.4em] w-[1.4em] rounded-full transition"
        style={{
          transform: isDark ? 'translateX(100%)' : 'translateX(0)',
          backgroundColor: isDark ? '#522ba7' : '#28096b',
          boxShadow: isDark
            ? 'inset 15px -4px 0px 15px #fff000'
            : 'inset 8px -4px 0px 0px #fff000',
        }}
      ></span>
    </label>
  );
};

export default ToggleSwitch;
