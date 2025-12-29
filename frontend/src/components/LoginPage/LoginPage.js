import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../..';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const signIn = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post(`${API_URL}/user/auth`, {
                email: email,
                password: password
            });
            if (response.status === 200) {
                window.alert("You logged in succesfully !");
            }
            navigate("/main");
        }
        catch (err){
            window.alert(`Error trying to authetificate: ${err.response?.data || err.message}`);
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

            <button className="btn-back" onClick={() => navigate('/')}>
                Inapoi
            </button>

            <div className="login-box">
                <h2>Login</h2>
                <form>
                    <input type="text" name="email" onChange={(e) => {setEmail(e.target.value)}} placeholder="Utilizator" />
                    <input type="password" name="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Parola" />
                    <button type="submit" className= "btn-login" onClick={signIn}>Intra în cont</button>
                </form>
            </div>
        </div>
    );
};

export default Login;