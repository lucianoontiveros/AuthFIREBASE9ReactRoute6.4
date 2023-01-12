import { useState } from "react";
import { login } from "../config/firebase";

const Login = () => {

    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log("me diste a submit")
        
        try{
           const credentialUser =  await login({email, password})
            console.log(credentialUser)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            <h1></h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Ingrese email"
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    value={password}
                    placeholder="Ingrese Contraseña"
                    onChange={ (e) => setPassword(e.target.value)}

                />
                <button>Login</button>
            </form>
        </>
    )
}

export default Login;
