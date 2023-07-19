import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConnection";
import { FormContext } from "../../contexts/formContext";

import PasswordToggle from "../PasswordToggle";
import { getAuthErrorMessage } from "../../utils/validationUtils";

function LoginForm() {
  const [credentialsError, setCredentialsError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {showingPassword, setShowingPassword} = useContext(FormContext);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, email, password)
      .then(value => {
        console.log(value.user);
        navigate("/");
      })
      .catch(error => {
        const credentialsError = getAuthErrorMessage(error.code);
        setCredentialsError(credentialsError);
      });
  };

  return (
    <form
      method="post"
      className="mb-0"
      noValidate
      onSubmit={handleSubmit}>
      <div className="d-flex flex-column mb-2">
        <label className="mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite seu email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <div>
          <label className="my-2" htmlFor="password">
            Senha
          </label>
          <input
            type={showingPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {password.length > 0 && <PasswordToggle />}
        </div>
      </div>

      <div className="mt-1 mb-4 text-pico-danger">{credentialsError}</div>

      <button type="submit">Logar</button>
    </form>
  );
}

export default LoginForm;
