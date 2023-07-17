import { useState, useEffect, useContext } from "react";
import { FormContext } from "../../contexts/formContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  hasValidDomain,
  hasUppercase,
  hasSpecialCharacter,
  hasNumber,
} from "../../utils/validationUtils";

import eye from "../../assets/eye-fill.svg";
import eyeSlash from "../../assets/eye-slash-fill.svg";

function Register() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
    formSubmitted,
    setFormSubmitted,
    emailInputStarted,
    setEmailInputStarted,
    passwordInputStarted,
    setPasswordInputStarted,
    showingPassword,
    setShowingPassword,
  } = useContext(FormContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (emailInputStarted) {
      validateEmail();
    }
  }, [email]);

  useEffect(() => {
    if (passwordInputStarted) {
      validatePassword();
    }
  }, [password]);

  const validateEmail = () => {
    let isValid = true;
    let errorMessage = "";

    const validationConditions = [
      {
        condition: !email,
        errorMessage: "Seu endereço de email está vazio!",
      },
      {
        condition: !email.includes("@"),
        errorMessage: "Inclua um @ no seu endereço de email!",
      },
      {
        condition: !email.split("@").pop().trim(),
        errorMessage: "Digite algo depois do @!",
      },
      {
        condition: !email.split("@")[0]?.trim(),
        errorMessage: "Digite algo antes do @!",
      },
      {
        condition: !hasValidDomain(email),
        errorMessage: "Email inválido!",
      },
    ];

    validationConditions.forEach(condition => {
      if (condition.condition && isValid) {
        isValid = false;
        errorMessage = condition.errorMessage;
      }
    });

    setEmailError(errorMessage);

    return isValid;
  };

  const validatePassword = () => {
    let isValid = true;
    let errorMessage = "";

    const validationConditions = [
      {
        condition: !hasUppercase(password),
        errorMessage: "Sua senha precisa ter pelo menos uma letra maiúscula!",
      },
      {
        condition: !hasSpecialCharacter(password),
        errorMessage: "Sua senha precisa ter pelo menos um caractere especial!",
      },
      {
        condition: !hasNumber(password),
        errorMessage: "Sua senha precisa ter pelo menos um número!",
      },
      {
        condition: !(password.length >= 6),
        errorMessage: "Sua senha precisa ter pelo menos 6 caracteres!",
      },
    ];

    validationConditions.forEach(condition => {
      if (condition.condition && isValid) {
        isValid = false;
        errorMessage = condition.errorMessage;
      }
    });

    setPasswordError(errorMessage);

    return isValid;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setFormSubmitted(true);

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
      return;
    } else {
      setEmailError("");
      setPasswordError("");
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then(value => {
        const userDetails = {
          email: value.user.email,
          uid: value.user.uid,
        };
        localStorage.setItem("@userDetails", JSON.stringify(userDetails));
        navigate("/");

        return;
      })
      .catch(error => {
        switch (error.code) {
          case "auth/weak-password":
            setPasswordError("Senha fraca!");
            break;
          case "auth/email-already-in-use":
            setEmailError("Este email já está em uso!");
            break;
          case "auth/invalid-email":
            setEmailError("Email inválido!");
            break;
        }
      });
  };

  return (
    <div className="container py-0">
      <div className="row justify-content-center gx-sm-5 mb-4 mt-5">
        <div className="col-12 col-sm-11 col-md-9 col-lg-7 col-xl-6">
          <article className="shadow-lg pt-0">
            <header className="text-center mb-4 d-flex justify-content-center">
              <strong className="me-3">Registrar</strong>
            </header>
            <form
              method="post"
              className="form-register mb-0"
              onSubmit={handleSubmit}
              noValidate>
              <div className="d-flex flex-column mb-4">
                <label className="mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    if (!emailInputStarted) {
                      setEmailInputStarted(true);
                    }
                  }}
                  aria-invalid={
                    emailInputStarted || formSubmitted
                      ? emailError
                        ? "true"
                        : "false"
                      : ""
                  }
                />
                <div
                  className={`mt-1 mb-2 ${
                    emailError ? "d-initial" : "d-none"
                  }`}>
                  <span className="email-error text-pico-danger">
                    {emailError}
                  </span>
                </div>

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
                    onChange={e => {
                      setPassword(e.target.value);
                      if (!passwordInputStarted) {
                        setPasswordInputStarted(true);
                      }
                    }}
                    aria-invalid={
                      passwordInputStarted || formSubmitted
                        ? passwordError
                          ? "true"
                          : "false"
                        : ""
                    }
                  />
                  <i
                    className="passwordToggle"
                    onClick={() => {
                      setShowingPassword(prevState => !prevState);
                    }}>
                    {showingPassword ? (
                      <img src={eyeSlash} />
                    ) : (
                      <img src={eye} />
                    )}
                  </i>
                </div>
                <div
                  className={`mt-1 mb-2 ${
                    passwordError ? "d-initial" : "d-none"
                  }`}>
                  <span className="password-error text-pico-danger">
                    {passwordError}
                  </span>
                </div>
              </div>
              <button type="submit mt-0">Registrar</button>
            </form>
          </article>
        </div>
      </div>
    </div>
  );
}

export default Register;
