import React from 'react';
import API_URL from '../..';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StartingPage.css';

const StartingPage = () => {
    const navigate = useNavigate();
    const callBackend = async() => {
        try{
            const response = await axios.get(`${API_URL}/hello/status`)
            console.log("Răspuns de la Backend:", response.data);
            alert("Backend conectat: " + response.data.message);
        }
        catch(err){
            console.error("Eroare la conectarea cu backend-ul:", err);
        }
    }

    return (
        <div className= "poza-container">
        <div className="logo-wrapper" onClick={callBackend}>
               <img src="/logo/Gemini_Generated_Image_ge1422ge1422ge14-removebg-preview.png" alt="VIP SLOTS Logo" />
        </div>
            <div className= "welcome-card">
            <h1>𝙒𝙚𝙡𝙘𝙤𝙢𝙚</h1>
            <p>𝗥𝗲𝗮𝗱𝘆 𝘁𝗼 𝘁𝗲𝘀𝘁 𝘆𝗼𝘂𝗿 𝗹𝘂𝗰𝗸?</p>

            <div className= "button-group">
                <div className= "row-buttons">

            <button className="btn-startpage" onClick={() => navigate('/login')}>
                Login
            </button>
            <button className="btn-startpage" onClick={() => navigate('/register')}>
                Register
            </button>
            </div>
        </div>
    </div>
</div>
    )
}

export default StartingPage