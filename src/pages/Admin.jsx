import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const PropertyForm = () => {
  const initialState = {
    name: "",
    distance: "",
    price: "",
    description: "",
    image: [],
    brochure: "",
    parking_space: "",
    banner_image: "",
    features: [],
    layouts: [],
    video: "",
    location_map: "",
    legal_compliance: [],
    number_of_beds: "",
    number_of_bathrooms: "",
    more_details: []
  };

  const [property, setProperty] = useState(initialState);
  const [currentLayout, setCurrentLayout] = useState({ img: "", name: "" });
  const [currentCompliance, setCurrentCompliance] = useState({ key: "", value: "" });
  const [uploading, setUploading] = useState(false);
  const [currentMoreDetail, setCurrentMoreDetail] = useState({ key: "", value: "" });
  
  // Predefined features for dropdown
  const predefinedFeatures = [
    "Swimming Pool",
    "Fitness Center",
    "24/7 Security",
    "Parking Space",
    "Garden Area",
    "Clubhouse",
    "Power Backup"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => ({ ...prev, [name]: value }));
  };

  // Function to upload image to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'realestate');

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dxvjbmgta/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      return null;
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    
    try {
      const currentImages = [...property.image];
      const uploadPromises = files.map(file => uploadToCloudinary(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      const successfulUploads = uploadedUrls.filter(url => url !== null);
      
      setProperty(prev => ({
        ...prev,
        image: [...currentImages, ...successfulUploads]
      }));
    } catch (error) {
      console.error("Error handling image uploads:", error);
      alert("Failed to upload some images. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleBannerImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const uploadedUrl = await uploadToCloudinary(file);
      if (uploadedUrl) {
        setProperty(prev => ({
          ...prev,
          banner_image: uploadedUrl
        }));
      }
    } catch (error) {
      console.error("Error uploading banner image:", error);
      alert("Failed to upload banner image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFeatureToggle = (feature) => {
    setProperty(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const addLayout = () => {
    if (currentLayout.img && currentLayout.name) {
      setProperty(prev => ({
        ...prev,
        layouts: [...prev.layouts, { ...currentLayout }]
      }));
      setCurrentLayout({ img: "", name: "" });
    }
  };

  const handleLayoutChange = (e) => {
    const { name, value } = e.target;
    setCurrentLayout(prev => ({ ...prev, [name]: value }));
  };

  const addCompliance = () => {
    if (currentCompliance.key && currentCompliance.value) {
      setProperty(prev => ({
        ...prev,
        legal_compliance: [...prev.legal_compliance, { ...currentCompliance }]
      }));
      setCurrentCompliance({ key: "", value: "" });
    }
  };

  const handleComplianceChange = (e) => {
    const { name, value } = e.target;
    setCurrentCompliance(prev => ({ ...prev, [name]: value }));
  };

  const addMoreDetail = () => {
    if (currentMoreDetail.key && currentMoreDetail.value) {
      setProperty(prev => ({
        ...prev,
        more_details: [...prev.more_details, { ...currentMoreDetail }]
      }));
      setCurrentMoreDetail({ key: "", value: "" });
    }
  };

  const removeMoreDetail = (index) => {
    setProperty(prev => ({
      ...prev,
      more_details: prev.more_details.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (uploading) {
      alert("Please wait for images to finish uploading");
      return;
    }
    
    try {
      const response = await fetch(
        "https://xbfakjw2ee.execute-api.ap-south-1.amazonaws.com/dev/add-property",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(property),
        }
      );
      const data = await response.json();
      
      if (data.success) {
        alert("Property added successfully!");
        setProperty(initialState);
      } else {
        alert("Failed to add property. Please try again.");
      }
    } catch (error) {
      console.error("Error adding property:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const removeLayout = (index) => {
    setProperty(prev => ({
      ...prev,
      layouts: prev.layouts.filter((_, i) => i !== index)
    }));
  };

  const removeCompliance = (index) => {
    setProperty(prev => ({
      ...prev,
      legal_compliance: prev.legal_compliance.filter((_, i) => i !== index)
    }));
  };

  const removeImage = (index) => {
    setProperty(prev => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Add New Property</h3>
          <p className="text-gray-600 mt-1">Fill in the details below to add a new property listing</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={uploading}
          className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaPlus className="mr-2" />
          {uploading ? "Uploading..." : "Add Property"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Section */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="w-1 h-6 bg-orange-500 rounded-full mr-3"></span>
            Basic Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Venture Name</label>
              <input
                type="text"
                name="name"
                value={property.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                required
                placeholder="Enter venture name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Distance</label>
              <input
                type="text"
                name="distance"
                value={property.distance}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                required
                placeholder="e.g., 5km from city center"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="text"
                name="price"
                value={property.price}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                required
                placeholder="Enter property price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parking Space</label>
              <input
                type="text"
                name="parking_space"
                value={property.parking_space}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Enter available parking spaces"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Brochure URL</label>
              <input
                type="text"
                name="brochure"
                value={property.brochure}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Enter brochure PDF URL"
              />
            </div>
          </div>
        </div>

        {/* Property Details Section */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="w-1 h-6 bg-orange-500 rounded-full mr-3"></span>
            Property Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
              <input
                type="text"
                name="number_of_beds"
                value={property.number_of_beds}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                required
                placeholder="Number of bedrooms"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
              <input
                type="text"
                name="number_of_bathrooms"
                value={property.number_of_bathrooms}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                required
                placeholder="Number of bathrooms"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={property.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                rows="4"
                required
                placeholder="Enter property description"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="w-1 h-6 bg-orange-500 rounded-full mr-3"></span>
            Media
          </h4>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-orange-500 transition-colors">
                <div className="space-y-1 text-center">
                  <input
                    type="file"
                    name="banner_image"
                    onChange={handleBannerImageUpload}
                    className="hidden"
                    id="banner-upload"
                    accept="image/*"
                    disabled={uploading}
                  />
                  <label
                    htmlFor="banner-upload"
                    className="cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                  >
                    <span>Upload a file</span>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </label>
                </div>
              </div>
              {property.banner_image && (
                <div className="mt-4">
                  <img 
                    src={property.banner_image} 
                    alt="Banner preview" 
                    className="max-h-40 rounded-lg shadow-sm"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Images</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-orange-500 transition-colors">
                <div className="space-y-1 text-center">
                  <input
                    type="file"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="property-images"
                    accept="image/*"
                    disabled={uploading}
                  />
                  <label
                    htmlFor="property-images"
                    className="cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                  >
                    <span>Upload multiple files</span>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </label>
                </div>
              </div>
              {property.image.length > 0 && (
                <div className="mt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {property.image.map((img, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={img} 
                          alt={`Property ${index}`}
                          className="w-full h-32 object-cover rounded-lg shadow-sm" 
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">YouTube Video URL</label>
              <input
                type="text"
                name="video"
                value={property.video}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Enter YouTube video URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location Map URL</label>
              <input
                type="text"
                name="location_map"
                value={property.location_map}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Enter Google Maps embed URL"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="w-1 h-6 bg-orange-500 rounded-full mr-3"></span>
            Features & Amenities
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {predefinedFeatures.map(feature => (
              <button
                key={feature}
                type="button"
                onClick={() => handleFeatureToggle(feature)}
                className={`p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                  property.features.includes(feature)
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <span className="font-medium">{feature}</span>
                {property.features.includes(feature) ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* More Details Section */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="w-1 h-6 bg-orange-500 rounded-full mr-3"></span>
            Additional Details
          </h4>
          <div className="space-y-6">
            <div className="flex space-x-4">
              <input
                type="text"
                name="key"
                value={currentMoreDetail.key}
                onChange={(e) => setCurrentMoreDetail(prev => ({ ...prev, key: e.target.value }))}
                placeholder="Detail Title"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
              <input
                type="text"
                name="value"
                value={currentMoreDetail.value}
                onChange={(e) => setCurrentMoreDetail(prev => ({ ...prev, value: e.target.value }))}
                placeholder="Detail Value"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
              <button
                type="button"
                onClick={addMoreDetail}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors shadow-md hover:shadow-lg"
              >
                Add Detail
              </button>
            </div>
            {property.more_details.length > 0 && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <h5 className="text-sm font-medium text-gray-700 mb-3">Added Details:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.more_details.map((detail, index) => (
                    <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-sm"><span className="font-medium">{detail.key}:</span> {detail.value}</span>
                      <button
                        type="button"
                        onClick={() => removeMoreDetail(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Layouts Section */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="w-1 h-6 bg-orange-500 rounded-full mr-3"></span>
            Floor Plans & Layouts
          </h4>
          <div className="space-y-6">
            <div className="flex space-x-4">
              <input
                type="text"
                name="img"
                value={currentLayout.img}
                onChange={handleLayoutChange}
                placeholder="Image URL"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
              <input
                type="text"
                name="name"
                value={currentLayout.name}
                onChange={handleLayoutChange}
                placeholder="Layout Name"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
              <button
                type="button"
                onClick={addLayout}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors shadow-md hover:shadow-lg"
              >
                Add Layout
              </button>
            </div>
            {property.layouts.length > 0 && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <h5 className="text-sm font-medium text-gray-700 mb-3">Added Layouts:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.layouts.map((layout, index) => (
                    <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-sm">{layout.name}</span>
                      <button
                        type="button"
                        onClick={() => removeLayout(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Legal Compliance Section */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="w-1 h-6 bg-orange-500 rounded-full mr-3"></span>
            Legal Compliance
          </h4>
          <div className="space-y-6">
            <div className="flex space-x-4">
              <input
                type="text"
                name="key"
                value={currentCompliance.key}
                onChange={handleComplianceChange}
                placeholder="Compliance Type"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
              <input
                type="text"
                name="value"
                value={currentCompliance.value}
                onChange={handleComplianceChange}
                placeholder="Compliance Details"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
              <button
                type="button"
                onClick={addCompliance}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors shadow-md hover:shadow-lg"
              >
                Add
              </button>
            </div>
            {property.legal_compliance.length > 0 && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <h5 className="text-sm font-medium text-gray-700 mb-3">Added Compliance Items:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.legal_compliance.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-sm">{item.key}: {item.value}</span>
                      <button
                        type="button"
                        onClick={() => removeCompliance(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;