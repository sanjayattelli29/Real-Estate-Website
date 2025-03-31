import {
  Brands,
  Counter,
  Featured,
  Projects,
  Services,
  Testimonial,
  SideContactButton,
  BrandVideo,
} from "../components/common/page-componets";
import {
  Feeds,
  Filters,
  Hero,
  Invest,
  Speciality,
} from "../components/home/home-1";
import { useState } from 'react';
import ContactPopupForm from '../components/common/page-componets/ContactPopupForm';

const Home = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <>
      <div className="pt-16 max-w-7xl mx-auto px-4">
        <Hero />
        <Filters />
        {/* <Invest /> */}
        <Featured />
        <Speciality />
      </div>
      <BrandVideo />
      <div className="max-w-7xl mx-auto px-4">
        <Services />
        <Counter />
        {/* <Projects /> */}
        {/* <Testimonial /> */}
        <Brands />
        {/* <Feeds /> */}
      </div>
      <SideContactButton onClick={() => setIsContactFormOpen(true)} />
      <ContactPopupForm 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
      />
    </>
  );
};

export default Home;
 