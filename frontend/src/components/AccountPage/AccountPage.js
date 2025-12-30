import React, { useState, useEffect } from 'react';
import SideBar from '../SideBar/SideBar';
import './AccountPage.css';
import ramaImg from './frame.png';
import imgDreapta from './dreapta.png';
import imgStanga from './stanga.png';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Aici luam id ul din baza de date
        const loggedUserId = localStorage.getItem('userId');

        if (!loggedUserId || loggedUserId === "undefined" || loggedUserId.includes("object")) {
            setError("Sesiune invalidă. Te rugăm să te loghezi din nou.");
            setLoading(false);
            return;
        }

        fetch(`https://localhost:7127/api/User/${loggedUserId}`)
            .then(response => {
                if (!response.ok) throw new Error(`Eroare server: ${response.status}`);
                return response.json();
            })
            .then(data => {
                console.log("Date primite:", data);
                setUserData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Eroare fetch:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);



    if (loading) return <div className="loading-container">Se încarcă profilul...</div>;
    if (error) return <div className="error-container">Eroare: {error}</div>;

    return (
        <div className="account-layout">
            <SideBar />
            <div className="logo-wrapper-accountPage">
                <img src="/logo/Gemini_Generated_Image_ge1422ge1422ge14-removebg-preview.png" alt="VIP SLOTS Logo" />
            </div>

            <img src={imgDreapta} className="bg-character char-right" alt="" />
            <img src={imgStanga} className="bg-character char-left" alt="" />

            <main className="account-main-content">
                <div className="profile-glass-card">
                    <div className="profile-avatar-section">
                        <div className="royal-avatar-wrapper">
                            <img src={ramaImg} className="avatar-frame-img" alt="frame" />
                            <div className="avatar-content">
                                {userData?.firstName ? userData.firstName[0].toUpperCase() : 'U'}
                            </div>
                        </div>

                        <h2 className="user-name">{userData?.firstName} {userData?.lastName}</h2>
                        <span className="user-role">MEMBRU VIP SLOTS</span>
                    </div>

                    <div className="profile-data-grid">
                        <div className="data-field">
                            <label>Adresa Email</label>
                            <p>{userData?.email || "Nespecificat"}</p>
                        </div>

                        <div className="data-field gold-highlight">
                            <label>Soldul tău (Balanță)</label>
                            <p className="balance-amount">
                                {userData?.balance ? userData.balance.toLocaleString('ro-RO') : '0'} RON
                            </p>
                        </div>

                        <div className="data-field">
                            <label>Adresa de Reședință</label>
                            <p>{userData?.address || "Baritiu"}</p>
                        </div>

                        <div className="data-field">
                            <label>CNP</label>
                            <p>{userData?.cnp ? "Verificat (18+)" : "Verificat (18+)"}</p>
                        </div>
                    </div>

                    <div className="profile-actions">
                    <button className="btn-update" onClick={() => navigate('/edit-account')}>
                       Editează Profil
                    </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AccountPage;