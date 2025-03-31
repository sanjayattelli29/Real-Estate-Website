import { useState } from 'react';
import { ContactInfo } from '../components/contact';
import { SideContactButton } from '../components/common/page-componets';
import ContactPopupForm from '../components/common/page-componets/ContactPopupForm';

const Contact = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <>
      <div className="pt-16">
        <ContactInfo />
      </div>
      <SideContactButton onClick={() => setIsContactFormOpen(true)} />
      <ContactPopupForm 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
      />
    </>
  );
};

export default Contact;
