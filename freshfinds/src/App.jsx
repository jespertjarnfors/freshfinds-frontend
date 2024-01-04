import { UserProvider } from "./contexts/UserContext";
import { AppRoutes } from "./routes/AppRoutes";
import "./App.css";

function App() {
  return (
    <>
      <UserProvider>
        <AppRoutes>
        </AppRoutes>
      </UserProvider>
    </>
  );
}

export default App;
