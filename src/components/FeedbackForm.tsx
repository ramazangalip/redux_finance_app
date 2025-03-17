import React, { useState } from 'react';

const FeedbackForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Geri bildirim gönderme işlemi burada yapılacak
    console.log('Geri Bildirim:', { name, email, message });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="feedback-form">
      <h3>Geri Bildirim</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Adınız</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">E-posta</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mesajınız</label>
          <textarea
            className="form-control"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Gönder</button>
      </form>
    </div>
  );
};

export default FeedbackForm;

// CSS (global.css veya ilgili stil dosyasına ekleyin)
