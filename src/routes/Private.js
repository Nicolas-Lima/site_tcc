import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../contexts/auth"

function Private({ children }) {
  const { userSigned, pageLoading } = useContext(AuthContext)

  if(!userSigned && !pageLoading) {
    return <Navigate to="/login" />;
  }

  return children
}

export default Private