import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [authKey, setAuthKey] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        authKey,
      });

      // Extract userId and usertype from the response
      const { userId, usertype } = response.data;
      // Store userId and usertype in sessionStorage
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("userType", usertype);

      // Navigate to the home page of  application
      if (usertype === "admin") {
        navigate("/adminhome");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleSignupRedirect = () => {
    navigate("/register");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Auth Key:</label>
          <input
            type="password"
            value={authKey}
            onChange={(e) => setAuthKey(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        <p>Don't have an account?</p>
        <button onClick={handleSignupRedirect}>Sign Up</button>
      </div>
    </div>
  );
};

export default LoginPage;
