import React, { useState } from 'react'
import { FaGift } from 'react-icons/fa'
import useFetch from '../hooks/useFetch';
import BASE_URL from '../hooks/baseURL';
import { Spinner } from 'react-bootstrap'
import useLanguage from '../hooks/useLanguage';
import mm_data from '../lang/mm';
import en_data from '../lang/en';
import ch_data from '../lang/ch'
import th_data from '../lang/th'

const PromotionPage = () => {
  const { lang } = useLanguage();
  const content = lang === 'mm' ? mm_data.promotion : lang === 'ch' ? ch_data.promotion : lang === 'th' ? th_data.promotion : en_data.promotion;
  const noData = lang === 'mm' ? mm_data.gameLogs.noData : lang === 'ch' ? ch_data.gameLogs.noData : lang === 'th' ? th_data.gameLogs.noData : en_data.gameLogs.noData;
  const { data: promotions, loading } = useFetch(`${BASE_URL}/promotions`);
  const [detail, setDetail] = useState(false);
  const [detailItem, setDetailItem] = useState(null);

  const detailPromo = (id) => {
    const foundItem = promotions?.find((item) => item?.id === id);
    if (foundItem) {
      setDetailItem(foundItem);
      setDetail(true);
    }
  };

  return (
    <div className='py-4 authBg py-sm-5 px-2 px-sm-3 px-lg-4'>
      {!detail ? <>
        <h3 className="mb-4 text-center fw-semibold">
          <FaGift className='me-2' />
          {content}
        </h3>
        {loading ? <div className="text-center">
          <Spinner className='' />
        </div>
          : promotions.length === 0 ? <div className="text-center"> {noData} </div> :
          promotions.map((item, index) => {
            return <div key={index} className='mb-2 mb-md-4 '>
              <img src={item.image} className='bannerImg img-fluid py-2 rounded-4 w-full' />
              <button
                onClick={() => detailPromo(item.id)}
                className="btn btn-outline-light">
                {lang === 'mm' ? 'ကြည့်ရှုမယ်' : 'See More'}
                {/* {item.id} */}
              </button>
            </div>
          })}
      </> : (
        <div className='text-center'>
          <img src={detailItem?.image}
            className='w-100 rounded-4 py-2'
            alt="" />
          <p className='text-start'>{detailItem?.description}</p>
          <div className="text-end">
            <button
              onClick={() => setDetail(false)}
              className="btn btn-outline-light mt-4">
              Back
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default PromotionPage
