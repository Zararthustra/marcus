import { TMDB_IMG_PATH } from "../services/apiVariables";

const Persons = ({ actors, crew }) => {
  return (
    <div className="persons-container">
      {actors.length > 0 && <h2 style={{ width: "fit-content" }}>Acteurs</h2>}
      {actors.length > 0 && (
        <div className="persons">
          {actors
            .sort((p1, p2) =>
              p1.popularity < p2.popularity
                ? 1
                : p1.popularity > p2.popularity
                ? -1
                : 0
            )
            .slice(0, 20)
            .map((actor, index) => {
              return (
                <article className="person" key={index}>
                  {actor.profile_path ? (
                    <img
                      src={TMDB_IMG_PATH + actor.profile_path}
                      alt={actor.name}
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "55%",
                        textAlign: "center",
                        fontSize: "3rem",
                      }}
                    >
                      🤷
                    </div>
                  )}
                  <div className="names">
                    <p>{actor.name}</p>
                    <p className="character">
                      {actor.character.includes("/")
                        ? actor.character.split("/")[1]
                        : actor.character}
                    </p>
                  </div>
                </article>
              );
            })}
        </div>
      )}
      {crew.length > 0 && (
        <h2 style={{ width: "fit-content" }}>Équipe technique</h2>
      )}
      {crew.length > 0 && (
        <div className="persons">
          {crew
            .sort((p1, p2) =>
              p1.popularity < p2.popularity
                ? 1
                : p1.popularity > p2.popularity
                ? -1
                : 0
            )
            .slice(0, 20)
            .map((item, index) => {
              return (
                <article className="person" key={index}>
                  {item.profile_path ? (
                    <img
                      src={TMDB_IMG_PATH + item.profile_path}
                      alt={item.name}
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "55%",
                        textAlign: "center",
                        fontSize: "3rem",
                      }}
                    >
                      🤷
                    </div>
                  )}
                  <div className="names">
                    <p>{item.name}</p>
                    <p className="character">{item.job}</p>
                  </div>
                </article>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Persons;
