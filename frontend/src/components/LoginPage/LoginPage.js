import React from 'react';
import './LoginPage.css';

const Login = () => {
    return (
        <div className="login-container">
        <div className="logo-wrapper">
                        <img src="/logo/Gemini_Generated_Image_ge1422ge1422ge14-removebg-preview.png" alt="VIP SLOTS Logo" />
                    </div>
            <video autoPlay loop muted playsInline className="video-bg">
                <source src="/videoMoney/video_preview_h264.mp4" type="video/mp4" />
            </video>

            <div className="video-overlay"></div>

            <div className="login-box">
                <h2>Login</h2>
                <form>
                    <input type="text" placeholder="Utilizator" />
                    <input type="password" placeholder="Parola" />
                    <button type="submit" className= "btn-login">Intra în cont</button>
                </form>
            </div>
        </div>
    );
};

export default Login;