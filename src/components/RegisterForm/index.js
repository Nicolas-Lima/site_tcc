import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FormContext } from "../../contexts/formContext";

import { auth } from "../../firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  validateEmailWithMessage,
  validatePasswordWithMessage,
  getCreateAccountErrorMessage,
} from "../../utils/validationUtils";

import RegisterFormFields from "../../components/RegisterFormFields";

function RegisterForm() {
  const navigate = useNavigate();

  const {
    email,
    setEmailError,
    emailInputStarted,
    setFormSubmitted,
    password,
    setPasswordError,
    passwordInputStarted,
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
    const { isValid, errorMessage } =
      validatePasswordWithMessage(password);
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
        const errorMessage = getCreateAccountErrorMessage(error.code);
        setEmailError(errorMessage.email);
        setPasswordError(errorMessage.password);
      });
  };

  return (
    <div className="container py-0">
      <div className="row justify-content-center gx-sm-5 mb-4 mt-2-3rem">
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
            <div className="mb-2 mt-2-3rem">
              <span style={{ marginRight: "8px" }}>
                Você já tem uma conta?
              </span>
              <Link to="/login">Fazer login</Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
