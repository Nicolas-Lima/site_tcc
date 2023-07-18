import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../../contexts/formContext";

import { auth } from "../../firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  validateEmailWithMessage,
  validatePasswordWithMessage
} from "../../utils/validationUtils";

import RegisterFormFields from "../../components/RegisterFormFields";

function RegisterForm() {
  const navigate = useNavigate();

  const {
    email,
    setEmail,
    emailError,
    setEmailError,
    emailInputStarted,
    setEmailInputStarted,
    formSubmitted,
    setFormSubmitted,
    password,
    setPassword,
    passwordError,
    setPasswordError,
    passwordInputStarted,
    setPasswordInputStarted,
    showingPassword,
  } = useContext(FormContext);

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
    const { isValid, errorMessage } = validateEmailWithMessage(email);
    setEmailError(errorMessage);
    return isValid;
  };

  const validatePassword = () => {
    const { isValid, errorMessage } = validatePasswordWithMessage(password);
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
              <RegisterFormFields />
              <button type="submit mt-0">Registrar</button>
            </form>
          </article>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
