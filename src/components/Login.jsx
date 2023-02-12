import axios from "axios";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import "../styles/Login.css";

import { MARCUS_BASE_PATH } from "../services/apiVariables";
import { saveLocalStorage } from "../utils/localStorage";
import { ReactComponent as Close } from "../assets/svg/close.svg";
import Toast from "./Toast";

const Login = ({ setShowLogin }) => {
  const [triggerToast, setTriggerToast] = useState(null);
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    switch (e.target.name) {
      case "username":
        if (e.target.value.length > 20) return;
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
        saveLocalStorage("access", user.data.access);
        saveLocalStorage("refresh", user.data.refresh);
        setShowLogin(false);
      })
      .catch((error) => {
        if (error.response.status === 401)
          return setTriggerToast({
            type: "error",
            message: "Compte inconnu",
          });
      });
    return;
  };

  return (
    <div className="loginPage">
      {triggerToast && (
        <Toast
          type={triggerToast.type}
          message={triggerToast.message}
          setTriggerToast={setTriggerToast}
        />
      )}
      <div className="login">
        <Close
          onClick={() => setShowLogin(false)}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            cursor: "pointer",
            fill: "white",
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
