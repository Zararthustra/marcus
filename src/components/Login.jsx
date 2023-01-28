import axios from "axios";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import "../styles/Login.css";

import { MARCUS_BASE_PATH } from "../services/apiVariables";
import { saveLocalStorage } from "../utils/localStorage";
import { ReactComponent as Close } from "../assets/svg/close.svg";

const Login = ({ triggerToaster, setTriggerToaster, setShowLogin }) => {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");

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

    axios
      .post(`${MARCUS_BASE_PATH}/token/`, {
        username,
        password,
      })
      .then((user) => {
        const decoded = jwt_decode(user.data.access);
        saveLocalStorage("userid", decoded.user_id);
        saveLocalStorage("username", username);
        // saveLocalStorage("password", password);
        saveLocalStorage("access", user.data.access);
        saveLocalStorage("refresh", user.data.refresh);
        setShowLogin(false);
      })
      .catch((error) => {
        if (error.response.status === 401) return console.log(error);
        return setTriggerToaster({
          type: "error",
          message: "Compte inconnu.",
        });
      });
    return;
  };

  return (
    <div className="loginPage">
      <div className="login">
        <Close
          onClick={() => setShowLogin(false)}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            cursor: "pointer",
          }}
        />
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
