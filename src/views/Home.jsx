import "../styles/Home.css";
import Header from "../components/Header";
import Users from "../components/Users";
import NavPanel from "../components/NavPanel";
import { useState } from "react";
import { useQuery } from "react-query";

import Critic from "../components/Critic";
import Masterpiece from "../components/Masterpiece";

import {
  getMasterpieces,
  getVotes,
  getCritics,
  getUsersData,
} from "../services/marcusApi";

import Vote from "../components/Vote";

const Home = () => {
  const [activeTab, setActiveTab] = useState("critic");

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
  const { data: usersData, status: usersDataStatus } = useQuery(
    "usersData",
    () => getUsersData()
  );

  const activeData = (activeData) => {
    switch (activeData) {
      case "critic":
        return criticsStatus === "loading" ? (
          <p>Loading critics...</p>
        ) : criticsStatus === "error" ? (
          <p>Error</p>
        ) : (
          criticsData?.data.data.map((critic, index) => (
            <Critic
              key={index}
              movieId={critic.movie_id}
              movieName={critic.movie_name}
              content={critic.content}
              userId={critic.user_id}
              userName={critic.user_name}
            />
          ))
        );

      case "vote":
        return votesStatus === "loading" ? (
          <p>Loading masterpieces...</p>
        ) : votesStatus === "error" ? (
          <p>Error</p>
        ) : (
          votesData?.data.data.map((vote, index) => (
            <Vote
              key={index}
              movieName={vote.movie_name}
              movieId={vote.movie_id}
              userName={vote.user_name}
              userId={vote.user_id}
              value={vote.value}
            />
          ))
        );

      case "masterpiece":
        return masterpiecesStatus === "loading" ? (
          <p>Loading masterpieces...</p>
        ) : masterpiecesStatus === "error" ? (
          <p>Error</p>
        ) : (
          masterpiecesData?.data.data.map((masterpiece, index) => (
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
          ))
        );

      case "release":
        return <h2>[Sorties]</h2>;

      case "community":
        return usersDataStatus === "loading" ? (
          <p>Loading datas...</p>
        ) : (
          usersData.map((user, index) => (
            <Users
              key={index}
              userName={user.userName}
              genderMovie={user.genders}
              masterPieces={user.masterpiece}
              critics={user.critic}
              votes={user.vote}
              watchList={user.watchlist}
            />
          ))
        );

      default:
        return <div>Si tu vois ça ya un vrai soucis là...</div>;
    }
  };
  return (
    <div className="App">
      <Header />
      <NavPanel activeTab={activeTab} setActiveTab={setActiveTab} />

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
        {activeData(activeTab)}
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
