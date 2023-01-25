import "../styles/Movie.css";

const Movie = ({}) => {
  return (
    <div className="movie-page">
      <div className="movie">Prout</div>
      <div
        style={{
          position: "absolute",
          color: "black",
          bottom: "5rem",
          right: "5rem",
          zIndex: "2",
        }}
      >
        T'as souris fais pas genre
      </div>
    </div>
  );
};

export default Movie;
