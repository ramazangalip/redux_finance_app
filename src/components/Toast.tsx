import React from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  return (
    <div className={`toast toast-${type}`} role="alert">
      <div className="toast-body">
        {message}
        <button type="button" className="btn-close" onClick={onClose}></button>
      </div>
    </div>
  );
};

export default Toast;

