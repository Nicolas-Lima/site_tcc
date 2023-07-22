import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../contexts/auth"

function Private({ children }) {
  const { userSigned, loading } = useContext(AuthContext)

  if(!userSigned && !loading) {
    return <Navigate to="/login" />;
  }

  return children
}

export default Private