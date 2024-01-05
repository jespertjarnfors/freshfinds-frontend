import HomeNavBar from "../components/Home/HomeNavBar";
import ProductContainer from "../components/Produce/ProductContainer";

const Produce = () => {
  return (
    <>
      <HomeNavBar></HomeNavBar>
      <div className="flex flex-row justify-center items-start">
        <div className="flex-none" style={{ width: "100%" }}> {/* Fixed width for ProductContainer */}
          <ProductContainer></ProductContainer>
        </div>
      </div>
    </>
  );
};

export default Produce;
