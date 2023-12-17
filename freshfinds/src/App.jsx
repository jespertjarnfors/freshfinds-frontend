import Register from "./components/Register"
import Verification from "./components/Verification"
import { UserProvider } from "./contexts/UserContext"

function App() {

  return (
    <>
    <UserProvider>
      <Register />
      <Verification />
      </UserProvider>
    </>
  )
}

export default App
