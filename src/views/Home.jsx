import "../styles/Home.css";
import { useState } from "react";
import { useQuery } from "react-query";

import Header from "../components/Header";
import NavPanel from "../components/NavPanel";
import Users from "../components/Users";
import Critic from "../components/Critic";
import Masterpiece from "../components/Masterpiece";
import Vote from "../components/Vote";

import {
  getMasterpieces,
  getVotes,
  getCritics,
  getUsersData,
} from "../services/marcusApi";
import Release from "../components/Release";

const Home = () => {
  //___________________________________________________________ Variables

  const [activeTab, setActiveTab] = useState("critic");
  const [searchResults, setSearchResults] = useState([]);
  const { data: masterpiecesData, status: masterpiecesStatus } = useQuery(
    "masterpieces",
    () => getMasterpieces()
  );
  const { data: votesData, status: votesStatus } = useQuery("votes", () =>
    getVotes()
  );
  const { data: criticsData, status: criticsStatus } = useQuery("critics", () =>
    getCritics()
  );
  const { data: usersData, status: communityStatus } = useQuery(
    "usersData",
    () => getUsersData()
  );

  // console.log("searchResults : ", searchResults);
  //___________________________________________________________ Functions

  const activeStatus = (activeData) => {
    switch (activeData) {
      case "critic":
        return criticsStatus;
      case "vote":
        return votesStatus;
      case "masterpiece":
        return masterpiecesStatus;
      case "release":
        return;
      case "community":
        return communityStatus;
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
          />
        ));

      case "release":
        return (
          <>
            <Release releaseType={"Cinéma"} />
            {/* <Release releaseType={"Netflix"} /> */}
          </>
        );

      case "community":
        return usersData?.data.map((user, index) => (
          <Users
            key={index}
            userName={user.username}
            userId={user.id}
            favoriteGenders={["genre1", "genre2"]}
            masterPieces={user.user_masterpieces}
            critics={user.user_critics}
            votes={user.user_votes}
            watchList={user.user_watchlists}
          />
        ));

      default:
        return <div>Si tu vois ça ya un soucis là...</div>;
    }
  };

  //___________________________________________________________ Render

  return (
    <div className="App">
      <Header />
      <NavPanel
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setSearchResults={setSearchResults}
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
        {searchResults.length > 0 && activeTab === "release" ? (
          searchResults.map((item, index) => (
            <Masterpiece
              key={index}
              movieName={item.title || item.name}
              movieId={item.id}
              releasedDate={item.release_date || item.first_air_date}
              description={item.overview}
              poster={item.poster_path}
            />
          ))
        ) : activeStatus(activeTab) === "loading" ? (
          <p>Loading ...</p>
        ) : activeStatus(activeTab) === "error" ? (
          <p>Error</p>
        ) : (
          activeData(activeTab)
        )}
      </main>
    </div>
  );
};

export default Home;

// {isLoading && isLoading}
// {error && error}
// {data?.results.map((item, index) => {
//     return <div key={index}>{item.title}</div>;
//   })}

// const basePath = 'https://api.themoviedb.org/3';
// const query = 'titanic';
// const getMovies = async () => {
//   const res = await axios.get(basePath + '/search/movie', {
//     params: { api_key: apiKey, query },
//   });
//   return res.data;
// };

// const { data, isLoading, error } = useQuery(['getMovie'], () => getMovie());

// console.log(data);
// console.log(isLoading);
// console.log(error);
