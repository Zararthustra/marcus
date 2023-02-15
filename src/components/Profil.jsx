import "../styles/Profil.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { ReactComponent as Clap } from "../assets/svg/clap.svg";
import projector from "../assets/img/projector.jpg";

import {
  getCritics,
  getMasterpieces,
  getUserData,
  getVotes,
  getWatchlists,
} from "../services/marcusApi";
import { getLocalStorage } from "../utils/localStorage";

import Vote from "./Vote";
import Toast from "./Toast";
import Critic from "./Critic";
import UserDatas from "./UserDatas";
import Watchlist from "./Watchlist";
import Masterpiece from "./Masterpiece";

const Profil = () => {
  //___________________________________________________________ Variables

  const [triggerToast, setTriggerToast] = useState(false);
  const { user_id } = useParams();
  const [activeTab, setActiveTab] = useState("critic");

  //___________________________________________________________ React Query

  const { data: masterpiecesData, status: masterpiecesStatus } = useQuery(
    ["masterpieces", user_id],
    () => getMasterpieces(user_id)
  );
  const { data: votesData, status: votesStatus } = useQuery(
    ["votes", user_id],
    () => getVotes(user_id)
  );
  const { data: criticsData, status: criticsStatus } = useQuery(
    ["critics", user_id],
    () => getCritics(user_id)
  );
  const { data: watchlistsData, status: watchlistsStatus } = useQuery(
    ["watchlists", user_id],
    () => getWatchlists(user_id)
  );
  const { data: userData, status: userStatus } = useQuery(
    ["userData", user_id],
    () => getUserData(user_id)
  );
  const userName = userData?.data.username;
  const isOwner = userData?.data.id === getLocalStorage("userid");

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
            setTriggerToast={setTriggerToast}
            isOwner={isOwner}
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
            setTriggerToast={setTriggerToast}
            isOwner={isOwner}
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
            setTriggerToast={setTriggerToast}
            isOwner={isOwner}
          />
        ));

      case "watchlist":
        return watchlistsData?.data.data.map((watchlist, index) => (
          <Watchlist
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
            setTriggerToast={setTriggerToast}
            isOwner={isOwner}
          />
        ));

      default:
        return <div>Si tu vois ça ya un soucis là...</div>;
    }
  };

  //___________________________________________________________ Render

  if (userStatus === "loading")
    return (
      <div className="profil-page">
        <Clap className="loader" />
      </div>
    );
  else if (userStatus === "error")
    return <div className="profil-page">Profile error</div>;
  return (
    <div className="profil-page">
      {triggerToast && (
        <Toast
          type={triggerToast.type}
          message={triggerToast.message}
          setTriggerToast={setTriggerToast}
        />
      )}
      <img className="profil-img" src={projector} alt="projecteur de film" />
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
            <Clap className="loader" />
          ) : activeStatus(activeTab) === "error" ? (
            <p>Une erreur est survenue ...</p>
          ) : (
            activeData(activeTab)
          )}
        </main>
      </div>
    </div>
  );
};

export default Profil;
