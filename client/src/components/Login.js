import { useContext, useState } from "react";
import loginpic from "../images/signin.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("mern-app-rho.vercel.app/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
                credentials: "include"

      });

      const data = res.json();

      if (res.status === 400 || !data) {
        window.alert("Invalid Credentials");
      } else {
        // no need to seperately define action
        dispatch({ type: "USER", payload: true });
        window.alert("Login Successfull");

        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <section className="sign-in">
        <div className="container mt-1">
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                <img src={loginpic} alt="registration" />
              </figure>
              <NavLink to="/signup" className="signup-image-link">
                Create an Account
              </NavLink>
            </div>
            <div className="signin-form">
              <h2 className="form-title">Sign In</h2>
              <form method="POST" className="register-form" id="register-form">
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <i className="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group form-button">
                  <input
                    type="submit"
                    value="Log In "
                    name="signin"
                    id="signin"
                    className="form-submit"
                    onClick={LoginUser}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
