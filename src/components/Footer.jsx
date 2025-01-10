import React from "react";
import logo from "../assets/images/logo.png";
import useLanguage from "../hooks/useLanguage";
import mm_data from "../lang/mm";
import en_data from "../lang/en";

const Footer = () => {
  const { lang } = useLanguage();
  const content= lang==='mm' ? mm_data.home.copyRight : en_data.home.copyRight ;
  
  return (
    <div className="footerLogoSec">
      <div className="text-center py-5 ">
        <img src={logo} className="footerLogo " />
      </div>
      {/* <h5 className="text-center mb-5">Term and condition</h5> */}
      <div className="bg-black text-white text-center   py-2 ">
       {content}
      </div>
    </div>
  );
};

export default Footer;
