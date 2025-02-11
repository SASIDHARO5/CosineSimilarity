// import React, { useState } from "react";
// import "./App.css";
// import Navbar from "./components/Navbar";
// import MainContent from "./components/MainContent";
// import profileImage from "./assets/Profile.png";

// function App() {
//   const [showLoginForm, setShowLoginForm] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [history, setHistory] = useState([]);
//   const [username, setUsername] = useState("");

//   const handleLoginClick = () => {
//     setShowLoginForm(true);
//   };

//   const handleCloseLoginForm = () => {
//     setShowLoginForm(false);
//   };

//   const handleLoginSuccess = (profileImage, historyItems, LoggedInUsername) => {
//     setIsLoggedIn(true);
//     setHistory(historyItems);
//     setShowLoginForm(false);
//     setUsername(LoggedInUsername);
//   };
//   const handleSignOut = () => {
//     setIsLoggedIn(false);
//     setUsername('');
//   };
//   return (
//     <div className="App">
//       <Navbar
//         onLoginClick={handleLoginClick}
//         isLoggedIn={isLoggedIn}
//         profileImage={profileImage}
//         // username={username}
//         onSignOut={handleSignOut}
//       />
//       <div className="content">
//         <MainContent
//           showLoginForm={showLoginForm}
//           onLoginClick={handleLoginClick}
//           onCloseLoginForm={handleCloseLoginForm}
//           onLoginSuccess={handleLoginSuccess}
//           isLoggedIn={isLoggedIn}
//           history={history}
//         />
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import profileImage from "./assets/Profile.png";

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [history, setHistory] = useState([]);
  const [username, setUsername] = useState("");  // Add state for username
  const [user, setUser] = useState(null);

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleCloseLoginForm = () => {
    setShowLoginForm(false);
  };

  const handleLoginSuccess = (profileImage, historyItems, username,userData) => {
    setIsLoggedIn(true);
    setHistory(historyItems);
    setShowLoginForm(false);
    setUsername(username);  // Set the username
    setUser(userData); // Set the user data

  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUsername('');  // Clear the username on sign out
    setUser(null); // Clear the user data on sign out
  };

  return (
    <div className="App">
      <Navbar
        onLoginClick={handleLoginClick}
        isLoggedIn={isLoggedIn}
        profileImage={profileImage}
        username={username}  // Pass the username to Navbar
        onSignOut={handleSignOut}
      />
      <div className="content">
        <MainContent
          showLoginForm={showLoginForm}
          onLoginClick={handleLoginClick}
          onCloseLoginForm={handleCloseLoginForm}
          onLoginSuccess={handleLoginSuccess}
          isLoggedIn={isLoggedIn}
          history={history}
          username={username}
        />
      </div>
    </div>
  );
}

export default App;
