import "../styles/Navbar.css";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/svg/logo.svg";
import { ReactComponent as Home } from "../assets/svg/home.svg";
import { ReactComponent as Communaute } from "../assets/svg/communaute.svg";
import { ReactComponent as Profil } from "../assets/svg/profil.svg";

const Navbar = () => {
  const isLogged = false;
  return (
    <>
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
              <li style={{ marginTop: ".5rem" }} className="button-active">
                Se connecter
              </li>
              <li style={{ marginTop: ".5rem", cursor: "pointer" }} >
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
