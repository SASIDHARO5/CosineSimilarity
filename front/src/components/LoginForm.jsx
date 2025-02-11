import React, { useState } from "react";
import axios from "axios";

const LoginForm = ({ onClose, onLoginSuccess }) => {
  const [view, setView] = useState("signup");
  const [signupValue, setSignupValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = signupValue;
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });
  const { email: loginEmail, password: loginPassword } = loginValue;

  const [errorMessage,setErrorMessage]=useState("");

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupValue({
      ...signupValue,
      [name]: value,
    });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginValue({
      ...loginValue,
      [name]: value,
    });
  };

  const handleSwitchToSignup = () => {
    setErrorMessage("");
    setView("signup");
  };

  const handleSwitchToLogin = () => {
    setErrorMessage("");
    setView("login");
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3001/signup",
        {
          ...signupValue,
        },
        { withCredentials: true }
      );
      console.log("Signup successful", data);

      setSignupValue({
        email: "",
        password: "",
        username: "",
      });
      setView("login");
      console.log("Switched to login view");
    } catch (error) {
      console.log("Signup error", error);
      setErrorMessage("Signup failed. Please try again.");
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3001/login",
        {
          email: loginEmail,
          password: loginPassword,
        },
        { withCredentials: true }
      );
      console.log("Login successful", data);
      setLoginValue({
        email: "",
        password: "",
      });


      // Fetch URLs after login
      const urlsResponse = await axios.get(
        "http://localhost:3001/urls",
        { withCredentials: true }
      );

      // const historyItems = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
      let historyItems = urlsResponse.data.urls.map(urlObj => urlObj.url);
      if (historyItems.length === 0) {
        historyItems = ["No previous results available, enter an URL now and save the results now!"];
    }
    
      // onLoginSuccess("https://via.placeholder.com/40", historyItems);
      onLoginSuccess("https://via.placeholder.com/40", historyItems, data.username); // Pass the username
    } catch (error) {
      console.log("Login error", error);
      setErrorMessage("Login failed. Incorrect credentials");
    }
  };

  return (
    <div className="login-form">
      {view === "signup" && (
        <>
          <h2>Sign Up</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleSignupSubmit}>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleSignupChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="signup-username"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleSignupChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="signup-password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleSignupChange}
              />
            </div>

            <p>
              Already have an account?{" "}
              <button type="button" onClick={handleSwitchToLogin}>
                Login
              </button>
            </p>
            <button type="submit">Sign Up</button>
          </form>
        </>
      )}
      {view === "login" && (
        <>
          <h2>Login</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={loginEmail}
                onChange={handleLoginChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={loginPassword}
                onChange={handleLoginChange}
              />
            </div>
            <p>
              Don't have an account?{" "}
              <button type="button" onClick={handleSwitchToSignup}>
                Sign Up
              </button>
            </p>
            <button type="submit">Login</button>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginForm;
