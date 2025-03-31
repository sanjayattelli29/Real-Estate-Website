import Form from './Form';
import ContactInfo from './ContactInfo';
import Map from './Map';

export { default as Form } from './Form';
export { default as ContactInfo } from './ContactInfo';
export { default as Map } from './Map';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-12 pt-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
          Get in Touch
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ContactInfo />
          
        </div>

        <div className="m-12" id="contact-form">
          <Form />
        </div>
        
        <div className="mt-12">
          <Map />
        </div>

      </div>
    </div>
  );
};

export default Contact;
