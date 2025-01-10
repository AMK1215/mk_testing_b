import React, { useState } from 'react'
import '../assets/css/navbar.css'
import logo from '../assets/images/logo.png'
import { HiMenuAlt2, HiOutlineClipboardList } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { Offcanvas, Spinner } from 'react-bootstrap'
import { IoMdClose, IoMdLogOut } from 'react-icons/io'
import { BsBank2 } from 'react-icons/bs'
import { IoDiamondOutline, IoGameController } from 'react-icons/io5'
import { FaCoins, FaGift, FaRegUserCircle, FaUserCog } from 'react-icons/fa'
import { MdLock } from 'react-icons/md'
import profile from '../assets/images/profile.svg'
import coin from '../assets/images/coin.png'
import reload from '../assets/images/reload.svg'
import useAuth from '../hooks/useAuth'
import useLogout from '../hooks/useLogout'
import useLanguage from '../hooks/useLanguage'
import mm_data from '../lang/mm'
import en_data from '../lang/en'
import th_data from '../lang/th'
import ch_data from '../lang/ch'
import { TfiHeadphoneAlt } from 'react-icons/tfi'

const Navbar = () => {
    const { lang } = useLanguage();
    const navContent = lang === 'mm' ? mm_data.navs : lang === 'ch' ? ch_data.navs : lang === 'th' ? th_data.navs : en_data.navs;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navLists = [
        { name: 'Slot', link: '/games?name=slot' },
        { name: 'Casino', link: '/games?name=casino' },
        { name: 'Sport', link: '/games?name=sport' },
        { name: 'Fishing', link: '/games?name=fishing' },
        // {name:'Event',link:'/'},
        { name: 'Promotion', link: '/promotion' },
    ]
    const menus = [
        { icon: <IoDiamondOutline size={30} />, name: navContent.userHome, link: '/' },
        { icon: <FaGift size={25} />, name: navContent.promotion, link: '/promotion' },
        { icon: <BsBank2 size={30} />, name: navContent.deposit, link: '/deposit' },
        { icon: <FaCoins size={30} />, name: navContent.withDraw, link: '/with-draw' },
        { icon: <HiOutlineClipboardList size={30} />, name: navContent.transferLogs, link: '/transaction-history' },
        { icon: <IoGameController size={30} />, name: navContent.gameLogs, link: '/game-logs' },
        { icon: <FaRegUserCircle size={30} />, name: navContent.profile, link: '/profile' },
        // {icon:<FaUserCog size={30} />,name:navContent.updateProfile,link:'/edit-profile'},
        { icon: <MdLock size={30} />, name: navContent.changePassword, link: '/change-password' },
        { icon: <TfiHeadphoneAlt size={30} />, name: navContent.contact, link: '/contact' },
    ]
    const { auth, user } = useAuth();
    const { logout, loading: logoutLoading } = useLogout();
    const logoutHandler = async () => {
        await logout();
    }
    return (<>
        <div className='cursor-pointer navbar d-flex align-items-center justify-content-between py-3 px-0 px-sm-4'>
            <div className=" d-flex align-items-center gap-0   gap-sm-2">
                <HiMenuAlt2 onClick={() => setIsSidebarOpen(true)} className='menuIcon' color='#FFD863' />
                <Link to={'/'}>
                    <img src={logo} className='logo' />
                </Link>
            </div>
            <div className=" d-flex align-items-center gap-1 gap-sm-3">
                {/* <div className="d-none d-lg-flex align-items-center gap-4"> 
        {navLists.map((list,index)=>{
            return <Link className='navlist' to={list.link} key={index}>
                <p>{list.name}</p>
            </Link>
        })}
        </div> */}
                {/* <>
        <img src={tg} className='tg' />
        <Link to={'/register'}>
        <button className="navRegBtn text-white py-1 px-2 px-sm-3 rounded-5">
            Register
        </button>
        </Link>
       <Link to={'/login'}>
       <button className="navLoginBtn text-white py-1 px-2 px-sm-3 rounded-5">
            Login
        </button>
       </Link>
        </> */}
                {!auth ? <Link to={'/login'}>Login</Link> :
                    <Link to={'/profile'}>
                        <div className="d-flex justify-content-center align-items-center gap-1">
                            <img src={profile} className='navProfile' />
                            <small className="fw-semibold navText">{user?.user_name}</small>
                        </div>
                        <div className="moneyGroup py-1 px-2 d-flex align-items-center gap-1 rounded-5">
                            <img src={coin} className='coin' />
                            <small className="fw-semibold navAmount">{user?.balance} Ks</small>
                            {/* <img src={reload} className='reload' /> */}
                        </div>
                    </Link>}
            </div>
        </div>
        <Offcanvas className='sidebar cursor-pointer' show={isSidebarOpen} onHide={() => setIsSidebarOpen(false)}>
            <Offcanvas.Header >
                <Offcanvas.Title className='w-full' >
                    <div className="w-full d-flex align-items-center justify-content-between">
                        <img src={logo} className='logo' />
                        <IoMdClose size={30} color='#fff' onClick={() => setIsSidebarOpen(false)} />
                    </div>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {menus.map((menu, index) => {
                    return <Link to={menu.link} key={index} className="mb-3 d-flex align-items-center gap-3">
                        {menu.icon}
                        <p className='menuList mt-2' >{menu.name}</p>
                    </Link>
                })}
                <p onClick={logoutHandler} className="mb-3 d-flex align-items-center gap-3">
                    {logoutLoading ? <Spinner size='sm' /> : <IoMdLogOut size={30} />}
                    <p className='menuList ' >
                        {navContent.logout}
                    </p>
                </p>
            </Offcanvas.Body>
        </Offcanvas>
    </>
    )
}

export default Navbar
