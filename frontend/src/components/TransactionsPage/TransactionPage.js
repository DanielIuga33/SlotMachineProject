import React, { useState } from 'react';
import SideBar from '../SideBar/SideBar';
import axios from 'axios';
import './TransactionsPage.css';
import { useNavigate } from 'react-router-dom';

const TransactionPage = () => {
    const [amount, setAmount] = useState('');
    const userId = localStorage.getItem('userId');
    const [choice, setChoice] = useState('');
    const navigate = useNavigate();

    const handleDeposit = async (e) => {
        e.preventDefault();

        if (!amount || amount <= 0) {
            window.alert("Te rugăm să introduci o sumă validă.");
            return;
        }

        const transactionData = {
            userId: parseInt(userId),
            amount: parseFloat(amount),
            type: "Depunere",
            date: new Date().toISOString()
        };

        try {
            await axios.post('https://localhost:7127/api/Transaction', transactionData);
            window.alert(`Succes! Ai depus ${amount} RON în contul tău.`);
            setAmount('');
        } catch (err) {
            console.error("Eroare la depunere:", err);
            window.alert("Eroare la procesarea plății. Verifică conexiunea cu serverul.");
        }
    };

    if(choice === "") return(

             <div className="transaction-container">
                  <SideBar />
                   <div className="logout-overlay">

                    <button className="btn-back" onClick={() => navigate('/main/games')}>Inapoi</button>

                                      <div className="logout-panel">
                                        <h2>Alege optiunea dorita</h2>
                                        <div className="logout-buttons">
                                          <button className="btn-da" onClick={() => setChoice("Depunere")}>Depunere</button>
                                          <button className="btn-nu" onClick={() => setChoice("Retragere")}>Retragere</button>
                                        </div>
                                      </div>
                                    </div>

                        <div className="logo-wrapper-login">
                            <img src="/logo/Gemini_Generated_Image_ge1422ge1422ge14-removebg-preview.png" alt="VIP SLOTS Logo" />
                        </div>
                        <video autoPlay loop muted playsInline className="video-bg">
                                        <source src="/videoMoney/video-tranzactii.mp4" type="video/mp4" />
                                    </video>
              </div>

    )

    if (choice === "Depunere") return (
        <div className="transaction-container">
            <SideBar />

      <button className="btn-back" onClick={() => setChoice("")}>Inapoi</button>

            <div className="logo-wrapper-login">
                            <img src="/logo/Gemini_Generated_Image_ge1422ge1422ge14-removebg-preview.png" alt="VIP SLOTS Logo" />
                        </div>

              <video autoPlay loop muted playsInline className="video-bg">
                        <source src="/videoMoney/video-tranzactii.mp4" type="video/mp4" />
              </video>

            <main className="transaction-main-content">
                <div className="transaction-glass-card">
                    <form className="transaction-form" onSubmit={handleDeposit}>
                        <div className="payment-options">
                            <button type="button">PayPal</button>
                            <button type="button">Apple Pay</button>
                            <button type="button">Google Pay</button>
                        </div>

                        <div className="separator">
                            <hr className="line" />
                            <p>SAU CU CARDUL</p>
                            <hr className="line" />
                        </div>

                        <div className="credit-card-info">
                            <div className="input-container">
                                <label className="input-label">NUME DEȚINĂTOR</label>
                                <input className="input-field" type="text" placeholder="" required />
                            </div>

                            <div className="input-container">
                                <label className="input-label">SUMĂ DEPUNERE (RON)</label>
                                <input
                                    className="input-field no-spinners"
                                    type="number"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="split-inputs">
                                <div className="input-container">
                                    <label className="input-label">EXPIRARE</label>
                                    <input className="input-field" type="text" placeholder="MM/YY" required />
                                </div>
                                <div className="input-container">
                                    <label className="input-label">CVC</label>
                                    <input className="input-field" type="password" placeholder="***" required />
                                </div>
                            </div>
                        </div>

                        <button className="deposit-btn" type="submit">DEPUNE BANI</button>
                    </form>
                </div>
            </main>
        </div>
    );

        if (choice === "Retragere") return (
            <div className="transaction-container">
                <SideBar />

          <button className="btn-back" onClick={() => setChoice("")}>Inapoi</button>

                <div className="logo-wrapper-login">
                                <img src="/logo/Gemini_Generated_Image_ge1422ge1422ge14-removebg-preview.png" alt="VIP SLOTS Logo" />
                            </div>
                <video autoPlay loop muted playsInline className="video-bg">
                    <source src="/videoMoney/video-tranzactii.mp4" type="video/mp4" />
                 </video>

                <main className="transaction-main-content">
                    <div className="transaction-glass-card">
                        <form className="transaction-form" onSubmit={handleDeposit}>
                            <div className="payment-options">
                                <button type="button">PayPal</button>
                                <button type="button">Apple Pay</button>
                                <button type="button">Google Pay</button>
                            </div>

                            <div className="separator">
                                <hr className="line" />
                                <p>SAU CU CARDUL</p>
                                <hr className="line" />
                            </div>

                            <div className="credit-card-info">
                                <div className="input-container">
                                    <label className="input-label">NUME DEȚINĂTOR</label>
                                    <input className="input-field" type="text" placeholder="" required />
                                </div>

                                <div className="input-container">
                                    <label className="input-label">SUMĂ DEPUNERE (RON)</label>
                                    <input
                                        className="input-field no-spinners"
                                        type="number"
                                        placeholder="0.00"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="split-inputs">
                                    <div className="input-container">
                                        <label className="input-label">EXPIRARE</label>
                                        <input className="input-field" type="text" placeholder="MM/YY" required />
                                    </div>
                                    <div className="input-container">
                                        <label className="input-label">CVC</label>
                                        <input className="input-field" type="password" placeholder="***" required />
                                    </div>
                                </div>
                            </div>

                            <button className="deposit-btn" type="submit">DEPUNE BANI</button>
                        </form>
                    </div>
                </main>
            </div>
        );



};

export default TransactionPage;