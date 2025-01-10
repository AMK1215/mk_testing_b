import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import kbz from '../assets/images/kbz.svg'
import { GrMoney } from 'react-icons/gr'
import useLanguage from '../hooks/useLanguage'
import mm_data from '../lang/mm'
import en_data from '../lang/en'
import th_data from '../lang/th'
import ch_data from '../lang/ch'
import useAuth from '../hooks/useAuth'
import useFormSubmit from '../hooks/useFormSubmit'
import BASE_URL from '../hooks/baseURL'
import { Spinner } from 'react-bootstrap'
import useFetch from '../hooks/useFetch'


const WithDrawPage = () => {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const {data: banks} = useFetch(BASE_URL + "/banks");
  // console.log(banks);
  
  const content = lang === 'mm' ? mm_data.withDraw : lang === 'ch' ? ch_data.withDraw : lang === 'th' ? th_data.withDraw : en_data.withDraw;
  const [form, setForm] = useState({
    bank_id: 0, amount: '', account_name: '', account_no: ''
  })
  const handleInput = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  }
  const { submit, loading, errors } = useFormSubmit();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${BASE_URL}/transaction/withdraw`
    await submit(url, form, '/transaction-history?type=withdraw', 'Withdraw Success');
  }
  return (
    <div className='authBg py-4 py-sm-5 px-2 px-sm-3 px-lg-4'>
      <div style={{ background: '#121212' }} className="p-3 pb-5 border border-warning rounded-4">
        <h4 className="text-center mb-5">
          <GrMoney size={40} /> {content.title}  </h4>
        <div className="row">
          <form onSubmit={handleSubmit} className="col-lg-4 offset-lg-4 px-2 mt-4 mt-lg-0">
            <div className="mb-3">
              <p className="mb-1">{content.select_bank}
              </p>
              <select
              className='form-control form-select'
              id="bank_id"
              onChange={handleInput}
              value={form.bank_id}
              >
                <option value="">Choose</option>
                {banks && banks.map((bank, index) => (
                  <option key={index} value={bank.bank_id}>{bank.bank}</option>
                ))}
                
              </select>
              {errors?.bank_id && <p className="text-danger">{errors?.bank_id}</p>}
            </div>
            <div className="mb-3">
              <p className="mb-1">{content.enterAmount}
              </p>
              <input
                id='amount'
                value={form.amount}
                onChange={handleInput}
                type="text" className="form-control w-full" />
              {errors?.amount && <p className="text-danger">{errors?.amount}</p>}
            </div>
            <div className="mb-3">
              <p className="mb-1">{content.accountName}
              </p>
              <input
                id='account_name'
                value={form.account_name}
                onChange={handleInput}
                type="text" className="form-control w-full" />
              {errors?.account_name && <p className="text-danger">{errors?.account_name}</p>}
            </div>
            <div className="mb-3">
              <p className="mb-1">{content.enterAccountNo}
              </p>
              <input
                id='account_no'
                value={form.account_no}
                onChange={handleInput}
                type="text" className="form-control w-full" />
              {errors?.account_no && <p className="text-danger">{errors?.account_no}</p>}
            </div>
            <button type='submit' className="w-full mt-3 authBtn py-2 px-4 px-sm-5 rounded-5 fw-semibol">
              {loading && <Spinner animation="border" size="sm" />}
              {content.submit}
            </button>
            {/* <p className='ms-2 mb-2 mt-4'>ငွေထုတ်ရန် စည်းကမ်းများ
            </p>
            <ul>
              <li>ငွေထုတ်ရန် အကြိမ်ရေ အကန့်သတ် မရှိပါ(ယနေ့ ထုတ်ယူသည့် အရေထွက်လက်ကျန် 0)
              </li>
              <li>ငွေထုတ်ရန် ပမာဏ အကန့်သတ် မရှိပါ(ယနေ့ထုတ်ယူနိုင်သော ပမာဏလက်ကျန် 0 MMK)
              </li>
            </ul> */}
          </form>
        </div>
      </div>
    </div>
  )
}

export default WithDrawPage
