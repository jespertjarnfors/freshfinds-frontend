import HomeNavBar from "../components/Home/HomeNavBar";
import ProductContainer from "../components/Produce/ProductContainer";
import LeftNav from "../components/Produce/LeftNav";

const Produce = () => {
  return (
    <>
      <HomeNavBar></HomeNavBar>
      <div className="flex flex-row">
      <LeftNav></LeftNav>
      <ProductContainer></ProductContainer>
      </div>
    </>
  );
};

export default Produce;
