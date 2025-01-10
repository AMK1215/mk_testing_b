import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const formSubmit = async (url, inputData) => {
        try {
            const res = await axios.post(url, inputData);
            if (res.status === 200) {
                toast.success('Register successfully!')
                localStorage.setItem('token', res.data.data.token);
                navigate('/');
                return res.data.data.user;
            }
        } catch (e) {
            const errObj = e.response.data?.errors;
            setError(errObj);
            toast.error(
                errObj.name ||
                errObj.phone ||
                errObj.password ||
                errObj.referral_code
            )
        }
    }

    return { formSubmit, error };
}

export default useRegister;