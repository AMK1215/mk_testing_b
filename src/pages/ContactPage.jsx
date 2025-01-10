import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import viber from '../assets/images/viber.png'
import tele from '../assets/images/tele.png'
import fb from '../assets/images/fb.png'
import toast from 'react-hot-toast'
import BASE_URL from '../hooks/baseURL'
import useFetch from '../hooks/useFetch'
import InfoSection from '../components/InfoSection'
import useLanguage from '../hooks/useLanguage'
import mm_data from '../lang/mm'
import en_data from '../lang/en'
import ch_data from '../lang/ch'
import th_data from '../lang/th'
import { IoLinkOutline } from 'react-icons/io5'


const ContactPage = () => {
  const { lang } = useLanguage();
  const content = lang === 'mm' ? mm_data.contact : lang === 'ch' ? ch_data.contact : lang === 'th' ? th_data.contact : en_data.contact;
  const { data: contacts } = useFetch(`${BASE_URL}/contacts`)

  const copyLink = (link) => {
    navigator.clipboard.writeText(link)
    toast.success(content.copied)
  }
  return (
    <div className='py-5 px-2 px-sm-4 px-md-5'>
      <h4 className='fw-semibold mb-4 text-center'>{content.title}</h4>
      <div className="w-full px-3 row mb-5">
        {contacts.map((item, index) => {
          return <div key={index} className='mb-3  col-md-6 col-lg-4 px-0 px-sm-2  '  >
            <div className='rounded-4 py-2 contactCard'>
              <div className="row justify-content-center align-items-center">
                <div className="col-4 text-end">
                  <img src={item.icon} className='contactImg mx-auto ' />
                </div>
                <div className="col-8">
                  <a href={item.link}
                  target='_blank'
                  className='btn btn-sm btn-outline-light'
                  >
                    <IoLinkOutline className='me-2' />
                    {content.link}
                  </a>
                </div>
                {/* <p className='col-8 mt-2'>{item.link}</p> */}
              </div>
              <div className="text-center">
                
                {/* <button onClick={() => copyLink(item.link)} className='contactBtn text-white rounded-5 px-4 pb-2'>{content.copy}</button> */}
              </div>
            </div>
          </div>
        })}
      </div>
      {/* <InfoSection/> */}
    </div>
  )
}

export default ContactPage;