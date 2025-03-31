import { useState } from 'react';
import { BlogPostsList, Pagination, SideContactButton } from "../components/common/page-componets";
import { feeds } from "../data/dummyData";
import ContactPopupForm from '../components/common/page-componets/ContactPopupForm';

const Blog = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <div className="pt-20 max-w-7xl mx-auto px-4">
      <BlogPostsList />
      <Pagination itemsPerPage={6} pageData={feeds} />
      <SideContactButton onClick={() => setIsContactFormOpen(true)} />
      <ContactPopupForm 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
      />
    </div>
  );
};

export default Blog;
