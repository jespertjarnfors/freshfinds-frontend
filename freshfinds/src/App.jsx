import { UserProvider } from "./contexts/UserContext"
import Home from "./pages/Home"
import RegisterForm from "./components/Register/RegisterForm"
import Verification from "./components/Verification"
import Map from "./components/Google Maps/Map"
import PlacesAutoComplete from "./components/Google Maps/PlacesAutoComplete"
import "./App.css"
import Register from "./pages/Register"

function App() {

  return (
    <>
    <UserProvider>
      {/* <Map></Map>
      <PlacesAutoComplete></PlacesAutoComplete>*/}
    {/* <Home />  */}
      <Register></Register>
      <Verification></Verification>
      {/* <Verification />  */}
      </UserProvider>
    </>
  )
}

export default App
