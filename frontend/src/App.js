import './App.css';
import { Routes, Route } from 'react-router-dom';
import StartingPage from './components/StartingPage/StartingPage';

function App() {
  return (
    <div className="App">
       <Routes>
            <Route path="/" element={<StartingPage/>} />
        </Routes>
    </div>
  );
}

export default App;
