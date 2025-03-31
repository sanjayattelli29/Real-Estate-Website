import { useEffect, useState } from "react";
import { property } from "../../../data/dummyData";
import SingleProductCard from "./SingleProductCard";

const Featured = () => {
  const [properties, setProperties] = useState([]);

  async function getData() {
    let data = await fetch("https://xbfakjw2ee.execute-api.ap-south-1.amazonaws.com/dev/get-properties");
    data = await data.json();
    setProperties(data.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="pt-10 pb-16">
      <div className="text-center mb-12">
        <span className="px-4 py-1.5 bg-orange-50 dark:bg-orange-900/10 text-orange-600 rounded-lg font-medium text-sm uppercase tracking-wider">
          featured
        </span>
        <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">
          Explore Featured Latest Properties
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {properties.map((featured) => (
          <SingleProductCard key={featured._id} {...featured} />
        ))}
      </div>
    </div>
  );
};

export default Featured;
