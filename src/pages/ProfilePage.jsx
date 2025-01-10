import React from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import userImg from '../assets/images/user.png'
import '../assets/css/profile.css'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useLanguage from '../hooks/useLanguage'
import mm_data from '../lang/mm'
import en_data from '../lang/en'
import th_data from '../lang/th'
import ch_data from '../lang/ch'

const ProfilePage = () => {
    const { auth, user } = useAuth();
    const { lang } = useLanguage();
    const content = lang === 'mm' ? mm_data.profile : lang === 'ch' ? ch_data.profile : lang === 'th' ? th_data.profile : en_data.profile;
    if (auth) return (
        <div className='authBg py-4 py-sm-5 px-2 px-sm-3 px-lg-4'>
            <h3 className="mb-4 text-center fw-semibold">
                <FaRegUserCircle className='me-2' />
                {content.title}</h3>
            <div className="customForm shadow-lg px-3 py-4 rounded-4 w-max mx-auto my-3">
                <div className="text-center w-full">
                    {/* <img src={user?.profile|| userImg} className=' user img-fluid'  /> */}
                </div>
                <div className="mb-3">
                    <p className='mb-2'>{content.userName}</p>
                    <input type="text"
                        value={user?.user_name} className="form-control py-2 px-4 "
                        disabled
                    />
                </div>
                <div className="mb-3">
                    <p className='mb-2'>{content.phoneNo}</p>
                    <input type="text"
                        value={user?.phone} className="form-control py-2 px-4 "
                        disabled
                    />
                </div>
                {/* <Link to={'/edit-profile'}>
        <button className='fw-semibold py-2 w-full rounded-4 text-center'>
           {content.updateProfile}
        </button>
        </Link> */}
            </div>

        </div>
    )
}

export default ProfilePage
