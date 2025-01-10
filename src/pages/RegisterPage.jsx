import React, { useState } from 'react'
import '../assets/css/auth.css'
import logo from '../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import BASE_URL from '../hooks/baseURL'
import useRegister from '../hooks/useRegister'
import { Switch } from 'antd'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

const RegisterPage = () => {
    const [eye, setEye] = useState(false);
    const [eye1, setEye1] = useState(false);
    const [show, setShow] = useState(false);
    const onChange = (checked) => {
        setShow(checked);
    };
    const [form, setForm] = useState({
        name: '', phone: '', password: '', password_confirmation: '', referral_code: '',
    });
    const handleFormInput = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    }

    const [loading, setLoading] = useState(false);
    const { formSubmit, error } = useRegister();
    const submitHandler = async (e) => {
        const url = `${BASE_URL}/register`;
        e.preventDefault();
        setLoading(true);
        await formSubmit(url, form);
        setLoading(false);
    }
    // console.log(error);

    return (
        <div className='authBg pt-4'>
            <div className="row">
                <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-12">
                    <form onSubmit={submitHandler} className="authForm px-4 pt-4 pb-2">
                        <div className="text-center pb-3">
                            <img src={logo} className='footerLogo ' />
                            <h4 className='mt-3'>Register </h4>
                        </div>
                        <div className="mb-3">
                            <div className='mb-2 d-flex align-items-center gap-2'>
                                <p>Name</p>
                            </div>
                            <input
                                id='name'
                                value={form.name}
                                onChange={handleFormInput}
                                type="text"
                                placeholder='Enter Name'
                            />
                            {error && error.name && <p className='text-white'>{error.name}</p>}
                        </div>
                        <div className="mb-3">
                            <div className='mb-2 d-flex align-items-center gap-2'>
                                <p>Phone Number</p>
                            </div>
                            <input
                                id='phone'
                                value={form.phone}
                                onChange={handleFormInput}
                                type="text"
                                placeholder='Enter Phone Number'
                            />
                            {error && error.phone && <p className='text-white'>{error.phone}</p>}
                        </div>
                        <div className="mb-3">
                            <div className='mb-2 d-flex align-items-center gap-2'>
                                <p>Password</p>
                            </div>
                            <div className='position-relative'>
                                <input
                                    id='password'
                                    value={form.password}
                                    onChange={handleFormInput}
                                    type={eye ? 'text' : 'password'}
                                    placeholder='Enter Password'
                                />
                                {eye ? <BsEye
                                    className='position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer'
                                    onClick={() => setEye(false)} /> :
                                    <BsEyeSlash
                                        className='position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer'
                                        onClick={() => setEye(true)} />}
                            </div>
                            {error && error.password && <p className='text-white'>{error.password}</p>}
                        </div>
                        <div className="mb-3">
                            <div className='mb-2 d-flex align-items-center gap-2'>
                                <p>Confirm Password</p>
                            </div>
                            <div className='position-relative'>
                                <input id='password_confirmation'
                                    value={form.password_confirmation}
                                    onChange={handleFormInput}
                                    type={eye1 ? 'text' : 'password'}
                                    placeholder='Enter Confirm Password'
                                />
                                {eye1 ? <BsEye
                                    className='position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer'
                                    onClick={() => setEye1(false)} /> :
                                    <BsEyeSlash
                                        className='position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer'
                                        onClick={() => setEye1(true)} />}
                            </div>
                            {error && error.password_confirmation && <p className='text-white'>{error.password_confirmation}</p>}
                        </div>
                        <div>
                            <label htmlFor="" className="form-label">
                                <Switch onChange={onChange} className='me-2' />
                                With Referral Code?
                            </label>
                        </div>

                        {show && (
                            <div className="mb-3">
                                <div className='mb-2 d-flex align-items-center gap-2'>
                                    <p>Referal Code</p>
                                </div>
                                <input value={form.referral_code}
                                    id='referral_code'
                                    onChange={handleFormInput}
                                    type="text"
                                    placeholder='Enter Referal Code'
                                />
                                {error && error.referral_code && <p className='text-white'>{error.referral_code}</p>}
                            </div>
                        )}

                        <div className="text-center mt-4">
                            <button type='submit' className="authBtn mx-auto py-2 px-5 rounded-5">
                                {loading && <Spinner size='sm' className='me-2' />}  Submit
                            </button>
                            <p className='mt-3'>
                                Already have an account?
                                <Link to={'/login'} className='ms-2 border-bottom'>Login</Link>
                            </p>
                        </div>
                        <hr />
                        <small className="d-block text-center ">
                            ကျွန်တော်တို့ ရဲ့ Superman ဝှက်ဆိုက် ကို လာရောက်ကစားကြသော ကာစတန် များအားလုံးကို ကျေးဇူးတင်ပါတယ် ခင်ဗျာ၊၊
                        </small>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default RegisterPage
