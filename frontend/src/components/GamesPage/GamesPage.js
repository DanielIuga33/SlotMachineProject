import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../SideBar/SideBar.js';
import './GamesPage.css';

const GamesPage = () => {
    const navigate = useNavigate();

    return (
        <div className="games-page-container">
            <Sidebar />

            <div className="logo-wrapper-gamesMenu">
                <img src="/logo/Gemini_Generated_Image_ge1422ge1422ge14-removebg-preview.png" alt="VIP SLOTS Logo" />
            </div>

            <div className="jocuri">
                <div className="game-card-preview" onClick={() => navigate('/slot-machine')}>
                    <div className="game-card-header">
                        <h3>  777</h3>
                    </div>

                    <div className="game-card-reels-static">

                    </div>

                    <div className="game-card-info">
                        <button className="play-overlay-btn">Joaca acum</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default GamesPage;