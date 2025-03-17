import React from 'react';
import Toast from '../components/Toast';

const NotificationsPage: React.FC = () => {
  return (
    <div className="notifications-page">
      <h2>Bildirimler</h2>
      <Toast message="Örnek Bildirim" type="success" onClose={() => console.log('Toast kapatıldı')} />
    </div>
  );
};

export default NotificationsPage; 