import React, { useState, useEffect } from 'react';

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button onClick={toggleTheme} className="btn btn-outline-secondary">
      {isDarkMode ? 'Aydınlık Mod' : 'Karanlık Mod'}
    </button>
  );
};

export default ThemeToggle;

// CSS (global.css veya ilgili stil dosyasına ekleyin)
