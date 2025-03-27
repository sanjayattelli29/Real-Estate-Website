import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Projects = () => {
  const [projects , setProperties ] = useState([])
  
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
    <div className="pt-10 pb-16">
      <div className="text-center">
        <h1 className="mx-auto sub-heading">our projects</h1>
        <h1 className="heading">excellent projects both small and complex</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 md:grid-cols-3">
        {projects.map(({ id, name, number, image }) => (
          <div key={id} className="relative w-full group" >
            <div className="overflow-hidden">
              <Link className="!opacity-100"  to="/contact">
                <img
                  src={image[0]}
                  alt={name}
                  className="w-full  h-fit md:h-[250px] object-cover group-hover:scale-125 transition-a"
                />
              </Link>
            </div>
            <div className="absolute bottom-0 left-0 w-full px-2 py-2 transition-transform bg-gradient-to-t from-black/80 text-slate-100 to-transparent">
              <h1 className="text-lg font-semibold">{name}</h1>
              <p>{number} Poperty</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
