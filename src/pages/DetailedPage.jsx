import React, { useEffect, useState } from 'react'
import {
    FaMapMarkerAlt,
    FaDownload,
    FaCalendarAlt,
    FaPhone,
    FaBed,
    FaBath,
    FaRulerCombined,
    FaParking,
    FaSwimmingPool,
    FaDumbbell,
    FaShieldAlt,
    FaTree,
  } from "react-icons/fa";
  import { SiClubhouse } from "react-icons/si";
  import { GiPowerGenerator } from "react-icons/gi";
  

function DetailedPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="pt-16">
        <PropertyDetailPage />
      </div>
    </div>
  )
}

export default DetailedPage;





const PropertyDetailPage = () => {
    const [venture, setVenture] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    async function getData() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        
        console.log("Fetching data for ID:", id);
        
        if (!id) {
          setError("No property ID provided");
          setLoading(false);
          return;
        }

        const response = await fetch(`https://xbfakjw2ee.execute-api.ap-south-1.amazonaws.com/dev/get-properties?id=${id}`);
        const data = await response.json();
        
        console.log("API Response:", data);
        
        if (!data.success || !data.data) {
          setError("Failed to fetch property data");
          setLoading(false);
          return;
        }

        setVenture(data.data);
      } catch (error) {
        console.error("Error fetching property data:", error);
        setError("An error occurred while fetching property data");
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      getData();
    }, []);

    if (error) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <div className="text-red-500 text-2xl mb-4">Error</div>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      );
    }
  
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading property details...</p>
          </div>
        </div>
      );
    }

    if (!venture || Object.keys(venture).length === 0) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 mb-4">No property data available</p>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      );
    }
  
    return (
      <div className="space-y-4">
        <Hero venture={venture} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Overview venture={venture} />
              {venture.features && venture.features.length > 0 && <Amenities features={venture.features} />}
              {venture.layouts && venture.layouts.length > 0 && <Layouts layouts={venture.layouts} />}
              {venture.image && venture.image.length > 0 && <ImageSection image={venture.image} />}
              {venture.video && <YoutubeEmbedVideo video2={venture.video} />}
              {venture.location_map && <GoogleMap location_map={venture.location_map} />}
              {venture.legal_compliance && venture.legal_compliance.length > 0 && <LegalCompilance legal_compliance={venture.legal_compliance} />}
              {venture.more_details && venture.more_details.length > 0 && <MoreDetails more_details={venture.more_details} />}
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <CTA />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


function Hero({ venture })
{
    return <div
    className="relative h-[90vh] min-h-[600px] w-full overflow-hidden"
        style={{
        backgroundImage:` linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url( ${ venture.banner_image ? venture.banner_image : venture.image[0] })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        }}
  >
    <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 text-white">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              { venture.name }
            </h1>
            <div className="flex items-center text-lg mb-4">
              <FaMapMarkerAlt className="mr-2" />
              { venture.distance }
            </div>
            <div className="flex flex-wrap gap-6 text-lg">
              <div className="flex items-center">
                <FaBed className="mr-2" />
                { venture.number_of_beds} Bedrooms
              </div>
              <div className="flex items-center">
                <FaBath className="mr-2" />
                { venture.number_of_bathrooms} Bathrooms
              </div>
              <div className="flex items-center">
                <FaParking className="mr-2" />
                { venture.parking_space } Parking Spaces
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-0">
            <button
              className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all flex items-center justify-center"
            >
              <FaCalendarAlt className="mr-2" />
              Schedule a Visit
            </button>
            <button
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-orange-500 transform hover:scale-105 transition-all flex items-center justify-center"
              onClick={()=>window.open( venture.brochure , "_blank" )}
            >
              <FaDownload className="mr-2" />
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
}

function Overview({ venture }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-4 relative pb-2 text-gray-900 dark:text-white">
        Project Overview
        <span className="absolute bottom-0 left-0 w-20 h-1 bg-orange-500"></span>
      </h2>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {venture.description}
      </p>
    </div>
  );
}


function Amenities({ features }) 
{
    const amenities = {
        "Swimming Pool": <FaSwimmingPool />,
        "Fitness Center": <FaDumbbell />,
        "24/7 Security": <FaShieldAlt />,
        "Parking Space": <FaParking />,
        "Garden Area": <FaTree />,
        "Clubhouse": <SiClubhouse />,
        "Power Backup": <GiPowerGenerator />
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 relative pb-2 text-gray-900 dark:text-white">
                Amenities & Features
                <span
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "80px",
                        height: "3px",
                        backgroundColor: "#ff6b00",
                    }}
                ></span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {features?.map((feature, index) => (
                    <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
                    >
                        <div className="bg-orange-500 text-white p-2 rounded-lg">
                            {amenities[feature] || "?"}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{feature}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Layouts({ layouts }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 relative pb-2 text-gray-900 dark:text-white">
        Floor Plans & Layouts
        <span className="absolute bottom-0 left-0 w-20 h-1 bg-orange-500"></span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {layouts?.map((layout, index) => (
          <div 
            key={index}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative h-48">
              <img 
                src={layout.img}
                alt={layout.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{layout.name}</h3>
              <button className="mt-2 text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 font-medium flex items-center">
                View Details
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function ImageSection({ image }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % image.length);
  };

  const previousImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + image.length) % image.length);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 relative pb-2 text-gray-900 dark:text-white">
        Image Gallery
        <span className="absolute bottom-0 left-0 w-20 h-1 bg-orange-500"></span>
      </h2>

      <div className="relative">
        {/* Main Image Container with Fixed Height */}
        <div className="relative h-[600px] rounded-lg overflow-hidden mb-4">
          <img
            src={image[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Navigation Buttons */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button
            onClick={previousImage}
            className="bg-white/90 hover:bg-white text-gray-800 dark:bg-gray-800/90 dark:hover:bg-gray-800 dark:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextImage}
            className="bg-white/90 hover:bg-white text-gray-800 dark:bg-gray-800/90 dark:hover:bg-gray-800 dark:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium shadow-md">
          {currentIndex + 1} / {image.length}
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-4">
          {image.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative h-20 rounded-md overflow-hidden ${
                currentIndex === index ? 'ring-2 ring-orange-500' : ''
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


function YoutubeEmbedVideo({ video2 }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 relative pb-2 text-gray-900 dark:text-white">
        Video Gallery
        <span className="absolute bottom-0 left-0 w-20 h-1 bg-orange-500"></span>
      </h2>

      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <div 
          className="absolute top-0 left-0 w-full h-full"
          dangerouslySetInnerHTML={{ 
            __html: video2.replace(
              /width="\d+"/, 
              'width="100%"'
            ).replace(
              /height="\d+"/, 
              'height="100%"'
            ).replace(
              /style="[^"]*"/, 
              'style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;"'
            )
          }} 
        />
      </div>
    </div>
  );
}

function CTA()
{
    return <div
    className="bg-orange-500 rounded-xl p-6 text-white"
    >
    <h2
      style={{
        fontSize: "2rem",
        marginBottom: "1rem",
      }}
    >
      Ready to make this property your new home?
    </h2>
    <p
      style={{
        fontSize: "1.1rem",
        marginBottom: "2rem",
        maxWidth: "700px",
        margin: "0 auto 2rem",
      }}
    >
      Contact our sales team today to schedule a visit or to get more
      information about this amazing property.
    </p>
    <div
      style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <button
        style={{
          backgroundColor: "white",
          color: "#ff6b00",
          border: "none",
          padding: "0.75rem 1.5rem",
          borderRadius: "4px",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
      >
        <FaCalendarAlt style={{ marginRight: "0.5rem" }} />
        Schedule a Visit
      </button>
      <button
        style={{
          backgroundColor: "transparent",
          color: "white",
          border: "2px solid white",
          padding: "0.75rem 1.5rem",
          borderRadius: "4px",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
      >
        <FaPhone style={{ marginRight: "0.5rem" }} />
        Contact Sales Team
      </button>
    </div>
  </div>
}


function GoogleMap({ location_map }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 relative pb-2 text-gray-900 dark:text-white">
        Location & Map
        <span className="absolute bottom-0 left-0 w-20 h-1 bg-orange-500"></span>
      </h2>

      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <div 
          className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden"
          dangerouslySetInnerHTML={{ 
            __html: location_map.replace(
              /width="\d+"/, 
              'width="100%"'
            ).replace(
              /height="\d+"/, 
              'height="100%"'
            ).replace(
              /style="[^"]*"/, 
              'style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;"'
            )
          }} 
        />
      </div>
    </div>
  );
}

function LegalCompilance( { legal_compliance }  )
{
    return  <div
    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
  >
    <h2
      style={{
        color: "#333",
        fontSize: "1.8rem",
        marginBottom: "1.5rem",
        position: "relative",
        paddingBottom: "0.5rem",
      }}
    >
      Legal & Compliance
      <span
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "80px",
          height: "3px",
          backgroundColor: "#ff6b00",
        }}
      ></span>
    </h2>

    <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
      <div style={{ flex: "1 1 300px" }}>
        <h3
          style={{
            color: "#333",
            fontSize: "1.3rem",
            marginBottom: "1rem",
          }}
        >
          Regulatory Approvals
        </h3>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
         {
            legal_compliance?.map( obj =><li
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#ff6b00",
                    marginRight: "0.75rem",
                  }}
                ></span>
                {obj.key} : {obj.value}
              </li> )
         }
          
        </ul>
      </div>

    </div>

    <div
      style={{
        backgroundColor: "#f8f8f8",
        padding: "1rem",
        borderRadius: "4px",
        marginTop: "1.5rem",
        fontSize: "0.9rem",
        color: "#666",
        fontStyle: "italic",
      }}
    >
      <p>
        Disclaimer: All information, specifications, and visuals
        presented are for illustrative purposes only. The developer
        reserves the right to make changes without prior notice. Buyers
        should verify all details before proceeding with their purchase
        decision.
      </p>
    </div>
  </div>
}

function MoreDetails({ more_details }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 relative pb-2 text-gray-900 dark:text-white">
        Additional Details
        <span className="absolute bottom-0 left-0 w-20 h-1 bg-orange-500"></span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {more_details.map((detail, index) => (
          <div 
            key={index}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{detail.key}</h3>
            <p className="text-gray-600 dark:text-gray-300">{detail.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}