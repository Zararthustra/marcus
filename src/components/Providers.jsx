import { TMDB_IMG_PATH } from "../services/apiVariables";

const Providers = ({ providers }) => {
  return (
    <div className="providers-container">
      {providers.flatrate && <h3>À voir sur</h3>}
      <div className="providers">
        {providers.flatrate &&
          providers?.flatrate.map((provider, index) => (
            <img
              src={TMDB_IMG_PATH + provider.logo_path}
              alt={provider.provider_name}
              title={provider.provider_name}
            />
          ))}
      </div>

      {providers.rent && <h3>À louer sur</h3>}
      <div className="providers">
        {providers.rent &&
          providers?.rent?.map((provider, index) => (
            <img
              src={TMDB_IMG_PATH + provider.logo_path}
              alt={provider.provider_name}
              title={provider.provider_name}
            />
          ))}
      </div>

      {providers.buy && <h3>À acheter sur</h3>}
      <div className="providers">
        {providers.buy &&
          providers?.buy?.map((provider, index) => (
            <img
              src={TMDB_IMG_PATH + provider.logo_path}
              alt={provider.provider_name}
              title={provider.provider_name}
            />
          ))}
      </div>
    </div>
  );
};

export default Providers;
