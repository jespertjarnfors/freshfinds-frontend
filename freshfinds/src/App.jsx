import { UserProvider } from "./contexts/UserContext"
import Home from "./pages/Home"
import Register from "./components/Register"
import Verification from "./components/Verification"
import Map from "./components/Map/Map"
import PlacesAutoComplete from "./components/Map/PlacesAutoComplete"
import "./App.css"

function App() {

  return (
    <>
    <UserProvider>
      {/* <Map></Map>
      <PlacesAutoComplete></PlacesAutoComplete>
    <Home /> */}
      <Register />
      <Verification /> 
      </UserProvider>
    </>
  )
}

export default App
