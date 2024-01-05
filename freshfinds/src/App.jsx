import { UserProvider } from "./contexts/UserContext";
import { CartProvider } from "./contexts/CartContext";
import { AppRoutes } from "./routes/AppRoutes";
import "./App.css";

function App() {
  return (
    <>
      <UserProvider>
        <CartProvider>
        <AppRoutes>
        </AppRoutes>
        </CartProvider>
      </UserProvider>
    </>
  );
}

export default App;
