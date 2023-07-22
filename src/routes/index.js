import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Login from "../pages/Login";
import Register from "../pages/Register";
import FormProvider from "../contexts/form";
import Private from "./Private";

function RoutesApp() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Private>
            <Home />
          </Private>
        }
      />
      <Route
        path="/register"
        element={
          <FormProvider>
            <Register />
          </FormProvider>
        }
      />
      <Route
        path="/login"
        element={
          <FormProvider>
            <Login />
          </FormProvider>
        }
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default RoutesApp;
