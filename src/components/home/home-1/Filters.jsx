import { BiBriefcase, BiBuildings, BiMap, BiMoney, BiDownload } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Filters = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch("https://xbfakjw2ee.execute-api.ap-south-1.amazonaws.com/dev/get-properties");
      const data = await response.json();
      setProperties(data.data || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handlePropertyChange = (e) => {
    const propertyId = e.target.value;
    const property = properties.find(p => p._id === propertyId);
    setSelectedProperty(property || null);
  };

  const handleSearch = () => {
    if (selectedProperty) {
      navigate(`/venture?id=${selectedProperty._id}`);
    }
  };

  return (
    <div className="md:max-w-7xl px-4 w-full mx-auto relative -mt-8 sm:-mt-20">
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr,2.5fr,auto] gap-4 bg-white dark:bg-[#1e1e2d] p-6 rounded-xl shadow-lg">
        {/* Property Selection */}
        <div className="w-full p-3 rounded-lg bg-gray-50 dark:bg-[#2c2c3d] border border-gray-200 dark:border-gray-700">
          <h1 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Select Property</h1>
          <div className="flex items-center gap-x-2">
            <BiBuildings className="text-gray-500 dark:text-gray-400" />
            <select
              onChange={handlePropertyChange}
              value={selectedProperty?._id || ""}
              className="w-full bg-transparent border-0 outline-none text-gray-600 dark:text-gray-200 cursor-pointer"
            >
              <option value="" className="bg-white dark:bg-[#2c2c3d]">Select a property</option>
              {properties.map((property) => (
                <option 
                  key={property._id} 
                  value={property._id} 
                  className="bg-white dark:bg-[#2c2c3d]"
                >
                  {property.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Location */}
          <div className="w-full p-3 rounded-lg bg-gray-50 dark:bg-[#2c2c3d] border border-gray-200 dark:border-gray-700">
            <h1 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Location</h1>
            <div className="flex items-center gap-x-2">
              <BiMap className="text-gray-500 dark:text-gray-400 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-200 truncate">
                {selectedProperty?.location || "Select a property"}
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="w-full p-3 rounded-lg bg-gray-50 dark:bg-[#2c2c3d] border border-gray-200 dark:border-gray-700">
            <h1 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Price</h1>
            <div className="flex items-center gap-x-2">
              <BiMoney className="text-gray-500 dark:text-gray-400 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-200 truncate">
                {selectedProperty?.price || "Select a property"}
              </p>
            </div>
          </div>

          {/* Brochure */}
          <div className="w-full p-3 rounded-lg bg-gray-50 dark:bg-[#2c2c3d] border border-gray-200 dark:border-gray-700">
            <h1 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Brochure</h1>
            <div className="flex items-center gap-x-2">
              <BiDownload className="text-gray-500 dark:text-gray-400 flex-shrink-0" />
              {selectedProperty?.brochure ? (
                <a
                  href={selectedProperty.brochure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 truncate"
                >
                  Download PDF
                </a>
              ) : (
                <p className="text-gray-600 dark:text-gray-200">Select a property</p>
              )}
            </div>
          </div>
        </div>

        {/* View Property Button */}
        <button 
          onClick={handleSearch}
          disabled={!selectedProperty}
          className="h-full px-6 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center whitespace-nowrap font-medium"
        >
          View Property
        </button>
      </div>
    </div>
  );
};

export default Filters;
