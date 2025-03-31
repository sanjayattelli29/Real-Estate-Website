import { useState } from 'react';
import { OverView, Stats } from "../components/about";
import {
  AboutUs,
  Brands,
  Feeds,
  Team,
  Testimonial,
  WhatWeDo,
  SideContactButton,
} from "../components/common/page-componets";
import ContactPopupForm from '../components/common/page-componets/ContactPopupForm';

const About = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <div className="pt-20 max-w-7xl mx-auto px-4">
      <Stats />

      <AboutUs />
      {/* <Team /> */}
      {/* <Testimonial /> */}
      {/* <Brands /> */}
      {/* <Feeds /> */}

      
      <OverView />
      {/* <Brands /> */}
      <WhatWeDo />
      {/* <Feeds /> */}

      <SideContactButton onClick={() => setIsContactFormOpen(true)} />
      <ContactPopupForm 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
      />
    </div>
  );
};

export default About;
