import { useState } from "react";
import "../styles/Login.css";
import { saveLocalStorage } from "../utils/localStorage";

const Login = ({ triggerToaster, setTriggerToaster }) => {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");

  //___________________________________________________ Functions

  const handleChange = (e) => {
    switch (e.target.name) {
      case "username":
        if (e.target.value.length > 10) return;
        return setName(e.target.value.trim().toLowerCase());
      case "password":
        if (e.target.value.length > 15) return;
        return setPassword(e.target.value.trim());
      default:
        break;
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    //Call API here
    //
    // .then((user) => {
    //   if (user.error?.message.split(" ").at(-1) === "401")
    //     return setTriggerToaster({
    //       type: "error",
    //       message: "Compte inconnu.",
    //     });
    //   const decoded = jwt_decode(user.payload.access);
    //   saveLocalStorage("userid", decoded.user_id);
    saveLocalStorage("username", username);
    saveLocalStorage("password", password);
    //   saveLocalStorage("access", user.payload.access);
    //   saveLocalStorage("refresh", user.payload.refresh);

    //   setIsAuth(true);
    // })
    // .catch((error) => console.log(error));
    return;
  };

  return (
    <div className="loginPage">
      <div className="login">
        <h1>Se connecter</h1>
        <form onSubmit={handleLogin}>
          <div className="inputLabel">
            <label htmlFor="username">Compte</label>
            <input
              required
              type="text"
              value={username}
              onChange={handleChange}
              name="username"
              id="username"
            />
          </div>
          <div className="inputLabel">
            <label htmlFor="password">Mot de passe</label>
            <input
              required
              type="password"
              value={password}
              onChange={handleChange}
              name="password"
              id="password"
            />
          </div>
          <div className="buttons">
            <input type="submit" className="button-primary" value="Connexion" />
            <button
              style={{
                color: "white",
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
              onClick={() => console.log("Créer un compte")}
            >
              Créer un compte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
