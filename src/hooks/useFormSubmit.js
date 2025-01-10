import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useFormSubmit = () => {
    const navigate = useNavigate();

    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const submit = async (url, inputData, redirect, message) => {

        try {
            setLoading(true);
            const res = await axios.post(url, inputData,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
            if (res.status === 200) {
                setLoading(false);
                toast.success(message);
                navigate(redirect)
            }
        } catch (error) {
            console.log('Error when submitting form: ', error)
            setErrors(error.response.data.errors);
            setLoading(false);

        }
    }
    return { submit, loading, errors };
}

export default useFormSubmit;