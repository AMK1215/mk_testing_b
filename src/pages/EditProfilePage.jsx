import React, { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import user from '../assets/images/user.png'
import '../assets/css/profile.css'
import { Link } from 'react-router-dom'
import useLanguage from '../hooks/useLanguage'
import mm_data from '../lang/mm'
import en_data from '../lang/en'
import BASE_URL from '../hooks/baseURL'
import useFormSubmit from '../hooks/useFormSubmit'
import useFormDataSubmit from '../hooks/useFormDataSubmit'

const EditProfilePage = () => {
  const { formSubmit,loading } =useFormDataSubmit();
  const { lang } = useLanguage();
  const content= lang==='mm' ? mm_data.profile : en_data.profile ;
  const [profile,setProfile]=useState(null);
  const handleSubmit= async (e)=>{
     e.preventDefault();
    
    console.log('profile',profile)
     const url = `${BASE_URL}/updateProfile`;
    await formSubmit(url,{profile}, 'POST', '/profile', 'Profile updated successfully!');
  }
   return (
    <div className='authBg pt-4 pb-2  px-2 px-sm-3 px-lg-4'>
    <h3 className="mb-4 text-center fw-semibold">
     <FaRegUserCircle className='me-2' />
     {content.updateProfile}</h3>
     <form  onSubmit={handleSubmit}  className="customForm shadow-lg px-3 py-4 rounded-4 w-max mx-auto my-3">
        <div className="text-center w-full">
        <img src={user} className=' user img-fluid'  />
        </div>
        <div className="mb-3">
            <p className='mb-2'>Profile</p>
            <input  type="file" 
             onChange={(e) => {
              const file = e.target.files[0];
              console.log('Selected file:', file); 
              setProfile(file);
          }}
           className="form-control py-2 px-4 " />
        </div>
        <div className="mb-3">
            <p className='mb-2'>{content.phoneNo}</p>
            <input disabled type="text" value={'091234569'} className="form-control py-2 px-4 " />
        </div>
        <div className="mb-3">
            <p className='mb-2'>{content.userName}</p>
            <input disabled type="text" value={'user123'} className="form-control py-2 px-4 " />
        </div>
         <button type='submit' className='fw-semibold py-2 w-full rounded-4 text-center'>
            {content.updateProfile}
        </button>
      </form>
     
 </div>
  )
}

export default EditProfilePage
