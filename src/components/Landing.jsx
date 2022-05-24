import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import { Link } from "react-router-dom";

const Landing = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  // return (<div>{!user ? <SignUp /> : <Login />}</div>);
  return (
    <div>
      <h1>Looking for Group</h1>
      {isAuthenticated ? (
        <>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
          <button onClick={() => window.location.assign("/app")}>
            Go to authorized app
          </button>
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
    </div>
  );
};

export default Landing;
