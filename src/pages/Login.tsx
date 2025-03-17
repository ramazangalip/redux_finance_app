import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import { authAPI } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const userData = await authAPI.login(email, password);
      dispatch(loginSuccess(userData));
      navigate('/dashboard');
    } catch (error) {
      dispatch(loginFailure(error instanceof Error ? error.message : 'Giriş başarısız'));
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
                <p className="text-muted">Hesabınıza giriş yapın</p>
              </div>
              <form onSubmit={handleSubmit} className="slide-up">
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
                <button type="submit" className="btn btn-primary btn-lg w-100 mb-4">
                  <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                  Giriş Yap
                </button>
                <p className="text-center text-muted">
                  Hesabınız yok mu? <Link to="/register" className="text-primary">Kayıt Olun</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 