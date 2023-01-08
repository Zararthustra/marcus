import "../styles/Header.css";

export const Header = () => {
  return (
    <header>
      <p>Le site des cinéphiles qui ont un avis.</p>
      <input
        type="text"
        placeholder="Un film, une série, un acteur, un réalisateur, ..."
      />
    </header>
  );
};
