// import React from "react";

// const Navbar = ({ onLoginClick, isLoggedIn, profileImage }) => {
//   return (
//     <nav className="navbar">
//       <div className="navbar__brand">Truth Trackers</div>
//       <div className="navbar__login">
//         {isLoggedIn ? (
//           <div className="navbar__profile">
//             <img src={profileImage} alt="Profile" />
//           </div>
//         ) : (
//           <button className="login-button" onClick={onLoginClick}>
//             Login
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;








// import React, { useState } from 'react';

// const Navbar = ({ onLoginClick, isLoggedIn, profileImage, username, onSignOut }) => {
//   const [isDropdownVisible, setDropdownVisible] = useState(false);

//   const toggleDropdown = () => {
//     setDropdownVisible(!isDropdownVisible);
//   };

//   const handleSignOut = () => {
//     setDropdownVisible(false);
//     onSignOut();
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar__brand">Truth Trackers</div>
//       <div className="navbar__login">
//         {isLoggedIn ? (
//           <div className="navbar__profile" onClick={toggleDropdown}>
//             <img src={profileImage} alt="Profile" />
//             {isDropdownVisible && (
//               <div className="navbar__dropdown">
//                 <div className="navbar__dropdown-item">Username:</div>
//                 <div className="navbar__dropdown-item" onClick={handleSignOut}><button className='signout-btn'>Log Out</button></div>
//               </div>
//             )}
//           </div>
//         ) : (
//           <button className="login-button" onClick={onLoginClick}>Login</button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from 'react';

const Navbar = ({ onLoginClick, isLoggedIn, profileImage, username, onSignOut }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSignOut = () => {
    setDropdownVisible(false);
    onSignOut();
  };

  return (
    <nav className="navbar">
      <div className="navbar__brand">Truth Trackers</div>
      <div className="navbar__login">
        {isLoggedIn ? (
          <div className="navbar__profile" onClick={toggleDropdown}>
            <img src={profileImage} alt="Profile" />
            {isDropdownVisible && (
              <div className="navbar__dropdown">
                <div className="navbar__dropdown-item"> Username:{username}</div>  {/* Display the username */}
                <div className="navbar__dropdown-item" onClick={handleSignOut}><button className='signout-btn'>Log Out</button></div>
              </div>
            )}
          </div>
        ) : (
          <button className="login-button" onClick={onLoginClick}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
