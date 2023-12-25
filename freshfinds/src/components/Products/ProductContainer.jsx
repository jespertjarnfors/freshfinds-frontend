import ProductCard from "./ProductCard";
import fruitIcon from "../../assets/icons/fruit.svg";
import beefIcon from "../../assets/icons/beef.svg";

const product = {
  name: "Fresh Apples",
  seller: "JohnDoe",
  icon: fruitIcon,
  image:
    "https://www.veggiefresh.co.nz/cdn/shop/products/Royal-Gala-Apples-Veggie-Fresh-Papanui-1649839701_700x700.jpg?v=1649839702",
  price: 5,
  quantity: 10,
  deliveryMethod: "Shipping",
  category: "Fruit",
};

const product2 = {
  name: "Beef Steaks",
  seller: "JamieJones",
  icon: beefIcon,
  image:
    "https://gourmetdirect.co.nz/wp-content/uploads/2023/03/Beef-Steak-with-Romesco-Sauce.jpg",
  price: 15,
  quantity: 20,
  deliveryMethod: "Shipping",
  category: "Meat",
};

const ProductContainer = () => {
  return (
    <div className="flex flex-row space-x-8 mx-10 p-10 flex-wrap rounded-xl shadow-lg" 
    style={{ backgroundColor: "#FFEDC2", height:"85svh"}}>
      <ProductCard product={product} />
      <ProductCard product={product2} />
    </div>
  );
};

export default ProductContainer;
