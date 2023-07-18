import { BrowserRouter } from "react-router-dom"
import RoutesApp from "./routes";

import "./css/bootstrap-utilities.css"
import "./css/pico-bootstrap-grid.css"
import "./css/app.css"

function App() {
  return (
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
  );
}

export default App;
