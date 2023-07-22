import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";
import AuthProvider from "./contexts/auth";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./css/bootstrap-utilities.css";
import "./css/pico-bootstrap-grid.css";
import "./css/app.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000} />
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
