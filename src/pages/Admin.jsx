import { useEffect, useState } from "react";

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
    more_details: ""
  };

  const [property, setProperty] = useState(initialState);
  const [currentLayout, setCurrentLayout] = useState({ img: "", name: "" });
  const [currentCompliance, setCurrentCompliance] = useState({ key: "", value: "" });
  const [uploading, setUploading] = useState(false);
  
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
    formData.append('upload_preset', 'realestate'); // Replace with your Cloudinary upload preset

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dxvjbmgta/image/upload', // Replace with your Cloudinary cloud name
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data)
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
      // Track existing images
      const currentImages = [...property.image];
      
      // Upload each file to Cloudinary and get the URLs
      const uploadPromises = files.map(file => uploadToCloudinary(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      
      // Filter out any failed uploads
      const successfulUploads = uploadedUrls.filter(url => url !== null);
      
      // Update state with the new image URLs
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

  const handleFeatureChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setProperty(prev => ({ ...prev, features: value }));
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
    <div className="w-full max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center mt-12">Add New Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Venture Name</label>
          <input
            type="text"
            name="name"
            value={property.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md bg-indigo-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Distance</label>
          <input
            type="text"
            name="distance"
            value={property.distance}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md bg-indigo-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="text"
            name="price"
            value={property.price}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md bg-indigo-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={property.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md bg-indigo-50"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Bedroom and Bathroom Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
          <input
            type="text"
            name="bedrooms"
            value={property.number_of_beds}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md bg-indigo-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
          <input
            type="text"
            name="bathrooms"
            value={property.number_of_bathrooms}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md bg-indigo-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">More Details</label>
          <textarea
            name="more_details"
            value={property.more_details}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md bg-indigo-50"
            rows="3"
          ></textarea>
        </div>

        {/* New Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Brochure URL</label>
          <input
            type="text"
            name="brochure"
            value={property.brochure}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md bg-indigo-50"
            placeholder="Enter brochure URL"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Parking Space (in sqft)</label>
          <input
            type="text"
            name="parking_space"
            value={property.parking_space}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md bg-indigo-50"
            placeholder="Enter available parking spaces"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Banner Image</label>
          <input
            type="file"
            name="banner_image"
            onChange={handleBannerImageUpload}
            className="mt-1 p-2 w-full border rounded-md bg-indigo-50"
            accept="image/*"
            disabled={uploading}
          />
          {uploading && <p className="text-blue-500 mt-1">Uploading banner image...</p>}
          {property.banner_image && (
            <div className="mt-2">
              <p>Banner image uploaded successfully!</p>
              <img 
                src={property.banner_image} 
                alt="Banner preview" 
                className="mt-2 max-h-32 rounded"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Features</label>
          <select
            multiple
            name="features"
            value={property.features}
            onChange={handleFeatureChange}
            className="mt-1 p-2 w-full border rounded-md bg-indigo-50"
            size="5"
          >
            {predefinedFeatures.map(feature => (
              <option key={feature} value={feature}>{feature}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple features</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Property Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="mt-1 p-2 w-full border rounded-md bg-indigo-50"
            accept="image/*"
            disabled={uploading}
          />
          {uploading && <p className="text-blue-500 mt-1">Uploading images...</p>}
          {property.image.length > 0 && (
            <div className="mt-2">
              <p>Uploaded Images ({property.image.length}):</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {property.image.map((img, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={img} 
                      alt={`Property ${index}`}
                      className="w-16 h-16 object-cover rounded" 
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
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
          <label className="block text-sm font-medium text-gray-700">Layouts</label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              name="img"
              value={currentLayout.img}
              onChange={handleLayoutChange}
              placeholder="Image URL"
              className="p-2 flex-1 border rounded-md bg-indigo-50"
            />
            <input
              type="text"
              name="name"
              value={currentLayout.name}
              onChange={handleLayoutChange}
              placeholder="Layout Name"
              className="p-2 flex-1 border rounded-md bg-indigo-50"
            />
            <button
              type="button"
              onClick={addLayout}
              className="bg-blue-500 text-white px-3 py-1 rounded-md"
            >
              Add
            </button>
          </div>
          {property.layouts.length > 0 && (
            <ul className="mt-2 border p-2 rounded-md">
              {property.layouts.map((layout, index) => (
                <li key={index} className="flex justify-between items-center mb-1">
                  <span>{layout.name} - {layout.img.substring(0, 20)}...</span>
                  <button
                    type="button"
                    onClick={() => removeLayout(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">YouTube Video Embed</label>
          <input
            type="text"
            name="video"
            value={property.video}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md bg-indigo-50"
            placeholder="Enter YouTube embed code"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location Map URL</label>
          <input
            type="text"
            name="location_map"
            value={property.location_map}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md bg-indigo-50"
            placeholder="Enter Google Maps or location map URL"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Legal Compliance</label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              name="key"
              value={currentCompliance.key}
              onChange={handleComplianceChange}
              placeholder="Compliance Type"
              className="p-2 flex-1 border rounded-md bg-indigo-50"
            />
            <input
              type="text"
              name="value"
              value={currentCompliance.value}
              onChange={handleComplianceChange}
              placeholder="Compliance Details"
              className="p-2 flex-1 border rounded-md bg-indigo-50"
            />
            <button
              type="button"
              onClick={addCompliance}
              className="bg-blue-500 text-white px-3 py-1 rounded-md"
            >
              Add
            </button>
          </div>
          {property.legal_compliance.length > 0 && (
            <ul className="mt-2 border p-2 rounded-md">
              {property.legal_compliance.map((item, index) => (
                <li key={index} className="flex justify-between items-center mb-1">
                  <span>{item.key}: {item.value}</span>
                  <button
                    type="button"
                    onClick={() => removeCompliance(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Add Property"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;