
import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import "./App.css";

function LoginHandler() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  const handleFailure = (result) => {};

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  const handleSucces = async (googleData) => {
    const res = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: googleData.tokenId }),
    });

    const data = await res.json();
    setLoginData(data);
    localStorage.setItem("loginData", JSON.stringify(data));
  };

  return (
    <div className="App">
      {loginData ? (
        <div className="App-header">
          <h3>You logged in as: {loginData.email}</h3>
          <button className="App-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="App-header">
          <GoogleLogin
            clientId = {process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={handleSucces}
            onFailure={handleFailure}
            cookiePolicy={"single_host_origin"}
          ></GoogleLogin>
        </div>
      )}
    </div>
  );
}
export default LoginHandler;
