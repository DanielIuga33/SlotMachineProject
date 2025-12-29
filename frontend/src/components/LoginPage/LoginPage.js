import React from 'react';
import './LoginPage.css';

const Login = () => {
    return (
        <div className="login-container">
            <video autoPlay loop muted playsInline className="video-bg">
                <source src="/videoMoney/video_preview_h264.mp4" type="video/mp4" />
            </video>

            <div className="video-overlay"></div>

            <div className="login-box">
                <h2>Login</h2>
                <form>
                    <input type="text" placeholder="Utilizator" />
                    <input type="password" placeholder="Parola" />
                    <button type="submit">Intra în cont</button>
                </form>
            </div>
        </div>
    );
};

export default Login;