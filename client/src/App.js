import { createContext, useReducer } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import About from "./components/About";
import "./index.css";
import ErrorPage from "./components/ErrorPage";
import Logout from "./components/Logout";
import { reducer, initialState } from "../src/reducer/UseReducer";

// 1. context api
export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};

export default App;
