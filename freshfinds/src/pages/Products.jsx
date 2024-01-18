import UserNavBar from "../components/UserNavBar";
import ProductContainer from "../components/Products/ProductContainer";

const Products = () => {
  return (
    <>
      <UserNavBar></UserNavBar>
      <div className="flex flex-row justify-center items-start">
        <div className="flex-none" style={{ width: "100%" }}>
          <ProductContainer></ProductContainer>
        </div>
      </div>
    </>
  );
};

export default Products;
