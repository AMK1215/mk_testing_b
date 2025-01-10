import React, { createContext, useEffect, useState } from 'react'

export const LanguageContext = createContext(null);
const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');

  const updateLang = (lan) => {
    setLang(lan);
    localStorage.setItem('lang', lan);
  }

  useEffect(() => {
    setLang(localStorage.getItem('lang') || 'en');
  }, []);

  const values = {
    lang, updateLang
  }
  return (
    <LanguageContext.Provider value={values}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageProvider
