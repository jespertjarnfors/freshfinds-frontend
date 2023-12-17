import Register from "./components/Register"
import Verification from "./components/Verification"
import { UserProvider } from "./contexts/UserContext"
import Home from "./pages/Home"

function App() {

  return (
    <>
    <UserProvider>
    <Home />
      {/* <Register />
      <Verification /> */}
      </UserProvider>
    </>
  )
}

export default App
