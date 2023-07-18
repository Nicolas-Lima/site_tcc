import { useState, createContext } from "react";

const FormContext = createContext({});

function FormProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailInputStarted, setEmailInputStarted] = useState(false);
  const [passwordInputStarted, setPasswordInputStarted] = useState(false);
  const [showingPassword, setShowingPassword] = useState(false);

  const contextValue = {
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
  };

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
}

export { FormContext };
export default FormProvider;
