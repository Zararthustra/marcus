import "../styles/Header.css";

const Header = () => {
  return (
    <header className="headerLanding">
      <p>Le site des cinéphiles qui ont un avis.</p>
      <input
        type="text"
        placeholder="Un film, une série, un acteur, un réalisateur, ..."
      />
    </header>
  );
};

export default Header;
