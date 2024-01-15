import { UserProvider } from "./contexts/UserContext";
import { CartProvider } from "./contexts/CartContext";
import { AppRoutes } from "./routes/AppRoutes";
import "./App.css";
import { ProductsUpdatedProvider } from "./contexts/ProductsUpdatedContext";
import { CheckoutProvider } from "./contexts/CheckoutContext";

function App() {
  return (
    <>
      <UserProvider>
        <CartProvider>
          <ProductsUpdatedProvider>
            <CheckoutProvider>
        <AppRoutes>
        </AppRoutes>
        </CheckoutProvider>
        </ProductsUpdatedProvider>
        </CartProvider>
      </UserProvider>
    </>
  );
}

export default App;
