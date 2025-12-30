import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import axios from 'axios';
import './EditAccountPage.css';

const EditAccountPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        password: '',
    });

  const isFemale = (name) => {
          if (!name) return false;
          const lowerName = name.trim().toLowerCase();
          // Verifică dacă prenumele se termină în 'a' (specific românesc)
          return lowerName.endsWith('a');
      };

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loggedUserId = localStorage.getItem('userId').replace(':', '');

        axios.get(`https://localhost:7127/api/User/${loggedUserId}`)
            .then(res => {
                setUserData({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    password: ''
                });
                setLoading(false);
            })
            .catch(err => {
                console.error("Eroare la preluare date:", err);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
            console.log("Fișier selectat:", e.target.files[0].name);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const loggedUserId = localStorage.getItem('userId');

        const formData = new FormData();
        formData.append('firstName', userData.firstName);
        formData.append('lastName', userData.lastName);
        if (userData.password) formData.append('password', userData.password);
        if (file) formData.append('profileImage', file);

        try {
            await axios.put(`https://localhost:7127/api/User/${loggedUserId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            window.alert("Profil actualizat!");
            navigate('/account');
        } catch (err) {
            window.alert("Eroare la salvare: " + (err.response?.data || err.message));
        }
    };

    if (loading) return <div className="loading-edit">Se încarcă datele...</div>;

    return (
        <div className="account-layout">
            <SideBar />
                 <div className="vip-character-container">
                         {isFemale(userData.firstName) ? (
                      <img
                        src="/pozeFundal/female-vip.png" // Poți înlocui cu poza ta ulterior
                        className="vip-char-img"
                        alt="Female VIP"
                      />
              ) : (
                     <img
                        src="/pozeFundal/male-vip.png" // Poți înlocui cu poza ta ulterior
                        className="vip-char-img"
                        alt="Male VIP"
                     />
                    )}
                    </div>

            <div className="logo-wrapper-login">
                 <img src="/logo/Gemini_Generated_Image_ge1422ge1422ge14-removebg-preview.png" alt="VIP SLOTS Logo" />
             </div>
            <div className="edit-container">
                <div className="edit-glass-card">
                    <h2 className="edit-title">Editează Profilul</h2>

                    <form onSubmit={handleSave}>
                        <div className="input-group">
                            <label>Username (Prenume)</label>
                            <input
                                type="text"
                                name="firstName"
                                value={userData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Nume de familie</label>
                            <input
                                type="text"
                                name="lastName"
                                value={userData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Parolă nouă</label>
                            <input
                                type="password"
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="file-upload-form">
                            <label htmlFor="file" className="file-upload-label">
                                <div className="file-upload-design">
                                    <svg viewBox="0 0 640 512">
                                        <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c61.9 0 112 50.1 112 112c0 10.7-1.5 21-4.4 30.7C608.9 258.8 640 307.8 640 363.3c0 82.1-66.7 148.7-148.8 148.7H144zm30.2-178.1l81.1-81.1c7.5-7.5 19.7-7.5 27.2 0l81.1 81.1c11.7 11.7 3.4 31.8-13.1 31.8H304v96c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-96h-47.5c-16.5 0-24.8-20.1-13.1-31.8z"></path>
                                    </svg>
                                    <span className="upload-text">
                                        {file ? file.name : "Schimba poza de profil"}
                                    </span>
                                        <div className="fake-input"></div>
                                </div>
                                <input
                                    id="file"
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </label>
                        </div>

                        <div className="edit-button-group">
                            <button type="submit" className="btn-save">Salvează</button>
                            <button
                                type="button"
                                className="btn-cancel"
                                onClick={() => navigate('/account')}
                            >
                                Anulează
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  );
};

export default EditAccountPage;