import '../styles/Home.css';
import Header from '../components/Header';
import Users from '../components/Users';
import NavPanel from '../components/NavPanel';
import { useState } from 'react';

import { userData } from '../services/mockApi/userData';

// import { useEffect } from 'react';
// import { useQuery } from 'react-query';
// import { getMasterpieces, getWatchlists, getVotes, getCritics } from '../services/api/getUserDatas';
// import UserDatas from '../components/UserDatas';

const Home = () => {
  const [activeTab, setActiveTab] = useState('critic');
  // let userId = 1;

  /*
  * Premiere façon de faire avec UseEffect
  const [masterpieces, setMasterpieces] = useState([]);
  const [watchlists, setWatchlists] = useState([]);
  const [votes, setVotes] = useState([]);
  const [critics, setCritics] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [masterpiecesRes, watchlistsRes, votesRes, criticsRes] = await Promise.all([
          getMasterpieces(userId),
          getWatchlists(userId),
          getVotes(userId),
          getCritics(userId)
        ]);
        setMasterpieces(masterpiecesRes.data);
        setWatchlists(watchlistsRes.data);
        setVotes(votesRes.data);
        setCritics(criticsRes.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  console.log(masterpieces, watchlists, votes, critics);
  <UserDatas data={objectDatas} />
  */  

  /*
  * 2ème façon de faire avec UseQuery
  const { data: masterpiecesData, status: masterpiecesStatus } = useQuery('masterpieces', () => getMasterpieces(userId));
  const { data: watchlistsData, status: watchlistsStatus } = useQuery('watchlists', () => getWatchlists(userId));
  const { data: votesData, status: votesStatus } = useQuery('votes', () => getVotes(userId));
  const { data: criticsData, status: criticsStatus } = useQuery('critics', () => getCritics(userId));

  const objectDatas = {
    critic: {
      data: criticsData.data.total,
      status: criticsStatus,
    },
    note: {
      data: votesData.data.total,
      status: votesStatus,
    },
    masterpiece: {
      data: masterpiecesData.data.total,
      status: masterpiecesStatus,
    },
    watchlist: {
      data: watchlistsData.data.total,
      status: watchlistsStatus,
    }
  }; 

  console.log(objectDatas);
  <UserDatas data={objectDatas} />
  */

  const activeData = (activeData) => {
    switch (activeData) {
      case 'critic':
        return <h2>[Critiques]</h2>;
      case 'note':
        return <h2>[Notes]</h2>;
      case 'masterpiece':
        return <h2>[Chefs d'oeuvres]</h2>;
      case 'release':
        return <h2>[Sorties]</h2>;

      case 'community':
        return userData.map((user, index) => {
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
        });

      default:
        return;
    }
  };
  return (
    <div className='App'>
      <Header />
      <NavPanel activeTab={activeTab} setActiveTab={setActiveTab} />
      <div
        style={{
          width: '30rem',
          height: '2px',
          backgroundColor: '#8a898971',
          margin: '2rem 0',
        }}
      />
      <main
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
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
