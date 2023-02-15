import "../styles/UserDatas.css";
import UserData from "./UserData";
import { ReactComponent as Clap } from "../assets/svg/clap.svg";

const UserDatas = ({
  masterpieces,
  votes,
  critics,
  watchlists,
  masterpiecesStatus,
  votesStatus,
  criticsStatus,
  watchlistsStatus,
  setActiveTab,
  activeTab,
}) => (
  <section className="userDatas">
    {criticsStatus === "loading" ? (
      <Clap className="loader" />
    ) : criticsStatus === "error" ? (
      <p>Une erreur est survenue ...</p>
    ) : (
      <UserData
        data="critic"
        value={critics}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
    )}
    {votesStatus === "loading" ? (
      <Clap className="loader" />
    ) : votesStatus === "error" ? (
      <p>Une erreur est survenue ...</p>
    ) : (
      <UserData
        data="vote"
        value={votes}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
    )}
    {masterpiecesStatus === "loading" ? (
      <Clap className="loader" />
    ) : masterpiecesStatus === "error" ? (
      <p>Une erreur est survenue ...</p>
    ) : (
      <UserData
        data="masterpiece"
        value={masterpieces}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
    )}
    {watchlistsStatus === "loading" ? (
      <Clap className="loader" />
    ) : watchlistsStatus === "error" ? (
      <p>Une erreur est survenue ...</p>
    ) : (
      <UserData
        data="watchlist"
        value={watchlists}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
    )}
  </section>
);

export default UserDatas;
