import "../styles/Navbar.css";
import { Link, Outlet, useParams } from "react-router-dom";
import { useState } from "react";

import { ReactComponent as Logo } from "../assets/svg/logo.svg";
import { ReactComponent as Profil } from "../assets/svg/profil.svg";
import { ReactComponent as Logout } from "../assets/svg/logout.svg";

import Login from "./Login";
import { getLocalStorage } from "../utils/localStorage";
import Register from "./Register";

const Navbar = () => {
  const { user_id } = useParams();
  const isLogged = getLocalStorage("access");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}
      {showRegister && <Register setShowRegister={setShowRegister} />}
      <nav className="nav">
        <Link to="/">
          <Logo className="nav-logo" />
        </Link>
        <ul className="nav-links">
          {isLogged ? (
            <li>
              {user_id ? (
                <Logout className="logout-icon" onClick={logout} />
              ) : (
                <Link to={`/profil/${getLocalStorage("userid")}`}>
                  <Profil className="profile-icon" />
                </Link>
              )}
            </li>
          ) : (
            <>
              <li className="button-primary" onClick={() => setShowLogin(true)}>
                Se connecter
              </li>
              <li
                style={{ cursor: "pointer" }}
                onClick={() => setShowRegister(true)}
              >
                Créer un compte
              </li>
            </>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
