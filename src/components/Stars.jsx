import { ReactComponent as StarFull } from "../assets/svg/starFull.svg";
import { ReactComponent as Star } from "../assets/svg/star.svg";

const Stars = ({ value, displayOnly, voteValue, setVoteValue }) => {
  if (displayOnly)
    return (
      <div className="stars">
        {value >= 1 && <StarFull />}
        {value >= 2 && <StarFull />}
        {value >= 3 && <StarFull />}
        {value >= 4 && <StarFull />}
        {value >= 5 && <StarFull />}
      </div>
    );
  return (
    <div className="stars">
      {voteValue >= 1 ? (
        <StarFull onClick={() => setVoteValue(1)} />
      ) : (
        <Star onClick={() => setVoteValue(1)} />
      )}
      {voteValue >= 2 ? (
        <StarFull onClick={() => setVoteValue(2)} />
      ) : (
        <Star onClick={() => setVoteValue(2)} />
      )}
      {voteValue >= 3 ? (
        <StarFull onClick={() => setVoteValue(3)} />
      ) : (
        <Star onClick={() => setVoteValue(3)} />
      )}
      {voteValue >= 4 ? (
        <StarFull onClick={() => setVoteValue(4)} />
      ) : (
        <Star onClick={() => setVoteValue(4)} />
      )}
      {voteValue >= 5 ? (
        <StarFull onClick={() => setVoteValue(5)} />
      ) : (
        <Star onClick={() => setVoteValue(5)} />
      )}
    </div>
  );
};

export default Stars;
