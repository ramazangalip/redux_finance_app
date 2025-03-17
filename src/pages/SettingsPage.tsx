import React from 'react';
import ThemeToggle from '../components/ThemeToggle';

const SettingsPage: React.FC = () => {
  return (
    <div className="settings-page">
      <h2>Ayarlar</h2>
      <ThemeToggle />
    </div>
  );
};
export default SettingsPage;
 