import "../styles/Navbar.css";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/svg/logo.svg";
import { ReactComponent as Profil } from "../assets/svg/profil.svg";
import { useState } from "react";
import Login from "./Login"
import { getLocalStorage } from "../utils/localStorage";

const Navbar = () => {
  const isLogged = getLocalStorage("access");
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
    {showLogin && <Login setShowLogin={setShowLogin}/>}
      <nav className="nav">
        <Link to="/">
          <Logo className="nav-logo" />
        </Link>
        <ul className="nav-links">
          {isLogged ? (
            <li>
              <Link to="/profile">
                <Profil className="nav-icon" />
              </Link>
            </li>
          ) : (
            <>
              <li
                className="button-primary"
                onClick={() => setShowLogin(true)}
              >
                Se connecter
              </li>
              <li style={{ cursor: "pointer" }}>Créer un compte</li>
            </>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
