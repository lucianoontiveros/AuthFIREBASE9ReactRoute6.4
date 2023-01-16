import { Formik } from "formik";
import { useState } from "react";
import { register } from "../config/firebase";
import { useRedirecActiveUser } from "../hooks/useRedirectActiveUser";
import * as Yup from 'yup'
const Register = () => {

    useRedirecActiveUser('/dashboard')

    const onsubmit = async ({ email, password}, { setSubmitting, setErrors, resetForm}) => {
        try {
            const registerUser = await register({email, password})
            console.log(registerUser)
            resetForm()
        } catch (error) {
            if(error.code === 'auth/email-already-in-use') {
                return setErrors({ email: "El usuario ya esta registrado"})
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
            <h1>Register</h1>
            <Formik
                initialValues={{email: '', password: ''}}
                onSubmit={onsubmit}
                validationSchema={validationSchema}
            >
                {
                    ({ values, handleSubmit, handleChange, errors, touched, handleBlur, isSubmitting  }) => (
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                placeholder="Ingrese email"
                                value={values.email}
                                name='email'
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {
                                errors.email && touched.email && errors.email
                            }
                            <input 
                                type="password" 
                                value={values.password}
                                placeholder="Ingrese Contraseña"
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}

                            />
                            {
                                errors.password && touched.password && errors.password
                            }
                            <button type="submit" disabled={isSubmitting }>Register</button>
                        </form>
                    )
                }
            </Formik>
        </>
    )
}

export default Register;

