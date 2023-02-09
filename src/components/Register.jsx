import axios from "axios";
import { useState } from "react";
import "../styles/Login.css";

import { MARCUS_BASE_PATH } from "../services/apiVariables";
import { ReactComponent as Close } from "../assets/svg/close.svg";

const Register = ({ triggerToaster, setTriggerToaster, setShowRegister }) => {
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
      .post(`${MARCUS_BASE_PATH}/register`, {
        username,
        password,
      })
      .then((user) => {
        // trigger toast
        setShowRegister(false);
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
          onClick={() => setShowRegister(false)}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            cursor: "pointer",
            fill: "white",
          }}
        />
        <h1>Créer un compte</h1>
        <form onSubmit={handleLogin}>
          <div className="inputLabel">
            <label htmlFor="username">Nom du Compte</label>
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
            <input type="submit" className="button-primary" value="S'enregistrer" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
