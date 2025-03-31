import {
  Categories,
  Counter,
  Feeds,
  Services as ServicesList,
  Team,
  SideContactButton,
} from "../components/common/page-componets";
import ContactPopupForm from '../components/common/page-componets/ContactPopupForm';
import { useState } from 'react';

const Services = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <div className="pt-20 max-w-7xl mx-auto px-4">
      <ServicesList />
      <Categories />
      <Counter />
      {/* <Team /> */}
      {/* <Feeds /> */}

      <SideContactButton onClick={() => setIsContactFormOpen(true)} />
      <ContactPopupForm 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
      />
    </div>
  );
};

export default Services;
