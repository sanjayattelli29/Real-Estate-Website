import { useEffect, useState } from "react";
import PropertyList from "../components/common/PropertiesList";
import PropertyForm from "../components/common/PropertyForm";

const Admin = () => {
  const [properties, setProperties] = useState([]);
  const [logged, setLogged] = useState(
    JSON.parse(localStorage.getItem("login") || "false")
  );
  const [form, setForm] = useState({ username: "", password: "" });

  async function getData() {
    try {
      let data = await fetch(
        "https://xbfakjw2ee.execute-api.ap-south-1.amazonaws.com/dev/get-properties"
      );
      data = await data.json();
      setProperties(data.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  }

  useEffect(() => {
    if (logged) getData();
  }, [logged]);

  const handleLogin = () => {
    if (form.username === "admin" && form.password === "27@ravrani") {
      localStorage.setItem("login", JSON.stringify(true));
      setLogged(true);
    } else {
      alert("Invalid username or password.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("login");
    setLogged(false);
  };

  return (
    <div className="pt-20 max-w-7xl mx-auto px-4">
      {logged ? (
        <div>
          <button className="btn btn-danger mb-4" onClick={handleLogout}>
            Logout
          </button>
          <div className="flex space-around">
            <PropertyList property={properties} />
            <PropertyForm />
          </div>
        </div>
      ) : (
        <div className="text-center w-50 p-3">
          <h2>Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            className="m-2 p-1 bg-indigo-100"
            value={form.username}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, username: e.target.value }))
            }
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            className="m-2 p-1 bg-indigo-100"
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <br />
          <button className="btn btn-primary mt-2" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Admin;
