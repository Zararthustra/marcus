import "../styles/NavPanel.css";

import { ReactComponent as Critic } from "../assets/svg/critics.svg";
import { ReactComponent as Vote } from "../assets/svg/votes.svg";
import { ReactComponent as Masterpiece } from "../assets/svg/palette.svg";
import { ReactComponent as Release } from "../assets/svg/movieSearch.svg";
import { ReactComponent as Communaute } from "../assets/svg/communaute.svg";

const NavPanel = ({ activeTab, setActiveTab }) => {
  const formatTabName = (tabName) => {
    switch (tabName) {
      case "critic":
        return "Critiques";
      case "vote":
        return "Votes";
      case "masterpiece":
        return "Chefs d'oeuvre";
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
      case "vote":
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
        <li onClick={() => setActiveTab("vote")}>
          <Vote className={activeTab === "vote" ? "tab-active" : "tab"} />
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
      <div
        style={{
          width: "30rem",
          height: "2px",
          backgroundColor: "#8a898971",
          margin: "1rem 0 0",
        }}
      />
    </nav>
  );
};

export default NavPanel;
