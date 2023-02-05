import "../styles/Users.css";

import { ReactComponent as Palette } from "../assets/svg/palette.svg";
import { ReactComponent as Critics } from "../assets/svg/critics.svg";
import { ReactComponent as Votes } from "../assets/svg/votes.svg";
import { ReactComponent as WatchList } from "../assets/svg/watchList.svg";

const Users = ({
  userName,
  userId,
  favoriteGenders,
  masterPieces,
  critics,
  votes,
  watchList,
}) => {
  return (
    <section className="users">
      <header>
        <h3>
          <a href={`/profil/${userId}`}>{userName}</a>
        </h3>
      </header>
      {/* <article className="genderMovie">
        {genderMovie.map((gender, index) => {
          return <p key={index}>{gender}</p>;
        })}
      </article> */}
      <article className="user-datas">
        <div>
          <Palette />
          <p>{masterPieces}</p>
        </div>
        <div>
          <Critics />
          <p>{critics}</p>
        </div>
        <div>
          <Votes />
          <p>{votes}</p>
        </div>
        <div>
          <WatchList />
          <p>{watchList}</p>
        </div>
      </article>
    </section>
  );
};

export default Users;
