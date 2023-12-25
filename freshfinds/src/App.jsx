import { UserProvider } from "./contexts/UserContext";
import { AppRoutes } from "./routes/AppRoutes";
import ProductFeed from "./pages/ProductFeed";
import "./App.css";

function App() {
  return (
    <>
      <UserProvider>
        <AppRoutes>
          <ProductFeed></ProductFeed>
        </AppRoutes>
      </UserProvider>
    </>
  );
}

export default App;
