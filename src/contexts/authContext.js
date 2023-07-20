import { useState, createContext } from "react";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const contextValue = {};

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export { AuthContext };
