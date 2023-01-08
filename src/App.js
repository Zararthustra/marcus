import "./styles/App.css";
// import axios from "axios";
// import { useQuery } from "react-query";
import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Users } from "./components/Users";

function App() {
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

  return (
    <div className="App">
      <Navbar />
      <Header />
      {/* {isLoading && isLoading} */}
      {/* {error && error} */}
      {/* {data?.results.map((item, index) => {
        return <div key={index}>{item.title}</div>;
      })} */}
      <Users userName="Arthur" genderMovie={['Fiction', "Fantastique", "Érotique"]} masterPieces={2} critics={5} votes={0} watchList={2} />
      <Footer />
    </div>
  );
}

export default App;
