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
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PropertyDetailPage />
      </div>
    </div>
  )
}

export default DetailedPage;





const PropertyDetailPage = () => {
    const [venture, setVenture] = useState({});
    const [loading, setLoading] = useState(true);
  
    async function getData() {
      setLoading(true);
      try {
        const params = new URLSearchParams(window.location.search);
        let data = await fetch(`https://xbfakjw2ee.execute-api.ap-south-1.amazonaws.com/dev/get-properties?id=${params.get("id")}`);
        data = await data.json();
        setVenture(data.data);
      } catch (error) {
        console.error("Error fetching property data:", error);
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      getData();
    }, []);
  
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading property details...</p>
          </div>
        </div>
      );
    }
  
    return (
      <div className="space-y-8">
        <Hero venture={venture} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Overview venture={venture} />
            {venture.features && <Amenities features={venture.features} />}
            {venture.layouts && <Layouts layouts={venture.layouts} />}
            {venture.image && <ImageSection image={venture.image} />}
            {venture.video && <YoutubeEmbedVideo video2={venture.video} />}
            {venture.location_map && <GoogleMap location_map={venture.location_map} />}
            {venture.legal_compliance && <LegalCompilance legal_compliance={venture.legal_compliance} />}
            {venture.more_details && <MoreDetails more_details={venture.more_details} />}
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CTA />
            </div>
          </div>
        </div>
      </div>
    );
  };


function Hero({ venture })
{
    return <div
    className="relative h-[60vh] min-h-[400px] rounded-xl overflow-hidden"
        style={{
        backgroundImage:` linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${venture.banner_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        }}
  >
    <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 text-white">
      <div className="max-w-4xl">
        <h1
          style={{ color: "white", fontSize: "2.5rem", marginBottom: "1rem" }}
        >
          { venture.name }
        </h1>
        <div
          className="location"
          style={{
            color: "white",
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <FaMapMarkerAlt style={{ marginRight: "0.5rem" }} />
          { venture.distance }
        </div>
        <div
          className="hero-specs"
          style={{
            display: "flex",
            color: "white",
            marginBottom: "2rem",
          }}
        >
           
          <div
            style={{
              marginRight: "2rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaBed style={{ marginRight: "0.5rem" }} />
            { venture.number_of_beds} Bedrooms
          </div>
          <div
            style={{
              marginRight: "2rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaBath style={{ marginRight: "0.5rem" }} />
            { venture.number_of_bathrooms} Bathrooms
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaParking style={{ marginRight: "0.5rem" }} />
            { venture.parking_space } Parking Spaces
          </div>
        </div>
        <div className="hero-cta">
          <button
            style={{
              backgroundColor: "#ff6b00",
              color: "white",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "4px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              marginRight: "1rem",
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
            }}
            onClick={()=>window.open( venture.brochure , "_blank" )}
          >
            <FaDownload style={{ marginRight: "0.5rem" }} />
            Download Brochure
          </button>
        </div>
      </div>
    </div>
  </div>
}

function Overview( { venture } )
{
    return <div
    className="bg-white rounded-xl p-6 shadow-sm"
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
      Project Overview
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
    <p
      style={{
        color: "#666",
        lineHeight: 1.6,
        marginBottom: "1.5rem",
      }}
    >
      { venture.description }
    </p>
  </div>
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
        <div
            className="bg-white rounded-xl p-6 shadow-sm"
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

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "1.5rem",
                }}
            >
                {features?.map((feature, index) => (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            padding: "1.5rem",
                            backgroundColor: "#f8f8f8",
                            borderRadius: "8px",
                            transition: "transform 0.3s",
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: "#ff6b00",
                                color: "white",
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "1.5rem",
                                marginBottom: "1rem",
                            }}
                        >
                            {amenities[feature] || "?"}
                        </div>
                        <h4 style={{ margin: 0 }}>{feature}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Layouts({ layouts }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 relative pb-2">
        Floor Plans & Layouts
        <span className="absolute bottom-0 left-0 w-20 h-1 bg-orange-500"></span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {layouts?.map((layout, index) => (
          <div 
            key={index}
            className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative h-48">
              <img 
                src={layout.img}
                alt={layout.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{layout.name}</h3>
              <button className="mt-2 text-orange-500 hover:text-orange-600 font-medium flex items-center">
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
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 relative pb-2">
        Image Gallery
        <span className="absolute bottom-0 left-0 w-20 h-1 bg-orange-500"></span>
      </h2>

      <div className="relative">
        {/* Main Image Container with Fixed Height */}
        <div className="relative h-[500px] rounded-lg overflow-hidden mb-4">
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
            className="bg-white/90 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextImage}
            className="bg-white/90 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md"
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
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 relative pb-2">
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
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 relative pb-2">
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
    className="bg-white rounded-xl p-6 shadow-sm"
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
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 relative pb-2">
        Additional Details
        <span className="absolute bottom-0 left-0 w-20 h-1 bg-orange-500"></span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {more_details.map((detail, index) => (
          <div 
            key={index}
            className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{detail.key}</h3>
            <p className="text-gray-600">{detail.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}