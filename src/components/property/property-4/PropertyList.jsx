import { useSelector } from "react-redux";
import { dataStore } from "../../../features/dataSlice";
import SingleProductCard from "../../common/page-componets/SingleProductCard";
import { useEffect, useState } from "react";

const PropertyList = ({ basis }) => {

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
    <div className="flex flex-wrap gap-4">
      {properties?.map((property) => (
        <SingleProductCard key={property.id} {...property} basis={basis} />
      ))}
    </div>
  );
};

export default PropertyList;
