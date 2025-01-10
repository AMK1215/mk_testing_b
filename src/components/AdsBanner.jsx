import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useFetch from '../hooks/useFetch';
import BASE_URL from '../hooks/baseURL';
import { useMediaQuery } from 'react-responsive';

const AdsBanner = () => {
  const { data: ads, loading } = useFetch(`${BASE_URL}/ads_banner`);
  // console.log(ads);
  
  const MySwal = withReactContent(Swal);

  // Check if the device is mobile or desktop
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const adsFire = () => {
    MySwal.fire({
      imageUrl: isMobile ? ads?.mobile_image : ads?.desktop_image,
      imageHeight: 150,
      width: '100%',
      text: ads?.text,
    });
  };

  if (!loading && (ads?.mobile_image || ads?.desktop_image)) adsFire();

  return <div></div>;
};

export default AdsBanner;
