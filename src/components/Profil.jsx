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
  const [criticsPage, setCriticsPage] = useState(1);
  const [masterpiecesPage, setMasterpiecesPage] = useState(1);
  const [votesPage, setVotesPage] = useState(1);
  const [watchlistsPage, setWatchlistsPage] = useState(1);

  //___________________________________________________________ React Query

  const { data: masterpiecesData, status: masterpiecesStatus } = useQuery(
    ["masterpieces", user_id, masterpiecesPage],
    () => getMasterpieces(user_id, masterpiecesPage)
  );
  const { data: votesData, status: votesStatus } = useQuery(
    ["votes", user_id, votesPage],
    () => getVotes(user_id, votesPage)
  );
  const { data: criticsData, status: criticsStatus } = useQuery(
    ["critics", user_id, criticsPage],
    () => getCritics(user_id, criticsPage)
  );
  const { data: watchlistsData, status: watchlistsStatus } = useQuery(
    ["watchlists", user_id, watchlistsPage],
    () => getWatchlists(user_id, watchlistsPage)
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
  const activeDataPage = (activeData, nextORPrev) => {
    switch (activeData) {
      case "critic":
        return nextORPrev === "next"
          ? setCriticsPage(criticsPage + 1)
          : setCriticsPage(criticsPage - 1);
      case "masterpiece":
        return nextORPrev === "next"
          ? setMasterpiecesPage(masterpiecesPage + 1)
          : setMasterpiecesPage(masterpiecesPage - 1);
      case "vote":
        return nextORPrev === "next"
          ? setVotesPage(votesPage + 1)
          : setVotesPage(votesPage - 1);
      case "watchlist":
        return nextORPrev === "next"
          ? setWatchlistsPage(watchlistsPage + 1)
          : setWatchlistsPage(watchlistsPage - 1);
      default:
        return;
    }
  };

  const pageInfos = (activeData) => {
    switch (activeData) {
      case "critic":
        return criticsData?.data;
      case "vote":
        return votesData?.data;
      case "masterpiece":
        return masterpiecesData?.data;
      case "watchlist":
        return watchlistsData?.data;
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
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: "column",
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
            <>
              {pageInfos(activeTab).total > 5 && (
                <div
                  style={{
                    width: "90%",
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <button
                    className="button-default"
                    disabled={pageInfos(activeTab).from === 1}
                    onClick={() => activeDataPage(activeTab, "prev")}
                  >
                    Précédent
                  </button>
                  <p>
                    {pageInfos(activeTab).from} à {pageInfos(activeTab).to}
                  </p>
                  <button
                    className="button-default"
                    disabled={pageInfos(activeTab).is_last_page}
                    onClick={() => activeDataPage(activeTab, "next")}
                  >
                    Suivant
                  </button>
                </div>
              )}
              {activeData(activeTab)}
              {pageInfos(activeTab).total > 5 && (
                <div
                  style={{
                    width: "90%",
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <button
                    className="button-default"
                    disabled={pageInfos(activeTab).from === 1}
                    onClick={() => activeDataPage(activeTab, "prev")}
                  >
                    Précédent
                  </button>
                  <p>
                    {pageInfos(activeTab).from} à {pageInfos(activeTab).to}
                  </p>
                  <button
                    className="button-default"
                    disabled={pageInfos(activeTab).is_last_page}
                    onClick={() => activeDataPage(activeTab, "next")}
                  >
                    Suivant
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profil;
