import "../styles/Profil.css";
import { useState } from "react";
import { useParams } from "react-router-dom";

import Critic from "./Critic";
import Masterpiece from "./Masterpiece";
import UserDatas from "./UserDatas";
import Vote from "./Vote";

import {
  getCritics,
  getMasterpieces,
  getUsersData,
  getVotes,
  getWatchlists,
} from "../services/marcusApi";
import { useQuery } from "react-query";

const Profil = () => {
  //___________________________________________________________ Variables

  // const [showLogin, setShowLogin] = useState(false);
  const { user_id } = useParams();
  const [activeTab, setActiveTab] = useState("critic");

  const { data: masterpiecesData, status: masterpiecesStatus } = useQuery(
    "masterpieces",
    () => getMasterpieces(user_id)
  );
  const { data: votesData, status: votesStatus } = useQuery("votes", () =>
    getVotes(user_id)
  );
  const { data: criticsData, status: criticsStatus } = useQuery("critics", () =>
    getCritics(user_id)
  );
  const { data: watchlistsData, status: watchlistsStatus } = useQuery(
    "watchlists",
    () => getWatchlists(user_id)
  );
  const { data: usersData, status: usersStatus } = useQuery("usersData", () =>
    getUsersData(user_id)
  );
  console.log(usersStatus);
  //___________________________________________________________ Functions

  const activeStatus = (activeData) => {
    switch (activeData) {
      case "critic":
        return criticsStatus;
      case "vote":
        return votesStatus;
      case "masterpiece":
        return masterpiecesStatus;
      case "watchlist":
        return watchlistsStatus;
      default:
        return;
    }
  };

  const activeData = (activeData) => {
    switch (activeData) {
      case "critic":
        return criticsData?.data.data.map((critic, index) => (
          <Critic
            key={index}
            movieId={critic.movie_id}
            movieName={critic.movie_name}
            content={critic.content}
            userId={critic.user_id}
            userName={critic.user_name}
          />
        ));

      case "vote":
        return votesData?.data.data.map((vote, index) => (
          <Vote
            key={index}
            movieName={vote.movie_name}
            movieId={vote.movie_id}
            userName={vote.user_name}
            userId={vote.user_id}
            value={vote.value}
          />
        ));

      case "masterpiece":
        return masterpiecesData?.data.data.map((masterpiece, index) => (
          <Masterpiece
            key={index}
            movieName={masterpiece.movie_name}
            movieId={masterpiece.movie_id}
            userName={masterpiece.user_name}
            userId={masterpiece.user_id}
            releasedDate={"XXXX"}
            description={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }
            poster={"/3WjbxaqYB4vAbdUfdr5vbglD2JZ.jpg"}
          />
        ));

      case "watchlist":
        return <h2>Watchlist</h2>;

      default:
        return <div>Si tu vois ça ya un soucis là...</div>;
    }
  };

  //___________________________________________________________ Render

  return (
    <div className="profil-page">
      <div className="profil">
        <h1>{usersData?.data[0].userName}</h1>
        <UserDatas
          masterpieces={masterpiecesData?.data.total}
          votes={votesData?.data.total}
          critics={criticsData?.data.total}
          watchlists={watchlistsData?.data.total}
          masterpiecesStatus={masterpiecesStatus}
          votesStatus={votesStatus}
          criticsStatus={criticsStatus}
          watchlistsStatus={watchlistsStatus}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
        <main
          style={{
            padding: "5rem 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: activeTab === "community" ? "row" : "column",
            gap: "3rem",
            backgroundColor: "var(--background-color)",
            width: "100%",
            overflow: "hidden",
          }}
        >
          {activeStatus(activeTab) === "loading" ? (
            <p>Loading ...</p>
          ) : activeStatus(activeTab) === "error" ? (
            <p>Error</p>
          ) : (
            activeData(activeTab)
          )}
        </main>
      </div>
    </div>
  );
};

export default Profil;
