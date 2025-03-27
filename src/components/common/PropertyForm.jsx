import React, { useState } from "react";

export default function PropertyForm() {
  const [formData, setFormData] = useState({
    name: "Property name",
    location: "property location",
    price: "Property price",
    distance: "nearest location (ex:- 10 km from sangareddy)",
    purpose: "your purpose [rent/sale/lease]",
    contact: "Contact phone number",
    dimensions: " dimension of plot (3000 sq ft)",
    description:
      "Some description about your venture...",
    image: [ ],
    more_details: [],
  });

  // Handle general input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle changes in more_details
  const handleMoreDetailsChange = (index, field, value) => {
    const updatedDetails = [...formData.more_details];
    updatedDetails[index][field] = value;
    setFormData({ ...formData, more_details: updatedDetails });
  };

  // Add a new detail field
  const addMoreDetail = () => {
    setFormData({
      ...formData,
      more_details: [...formData.more_details, { name: "", value: "" }],
    });
  };

  // Remove a detail field
  const removeMoreDetail = (index) => {
    const updatedDetails = [...formData.more_details];
    updatedDetails.splice(index, 1);
    setFormData({ ...formData, more_details: updatedDetails });
  };

  async function addImage(e) 
  {
      e.preventDefault();
      
      const file = e.target.files[0]; // Get file from event
      if (!file) 
      {
          alert("Please select an image.");
          return;
      }
  
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "realestate"); // Replace with your actual Cloudinary preset
  
      try 
      {
          const response = await fetch("https://api.cloudinary.com/v1_1/dxvjbmgta/image/upload", {
              method: "POST",
              body: formData
          });
  
          const data = await response.json();
  
          if (data.secure_url) 
          {
              console.log("Uploaded Image URL:", data.secure_url);
              alert("Image uploaded successfully!");
  
              // Correctly update state
              setFormData((prevData) => ({
                  ...prevData, 
                  image: [...prevData.image, data.secure_url] // Append new image
              }));
          } 
          else 
          {
              console.error("Upload failed:", data);
              alert("Image upload failed. Please try again.");
          }
      } 
      catch (error) 
      {
          console.error("Error uploading image:", error);
          alert("An error occurred while uploading.");
      }
  }
  


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    let response = await fetch("https://xbfakjw2ee.execute-api.ap-south-1.amazonaws.com/dev/add-property" , {
      headers:{"Content-Type":"application/json"},
      method:"POST",
      body:JSON.stringify( formData )
    })
    response = await response.json()

    console.log(response)

    if(response.success){
      alert("property added.")
    }else{
      alert("property adding failed")
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Add Property Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Standard Input Fields */}
          {["name", "location", "price", "distance", "purpose", "contact", "dimensions"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.replace("_", " ").toUpperCase()}
              className="w-full p-2 border rounded"
            />
          ))}
          <input
            type="number"
            name="number_of_beds"
            value={formData.number_of_beds}
            onChange={handleChange}
            placeholder="Beds"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="number_of_bathrooms"
            value={formData.number_of_bathrooms}
            onChange={handleChange}
            placeholder="Bathrooms"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
          />

          <div>
              {formData.image.map((image, index) => (
                  <img key={index} src={image} alt={`Uploaded ${index}`} className="w-32 h-32 object-cover rounded-md" />
              ))}
              <input 
                  type="file"
                  accept="image/*"
                  onChange={addImage} // No need for (e) => addImage(e)
                  className="mt-2"
              />
          </div>


          {/* More Details Section */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Additional Details</h3>
            {formData.more_details.map((detail, index) => (
              <div key={index} className="flex space-x-2 items-center mt-2">
                <input
                  type="text"
                  value={detail.name}
                  onChange={(e) => handleMoreDetailsChange(index, "name", e.target.value)}
                  placeholder="Detail Name"
                  className="w-1/2 p-2 border rounded"
                />
                <input
                  type="text"
                  value={detail.value}
                  onChange={(e) => handleMoreDetailsChange(index, "value", e.target.value)}
                  placeholder="Detail Value"
                  className="w-1/2 p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => removeMoreDetail(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  ✖
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addMoreDetail}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
            >
              + Add Detail
            </button>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            Save Property
          </button>
        </form>
      </div>
    </div>
  );
}
