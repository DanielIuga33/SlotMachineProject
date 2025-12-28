import API_URL from '../..';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <h1>Hello</h1>
            <button onClick={callBackend}>Check if Backend Work</button>
            <button onClick={() => navigate('/login')}> Login</button>
            <button onClick={() => navigate('/register')}> Register</button>
        </div>
    )
}

export default StartingPage