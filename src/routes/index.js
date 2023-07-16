import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Error from "../pages/Error"
import Login from "../pages/Login"
import Register from "../pages/Register"

function RoutesApp() {
    return (
        <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/register" element={ <Register /> } />
                <Route path="/login" element={ <Login /> } />
                <Route path="*" element={ <Error /> } />
        </Routes>
    )
}

export default RoutesApp