import { useState } from 'react';
import { registerWithEmailPassword, loginWithEmailPassword, loginWithGoogle } from './authService';  
import axios from 'axios'; 
import { useDispatch } from 'react-redux';
import { userData } from '../Store/userSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const login = async (data) => {
        const { email, password } = data;
    
        try {
            setLoading(true);
            setError(null);
        
            const user = await loginWithEmailPassword(email, password);     
            
            const idToken = await user.getIdToken();
        
            const response = await axios.post(
                `${backendUrl}/api/auth/login`,
                { idToken, email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
        
            dispatch(userData(response?.data));
            localStorage.setItem("user", JSON.stringify(response.data));
            toast.success("You are now Logged In")
            setTimeout(()=>{
                navigate("/")
            },1000)
        } catch (err) {
            console.error("Error:", err); 
            setLoading(false);
            setError(err?.response?.data?.message || err.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
        
    };


    const register = async (data) => {
        const {email,password,username} = data
        setLoading(true);
        setError(null);
        try {
            const user = await registerWithEmailPassword(email, password);
            const idToken = await user.getIdToken();
            const response = await axios.post(`${backendUrl}/api/auth/register`, {
                idToken,
                email,username  
            });

            setLoading(false);
            console.log("User Registerd",response.data)

        } catch (err) {
            setLoading(false);
            setError(err.message || 'Failed to register');
            return null;
        }
    };

    const googleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            const user = await loginWithGoogle();
            const idToken = await user.getIdToken();
            const response = await axios.post(`${backendUrl}/api/auth/google-login`, { idToken });
            dispatch(userData(response?.data));
            const result = JSON.stringify(response.data);
            localStorage.setItem("user",result)
            setTimeout(()=>{
                toast.success("Google log in Successfull")

            },[2000])

            setTimeout(()=>{
                navigate('/')

            },2500)
            setLoading(false);
            return response.data;  

        } catch (err) {
            setLoading(false);
            setError(err.message || 'Google login failed');
            return null;
        }
    };

    



    return {
        login,
        register,
        googleLogin,loading
        
    };
};

export default useAuth;
