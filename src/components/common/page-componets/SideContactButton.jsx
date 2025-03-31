import { BiMessageDetail } from 'react-icons/bi';

const SideContactButton = ({ onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      const contactSection = document.getElementById('contact-form');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/contact#contact-form';
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed right-0 top-1/2 -translate-y-1/2 bg-orange-600 text-white p-3 rounded-l-lg shadow-lg hover:bg-orange-700 transition-colors z-40 group"
    >
      <BiMessageDetail size={24} />
      <span className="absolute right-full top-1/2 -translate-y-1/2 bg-orange-600 text-white py-2 px-4 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap mr-2">
        Contact Us
      </span>
    </button>
  );
};

export default SideContactButton; 