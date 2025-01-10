import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_URL from './baseURL';
 import toast from 'react-hot-toast';

const useLogout = () => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const logout = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/logout`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            });
            if (response.ok) {
                setLoading(false);
                navigate('/login');
                toast.success('Logout successfully!')
                localStorage.removeItem('token');
             } else {
                console.error("Logout failed:", response.statusText);
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    return { logout, error, loading };
};

export default useLogout;