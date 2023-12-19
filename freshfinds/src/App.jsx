import { UserProvider } from "./contexts/UserContext";
import { AppRoutes } from "./routes/AppRoutes";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Verification from "./components/Register/Verification";
import Map from "./components/Google Maps/Map";
import "./App.css";

function App() {
  return (
    <>
      <UserProvider>
        <AppRoutes>
        {/* <Map></Map>
    {/* <Home></Home> */}
        <Register></Register>
        {/* <Verification></Verification> */}
        {/* <Login></Login> */}

        {/* <Verification />  */}
        </AppRoutes>
      </UserProvider>
    </>
  );
}

export default App;
