import "../styles/Home.css";
import Header from "../components/Header";
import Users from "../components/Users";
import NavPanel from "../components/NavPanel";
import { useState, React } from "react";
import { useQuery } from "react-query";

import Critic from "../components/Critic";
// import Masterpiece from "../components/Masterpiece";

import {
  getMasterpieces,
  getWatchlists,
  getVotes,
  getCritics,
  getUsersData,
} from "../services/api/getUserDatas";
import {
  // masterpieces,
  // masterpiece,
  // critics,
  // watchlists,
  // votes,
  users_data,
} from "../services/mockApi/mockedDatas";
import UserDatas from "../components/UserDatas";

const Home = () => {
  const [activeTab, setActiveTab] = useState("critic");

  const { data: masterpiecesData, status: masterpiecesStatus } = useQuery(
    "masterpieces",
    () => getMasterpieces()
  );
  const { data: watchlistsData, status: watchlistsStatus } = useQuery(
    "watchlists",
    () => getWatchlists()
  );
  const { data: votesData, status: votesStatus } = useQuery("votes", () =>
    getVotes()
  );
  const { data: criticsData, status: criticsStatus } = useQuery("critics", () =>
    getCritics()
  );
  const { data: usersData, status: usersDataStatus } = useQuery(
    "usersData",
    () => getUsersData(users_data)
  );

  // To be deleted
  const objectDatas = {
    critic: {
      data: criticsData?.data.total,
      status: criticsStatus,
    },
    vote: {
      data: votesData?.data.total,
      status: votesStatus,
    },
    masterpiece: {
      data: masterpiecesData?.data.total,
      status: masterpiecesStatus,
    },
    watchlist: {
      data: watchlistsData?.data.total,
      status: watchlistsStatus,
    },
  };

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
        return <UserDatas data={objectDatas} />;
      case "masterpiece":
        return masterpiecesStatus === "loading" ? (
          <p>Loading masterpieces...</p>
        ) : masterpiecesStatus === "error" ? (
          <p>Error</p>
        ) : (
          <h2>[Chefs d'oeuvre]</h2>
          // masterpiecesData?.data.map((masterpiece, index) => {
          //   return (
          //     <Masterpiece
          //       key={index}
          //       movieName={masterpiece.movieName}
          //       movieId={masterpiece.movieId}
          //       releasedDate={masterpiece.releasedDate}
          //       director={masterpiece.director}
          //       description={masterpiece.description}
          //       userName={masterpiece.userName}
          //       userId={masterpiece.userId}
          //       poster={masterpiece.poster}
          //     />
          //   );
          // })
        );
      case "release":
        return <h2>[Sorties]</h2>;
      case "community":
        return usersDataStatus === "loading" ? (
          <p>Loading datas...</p>
        ) : (
          usersData.map((user, index) => {
            return (
              <Users
                key={index}
                userName={user.userName}
                genderMovie={user.genders}
                masterPieces={user.masterpiece}
                critics={user.critic}
                votes={user.vote}
                watchList={user.watchlist}
              />
            );
          })
        );
      default:
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
// const apiKey = '34e2e08fed7af733b62f781d945c6a7c';
// const query = 'titanic';
// const getMovies = async () => {
//   const res = await axios.get(basePath + '/search/movie', {
//     params: { api_key: apiKey, query },
//   });
//   return res.data;
// };

// const { data, isLoading, error } = useQuery(['getMovies'], () => getMovies());

// console.log(data);
// console.log(isLoading);
// console.log(error);
