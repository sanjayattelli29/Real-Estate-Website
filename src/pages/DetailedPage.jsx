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
    <div  className="pt-20 max-w-7xl mx-auto px-4" >
        <PropertyDetailPage />
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
        <div className="loading-container" style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          minHeight: "100vh" 
        }}>
          <div style={{ textAlign: "center" }}>
            <div className="spinner" style={{ 
              border: "4px solid rgba(0, 0, 0, 0.1)", 
              borderLeft: "4px solid #ff6b00", 
              borderRadius: "50%", 
              width: "40px", 
              height: "40px", 
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px"
            }}></div>
            <p>Loading property details...</p>
          </div>
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      );
    }
  
    // Only render when data is available and loading is complete
    return (
      <div className="property-detail-page">
        {/* Hero Section */}
        <Hero venture={venture} />
  
        {/* Main Content */}
        <div
          className="main-content"
          style={{
            padding: "3rem 0",
          }}
        >
          <div
            className="container"
            style={{
              maxWidth: "1200px",
              margin: "0 auto"
            }}
          >
            <Overview venture={venture} />
            
            {venture.features && <Amenities features={venture.features} />}
            
            {venture.layouts && <Layouts layouts={venture.layouts} />}
           
            {venture.image && <ImageSection image={venture.image} />}

            {venture.video && <YoutubeEmbedVideo video2={venture.video} />}
  
            <CTA />
  
            {venture.location_map && <GoogleMap location_map={venture.location_map} />}
  
            {venture.legal_compliance && <LegalCompilance legal_compliance={venture.legal_compliance} />}
          </div>
        </div>
      </div>
    );
  };


function Hero( { venture } )
{
    return <div
    className="hero-section"
        style={{
        backgroundImage:` linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(https://img.freepik.com/free-photo/observation-urban-building-business-steel_1127-2397.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "2rem",
        }}
  >
    <div className="container">
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
        { venture.location }
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
          <FaRulerCombined style={{ marginRight: "0.5rem" }} />
          { venture.dimensions}
        </div>
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
}

function Overview( { venture } )
{
    return <div
    className="overview-section"
    style={{
      padding: "2rem",
      borderRadius: "8px",
      marginBottom: "2rem",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <div style={{ flexBasis: "65%" }}>
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

      <div
        style={{
          flexBasis: "30%",
          backgroundColor: "#f8f8f8",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <h3
          style={{
            color: "#333",
            fontSize: "1.3rem",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Interested in this property?
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <input
            type="text"
            placeholder="Your Name"
            style={{
              padding: "0.75rem",
              borderRadius: "4px",
              border: "1px solid #ddd",
              width: "100%",
            }}
          />
          <input
            type="email"
            placeholder="Your Email"
            style={{
              padding: "0.75rem",
              borderRadius: "4px",
              border: "1px solid #ddd",
              width: "100%",
            }}
          />
          <input
            type="tel"
            placeholder="Your Phone"
            style={{
              padding: "0.75rem",
              borderRadius: "4px",
              border: "1px solid #ddd",
              width: "100%",
            }}
          />
          <button
            style={{
              backgroundColor: "#ff6b00",
              color: "white",
              border: "none",
              padding: "0.75rem",
              borderRadius: "4px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FaPhone style={{ marginRight: "0.5rem" }} />
            Request Price Quote
          </button>
        </div>
      </div>
    </div>
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
            className="amenities-section"
            style={{
                padding: "2rem",
                borderRadius: "8px",
                marginBottom: "2rem",
            }}
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

function Layouts( { layouts }  )
{
    return <div
    className="floor-plans-section"
    style={{
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "8px",
      marginBottom: "2rem",
    }}
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
      Floor Plans & Layouts
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

    <div style={{ marginBottom: "1.5rem" }}>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#f8f8f8",
          padding: "2rem",
          borderRadius: "8px",
        }}
      >
         {
            layouts?.map( layout => <div>
                <img 
                src={layout.img}
                />
                <label>{layout.name}</label>
            </div> )
          }
      </div>
    </div>
  </div>
}


function ImageSection({ image }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div
      className="gallery-section"
      style={{
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        marginBottom: "2rem",
      }}
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
        Image & Video Gallery
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

      <div style={{ marginBottom: "1rem" }}>
        <img
          src={image[activeImageIndex]}
          alt={`Gallery image ${activeImageIndex + 1}`}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "8px",
            objectFit: "cover"
          }}
        />
      </div>

      <div className='flex'>
        {
          image?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setActiveImageIndex(index)}
              className='w-40 p-1 bg-blue-200 m-2 rounded-md cursor-pointer'
              style={{
                border: activeImageIndex === index ? '2px solid #ff6b00' : 'none'
              }}
            />
          ))
        }
      </div>
    </div>
  );
}


function YoutubeEmbedVideo({ video2 }) {
    return  <div
                className="gallery-section"
                style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "8px",
                marginBottom: "2rem",
                }}
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
                Image & Video Gallery
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

                {
           <div
           dangerouslySetInnerHTML={{ __html: video2 }}
         ></div>
          }
                </div>
  }

function CTA()
{
    return <div
    className="cta-section"
    style={{
      backgroundColor: "#ff6b00",
      padding: "3rem 2rem",
      borderRadius: "8px",
      textAlign: "center",
      color: "white",
    }}
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


function GoogleMap( { location_map }  )
{
    return   <div
    className="location-section"
    style={{
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "8px",
      marginBottom: "2rem",
    }}
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
      Location & Map
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

    <div style={{ display: "flex", gap: "2rem" }}>
      <div style={{ flex: 1 }}>
        <div
          style={{
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#888",
            fontSize: "1.2rem",
            fontStyle: "italic",
          }}
        >
          {
           <div
           dangerouslySetInnerHTML={{ __html: location_map }}
         ></div>
          }
        </div>
      </div>

    </div>
  </div>
}

function LegalCompilance( { legal_compliance }  )
{
    return  <div
    className="legal-section"
    style={{
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "8px",
      marginBottom: "2rem",
    }}
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