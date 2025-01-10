import React, { useEffect, useState } from 'react'
import { Badge, Table } from 'react-bootstrap';
import { PiListBulletsFill } from 'react-icons/pi'
import kbz from '../assets/images/kbz.svg';
import useLanguage from '../hooks/useLanguage';
import mm_data from '../lang/mm';
import en_data from '../lang/en';
import th_data from '../lang/th';
import ch_data from '../lang/ch';
import useFetchPaginate from '../hooks/useFetchPaginate';
import { useLocation, useNavigate } from 'react-router-dom';
import BASE_URL from '../hooks/baseURL';
import Paginate from '../components/Paginate';
import Logs from '../components/Logs';
import BonusLogs from '../components/BonusLogs';

const TransactionPage = () => {
  let navigate = useNavigate();
  let path = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");

  const handleType = (type) => {
    navigate(`/transaction-history?type=${type}`);
  }

  const { lang } = useLanguage();
  const content = lang === 'mm' ? mm_data.transferLogs : lang === 'ch' ? ch_data.transferLogs : lang === 'th' ? th_data.transferLogs : en_data.transferLogs;

  const [url, setUrl] = useState(BASE_URL + "/transaction/deposit-log");
  const { data, loading } = useFetchPaginate(url);

  let current_page = data?.meta?.current_page;
  let links = data?.meta?.links;
  let logs = data?.data;

  const pageChange = (newUrl) => {
    setUrl(newUrl);
  }

  useEffect(() => {
    if (!type) {
      navigate('/transaction-history?type=deposit');
      setUrl(BASE_URL + "/transaction/deposit-log");
    } else if (type === "deposit") {
      setUrl(BASE_URL + "/transaction/deposit-log");
    } else if (type === "withdraw") {
      setUrl(BASE_URL + "/transaction/withdraw-log");
    } else if (type === "bonus_log") {
      setUrl(BASE_URL + "/bonus-log");
    }
  }, [type]);

  console.log(logs);
  

  return (
    <div className='py-4 authBg py-sm-5 px-2 px-sm-3 px-lg-4'>
      <h3 className="mb-4 text-center fw-semibold">
        <PiListBulletsFill className='me-2' />
        {content.title}</h3>
      <div className="p-3 border border-warning rounded-3" style={{ background: '#151515' }}>
        <div className="cursor-pointer d-flex align-items-center gap-3 mb-4">
          <div className={`py-2  px-2 px-sm-4 text-center rounded-5 ${type === "deposit" && 'authBtn'}`} onClick={() => handleType("deposit")}>
            <p className='transactionText'>{content.deposit}</p>
          </div>
          <div className={`py-2 px-2 px-sm-4 text-center rounded-5 ${type === "withdraw" && 'authBtn'}`} onClick={() => handleType("withdraw")}>
            <p className='transactionText'>{content.withDraw}</p>
          </div>
          <div className={`py-2 px-2 px-sm-4 text-center rounded-5 ${type === "bonus_log" && 'authBtn'}`} onClick={() => handleType("bonus_log")}>
            <p className='transactionText'>{content.bonus_log}</p>
          </div>
        </div>
        {(type === "deposit" || type === "withdraw") && 
        <>
        <Logs logs={logs} loading={loading} current_page={current_page} links={links} pageChange={pageChange} />
        </>
        } 
        {type === "bonus_log" && (
          <BonusLogs logs={logs} loading={loading} current_page={current_page} links={links} pageChange={pageChange} />
        )}
      </div>
    </div>
  )
}

export default TransactionPage
