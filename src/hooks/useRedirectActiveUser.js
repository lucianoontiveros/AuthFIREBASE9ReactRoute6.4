import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../context/UserContext";

export const useRedirecActiveUser = (path) => { 
    const  { user }  = useUserContext()
    const navigate = useNavigate()
    useEffect(() => {
        if(user) {
            navigate(path)
        }
    }, [user]);
}