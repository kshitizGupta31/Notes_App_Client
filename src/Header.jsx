import React, { useContext, useEffect, useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "./config";
import "./Header.css";

function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/profile`, {
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
          setIsAdmin(userInfo.isAdmin);
        });
      } else {
        // User is not logged in, which is fine
        setUserInfo(null);
        setIsAdmin(false);
      }
    }).catch((error) => {
      // Handle network errors gracefully
      console.error('Error fetching profile:', error);
      setUserInfo(null);
      setIsAdmin(false);
    });
  }, []); // Empty dependency array - only run on mount

  // Additional effect to refresh user info when userInfo changes
  useEffect(() => {
    if (userInfo) {
      setIsAdmin(userInfo.isAdmin);
    }
  }, [userInfo]);

  const logout = () => {
    fetch(`${API_BASE_URL}/logout`, {
      credentials: "include",
      method: "POST",
    }).then(() => {
      // Always clear user state regardless of server response
      setUserInfo(null);
      setIsAdmin(false);
    }).catch((error) => {
      console.error('Error during logout:', error);
      // Still clear user state even if logout request fails
      setUserInfo(null);
      setIsAdmin(false);
    });
  }

  // Debug function to check authentication status
  const checkAuthStatus = () => {
    console.log("Current userInfo:", userInfo);
    console.log("Current isAdmin:", isAdmin);
    
    fetch(`${API_BASE_URL}/profile`, {
      credentials: "include",
    }).then((response) => {
      console.log("Profile response status:", response.status);
      if (response.ok) {
        response.json().then((userInfo) => {
          console.log("Profile response data:", userInfo);
        });
      } else {
        console.log("Profile request failed");
      }
    }).catch((error) => {
      console.error('Profile request error:', error);
    });
  };

  const username = userInfo?.username;

  return (
    <div className="navbar">
      <Link to="/" className="nav-logo">
        Sky_Notes
      </Link>
      <button
        className="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>
      <div className={`menu-overlay ${isMenuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
          ×
        </button>
        <div className="menu-options">
          <Link className="link" to="/" onClick={() => setIsMenuOpen(false)}>
            <div className="nav-title">Home</div>
          </Link>
          <Link className="link" to="/contactadmin" onClick={() => setIsMenuOpen(false)}>
            <div className="nav-title">Contact Admin</div>
          </Link>
          {username ? (
            <>
              <Link className="link" to="/resources" onClick={() => setIsMenuOpen(false)}>
                <div className="nav-title">Resources</div>
              </Link>
              {isAdmin && (
                <>
                  <Link className="link" to="/createresource" onClick={() => setIsMenuOpen(false)}>
                    <div className="nav-title">Add Resources</div>
                  </Link>
                </>
              )}
              <NavDropdown
                title={username}
                className="nav-title"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/" onClick={logout}>
                  <div className="logout">Logout</div>
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <>
              <Link className="link" to="/login" onClick={() => setIsMenuOpen(false)}>
                <div className="nav-title">Login</div>
              </Link>
              <Link className="link" to="/register" onClick={() => setIsMenuOpen(false)}>
                <div className="nav-title">Register</div>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="me-auto large-screen-menu">
        <Link className="link" to="/">
          <div className="nav-title">Home</div>
        </Link>
        {/* <Link className="link" to="/contactadmin">
          <div className="nav-title">Contact Admin</div>
        </Link> */}
        {username ? (
          <>
            <Link className="link" to="/resources">
              <div className="nav-title">Resources</div>
            </Link>
            {isAdmin && (
              <>
                <Link className="link" to="/createresource">
                  <div className="nav-title">Add Resources</div>
                </Link>
              </>
            )}
            <NavDropdown
              title={username}
              className="nav-title"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/" onClick={logout}>
                <div className="logout">Logout</div>
              </NavDropdown.Item>
            </NavDropdown>
          </>
        ) : (
          <>
            <Link className="link" to="/login">
              <div className="nav-title">Login</div>
            </Link>
            <Link className="link" to="/register">
              <div className="nav-title">Register</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
