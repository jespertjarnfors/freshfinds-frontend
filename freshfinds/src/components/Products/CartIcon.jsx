import Cart from "../../assets/icons/cart.svg";
import './CartIcon.css';

const CartIcon = ({ cartCount, onClick }) => {
    return (
      <div className="flex items-center mt-4 mr-6 lg:mt-0 cursor-pointer" onClick={onClick}>
        <div className="cart-icon-container">
          <img src={Cart} className="object-cover w-full h-full" alt="Basket" />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </div>
      </div>
    );
};

export default CartIcon;
