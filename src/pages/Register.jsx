import { useState } from "react";
import { register } from "../config/firebase";
import { useRedirecActiveUser } from "../hooks/useRedirectActiveUser";

const Register = () => {

    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    useRedirecActiveUser('/dashboard')

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        try{
           const credentialUser =  await register({email, password})
            console.log(credentialUser)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            <h1>Register</h1>
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
                <button>Register</button>
            </form>
        </>
    )
}

export default Register;

