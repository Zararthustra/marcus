import "../styles/UserDatas.css";
import UserData from "./UserData";

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
      <p>Loading critics...</p>
    ) : (
      <UserData
        data="critic"
        value={critics}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
    )}
    {votesStatus === "loading" ? (
      <p>Loading votes...</p>
    ) : (
      <UserData
        data="vote"
        value={votes}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
    )}
    {masterpiecesStatus === "loading" ? (
      <p>Loading masterpieces...</p>
    ) : (
      <UserData
        data="masterpiece"
        value={masterpieces}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
    )}
    {watchlistsStatus === "loading" ? (
      <p>Loading watchlists...</p>
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
