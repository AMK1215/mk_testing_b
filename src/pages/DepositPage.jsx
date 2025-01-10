import React, { useEffect, useState } from 'react'
import { BsBank2 } from 'react-icons/bs'
import '../assets/css/money.css'
import { MdOutlineContentCopy } from 'react-icons/md'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseURL'
import toast from 'react-hot-toast'
import useLanguage from '../hooks/useLanguage'
import mm_data from '../lang/mm'
import en_data from '../lang/en'
import th_data from '../lang/th'
import ch_data from '../lang/ch'
import useFormDataSubmit from '../hooks/useFormDataSubmit'
import { Spinner } from 'react-bootstrap'
// import Project_URL from '../hooks/projectURL'

const DepositPage = () => {
    const { lang } = useLanguage();
    const content = lang === 'mm' ? mm_data.deposit : lang === 'ch' ? ch_data.deposit : lang === 'th' ? th_data.deposit : en_data.deposit;
    const copyContent = lang === 'mm' ? mm_data.deposit : lang === 'ch' ? ch_data.deposit : lang === 'th' ? th_data.deposit : en_data.deposit;
    const { data: banks, loading: banksLoading } = useFetch(`${BASE_URL}/banks`);

    const copyNumber = (number) => {
        navigator.clipboard.writeText(number)
        toast.success(copyContent.copied)
    }
    const [bankId, setBankId] = useState(null);
    const handleBankId = (e) => setBankId(e.target.value);
    const [amount, setAmount] = useState('');
    const [file, setFile] = useState(null);
    const { formSubmit, loading, error: errors } = useFormDataSubmit();
    // console.log('errors', errors)


    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${BASE_URL}/transaction/deposit`;
        const inputData = new FormData();
        inputData.append('bank_id', bankId);
        inputData.append('amount', amount);
        inputData.append('image', file);
        await formSubmit(url, inputData, 'POST', '/transaction-history?type=deposit', 'Deposit Success');
    }
    useEffect(() => {
        setBankId(banks[0]?.id)
    }, [banks]);

    // console.log(banks);
    

    return (
        <div className='authBg py-4 py-sm-5 px-2 px-sm-3 px-lg-4 ' style={{ overflowX: 'hidden' }}>
            <h3 className="mb-4 text-center fw-semibold">
                <BsBank2 size={0} className='me-2' />
                {content.title}
            </h3>
            <small className="d-block text-center">({content.text}) *
            </small>
            {/* <div className="mt-4 py-4 px-3 rounded-3 border border-warning text-center" style={{background:'#030318'}}>
        <p  >{content.please}</p>
        <div className="d-flex align-items-center justify-content-center gap-2">
        <img src={kbz} className='kbz' />
        <p className="fw-semibold">Kanbawza Bank</p>
        </div>
        <p>အကောင့်ဖွင့်သူ ဘဏ်နံပါတ် : XXXXXX8910 </p>
        <p>အကောင့်အမည် : myokhaing amk</p>
       <Link to={'https://web.telegram.org'} className="d-flex flex-wrap align-items-center justify-content-center mt-3 gap-2">
       <p style={{textDecoration:'underline'}}>ငွေသွင်း/ငွေထုတ် နှင့် အခြားသောကိစ္စအခက်ခဲများ ရှိလျှင် ဆက်သွယ်ရန်  </p>
        <button className="bg-danger rounded-5 text-center fw-semibold text-white py-2 px-5">
        ဆက်သွယ်ရန်
        </button>
       </Link>

    </div> */}
            <div className="mt-4 row">
                <div className="col-lg-6 px-2">
                    <div className="border p-3 border-warning shadow-lg" style={{ background: '#151515' }}>
                        <h5 className='mb-4'>{content.copyBank}</h5>
                        <div className="mt-2">
                            {banks?.map((bank, index) => {
                                return <div key={index} className="mb-3 border border-warning rounded-3 p-3">
                                    <div className="row">
                                        <div className="col-3 col-sm-2 px-1">
                                            <img className='kbz rounded-4' src={bank.logo} />
                                        </div>
                                        <div className="col-9 col-sm-10">
                                            <p>{bank.bank}</p>
                                            <p>{content.accountName} : {bank.account_name}</p>
                                            <p>{content.accountNo} : {bank.account_number}</p>
                                        </div>
                                    </div>
                                    <div onClick={() => copyNumber(bank?.account_number)} style={{ textWrap: 'nowrap' }} className="cursor-pointer my-2 w-full fw-semibold authBtn py-2
                        px-2 px-sm-5 rounded-5 text-center">
                                        <MdOutlineContentCopy size={20} />
                                        <small >{content.copyText}</small>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 px-2 mt-4 mt-lg-0">
                    <form onSubmit={handleSubmit} style={{ background: '#151515' }} className="p-3 border border-warning">
                        <h5 className='mb-4'>{content.fillInfo}</h5>
                        <div className="mb-3 ">
                            <p className="mb-1">{content.accountName}</p>
                            <select onChange={handleBankId} className='w-full form-control' name="" id="">
                                {banks.map((bank, index) => {
                                    return <option key={index} value={bank.id}>{bank.account_name}({bank.bank}) ({bank.account_number})</option>
                                })}
                            </select>
                            {errors?.bank_id && <p className="text-danger">{errors?.bank_id}</p>}

                        </div>
                        <div className="mb-3 ">
                            <p className="mb-1">{content.amount}</p>
                            <input type="number" placeholder={content.amount}
                                value={amount} onChange={(e) => setAmount(e.target.value)}
                                className="w-full form-control" />
                            {errors?.amount && <p className="text-danger">{errors?.amount}</p>}

                        </div>
                        <div className="mb-3 ">
                            <p className="mb-1">{content.slip}</p>
                            <input type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                placeholder='ငွေလွဲ စလစ်ထည့်ပါ' className="w-full form-control" />
                            {errors?.image && <p className="text-danger">{errors?.image}</p>}
                        </div>
                        <button type='submit' style={{ textWrap: 'nowrap' }} className="my-2 w-full fw-semibold authBtn py-2
                        px-2 px-sm-5 rounded-5 text-center">
                            {loading && <Spinner animation="border" size="sm" />}
                            <small >{content.submit}</small>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DepositPage
