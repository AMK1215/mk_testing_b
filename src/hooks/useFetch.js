import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useFetch = (url) => {
    let [data, setData] = useState([]);
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        let abortController = new AbortController();
        let signal = abortController.signal;
         fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token')
            },
            signal
        })
            .then(res => {
                setLoading(true);
                 if(res.status === 401){
                    localStorage.removeItem('token');
                    navigate('/login');
                }
                
                if (!res.ok) {
                    throw Error("Something Went Wrong!");
                }
                return res.json();
            })
            .then(data => {
                setData(data.data);
                 setLoading(false);
            })
            .catch(e => {
                setError(e.message);
                setLoading(false);
              });

         return () => {
            abortController.abort();
        };

    }, [url]);

    return { data, loading, error };
}

export default useFetch;