import Cart from "../../assets/icons/cart.svg";
import './CartIcon.css';

const CartIcon = ({ cartCount, onClick }) => {
    return (
      <div className="flex items-center lg:mr-6 lg:mt-0 cursor-pointer" onClick={onClick}>
        <div className="cart-icon-container">
          <img src={Cart} className="object-cover h-7 lg:w-full lg:h-full" alt="Basket" />
          {cartCount > 0 && <span className="cart-count top-5 right-1 lg:top-6 lg:right-0">{cartCount}</span>}
        </div>
      </div>
    );
};

export default CartIcon;
