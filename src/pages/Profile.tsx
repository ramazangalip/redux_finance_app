import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEnvelope, 
  faLock, 
  faSave, 
  faTimes,
  faEdit,
  faCamera
} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('https://via.placeholder.com/150');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Profil güncelleme işlemleri burada yapılacak
    setIsEditing(false);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm fade-in">
            <div className="card-body p-4">
              <div className="text-center position-relative mb-5">
                <div className="position-relative d-inline-block">
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                  <button
                    className="btn btn-primary btn-sm rounded-circle position-absolute"
                    style={{ bottom: '0', right: '0', width: '35px', height: '35px', padding: '0' }}
                  >
                    <FontAwesomeIcon icon={faCamera} />
                  </button>
                </div>
                <h3 className="mt-3 mb-1">{user?.name}</h3>
                <p className="text-muted mb-0">{user?.email}</p>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="card-title mb-0">Profil Bilgileri</h4>
                <button
                  className={`btn ${isEditing ? 'btn-danger' : 'btn-primary'}`}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <FontAwesomeIcon icon={isEditing ? faTimes : faEdit} className="me-2" />
                  {isEditing ? 'İptal' : 'Düzenle'}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="slide-up">
                  <div className="mb-4">
                    <label className="form-label text-muted small text-uppercase">Ad Soyad</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FontAwesomeIcon icon={faUser} className="text-muted" />
                      </span>
                      <input
                        type="text"
                        className="form-control form-control-lg border-start-0"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-muted small text-uppercase">E-posta</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FontAwesomeIcon icon={faEnvelope} className="text-muted" />
                      </span>
                      <input
                        type="email"
                        className="form-control form-control-lg border-start-0"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-muted small text-uppercase">Mevcut Şifre</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FontAwesomeIcon icon={faLock} className="text-muted" />
                      </span>
                      <input
                        type="password"
                        className="form-control form-control-lg border-start-0"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-muted small text-uppercase">Yeni Şifre</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FontAwesomeIcon icon={faLock} className="text-muted" />
                      </span>
                      <input
                        type="password"
                        className="form-control form-control-lg border-start-0"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-muted small text-uppercase">Yeni Şifre Tekrar</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FontAwesomeIcon icon={faLock} className="text-muted" />
                      </span>
                      <input
                        type="password"
                        className="form-control form-control-lg border-start-0"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg w-100">
                    <FontAwesomeIcon icon={faSave} className="me-2" />
                    Değişiklikleri Kaydet
                  </button>
                </form>
              ) : (
                <div className="fade-in">
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="p-4 bg-light rounded-3">
                        <p className="text-muted small text-uppercase mb-2">Ad Soyad</p>
                        <p className="h5 mb-0">{user?.name}</p>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="p-4 bg-light rounded-3">
                        <p className="text-muted small text-uppercase mb-2">E-posta</p>
                        <p className="h5 mb-0">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 