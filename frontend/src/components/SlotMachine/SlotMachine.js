import React, { useState, useEffect } from 'react';
import './SlotMachine.css';

// Importă pozele corect (ieșind două nivele în sus)
import capsuna from '../../assets/capsuna.png';
import portocala from '../../assets/portocala.png';
import strugure from '../../assets/strugure.png';

const SIMBOLURI = [
    { id: 'capsuna', src: capsuna, valoare: 10 },
    { id: 'portocala', src: portocala, valoare: 20 },
    { id: 'strugure', src: strugure, valoare: 50 }
];

const SlotMachine = () => {
    // State-uri pentru joc
    const [reels, setReels] = useState([SIMBOLURI[0], SIMBOLURI[1], SIMBOLURI[2]]);
    const [isSpinning, setIsSpinning] = useState(false);

    // State-uri pentru bani (Sold și Miză)
    const [balance, setBalance] = useState(500); // Soldul inițial
    const [currentBet, setCurrentBet] = useState(20); // Miza implicită
    const [lastWin, setLastWin] = useState(0);

    const mizeDisponibile = [20, 40, 100, 200, 400];

    const spin = () => {
        if (isSpinning || balance < currentBet) {
            if (balance < currentBet) alert("Sold insuficient!");
            return;
        }

        setIsSpinning(true);
        setLastWin(0);

        // Scădem miza din sold imediat ce se învârte
        setBalance(prev => prev - currentBet);

        // Simulăm animația de învârtire
        setTimeout(() => {
            const newReels = [
                SIMBOLURI[Math.floor(Math.random() * SIMBOLURI.length)],
                SIMBOLURI[Math.floor(Math.random() * SIMBOLURI.length)],
                SIMBOLURI[Math.floor(Math.random() * SIMBOLURI.length)]
            ];

            setReels(newReels);
            setIsSpinning(false);

            // Verificăm dacă a câștigat (toate 3 la fel)
            if (newReels[0].id === newReels[1].id && newReels[1].id === newReels[2].id) {
                const winAmount = currentBet * newReels[0].valoare;
                setLastWin(winAmount);
                setBalance(prev => prev + winAmount);
            }
        }, 1000);
    };

    return (
        <div className="slot-machine-container">
        <video autoPlay loop muted playsInline className="video-bg">
                    <source src="/assets/background-video.mp4" type="video/mp4" />
                </video>

            <div className="game-header">
                <h1>LUCKY SLOT</h1>
            </div>

            <div className="reels-container">
                {reels.map((reel, index) => (
                    <div key={index} className={`reel ${isSpinning ? 'spinning' : ''}`}>
                        <img src={reel.src} alt={reel.id} />
                    </div>
                ))}
            </div>

            <div className="bottom-bar">
                <div className="info-box balance-box">
                    <span className="label">Sold</span>
                    <span className="value"> {balance}</span>
                </div>

                <div className="bet-buttons">
                    {mizeDisponibile.map(miza => (
                        <button
                            key={miza}
                            className={`bet-btn ${currentBet === miza ? 'active' : ''}`}
                            onClick={() => setCurrentBet(miza)}
                        >
                            <span className="bet-label">BET</span>
                            <span className="bet-value">{miza}</span>
                        </button>
                    ))}
                </div>

                <button className="spin-button" onClick={spin} disabled={isSpinning}>
                    {isSpinning ? "..." : "SPIN"}
                </button>

                <div className="info-box last-win-box">
                    <span className="label"> Ultimul castig</span>
                    <span className="value">{lastWin > 0 ? `+${lastWin}` : '-'}</span>
                </div>
            </div>
        </div>
    );
};

export default SlotMachine;