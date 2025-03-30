import { Pagination, PropertyFullWidth } from "../components/common/page-componets";
import { PropertyList } from "../components/property";
import { property } from "../data/dummyData";

const Property = () => {
  return (
    <div className="pt-20 max-w-7xl mx-auto px-4">
      <PropertyFullWidth />
      <Pagination itemsPerPage={6} pageData={property} />
    </div>
  );
};

export default Property;
