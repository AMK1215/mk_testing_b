import React from 'react'
import { Carousel } from 'react-bootstrap'
import b1 from '../assets/images/b1.png'
import b2 from '../assets/images/b2.png'
import b3 from '../assets/images/b3.png'
import { IoMdAdd } from 'react-icons/io'
import { FiMinus } from 'react-icons/fi'
import { BsArrowRepeat, BsFillGiftFill } from 'react-icons/bs'
import { TfiHeadphoneAlt } from 'react-icons/tfi'
import { RiHistoryFill, RiWallet3Line } from 'react-icons/ri'
import { IoGameController } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { FaUserTag } from 'react-icons/fa'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseURL'
import useAuth from '../hooks/useAuth'
import Banners from '../components/Banners'
import useLanguage from '../hooks/useLanguage'
import mm_data from '../lang/mm'
import en_data from '../lang/en'

 const UserHomePage = () => {
    const { lang } = useLanguage();
    const content= lang==='mm' ? mm_data.userHome : en_data.userHome ;
    const {auth,user} = useAuth();

     const menus=[
        {icon:<IoMdAdd size={25} />,name:content.deposit,link:'/deposit'},
        {icon:<FiMinus size={25} />,name:content.withDraw,link:'/with-draw'},
        {icon:<BsFillGiftFill size={23}  />,name:content.promotion,link:'/promotion'},
        {icon:<TfiHeadphoneAlt size={25}  />,name:content.contact,link:'/contact'},
        {icon:<RiHistoryFill size={25}  />,name:content.transferLogs,link:'/transaction-history'},
        {icon:<IoGameController size={25}  />,name:content.gameLogs,link:'/game-logs'},
    ]
  return (
    <div className='py-4 px-2 px-sm-4'>
        <div className="containMoney p-3">
            <div className="d-flex align-items-center justify-content-between">
                <div className="p-3 rounded-5 border border-white shadow-lg">
                    <RiWallet3Line  size={28} />
                </div>
                <div>
                    <p>{content.remain}</p>
                    <div className="d-flex align-items-center gap-2">
                    <h4 className="fw-semibold containMoneyText mt-2">{user?.balance} {content.kyat}</h4>
                    <BsArrowRepeat size={28} />
                    </div>
                </div>
            </div>
            <div style={{borderTop:'1px solid white'}} className="pt-3 mt-3  d-flex gap-2 align-items-center justify-content-center">
                <FaUserTag size={22} />
                <p>{user?.name} - {user?.user_name}</p>
            </div>
        </div>
        <div className="row my-4">
            {menus.map((menu,index)=>{
               return <Link to={menu.link} key={index} className='mb-4 col-3 px-2 text-center' >
                    <div className="mx-auto w-max bg-black p-2 p-sm-3 rounded-5 border border-warning">
                        {menu.icon}
                    </div>
                    <small className='d-block mt-1'>{menu.name}</small>
                </Link>
            })}
        </div>
       <Banners/>
    </div>
  )
}

export default UserHomePage
