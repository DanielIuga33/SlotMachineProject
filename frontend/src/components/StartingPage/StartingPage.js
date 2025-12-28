import API_URL from '../..';
import axios from 'axios';

const StartingPage = () => {
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
            <button onClick={callBackend}></button>
        </div>
    )
}

export default StartingPage