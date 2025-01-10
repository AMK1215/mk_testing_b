import React, { useState } from 'react'
import '../assets/css/auth.css'
import logo from '../assets/images/logo.png'
import { FaPhoneAlt } from 'react-icons/fa'
import { IoIosLock } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseURL'
import useLogin from '../hooks/useLogin'
import { Spinner } from 'react-bootstrap'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

const LoginPage = () => {
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading, errMsg } = useLogin();
  const loginHandler = async (e) => {
    e.preventDefault();
    let url = BASE_URL + '/login';
    let inputData = { user_name, password };
    await login(url, inputData);
  }
  return (
    <div className='authBg pt-5'>
      <div className="row">
        <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-12">
          <div className="authForm px-3 py-4">
            <div className="text-center">
              <img src={logo} className='footerLogo ' />
              <h5 className='my-3'>Login</h5>
            </div>
            <form onSubmit={loginHandler}>
              <div className="mb-3">
                <div className='mb-2 d-flex align-items-center gap-2'>
                  <p>Username</p>
                </div>
                <input type="text"
                  value={user_name}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='Username'
                />
                {error && error.user_name ? <span className='text-white'>{error.user_name}</span> : <span className='text-white'>{errMsg}</span>}

              </div>
              <div className="mb-3">
                <div className='mb-2 d-flex align-items-center gap-2'>
                  <p>Password</p>
                </div>
                <div className='position-relative'>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={eye ? 'text' : 'password'} placeholder='Enter Password'
                  />
                  {eye ? <BsEye 
                  className='position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer' 
                  onClick={() => setEye(false)} /> : 
                  <BsEyeSlash 
                  className='position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer'
                  onClick={() => setEye(true)} />}
                </div>
                {error && error.password && <span className='text-light'>{error.password}</span>}
              </div>
              <div className="text-center">
                <button type='submit' className="authBtn mx-auto py-2 px-5 rounded-5">
                  {loading && <Spinner size='sm' className="me-2" />}
                  Submit
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <p className='mt-3'>
                Are you new player?
                <Link to={'/register'} className='ms-2 border-bottom'>Register</Link>
              </p>
            </div>
            <hr />
            <div className="mt-4">
              <small className="d-block text-center" style={{ textShadow: '0px 0px 5px red' }}>
                ကျွန်တော်တို့ ရဲ့ Superman ဝှက်ဆိုက် ကို လာရောက်ကစားကြသော ကာစတန် များအားလုံးကို ကျေးဇူးတင်ပါတယ် ခင်ဗျာ၊၊
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
