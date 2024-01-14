import { UserProvider } from "./contexts/UserContext";
import { CartProvider } from "./contexts/CartContext";
import { AppRoutes } from "./routes/AppRoutes";
import "./App.css";
import { ProductsUpdatedProvider } from "./contexts/ProductsUpdatedContext";

function App() {
  return (
    <>
      <UserProvider>
        <CartProvider>
          <ProductsUpdatedProvider>
        <AppRoutes>
        </AppRoutes>
        </ProductsUpdatedProvider>
        </CartProvider>
      </UserProvider>
    </>
  );
}

export default App;
