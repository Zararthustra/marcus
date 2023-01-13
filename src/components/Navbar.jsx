import "../styles/Navbar.css";
import { Link, Outlet } from 'react-router-dom'
import { ReactComponent as Logo } from "../assets/svg/logo.svg";
import { ReactComponent as Home } from "../assets/svg/home.svg";
import { ReactComponent as Communaute } from "../assets/svg/communaute.svg";
import { ReactComponent as Profil } from "../assets/svg/profil.svg";

export const Navbar = () => {
  return (
    <>
      <nav class="nav">
        <Link to="/">
          <Logo className="nav-logo" />
        </Link>
        <ul className="nav-links">
          <li className="nav-link">
            <Link to="/" className="links">
              <Home className="nav-icon" />
              <p>Home</p>
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/community" className="links">
              <Communaute className="nav-icon" />
              <p>Communauté</p>
            </Link>            
          </li>
          <li className="nav-link">
            <Link to="/profile" className="links">
              <Profil className="nav-icon" />
              <p>Profil</p>
            </Link>   
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
