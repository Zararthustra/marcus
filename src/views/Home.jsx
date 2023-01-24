import "../styles/Home.css";
import Header from "../components/Header";
import Users from "../components/Users";
import NavPanel from "../components/NavPanel";
import { useState, React } from "react";
import { useQuery } from "react-query";

import Critic from "../components/Critic";

import {
  getMasterpieces,
  getWatchlists,
  getVotes,
  getCritics,
  getUsersData,
} from "../services/api/getUserDatas";
import {
  masterpieces,
  critics,
  watchlists,
  votes,
  users_data,
} from "../services/mockApi/mockedDatas";
import UserDatas from "../components/UserDatas";

const Home = () => {
  const [activeTab, setActiveTab] = useState("critic");
  let userId = 1;

  const { data: masterpiecesData, status: masterpiecesStatus } = useQuery(
    "masterpieces",
    () => getMasterpieces(userId)
  );
  const { data: watchlistsData, status: watchlistsStatus } = useQuery(
    "watchlists",
    () => getWatchlists(userId)
  );
  const { data: votesData, status: votesStatus } = useQuery("votes", () =>
    getVotes(userId)
  );
  const { data: criticsData, status: criticsStatus } = useQuery("critics", () =>
    getCritics(userId)
  );
  const { data: usersData, status: usersDataStatus } = useQuery(
    "usersData",
    () => getUsersData(users_data)
  );

  const objectDatas = {
    critic: {
      data: criticsData?.data.total,
      status: criticsStatus,
    },
    note: {
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
        ) : (
          criticsData.data.data.map((critic, index) => (
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

      case "note":
        return <UserDatas data={objectDatas} />;
      case "masterpiece":
        return <h2>[Chefs d'oeuvres]</h2>;
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
                votes={user.note}
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
      <div
        style={{
          width: "30rem",
          height: "2px",
          backgroundColor: "#8a898971",
          margin: "1rem 0 5rem",
        }}
      />
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          flexDirection: "column",
          gap: "3rem",
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
