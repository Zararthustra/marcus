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
  // getUserData,
  getUsersData,
  getVotes,
  getWatchlists,
} from "../services/marcusApi";
import { useQuery } from "react-query";
import { getLocalStorage } from "../utils/localStorage";

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

  // To be redefined when users/id will be available
  const { data: usersData, status: communityStatus } = useQuery(
    "usersData",
    () => getUsersData()
  );
  const userName =
    parseInt(user_id) === getLocalStorage("userid")
      ? getLocalStorage("username")
      : usersData?.data.filter((item) => item.id === parseInt(user_id))[0]
          .username;

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
            currentPage={"profil"}
            platform={critic.platform}
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
            platform={vote.platform}
            currentPage={"profil"}
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
            releasedDate={masterpiece.movie_details.released_date}
            description={masterpiece.movie_details.synopsis}
            poster={masterpiece.movie_details.poster_path}
            platform={masterpiece.platform}
            currentPage={"profil"}
          />
        ));

      case "watchlist":
        return watchlistsData?.data.data.map((watchlist, index) => (
          <Masterpiece
            key={index}
            movieName={watchlist.movie_name}
            movieId={watchlist.movie_id}
            userName={watchlist.user_name}
            userId={watchlist.user_id}
            releasedDate={watchlist.movie_details.released_date}
            description={watchlist.movie_details.synopsis}
            poster={watchlist.movie_details.poster_path}
            platform={watchlist.platform}
            currentPage={"profil"}
          />
        ));

      default:
        return <div>Si tu vois ça ya un soucis là...</div>;
    }
  };

  //___________________________________________________________ Render

  // if (status === "loading")
  //   return <div className="profil-page">Loading Profile...</div>;
  // else if (status === "error")
  //   return <div className="profil-page">Profile error</div>;
  return (
    <div className="profil-page">
      <div className="profil">
        <h1>{userName}</h1>
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
