import React from 'react'
import Marquee from 'react-fast-marquee'
import f1 from '../assets/images/f1.png'
import f2 from '../assets/images/f2.png'
import f3 from '../assets/images/f3.png'
import f4 from '../assets/images/f4.png'
import f5 from '../assets/images/f5.png'
import f6 from '../assets/images/f6.png'
import f8 from '../assets/images/f8.png'
import f9 from '../assets/images/f9.png'
import f10 from '../assets/images/f10.png'
import f11 from '../assets/images/f11.png'
import f12 from '../assets/images/f12.png'
import f13 from '../assets/images/f13.png'
import f14 from '../assets/images/f14.png'
import f15 from '../assets/images/f15.png'

const FooterProviders = () => {
    const games=[f1,f2,f3,f4,f5,f6,f8,f9,f10,f11,f12,f13,f14,f15]
  return (
    <Marquee>
        {games.map((game,index)=>{
            return <img className='footerGameImg mb-5' key={index} src={game} />
        })}
    </Marquee>
  )
}

export default FooterProviders
