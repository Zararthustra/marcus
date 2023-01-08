import "../styles/Navbar.css";
import { ReactComponent as Logo } from "../assets/svg/logo.svg";
import { ReactComponent as Home } from "../assets/svg/home.svg";
import { ReactComponent as Communaute } from "../assets/svg/communaute.svg";
import { ReactComponent as Profil } from "../assets/svg/profil.svg";

export const Navbar = () => {
  return (
    <nav>
      <Logo className="nav-logo" />
      <ul className="nav-links">
        <li>
          <Home className="nav-icon" />
          <a
            href="#
        "
          >
            Accueil
          </a>
        </li>
        <li>
          <Communaute className="nav-icon" />
          <a
            href="#
        "
          >
            Communauté
          </a>
        </li>
        <li>
          <Profil className="nav-icon" />
          <a
            href="#
        "
          >
            Profil
          </a>
        </li>
      </ul>
    </nav>
  );
};
