import UserNavBar from "../components/UserNavBar";
import ProductContainer from "../components/Produce/ProductContainer";

const Produce = () => {
  return (
    <>
      <UserNavBar></UserNavBar>
      <div className="flex flex-row justify-center items-start">
        <div className="flex-none" style={{ width: "100%" }}> {/* Fixed width for ProductContainer */}
          <ProductContainer></ProductContainer>
        </div>
      </div>
    </>
  );
};

export default Produce;
