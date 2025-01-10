import React from 'react'
import { AiFillSound } from 'react-icons/ai'
import { BsSoundwave } from 'react-icons/bs'
import useFetch from '../hooks/useFetch';
import BASE_URL from '../hooks/baseURL';

const Marquee = () => {
  const { data,loading } = useFetch(`${BASE_URL}/banner_text`);
 
  return (
    <div className="d-flex  w-full align-items-center gap-2">
        <AiFillSound/>
        <marquee direction="left" >
        {data?.text}
    </marquee>
    </div>
  )
}

export default Marquee
