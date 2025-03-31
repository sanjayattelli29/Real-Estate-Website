import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import NotFoundImg from "../404.png";
import { Link } from 'react-router-dom';
import { SideContactButton } from '../components/common/page-componets';
import ContactPopupForm from '../components/common/page-componets/ContactPopupForm';

const handleGoBack = () => {
  window.history.back();
};

const PageNotFound = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <>
      <div className="flex-col min-h-screen text-center flex-center-center">
        <img src={NotFoundImg} alt="" className="w-[400px] -mt-20" />
        <h1 className="text-6xl font-bold opacity-50">Page Not Found!!</h1>
        <button
          className="gap-2 mt-4 btn btn-primary flex-center-center"
          onClick={handleGoBack}
        >
          <BiArrowBack />
          <span>go back</span>
        </button>
      </div>
      <SideContactButton onClick={() => setIsContactFormOpen(true)} />
      <ContactPopupForm 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
      />
    </>
  );
};

export default PageNotFound;
