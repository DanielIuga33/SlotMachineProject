import "./RegisterPage.css"
import axios from "axios";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import API_URL from '../..';

const RegisterPage = () => {
const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [emailError, setEmailError] = useState('');

    const [arontErr, setArontErr] = useState(false);
    const [finishErr, setFinishErr] = useState(false);
    const [emailLenErr, setEmailLenErr] = useState(false);

    const [charErr, setCharErr] = useState(false);
    const [noNrErr, setNoNrErr] = useState(false);
    const [noUpperErr, setNoUpperErr] = useState(false);

    const [formData, setFormData] = useState({
        name: '', 
        surname: '',  
        email: '',
        password: '',
        confirmPassword: '',
        address: '',   
        cnp: ''        
    });

    const isNumber = (str) => {
        if (typeof str !== "string") return false; 
        return !isNaN(str) && !isNaN(parseFloat(str));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "cnp" && !isNumber(value)){
            e.target.value = value.slice(0, -1);
        }
        setFormData({ ...formData, [name]: value });
    };

     useEffect(() => {
        if (formData.password) {
            setCharErr(formData.password.length < 8 || formData.password.length > 16);
            setNoNrErr(!/\d/.test(formData.password));
            setNoUpperErr(formData.password.toLowerCase() === formData.password);
        } else {
            setCharErr(false);
            setNoNrErr(false);
            setNoUpperErr(false);
        }
    }, [formData.password]);

    useEffect(() => {
        const { name, surname, email, password, confirmPassword } = formData;
        if (name && surname && email && password && confirmPassword) {
            setErrorMessage('');
        }
    }, [formData]);

    useEffect(() => {
        if (formData.email) {
            let ok = true;
            if (formData.email.length <= 6) {
                setEmailLenErr(true); ok = false;
            } else setEmailLenErr(false);

            if (!formData.email.includes("@")) {
                setArontErr(true); ok = false;
            } else setArontErr(false);

            const suffix = formData.email.slice(-4);
            const suffixRo = formData.email.slice(-3);
            if (!suffix.includes(".com") && !suffixRo.includes(".ro")) {
                setFinishErr(true); ok = false;
            } else setFinishErr(false);

            if (!ok) return;

            const checkEmail = async () => {
                try {
                    const response = await axios.get(`${API_URL}/user/check-email/${formData.email}`)
                    if (response.data) {
                        setEmailError('Email already exists');
                    } else {
                        setEmailError('');
                    }
                } catch (error) {
                    console.error('Error checking email:', error);
                }
            };
            checkEmail();

        } else {
            setEmailError('');
        }
    }, [formData.email]);


    const getEmailHelperText = () => {
        if (arontErr) return "Email must contain @";
        if (finishErr) return "Email must finish with .com or .ro";
        if (emailLenErr) return "Email must have at least 6 letters";
    };

    const handleSubmit = async () => {
        const { name, surname, email, password, confirmPassword } = formData;
        if (!name || !surname || !email || !password) {
            setErrorMessage('You need to complete all the fields!');
            return;
        } else if (charErr || noNrErr || noUpperErr || arontErr || finishErr || emailLenErr) {
            if (arontErr) setErrorMessage("Email must contain @");
            else if (finishErr) setErrorMessage("Email must finish with .com or .ro");
            else if (emailLenErr) setErrorMessage("Email must have at least 6 letters");
            else if (charErr) setErrorMessage("Password length must be between 8 and 16 letters")
            else if (noNrErr) setErrorMessage("Password must contain numbers !");
            else if (noUpperErr) setErrorMessage("Password must contain at least 1 upper later");
            else setErrorMessage("Invalid email")
            return;
        } else if (!confirmPassword) {
            setErrorMessage("You need to confirm the password!");
            return;
        } else if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match!');
            return;
        } else if (emailError) {
            return;
        }
        setErrorMessage('');
        try {
            // Trimitem direct state-ul formData
            const payload = {
                firstName: formData.name,      // Mapare manuală
                lastName: formData.surname,
                email: formData.email,
                password: formData.password,
                cnp: formData.cnp,             // Asigură-te că ai cnp și address în formData
                address: formData.address
            };

            const response = await axios.post(`${API_URL}/user/register`, payload);
            console.log('Success:', response.data);
            alert("Înregistrare reușită!");
            navigate("/login"); // Trimite userul la login după succes
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            alert("Eroare: " + (error.response?.data?.message || "Server indisponibil"));
        }
    };

    return (
        <div>
            <h1>Welcome to Register Page</h1>
            <video autoPlay loop muted playsInline className="video-bg">
                            <source src="/videoMoney/Generare_Video_Sloturi_cu_Bani.mp4" type="video/mp4" />
                        </video>

                        <div className="video-overlay"></div>
            <div className="logo-wrapper">
                                    <img src="/logo/Gemini_Generated_Image_ge1422ge1422ge14-removebg-preview.png" alt="VIP SLOTS Logo" />
                                </div>

            <div className="screen">
                <div className="box">
                    <label>Nume</label>
                    <input type="text" name="name" onChange={handleChange} />
                </div>
                <div className="box">
                    <label>Prenume</label>
                    <input type="text" name="surname" onChange={handleChange} />
                </div>
                <div className="box">
                    <label>CNP</label>
                    <input type="text" name="cnp" onChange={handleChange} />
                </div>
                <div className="box">
                    <label>Adresa</label>
                    <input type="text" name="address" onChange={handleChange} />
                </div>
                <div className="box">
                    <label>Email</label>
                    <input type="email" name="email" helperText={getEmailHelperText()} onChange={handleChange} />
                </div>
                <div className="box">
                    <label>Parola</label>
                    <input type="password" name="password" onChange={handleChange} />
                </div>
                <div className="box">
                    <label>Confirma Parola</label>
                    <input type="password" name="confirmPassword" onChange={handleChange} />
                </div>
                <p>{errorMessage}</p>
                <p>{emailError}</p>

                {/* Apelăm funcția corect, fără să mai pasăm argumente manual */}
                <button className="btn-submit" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default RegisterPage; 