import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import GameTabsHeading from './GameTabsHeading'
import FooterProviders from './FooterProviders'
import Footer from './Footer'
import Marquee from './Marquee'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import mm from '../assets/images/mm.png'
import en from '../assets/images/en.png'
import th from '../assets/images/th.png'
import ch from '../assets/images/ch.png'
import { AuthProvider } from '../providers/AuthProvider'
import LanguageProvider from '../providers/LanguageProvider'
import useLanguage from '../hooks/useLanguage'

const Layout = () => {
  const { lang, updateLang } = useLanguage();

  return (
    <AuthProvider>
      <Navbar />
      <div className="w-full d-flex align-items-center justify-content-between bg-black">
        <Marquee />
        <DropdownButton id="dropdown-basic-button" title={<img src={lang === 'mm' ? mm : lang === 'ch' ? ch : lang === 'th' ? th : en} className='flag' />}>
          <Dropdown.Item onClick={() => updateLang('mm')} >
            <img src={mm} className='flag' />
          </Dropdown.Item>
          <Dropdown.Item>
            <img src={en} onClick={() => updateLang('en')} className='flag' />
          </Dropdown.Item>
          <Dropdown.Item>
            <img src={th} onClick={() => updateLang('th')} className='flag' />
          </Dropdown.Item>
          <Dropdown.Item>
            <img src={ch} onClick={() => updateLang('ch')} className='flag' />
          </Dropdown.Item>
        </DropdownButton>
      </div>
      <Outlet />
      <div className="pt-3">
        <FooterProviders />
      </div>
      <Footer />
    </AuthProvider>
  )
}

export default Layout
