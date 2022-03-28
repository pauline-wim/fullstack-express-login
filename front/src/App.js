import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

function App() {
  return (
    <div>
      <h1 style={{ color: "red" }}>Authentification</h1>
      <Signup />
      <Login />
      <Admin />
    </div>
  );
}

export default App;
