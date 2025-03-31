import { useState } from 'react';
import FaqsList from "../components/faqs/FaqsList";
import { NewsLetter } from "../components/services";
import { SideContactButton } from '../components/common/page-componets';
import ContactPopupForm from '../components/common/page-componets/ContactPopupForm';

const Faqs = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <div className="pt-20 max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
        <div className="md:col-span-2">
          <FaqsList />
        </div>
        <div className="md:col-span-1">
          <NewsLetter />
          <div className="mt-5">
            <img
              src="/images/property (19).jpg"
              alt=""
              className="sm:h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
      <SideContactButton onClick={() => setIsContactFormOpen(true)} />
      <ContactPopupForm 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
      />
    </div>
  );
};

export default Faqs;
