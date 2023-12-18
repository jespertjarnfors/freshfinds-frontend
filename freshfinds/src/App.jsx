import { UserProvider } from "./contexts/UserContext"
import Register from "./components/Register"
import Verification from "./components/Verification"
import "./index.css"

function App() {

  return (
    <>
    <UserProvider>
    {/* <Home /> */}
      <Register />
      <Verification />
      </UserProvider>
    </>
  )
}

export default App
