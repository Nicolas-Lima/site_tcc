import { BrowserRouter } from "react-router-dom"
import RoutesApp from "./routes";
import AuthProvider from "./contexts/auth";

import "./css/bootstrap-utilities.css"
import "./css/pico-bootstrap-grid.css"
import "./css/app.css"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
