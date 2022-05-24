import React from "react";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// COMPONENTS
import Landing from "./components/Landing";
import AuthHome from "./components/AuthHome";
import Login from "./components/Login"
import SignUp from "./components/SignUp"

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  console.log("logged in? ", isAuthenticated);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading">
          <div className="obj"></div>
          <div className="obj"></div>
          <div className="obj"></div>
          <div className="obj"></div>
          <div className="obj"></div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Landing />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <SignUp />
              </>
            }
          />
          <Route
            exact
            path="/app"
            element={
              <RequireAuth>
                <AuthHome />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

// part of this is from https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2FApp.tsx
const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth0();

  // console.log("hit require auth, authenticated? ", isAuthenticated);
  if (!isAuthenticated) {
    // take them back to the home page if they are not logged in
    return <Navigate to="/" />;
  }

  return children;
};

export default App;
