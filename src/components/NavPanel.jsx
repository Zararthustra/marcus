import "../styles/NavPanel.css";

import { ReactComponent as Critic } from "../assets/svg/critics.svg";
import { ReactComponent as Note } from "../assets/svg/votes.svg";
import { ReactComponent as Masterpiece } from "../assets/svg/palette.svg";
import { ReactComponent as Release } from "../assets/svg/movieSearch.svg";
import { ReactComponent as Communaute } from "../assets/svg/communaute.svg";

const NavPanel = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="navPanel">
      <ul>
        <li onClick={() => setActiveTab("critic")}>
          <Critic className={activeTab === "critic" ? "tab-active" : "tab"} />
        </li>
        <li onClick={() => setActiveTab("note")}>
          <Note className={activeTab === "note" ? "tab-active" : "tab"} />
        </li>
        <li onClick={() => setActiveTab("masterpiece")}>
          <Masterpiece
            className={activeTab === "masterpiece" ? "tab-active" : "tab"}
          />
        </li>
        <li onClick={() => setActiveTab("release")}>
          <Release className={activeTab === "release" ? "tab-active" : "tab"} />
        </li>
        <li onClick={() => setActiveTab("community")}>
          <Communaute
            className={activeTab === "community" ? "tab-active" : "tab"}
          />
        </li>
      </ul>
    </nav>
  );
};

export default NavPanel;
