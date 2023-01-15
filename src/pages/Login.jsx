import { Formik } from "formik";
import { login } from "../config/firebase";
import { useRedirecActiveUser } from "../hooks/useRedirectActiveUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { errorPrefix } from "@firebase/util";

const Login = () => {

    useRedirecActiveUser('/dashboard')

    const onSubmit = async ({ email, password}, { setSubmitting, setErrors, resetForm}) => {
        try{
           const credentialUser =  await login({email , password})
            console.log(credentialUser)
            resetForm()
        } catch (error) {
            
            if(error.code === "auth/user-not-found") {
                return setErrors({ email: "Usuario no registrado"})
            }
            if(error.code === "auth/wrong-password") {
                return setErrors({ password: "Usuario no registrado"})
            }

        } finally {
            setSubmitting(false)
        }
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Ingresar un correo valido").required("requiere un correo electronico"),
        password: Yup.string().trim().min(6, "minimo seis caracteres").required('Password requerido'),
      });
    

    return(
        <>
            <h1>Login</h1>
            <Formik
                initialValues={{email: '', password: ''}}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {
                    ({ values, handleSubmit, handleChange, errors, touched, handleBlur, isSubmitting  }) => (
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                placeholder="Ingrese email"
                                value={values.email}
                                onChange={handleChange}
                                name='email'
                                onBlur={handleBlur}
                            />
                            {
                                errors.email && touched.email && errors.email
                            }
                            <input 
                                type="password" 
                                value={values.password}
                                placeholder="Ingrese Contraseña"
                                onChange={handleChange}
                                name='password'
                                onBlur={handleBlur}

                            />
                            {
                                errors.password && touched.password && errors.password
                            }
                            <button type="submit" disabled={isSubmitting }>Login</button>
                        </form>
                    )
                }
            </Formik>
        </>
    )
}

export default Login;
