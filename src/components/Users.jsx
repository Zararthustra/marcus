import "../styles/Users.css";
import { ReactComponent as AddUser } from "../assets/svg/addUser.svg";

import { ReactComponent as Palette } from "../assets/svg/palette.svg";
import { ReactComponent as Critics } from "../assets/svg/critics.svg";
import { ReactComponent as Votes } from "../assets/svg/votes.svg";
import { ReactComponent as WatchList } from "../assets/svg/watchList.svg";

export const Users = ({userName, genderMovie, masterPieces, critics, votes, watchList}) => {
  return (
    <section className="users">
      <header>
        <h3>{userName}</h3>
        <AddUser className="addUser" />
      </header>
      <article className="genderMovie">
        {genderMovie.map((gender, index) => {
          return (<p key={index}>{gender}</p>)
        })}
      </article>
      <article className="notes">
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
