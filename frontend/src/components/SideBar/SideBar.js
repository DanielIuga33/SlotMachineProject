import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SideBar.css';

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const isActive = (path) => location.pathname === path;


  return (
    <div className="sidebar-wrapper">
      <article className="sidebar-pill">

        {/* JOCURI */}
        <label className="sidebar-item" onClick={() => navigate('/main/games')}data-tooltip="Jocuri">
        <input type="radio" name="path" id="dashboard" checked={isActive('/main/games')} readOnly />
          <div className="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </div>
        </label>

        {/* PROFIL */}
        <label className="sidebar-item" onClick={() => navigate('/account')}data-tooltip="Profil">
        <input type="radio" name="path" id="profile" checked={isActive('/account')} readOnly />
          <div className="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </label>

        {/* TRANZACȚII */}
        <label className="sidebar-item" onClick={() => navigate('/transactions')}data-tooltip="Tranzactii">
        <input type="radio" name="path" id="transactions" checked={isActive('/transactions')} readOnly />
         <div className="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
        </label>

        {/* LOGOUT */}
        <label className="sidebar-item" onClick={() => setShowLogoutConfirm(true)}data-tooltip="Logout">
    <input type="radio" name="path" id="logout" checked={showLogoutConfirm} readOnly />
       <div className="icon-box logout-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </div>
        </label>

      </article>
       {showLogoutConfirm && (
                  <div className="logout-overlay">
                    <div className="logout-panel">
                      <h2>Esti sigur ca vrei sa te deconectezi?</h2>
                      <div className="logout-buttons">
                        <button className="btn-da" onClick={() => navigate('/login')}>DA</button>
                        <button className="btn-nu" onClick={() => setShowLogoutConfirm(false)}>NU</button>
                      </div>
                    </div>
                  </div>
                )}
    </div>
  );
};

export default SideBar;