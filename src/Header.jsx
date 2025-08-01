import React, { useContext, useEffect, useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setIsAdmin(userInfo.isAdmin);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    setIsAdmin(false);
  }

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
