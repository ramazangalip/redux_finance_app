import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faUser,
  faBell, 
  faCog, 
  faComments, 
  faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="modern-navbar">
      <div className="nav-brand">
        Finans App
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/dashboard" className="nav-link">
            <FontAwesomeIcon icon={faHome} />
            <span>Ana Sayfa</span>
          </Link>
        </li>
        <li>
          <Link to="/profile" className="nav-link">
            <FontAwesomeIcon icon={faUser} />
            <span>Profil</span>
          </Link>
        </li>
        <li>
          <Link to="/notifications" className="nav-link">
            <FontAwesomeIcon icon={faBell} />
            <span>Bildirimler</span>
          </Link>
        </li>
        <li>
          <Link to="/settings" className="nav-link">
            <FontAwesomeIcon icon={faCog} />
            <span>Ayarlar</span>
          </Link>
        </li>
        <li>
          <Link to="/feedback" className="nav-link">
            <FontAwesomeIcon icon={faComments} />
            <span>Geri Bildirim</span>
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="nav-link logout-button">
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Çıkış</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar; 