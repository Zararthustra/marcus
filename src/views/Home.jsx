import "../styles/Home.css";
// import axios from "axios";
// import { useQuery } from "react-query";
import Header from "../components/Header";
import Users from "../components/Users";
import UserDatas from "../components/UserDatas";
import NavPanel from "../components/NavPanel";
import { useState } from "react";

const Home = () => {
const [activeTab, setActiveTab] = useState("critic")

const dataObject = {
    critic: 27,
    note: 54,
    masterpiece: 12,
    watchlist: 5,
};

return (
    <div className="App">
      <Header />
      <NavPanel activeTab={activeTab} setActiveTab={setActiveTab}/>
      <div style={{width: "30rem", height: "2px", backgroundColor: "#8a898971", margin: "2rem 0"}}></div>
      <Users
        userName="Arthur"
        genderMovie={["Fiction", "Fantastique", "Érotique"]}
        masterPieces={2}
        critics={5}
        votes={0}
        watchList={2}
        />
      <UserDatas data={dataObject} />
    </div>
  );
};

export default Home;

// {isLoading && isLoading}
// {error && error}
// {data?.results.map((item, index) => {
//     return <div key={index}>{item.title}</div>;
//   })}

  // const basePath = "https://api.themoviedb.org/3";
  // const apiKey = "34e2e08fed7af733b62f781d945c6a7c";
  // const query = "titanic";
  // const getMovies = async () => {
  //   const res = await axios.get(basePath + "/search/movie", {
  //     params: { api_key: apiKey, query },
  //   });
  //   return res.data;
  // };

  // const { data, isLoading, error } = useQuery(["getMovies"], () => getMovies());

  // console.log(data);
  // console.log(isLoading);
  // console.log(error);