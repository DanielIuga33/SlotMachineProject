import "./RegisterPage.css"

const RegisterPage = () => {


    return( 
    <div>
        <h1>Welcome to Register Page</h1>
        <div className="screen">
            <div className="box">
            <label>Nume</label>
            <input type="text"></input>
            </div>

            <div className="box">
            <label>Prenume</label>
            <input type="text"></input>
            </div>

            <div className="box">
            <label>CNP</label>
            <input type="text"></input>
            </div>

            <div className="box">
            <label>Adresa</label>
            <input type="text"></input>
            </div>

            <div className="box">
            <label>email</label>
            <input type="text"></input>
            </div>

            <div className="box">
            <label>confirma email</label>
            <input type="text"></input>
            </div>

            <div className="box">
            <label>parola</label>
            <input type="text"></input>
            </div>

            <button> Submit</button>
        </div>


        
    </div>)
}

export default RegisterPage; 