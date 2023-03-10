import { ReactComponent as Palette } from "../assets/svg/palette.svg";
import { ReactComponent as Critics } from "../assets/svg/critics.svg";
import { ReactComponent as Votes } from "../assets/svg/votes.svg";
import { ReactComponent as WatchList } from "../assets/svg/watchList.svg";

const UserData = ({ data, value, setActiveTab, activeTab }) => {
  let icon;
  let title;

  switch (data) {
    case "critic":
      icon = (
        <Critics
          alt="Critic Icon"
          className="user-data-icon"
          style={{ fill: activeTab === data ? "white" : "" }}
        />
      );
      title = "Critiques";
      break;
    case "vote":
      icon = (
        <Votes
          alt="Vote Icon"
          className="user-data-icon"
          style={{ fill: activeTab === data ? "white" : "" }}
        />
      );
      title = "Votes";
      break;
    case "masterpiece":
      icon = (
        <Palette
          alt="Masterpiece Icon"
          className="user-data-icon"
          style={{ fill: activeTab === data ? "white" : "" }}
        />
      );
      title = "Chefs d'oeuvre";
      break;
    case "watchlist":
      icon = (
        <WatchList
          style={{ fill: activeTab === data ? "white" : "" }}
          alt="Watchlist Icon"
          className={
            activeTab === data
              ? "user-data-icon user-data-icon-active"
              : "user-data-icon"
          }
        />
      );
      title = "À regarder";
      break;
    default:
      icon = null;
      title = null;
  }

  return (
    <article
      className="user-data"
      onClick={() => setActiveTab(data)}
      style={{
        background: activeTab === data ? "var(--gradient)" : "",
        color: activeTab === data ? "white" : "",
      }}
    >
      {icon}
      <span className="user-data-title">{title}</span>
      <span className="user-data-value">{value}</span>
    </article>
  );
};

export default UserData;
