import { UserProvider } from "./contexts/UserContext"
import Home from "./pages/Home"
import "./index.css"

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
