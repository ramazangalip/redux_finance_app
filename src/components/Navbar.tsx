import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/slices/authSlice';
import { authAPI } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Çıkış yapılırken hata oluştu:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/dashboard">
          <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
          Finans Takip
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/dashboard">
                <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                Gösterge Paneli
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                <FontAwesomeIcon icon={faUser} className="me-2" />
                {user?.name || 'Profil'}
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-outline-primary"
                onClick={handleLogout}
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                Çıkış Yap
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 