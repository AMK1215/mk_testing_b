import React, { useEffect, useState } from 'react'
import useGames from '../hooks/useGames'
import launchGame from '../hooks/launchGame'
import { useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseURL'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Spinner } from 'react-bootstrap'
import useLanguage from '../hooks/useLanguage'
import mm_data from '../lang/mm'
import en_data from '../lang/en'
import th_data from '../lang/th'
import ch_data from '../lang/ch'

const GameTabs = () => {

   const { data: hotGames } = useFetch(`${BASE_URL}/hot_games`);
   const [homeGamesLoading, setHomeGamesLoading] = useState(false);
   const [slots, setSlots] = useState([]);
   const [casinos, setCasinos] = useState([]);
   const { fetchGames } = useGames();
   useEffect(() => {
      (async () => {
         setHomeGamesLoading(true)
         const slotsData = await fetchGames(1, 2);
         const casinosData = await fetchGames(2, 6);
         setSlots(slotsData);
         setCasinos(casinosData);
         setHomeGamesLoading(false);
      })();
   }, [])
   const navigate = useNavigate();
   const { lang } = useLanguage();
   const content = lang === 'mm' ? mm_data.home.gameTitles : lang === 'ch' ? ch_data.home.gameTitles : lang === 'th' ? th_data.home.gameTitles : en_data.home.gameTitles;
   return (
      <div className='px-2 mt-4 cursor-pointer'>
         {hotGames?.length > 0 && (
            <>
               <h4 className="mb-2 fw-semibold">{content.hot_games}</h4>
               <div className="d-flex mb-4 gap-2">
                  <div className="gameTabImg1 popularImg1">
                     <div className="pt-1 pt-md-3 d-flex align-items-center justify-content-center flex-column">
                        <p className="tabText">{hotGames.length} Games</p>
                        <h5 className="text-center tabTitle px-md-1">Hot Games</h5>
                        <p
                           onClick={() => navigate('/hotGames')}
                           className="allGamesText tabText"
                        >
                           All Games
                        </p>
                     </div>
                  </div>
                  {homeGamesLoading ? (
                     <Spinner className="m-2" />
                  ) : (
                     <Swiper
                        breakpoints={{
                           200: { slidesPerView: 2 },
                           330: { slidesPerView: 3 },
                           450: { slidesPerView: 4 },
                           750: { slidesPerView: 5 },
                           880: { slidesPerView: 6 },
                           955: { slidesPerView: 6 },
                           1031: { slidesPerView: 6 },
                        }}
                        pagination={{ clickable: true }}
                        className="mySwiper"
                     >
                        {hotGames.map((item, index) => (
                           <SwiperSlide
                              className="me-2"
                              key={index}
                              onClick={() => launchGame(item.code)} // Fixed potential bug by wrapping with a function
                           >
                              <img src={item?.imgUrl} alt={`Game ${index}`} className='img-fluid w-100' />
                           </SwiperSlide>
                        ))}
                     </Swiper>
                  )}
               </div>
            </>
         )}


         {slots?.data?.length !== 0 && (
            <>
               <h4 className="mb-2 fw-semibold">{content.slots}</h4>
               <div className="d-flex mb-4  gap-2  ">
                  <div className=" gameTabImg1 slotImg1">
                     <div className="pt-1 pt-md-3 d-flex align-items-center justify-content-center flex-column ">
                        <p className='tabText'>{slots?.meta?.total} Games</p>
                        <h5 className='text-center tabTitle'>Slot Games</h5>
                        <p onClick={() => navigate('/games?type=2')} className='allGamesText tabText'>All Games</p>
                     </div>
                  </div>
                  {homeGamesLoading ? <Spinner className='m-2' /> :
                     slots?.data?.length > 1 ? <Swiper
                        breakpoints={{
                           200: {
                              slidesPerView: 2,
                           },
                           330: {
                              slidesPerView: 3,
                           },
                           450: {
                              slidesPerView: 4,
                           },
                           750: {
                              slidesPerView: 5,
                           },
                           880: {
                              slidesPerView: 6,
                           },
                           955: {
                              slidesPerView: 6,
                           },
                           1031: {
                              slidesPerView: 8,
                           },
                        }}
                        pagination={{
                           clickable: true,
                        }}
                        className="mySwiper"
                     >
                        {slots?.data?.map((item, index) => {
                           return <SwiperSlide className='me-2' key={index} onClick={launchGame(item.code)}  >
                              <img src={item?.image} className=" gameTab" />
                           </SwiperSlide>
                        })}
                     </Swiper>
                        : <h5>{content.noGames}</h5>
                  }
               </div>
            </>
         )}

         {casinos?.data?.length !== 0 && (
            <>
               <h4 className="mb-2 fw-semibold">{content.casinos}</h4>
               <div className="d-flex mb-4  gap-2">
                  <div className=" gameTabImg1 popularImg1">
                     <div className="pt-1 pt-md-3 d-flex align-items-center justify-content-center flex-column ">
                        <p className='tabText'>{casinos?.meta?.total} Games</p>
                        <h5 className='text-center tabTitle'>Casino Games</h5>
                        <p onClick={() => navigate('/games?type=6')} className='allGamesText tabText'>All Games</p>
                     </div>
                  </div>
                  {homeGamesLoading ? <Spinner className='m-2' /> :
                     casinos?.data?.length > 1 ? <Swiper
                        breakpoints={{
                           200: {
                              slidesPerView: 2,
                           },
                           330: {
                              slidesPerView: 3,
                           },
                           450: {
                              slidesPerView: 4,
                           },
                           750: {
                              slidesPerView: 5,
                           },
                           880: {
                              slidesPerView: 6,
                           },
                           955: {
                              slidesPerView: 6,
                           },
                           1031: {
                              slidesPerView: 8,
                           },
                        }}
                        pagination={{
                           clickable: true,
                        }}
                        className="mySwiper"
                     >
                        {casinos?.data?.map((item, index) => {
                           return <SwiperSlide className='me-2' key={index} onClick={launchGame(item.code)}  >
                              <img src={item?.image} className=" gameTab" />
                           </SwiperSlide>
                        })}
                     </Swiper>
                        : <h5 className='mt-3 mt-sm-5'>{content.noGames}</h5>
                  }
               </div>

            </>
         )}
      </div>
   )
}

export default GameTabs
