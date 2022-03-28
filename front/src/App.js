import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import { createContext, useState, useEffect } from "react";

// CSS
import "./App.css";

export const UsersContext = createContext();

function App() {
  const [users, setUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState([]);
  const [signupDisplay, setSignupDisplay] = useState(true);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const usersContext = {
    users,
    setUsers,
    loggedUser,
    setLoggedUser,
    signupDisplay,
    setSignupDisplay,
    isSignedUp,
    setIsSignedUp,
    isLoggedIn,
    setIsLoggedIn,
  };

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.json(res))
      .then((res) => {
        // console.log(res);
        setUsers(res);
      });
  }, []);

  const activateLogin = () => {
    setSignupDisplay(false);
    setIsSignedUp(true);
  };

  return (
    <UsersContext.Provider value={usersContext}>
      <main className="App">
        <h1 style={{ color: "orange" }}>
          <span className="wave">👋</span> Hello
        </h1>

        {signupDisplay ? (
          <div>
            <h2>Are you new to the app ?</h2>
            <Signup />
            <div className="oneline">
              <p className="child">Otherwise you can Login here</p>{" "}
              <button className="child" onClick={activateLogin}>
                Login
              </button>
            </div>
          </div>
        ) : null}

        {isSignedUp ? <Login /> : null}
        {isLoggedIn ? <Admin /> : null}
      </main>
    </UsersContext.Provider>
  );
}

export default App;
