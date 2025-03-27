import React, { useState } from "react";

const PropertyList = ({ property }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(property.length / itemsPerPage);

  // Slice properties for the current page
  const currentProperties = property.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  async function deleteProperty( id ){
    let response = await fetch("https://xbfakjw2ee.execute-api.ap-south-1.amazonaws.com/dev/delete-property" ,{
      method:"DELETE",
      headers:{ "Content-Type":"application/json"},
      body:JSON.stringify( {id:id} )
    })

    response = await response.json();
    console.log(response)

    if(response.success){
      alert("deletion success");
      window.location.reload();
    }
    
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Real Estate Listings</h1>

      {/* If no properties exist */}
      {property.length === 0 && <h1 className="text-center text-gray-600">No properties Yet.</h1>}

      {/* Property Cards */}
      <div className="grid gap-6">
        {currentProperties.map((property, index) => (
          <div key={index} className="p-6 border border-gray-200 shadow-lg rounded-xl bg-white">
            <img
              src={property.image[0]}
              alt={property.name}
              className="w-full h-56 object-cover rounded-lg"
            />
            <h2 className="text-xl font-bold mt-4">{property.name}</h2>
            <p className="text-gray-500">{property.location}</p>
            <p className="text-gray-800 font-semibold text-lg mt-2">💰 {property.price}</p>
            <p className="text-gray-700 mt-2">{property.description}</p>

            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-500">
                🛏 {property.number_of_beds} Beds | 🚿 {property.number_of_bathrooms} Baths
              </span>
              <div className="flex gap-2">
                {/* <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  View Details
                </button> */}
                <button
                 className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                 onClick={ (e )=> { e.preventDefault(); deleteProperty(property._id); }}
                 >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-800 text-white hover:bg-gray-900"}`}
          >
            ⬅️ Prev
          </button>

          <span className="px-4 py-2 border rounded bg-gray-200">{currentPage} / {totalPages}</span>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-800 text-white hover:bg-gray-900"}`}
          >
            Next ➡️
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyList;