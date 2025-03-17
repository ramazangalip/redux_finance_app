import React from 'react';
import FeedbackForm from '../components/FeedbackForm';

const FeedbackPage: React.FC = () => {
  return (
    <div className="feedback-page">
      <h2>Geri Bildirim</h2>
      <FeedbackForm />
    </div>
  );
};

export default FeedbackPage; 