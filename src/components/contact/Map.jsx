const Map = () => {
  const map_iframe = {
    __html: `<iframe 
      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d30435.53160181107!2d78.39416320000001!3d17.5341568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1743412561263!5m2!1sen!2sin" 
      width="100%" height="450" style="border:0;" 
      allowfullscreen="" loading="lazy" 
      referrerpolicy="no-referrer-when-downgrade">
    </iframe>`
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="aspect-w-16 aspect-h-9" dangerouslySetInnerHTML={map_iframe} />
    </div>
  );
};

export default Map;
