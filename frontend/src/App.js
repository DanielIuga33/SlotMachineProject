import './App.css';
import { Routes, Route } from 'react-router-dom';
import StartingPage from './components/StartingPage/StartingPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import MainPage from './components/MainPage/MainPage';
import AccountPage from './components/AccountPage/AccountPage';
import GamesPage from './components/GamesPage/GamesPage';
import TransactionPage from './components/TransactionsPage/TransactionPage';
import EditAccountPage from './components/EditAccountPage/EditAccountPage';
import SlotMachine from './components/SlotMachine/SlotMachine';


function App() {
  return (
    <div className="App">
       <Routes>
            <Route path="/" element={<StartingPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/main" element={<MainPage/>}/>
            <Route path="/account" element={<AccountPage/>}></Route>
            <Route path="/main/games" element={<GamesPage/>}></Route>
            <Route path="/transactions" element={<TransactionPage/>}></Route>
            <Route path="/edit-account" element={<EditAccountPage />} ></Route>
            <Route path="/slot-machine" element={<SlotMachine />} />
        </Routes>
    </div>
  );
}

export default App;
