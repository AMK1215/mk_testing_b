import React from 'react'
import p from '../assets/images/popular.png'
import n from '../assets/images/new.png'
import sl from '../assets/images/slot.png'
import c from '../assets/images/casino.png'
import f from '../assets/images/fish.png'
import sp from '../assets/images/sport.png'
import '../assets/css/gameTabs.css'
import { Link, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import BASE_URL from '../hooks/baseURL'
import useLanguage from '../hooks/useLanguage'
import mm_data from '../lang/mm';
import en_data from '../lang/en'
import th_data from '../lang/th'
import ch_data from '../lang/ch'

const GameTabsHeading = () => {
  const { data: gameTypes, loading } = useFetch(`${BASE_URL}/game_types`)
  const { lang } = useLanguage();
  const typesContent = lang === 'mm' ? mm_data.home.gameTypes : lang === 'ch' ? ch_data.home.gameTypes : lang === 'th' ? th_data.home.gameTypes : en_data.home.gameTypes;
  // console.log('lang',lang);

  const tabs = [
    { img: p, name: typesContent.hot_games, link: '/games?name=popular' },
    // {img:n,name:'ဂိမ်းအသစ်',link:'/games?name=new'},
    { img: sl, name: typesContent.slots, link: '/games?name=slot' },
    { img: c, name: typesContent.casinos, link: '/games?name=casino' },
    //  {img:f,name:'ငါးပစ်',link:'/games?name=fishing'},
    // {img:sp,name:'အားကစား',link:'/games?name=sport'},
  ]
  const navigate = useNavigate();
  const goTo = (id) => {
    navigate(`/games?type=${id}`)
  }

  return (
    <div className='mt-4'>
      <div className='cursor-pointer overflow-x-scroll d-flex justify-content-start align-items-center  gap-1 gap-sm-3'>
        <div onClick={() => navigate('/hotGames')} className='gameTabHeading' >
          <p className='gameTabText'>{tabs[0].name}</p>
          <img src={tabs[0]?.img} className=' gameTabImg' />
        </div>
        {gameTypes.map((item, index) => {
          return <div onClick={() => goTo(item.id)} className='gameTabHeading' key={index}>
            <p className='gameTabText'>{tabs[index + 1].name}</p>
            <img src={tabs[index + 1]?.img} className='gameTabImg' />
          </div>
        })}
      </div>
    </div>
  )
}

export default GameTabsHeading
