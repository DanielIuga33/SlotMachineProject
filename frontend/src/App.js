import './App.css';
import { Routes, Route } from 'react-router-dom';
import StartingPage from './components/StartingPage/StartingPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';

function App() {
  return (
    <div className="App">
       <Routes>
            <Route path="/" element={<StartingPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
