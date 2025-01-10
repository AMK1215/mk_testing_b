import React, { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import user from '../assets/images/user.png'
import '../assets/css/profile.css'
import { Link } from 'react-router-dom'
import useLanguage from '../hooks/useLanguage'
import mm_data from '../lang/mm'
import en_data from '../lang/en'
import th_data from '../lang/th'
import ch_data from '../lang/ch'
import useFormSubmit from '../hooks/useFormSubmit'
import BASE_URL from '../hooks/baseURL'
import { Spinner } from 'react-bootstrap'

const ChangePasswordPage = () => {
  const { submit, loading, errors } = useFormSubmit();
  const { lang } = useLanguage();

  let content = lang === 'mm' ? mm_data.changePassword : lang === 'ch' ? ch_data.changePassword : lang === 'th' ? th_data.changePassword : en_data.changePassword;

  const [form, setForm] = useState({
    current_password: '', password: '', password_confirmation: ''
  })
  const handleInput = (e) => {
    setForm({
      ...form, [e.target.id]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${BASE_URL}/changePassword`;
    await submit(url, form, '/', 'Password updated successfully!')
  }
  return (
    <div className='authBg py-4 py-sm-5 px-2 px-sm-3 px-lg-4'>
      <h3 className="mb-4 text-center fw-semibold">
        <FaRegUserCircle className='me-2' />
        {content.title}
      </h3>
      <form onSubmit={handleSubmit} className="customForm shadow-lg px-3 py-4 rounded-4 w-max mx-auto my-3">
        <div className="mb-3">
          <p className='mb-2'>{content.oldPw}</p>
          <input type="password" value={form.current_password} id='current_password'
            onChange={handleInput} className="form-control py-2 px-4 " />
          {errors?.current_password && <p className="text-danger mt-1"> {errors.current_password} </p>}
        </div>
        <div className="mb-3">
          <p className='mb-2'>{content.newPw}</p>
          <input type="password" value={form.password} id='password' onChange={handleInput} className="form-control py-2 px-4 " />
          {errors?.password && <p className="text-danger mt-1"> {errors.password} </p>}
        </div>
        <div className="mb-3">
          <p className='mb-2'>{content.cPw}</p>
          <input type="password" value={form.password_confirmation} id='password_confirmation' onChange={handleInput} className="form-control py-2 px-4 " />
          {errors?.password_confirmation && <p className="text-danger mt-1"> {errors.password_confirmation} </p>}
        </div>
        <button type='submit' className='fw-semibold py-2 w-full rounded-4 text-center'>
          {loading && <Spinner size='sm' className='me-2' />} {content.submit}
        </button>
      </form>

    </div>
  )
}

export default ChangePasswordPage
