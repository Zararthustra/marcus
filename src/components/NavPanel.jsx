import "../styles/NavPanel.css";

import { ReactComponent as Critic } from "../assets/svg/critics.svg";
import { ReactComponent as Vote } from "../assets/svg/votes.svg";
import { ReactComponent as Masterpiece } from "../assets/svg/palette.svg";
import { ReactComponent as Release } from "../assets/svg/movieSearch.svg";
import { ReactComponent as Communaute } from "../assets/svg/communaute.svg";
import { useState } from "react";
import { searchMovie, searchTV } from "../services/tmdbApi";

const NavPanel = ({
  activeTab,
  setActiveTab,
  setSearchResults,
  setSearchtype,
  setTriggerToast,
}) => {
  const [movieName, setMovieName] = useState("");

  const handleChange = (e) => {
    if (e.target.value[0] === " ") return;
    return setMovieName(e.target.value);
  };

  const movieSearch = () => {
    if (movieName === "")
      return setTriggerToast({
        type: "error",
        message: "Entrez le nom d'un film !",
      });
    setSearchtype("movie");
    searchMovie(movieName).then((res) => setSearchResults(res.data.results));
    return;
  };
  const tvSearch = () => {
    if (movieName === "")
      return setTriggerToast({
        type: "error",
        message: "Entrez le nom d'une série !",
      });
    setSearchtype("tv");
    searchTV(movieName).then((res) => setSearchResults(res.data.results));
    return;
  };

  const formatTabName = (tabName) => {
    switch (tabName) {
      case "critic":
        return <h1>Critiques</h1>;
      case "vote":
        return <h1>Votes</h1>;
      case "masterpiece":
        return <h1>Chefs d'oeuvres</h1>;
      case "release":
        return (
          <>
            <input
              className="search-bar"
              type="text"
              placeholder="Game of thrones, Matrix reloaded, ..."
              value={movieName}
              onChange={handleChange}
              name="moviename"
              id="moviename"
            />
            <div className="search-buttons">
              <button onClick={movieSearch}>Chercher un film</button>
              <button onClick={tvSearch}>Chercher une série</button>
            </div>
          </>
        );
      case "community":
        return <h1>Communauté</h1>;
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
      <div className="tab-name">{formatTabName(activeTab)}</div>
      <div className="separation-bar" />
    </nav>
  );
};

export default NavPanel;
