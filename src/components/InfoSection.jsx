import React from 'react'
import i1 from '../assets/images/i1.png'
import i2 from '../assets/images/i2.png'
import i3 from '../assets/images/i3.png'
import i4 from '../assets/images/i4.png'
import i5 from '../assets/images/i5.png'
import i6 from '../assets/images/i6.png'
import useLanguage from '../hooks/useLanguage'
import mm_data from '../lang/mm'
import en_data from '../lang/en'

const InfoSection = () => {
  const {lang} = useLanguage();
  const content=lang==='mm' ? mm_data.home.info : en_data.home.info;
    const data=[
        {img:i1,title:content.title1,text:content.text1},
        {img:i2,title:content.title2,text:content.text2},
        {img:i3,title:content.title3,text:content.text3},
        {img:i4,title:content.title4,text:content.text4},
        {img:i5,title:content.title5,text:content.text5},
        {img:i6,title:content.title6,text:content.text6}
    ]
  return (
    <div className='my-5 py-5' style={{overflowX:'hidden'}}>
      <div className="row px-lg-5">
        {data.map((item,index)=>{
            return <div key={index} className="col-md-6 col-lg-4 mb-4 mb-md-5">
                <div className="d-flex align-items-center gap-2">
                <img className='infoImg' src={item.img} />
                <div>
                    <p>{item.title}</p>
                    <small>{item.text}</small>
                </div>
                </div>
            </div>
        })}
      </div>
    </div>
  )
}

export default InfoSection
