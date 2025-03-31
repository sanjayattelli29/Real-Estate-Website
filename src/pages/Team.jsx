import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { teamMembers } from "../data/dummyData";
import { useState } from 'react';
import { SideContactButton } from '../components/common/page-componets';
import ContactPopupForm from '../components/common/page-componets/ContactPopupForm';

const Team = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <>
      <div className="pt-16 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 gap-3 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {teamMembers.map(({ id, name, role, image }) => (
            <div className="h-[250px] w-full mb-16" key={id}>
              <img
                src={image}
                alt={name}
                className="object-cover w-full h-full rounded-lg"
              />
              <div className="relative z-10 w-4/5 p-2 mx-auto -mt-10 text-center bg-white rounded-lg shadow-md dark:bg-dark-light">
                <h1 className="text-lg font-semibold">{name}</h1>
                <p>{role}</p>
                <div className="mt-3 flex-center-center gap-x-3">
                  <Link className="hover:text-primary transition-a">
                    <FaFacebook />
                  </Link>
                  <Link className="hover:text-primary transition-a">
                    <FaInstagram />
                  </Link>
                  <Link className="hover:text-primary transition-a">
                    <FaTwitter />
                  </Link>
                  <Link className="hover:text-primary transition-a">
                    <FaLinkedin />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SideContactButton onClick={() => setIsContactFormOpen(true)} />
      <ContactPopupForm 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
      />
    </>
  );
};

export default Team;
