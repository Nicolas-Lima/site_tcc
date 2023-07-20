import { useState, useContext } from "react";
import { FormContext } from "../../contexts/formContext";
import { AuthContext } from "../../contexts/authContext";
import PasswordToggle from "../PasswordToggle";

function LoginForm() {
  const [credentialsError, setCredentialsError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showingPassword } = useContext(FormContext);

  const { signIn } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();

    const { credentialsError } = await signIn(email, password);
    if(credentialsError) {
      setCredentialsError(credentialsError);
    }
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
