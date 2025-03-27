import { useEffect, useState } from "react";
import PropertyList from "../components/common/PropertiesList";
import PropertyForm from "../components/common/PropertyForm";


const Admin = () => {

  const [properties , setProperties ] = useState([])

  async function getData(){
    let data = await fetch("https://xbfakjw2ee.execute-api.ap-south-1.amazonaws.com/dev/get-properties");
    data = await data.json();
    console.log(data);
    
    setProperties(data.data)
  }

  useEffect(()=>{
    getData();
  },[])
  return (
    <div className="pt-20 max-w-7xl mx-auto px-4">
        <PropertyList property = { properties } />
        <PropertyForm/>
    </div>
  );
};

export default Admin;
