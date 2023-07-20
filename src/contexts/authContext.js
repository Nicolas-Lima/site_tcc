import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebaseConnection";
import {
  getAuthErrorMessage,
  getCreateAccountErrorMessage,
} from "../utils/validationUtils";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState({})
  
  const navigate = useNavigate();

  async function signIn(email, password) {
    const returnObject = {
      credentialsError: "",
    };
    await signInWithEmailAndPassword(auth, email, password)
      .then(value => {
        console.log(value.user);
        navigate("/");
      })
      .catch(error => {
        returnObject.credentialsError = getAuthErrorMessage(error.code);
      });

    return returnObject;
  }

  async function signUp(email, password) {
    const returnObject = {
      emailError: "",
      passwordError: "",
    };

    await createUserWithEmailAndPassword(auth, email, password)
      .then(value => {
        const userData = {
          email: value.user.email,
          uid: value.user.uid,
        };
        localStorage.setItem("@userData", JSON.stringify(userData));
        navigate("/");
      })
      .catch(error => {
        const errorMessage = getCreateAccountErrorMessage(error.code);
        returnObject.emailError = errorMessage.email;
        returnObject.passwordError = errorMessage.password;
      });
      
      return returnObject
  }

  const contextValue = {
    signIn,
    signUp, 
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export { AuthContext };
