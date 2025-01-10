import React from 'react'
import GameTabs from '../components/GameTabs'
import InfoSection from '../components/InfoSection'
import '../assets/css/home.css'
import AdsBanner from '../components/AdsBanner'
import useAuth from '../hooks/useAuth'
import Banners from '../components/Banners'
import GameTabsHeading from '../components/GameTabsHeading'

const HomePage = () => {
  const { auth } = useAuth();
  return (
    <div >
      <div className="d-none">
        <AdsBanner />
      </div>

      <div className="px-2 pb-5">
        <Banners />
        <GameTabsHeading />
        <GameTabs />
      </div>
      {/* <hr /> */}
      <div className="footerLogoSec">
        {/* <InfoSection/> */}
      </div>
    </div>
  )
}

export default HomePage
