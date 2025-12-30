import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../..';
import './LoginPage.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const signIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/user/auth`, {
                email: email,
                password: password
            });

            if (response.status === 200) {
                // Din consola ta: { message: 'Login successful', userId: 2 }
                const idDinServer = response.data.userId;

                if (idDinServer) {
                    localStorage.setItem('userId', idDinServer.toString());
                    window.alert("Te-ai logat cu succes!");
                    navigate("/main/games");
                } else {
                    console.error("Structura primita:", response.data);
                    window.alert("Eroare: Nu am gasit campul 'userId' in raspunsul serverului.");
                }
            }
        }
        catch (err) {
            window.alert(`Eroare la autentificare: ${err.response?.data || err.message}`);
        }
    }

    return (
        <div className="login-container">
            <div className="logo-wrapper-login">
                <img src="/logo/Gemini_Generated_Image_ge1422ge1422ge14-removebg-preview.png" alt="VIP SLOTS Logo" />
            </div>
            <video autoPlay loop muted playsInline className="video-bg">
                <source src="/videoMoney/video_preview_h264.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay"></div>
            <button className="btn-back" onClick={() => navigate('/')}>Inapoi</button>
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={signIn}>
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Parola" onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="btn-login">Intra în cont</button>
                </form>
            </div>
        </div>
    );
};

export default Login;