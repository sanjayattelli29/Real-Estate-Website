import { useEffect, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaUpload,
  FaDatabase,
  FaChartBar,
  FaUsers,
  FaHome,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaEnvelope,
  FaImage
} from "react-icons/fa";
import PropertyForm from "./Admin";
import { useNavigate } from "react-router-dom";

const Admin2 = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Data Upload");
  const [enquiries, setEnquiries] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [properties, setProperties] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    username: '',
    password: ''
  });

  // Check login status on component mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const lastLoginTime = localStorage.getItem('lastLoginTime');
      const adminToken = localStorage.getItem('adminToken');
      
      if (!adminToken || !lastLoginTime) {
        setShowLogin(true);
        return;
      }

      const currentTime = new Date().getTime();
      const timeDiff = currentTime - parseInt(lastLoginTime);
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

      if (timeDiff > oneHour) {
        // Clear all localStorage and logout
        localStorage.clear();
        setShowLogin(true);
      } else {
        setShowLogin(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Fetch enquiries and properties data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch enquiries
        const enquiriesResponse = await fetch(
          "https://xbfakjw2ee.execute-api.ap-south-1.amazonaws.com/dev/get-enquires"
        );
        const enquiriesData = await enquiriesResponse.json();
        if (enquiriesData.success) {
          setEnquiries(enquiriesData.data || []);
        }

        // Fetch properties
        const propertiesResponse = await fetch(
          "https://xbfakjw2ee.execute-api.ap-south-1.amazonaws.com/dev/get-properties"
        );
        const propertiesData = await propertiesResponse.json();
        if (propertiesData.success) {
          setProperties(propertiesData.data || []);
        }

        // Fetch newsletters
        const newslettersResponse = await fetch(
          "https://xbfakjw2ee.execute-api.ap-south-1.amazonaws.com/dev/get-newsletters"
        );
        const newslettersData = await newslettersResponse.json();
        if (newslettersData.success) {
          setNewsletters(newslettersData.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteEnquiry = async (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      try {
        const response = await fetch(
          `https://xbfakjw2ee.execute-api.ap-south-1.amazonaws.com/dev/delete-enquiry/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        if (data.success) {
          setEnquiries(enquiries.filter(enquiry => enquiry.id !== id));
        } else {
          alert("Failed to delete enquiry. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting enquiry:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  const handleDeleteNewsletter = async (id) => {
    if (window.confirm("Are you sure you want to delete this newsletter subscription?")) {
      try {
        const response = await fetch(
         ` https://xbfakjw2ee.execute-api.ap-south-1.amazonaws.com/dev/delete-newsletter/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setNewsletters(newsletters.filter(subscriber => subscriber.id !== id));
        } else {
          alert("Failed to delete newsletter subscription. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting newsletter subscription:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  const handleDeleteProperty = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        const response = await fetch(
          `https://xbfakjw2ee.execute-api.ap-south-1.amazonaws.com/dev/delete-property`,
          {
            method: "DELETE",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify( { "id":id } )
          }
        );
        if (response.ok) {
          setProperties(properties.filter(property => property.id !== id));
        } else {
          alert("Failed to delete property. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting property:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginCredentials.username === 'admin' && loginCredentials.password === 'admin123') {
      localStorage.setItem('adminToken', 'dummy-token');
      localStorage.setItem('lastLoginTime', new Date().getTime().toString());
      setShowLogin(false);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setShowLogin(true);
  };

  // Add auto-logout check every minute
  useEffect(() => {
    if (!showLogin) {
      const interval = setInterval(() => {
        const lastLoginTime = localStorage.getItem('lastLoginTime');
        if (lastLoginTime) {
          const currentTime = new Date().getTime();
          const timeDiff = currentTime - parseInt(lastLoginTime);
          const oneHour = 60 * 60 * 1000;

          if (timeDiff > oneHour) {
            localStorage.clear();
            setShowLogin(true);
          }
        }
      }, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  }, [showLogin]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const tabs = [
    { name: "Data Upload", icon: <FaUpload /> },
    { name: "Database", icon: <FaDatabase /> },
    { name: "Newsletter", icon: <FaEnvelope />  },
    { name: "Showcase", icon: <FaImage /> }
  ];

  if (showLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={loginCredentials.username}
                  onChange={(e) => setLoginCredentials({ ...loginCredentials, username: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={loginCredentials.password}
                  onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Mobile Header */}
      <div className="fixed top-16 left-0 right-0 z-20 bg-white md:hidden border-b border-gray-200 px-4 py-2">
        <div className="flex justify-between items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-orange-600 focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, Admin</span>
            <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white text-sm">
              A
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-300 ease-in-out top-16`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => {
                setActiveTab(tab.name);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors ${
                activeTab === tab.name ? "bg-orange-50 text-orange-600 border-r-4 border-orange-600" : ""
              }`}
            >
              <span className="mr-3">{tab.icon}</span>
              {tab.name}
              {tab.hasNotification && (
                <span className="ml-auto w-2 h-2 bg-green-500 rounded-full"></span>
              )}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full p-4">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="md:ml-64 p-4 md:p-8 mt-14 md:mt-0">
        {/* Header */}
        <div className="hidden md:flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {activeTab === "Data Upload" && "Data Upload"}
            {activeTab === "Database" && "Database Management"}
            {activeTab === "Analytics" && "Analytics Dashboard"}
            {activeTab === "Users" && "User Management"}
            {activeTab === "Newsletter" && "Newsletter Subscribers"}
            {activeTab === "Showcase" && "Property Showcase"}
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, Admin</span>
            <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white">
              A
            </div>
          </div>
        </div>

        {/* Mobile Title */}
        <div className="md:hidden mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {activeTab === "Data Upload" && "Data Upload"}
            {activeTab === "Database" && "Database Management"}
            {activeTab === "Analytics" && "Analytics Dashboard"}
            {activeTab === "Users" && "User Management"}
            {activeTab === "Newsletter" && "Newsletter Subscribers"}
            {activeTab === "Showcase" && "Property Showcase"}
          </h2>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          {activeTab === "Data Upload" && <PropertyForm />}
          {activeTab === "Database" && (
            <div className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                  <p className="text-red-600 text-center font-medium">{error}</p>
                </div>
              )}
              
              {/* Enquiries Table */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Enquiries</h3>
                <div className="overflow-x-auto">
                  {loading ? (
                    <div className="flex justify-center items-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                    </div>
                  ) : enquiries.length === 0 ? (
                    <p className="text-center py-4 text-gray-500">No enquiries found.</p>
                  ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                          <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                          <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                            {enquiries.map((enquiry) => (
                                <tr key={enquiry._id}>
                                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm">{enquiry.name}</td>
                                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm">{enquiry.email}</td>
                                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm">{enquiry.phone}</td>
                                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm">{enquiry.property}</td>
                                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm">{enquiry.date}</td>
                                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm">
                                    <button 
                                    className="text-orange-600 hover:text-orange-900 mr-3"
                                    onClick={() => alert("Edit functionality coming soon!")}
                                    >
                                    <FaEdit />
                                    </button>
                                    <button 
                                    className="text-red-600 hover:text-red-900"
                                    onClick={() => handleDeleteEnquiry(enquiry._id)}
                                    >
                                    <FaTrash />
                                    </button>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* Properties Table */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Properties</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {properties.map((property) => (
                        <tr key={property.id}>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm">{property.name}</td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm">{property.location}</td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm">{property.price}</td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {property.status}
                            </span>
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-orange-600 hover:text-orange-900 mr-3">
                              <FaEdit />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
  
          {activeTab === "Newsletter" && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Newsletter Subscribers</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          S.no
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {newsletters.map((subscriber,idx) => (
                        <tr key={subscriber.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                { idx+1 }
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {subscriber.email}
                            </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {activeTab === "Showcase" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    console.log(properties)
                }
              {properties.map((property) => (
                <div key={property._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={property.banner_image || property.image[0]}
                      alt={property.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => handleDeleteProperty(property._id)}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{property.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{property.distance}</p>
                    <p className="text-orange-600 font-semibold mb-2">{property.price}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-4">{property.number_of_beds} Beds</span>
                      <span className="mr-4">{property.number_of_bathrooms} Baths</span>
                      <span>{property.parking_space} Parking</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin2;