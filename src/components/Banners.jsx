import React from 'react'
import BASE_URL from '../hooks/baseURL';
import useFetch from '../hooks/useFetch';
import { Carousel } from 'react-bootstrap';

const Banners = () => {
  const { data, loading } = useFetch(`${BASE_URL}/banners`);
  // console.log(data);

  return (
    <Carousel className='my-2'>
      {data && data.map((item, index) => {
        return <Carousel.Item key={index} >
          <img src={item?.desktop_image} className='w-100 rounded-4 d-none d-md-block' />
          <img src={item?.mobile_image} className='w-100 rounded-4 d-md-none d-block' />
        </Carousel.Item>
      })}
    </Carousel>
  )
}

export default Banners
