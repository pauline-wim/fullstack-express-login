import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import { createContext, useState, useEffect } from "react";

export const UsersContext = createContext();

function App() {
  const [users, setUsers] = useState([]);

  const usersContext = {
    users,
    setUsers,
  };

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.json(res))
      .then((res) => {
        // console.log(res);
        setUsers(res);
      });
  }, []);

  return (
    <UsersContext.Provider value={usersContext}>
      <div>
        <h1 style={{ color: "red" }}>Authentification</h1>
        <Signup />
        <Login />
        <Admin />
      </div>
    </UsersContext.Provider>
  );
}

export default App;
