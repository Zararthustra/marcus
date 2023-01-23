import "../styles/NavPanel.css";

import { ReactComponent as Critic } from "../assets/svg/critics.svg";
import { ReactComponent as Note } from "../assets/svg/votes.svg";
import { ReactComponent as Masterpiece } from "../assets/svg/palette.svg";
import { ReactComponent as Release } from "../assets/svg/movieSearch.svg";
import { ReactComponent as Communaute } from "../assets/svg/communaute.svg";

const NavPanel = ({ activeTab, setActiveTab }) => {
  const formatTabName = (tabName) => {
    switch (tabName) {
      case "critic":
        return "Critiques";
      case "note":
        return "Notes";
      case "masterpiece":
        return "Chef d'oeuvres";
      case "release":
        return "Sorties";
      case "community":
        return "Communauté";
      default:
        return "";
    }
  };
  const moveTabBar = (tabName) => {
    switch (tabName) {
      case "critic":
        return "6rem";
      case "note":
        return "14.9rem";
      case "masterpiece":
        return "23.7rem";
      case "release":
        return "32.4rem";
      case "community":
        return "41.2rem";
      default:
        return "";
    }
  };

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
        <li className="tab-bar" style={{ left: moveTabBar(activeTab) }}></li>
      </ul>
      <div className="tab-name">
        <h1>{formatTabName(activeTab)}</h1>
      </div>
    </nav>
  );
};

export default NavPanel;
