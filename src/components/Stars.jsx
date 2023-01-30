import { ReactComponent as Star } from "../assets/svg/starFull.svg";

const Stars = ({value}) => {
  return (
      <div className="stars">
        {value >= 1 && <Star />}
        {value >= 2 && <Star />}
        {value >= 3 && <Star />}
        {value >= 4 && <Star />}
        {value >= 5 && <Star />}
      </div>
  );
};

export default Stars;
