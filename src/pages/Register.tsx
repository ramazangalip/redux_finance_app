import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    try {
      await authAPI.register(name, email, password);
      navigate('/login');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Kayıt başarısız');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm border-0 fade-in">
            <div className="card-body p-5">
              <div className="text-center mb-5">
                <h2 className="fw-bold text-primary mb-2">Finans Takip</h2>
                <p className="text-muted">Yeni hesap oluşturun</p>
              </div>
              {error && (
                <div className="alert alert-danger slide-up" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="slide-up">
                <div className="mb-4">
                  <label htmlFor="name" className="form-label text-muted small text-uppercase">Ad Soyad</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <FontAwesomeIcon icon={faUser} className="text-muted" />
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-lg border-start-0"
                      id="name"
                      placeholder="Ad Soyad"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label text-muted small text-uppercase">E-posta</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <FontAwesomeIcon icon={faEnvelope} className="text-muted" />
                    </span>
                    <input
                      type="email"
                      className="form-control form-control-lg border-start-0"
                      id="email"
                      placeholder="ornek@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label text-muted small text-uppercase">Şifre</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <FontAwesomeIcon icon={faLock} className="text-muted" />
                    </span>
                    <input
                      type="password"
                      className="form-control form-control-lg border-start-0"
                      id="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label text-muted small text-uppercase">Şifre Tekrar</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <FontAwesomeIcon icon={faLock} className="text-muted" />
                    </span>
                    <input
                      type="password"
                      className="form-control form-control-lg border-start-0"
                      id="confirmPassword"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100 mb-4">
                  <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                  Kayıt Ol
                </button>
                <p className="text-center text-muted">
                  Zaten hesabınız var mı? <Link to="/login" className="text-primary">Giriş Yapın</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 