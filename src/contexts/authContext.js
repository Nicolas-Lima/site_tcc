import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebaseConnection";
import {
  getAuthErrorMessage,
  getCreateAccountErrorMessage,
} from "../utils/validationUtils";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("@userData");
    if (userData) {
      setUser(JSON.parse(userData));
      setLoading(false);
    }
  }, []);

  async function signIn(email, password) {
    const returnObject = {
      credentialsError: "",
    };
    await signInWithEmailAndPassword(auth, email, password)
      .then(value => {
        const uid = value.user.uid;
        saveUserData(uid, email);
        setUser({
          email,
          uid,
        });
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
        const { email, uid } = value.user;
        saveUserData(email, uid);
        navigate("/");
      })
      .catch(error => {
        const errorMessage = getCreateAccountErrorMessage(error.code);
        returnObject.emailError = errorMessage.email;
        returnObject.passwordError = errorMessage.password;
      });

    return returnObject;
  }

  async function logout() {
    await signOut(auth).then(() => {
      localStorage.removeItem("@userData");
      setUser(null);
    });
  }

  function saveUserData(email, uid) {
    const userData = {
      email,
      uid,
    };
    localStorage.setItem("@userData", JSON.stringify(userData));
  }

  const contextValue = {
    userSigned: !!user,
    user,
    signIn,
    signUp,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export { AuthContext };
