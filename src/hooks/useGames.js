import { useEffect, useState } from "react";
import BASE_URL from "./baseURL";
import axios from "axios";

const useGames=()=>{
    
    const fetchGames=async (providerId,typeId,page=1)=>{
        try {
            const url=`${BASE_URL}/game_lists/${providerId}/${typeId}?page=${page}`
            const res = await axios.get(url,
                {headers:{
                    Authorization: "Bearer " + localStorage.getItem('token')
                }});
                if(res.status === 401){
                    localStorage.removeItem('token');
                    navigate('/login');
                }
                 
            return res.data;
        } catch (error) {
            console.log('Error when fetching Games: ',error)
        }
    }
 
    return { fetchGames };
}

export default useGames;