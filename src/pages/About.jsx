import { OverView, Stats } from "../components/about";
import {
  AboutUs,
  Brands,
  Feeds,
  Team,
  Testimonial,
  WhatWeDo,
} from "../components/common/page-componets";

const About = () => {
  return (
    <div className="pt-20 max-w-7xl mx-auto px-4">
      <Stats />

      <AboutUs />
      {/* <Team /> */}
      {/* <Testimonial /> */}
      {/* <Brands /> */}
      {/* <Feeds /> */}

      
      <OverView />
      {/* <Brands /> */}
      <WhatWeDo />
      {/* <Feeds /> */}


    </div>
  );
};

export default About;
