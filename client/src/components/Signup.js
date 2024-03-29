import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import signup from "../images/signup.svg";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    // sq brackets is for dynamic data
    // it doesnt mention name it will be e.target.name
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    try {
      const { name, email, phone, work, password, cpassword } = user;

      // initially it wint work cuz it sends on port 3000 but our server is on port 8000
      const res = await fetch("https://colorful-hen-earrings.cyclic.cloud/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          work,
          password,
          cpassword,
        }),
        credentials: "include"

      });

      const data = await res.json();

      if (res.status === 422 || !data) {
        window.alert("Registration Failed");
        console.log("Registration Failed");
      } else {
        window.alert("Registration Successful");
        console.log("Registration Successful");

        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="signup">
        <div className="container mt-1">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign Up</h2>
              <form method="POST" className="register-form" id="register-form">
                <div className="form-group">
                  <label htmlFor="name">
                    <i className="zmdi zmdi-account"></i>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    value={user.name}
                    onChange={handleInputs}
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="Your Email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <i className="zmdi zmdi-phone-in-talk"></i>
                  </label>
                  <input
                    type="numer"
                    name="phone"
                    id="phone"
                    autoComplete="off"
                    value={user.phone}
                    onChange={handleInputs}
                    placeholder="Your Phone"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="work">
                    <i className="zmdi zmdi-slideshow"></i>
                  </label>
                  <input
                    type="text"
                    name="work"
                    id="work"
                    autoComplete="off"
                    value={user.work}
                    onChange={handleInputs}
                    placeholder="Your Profession"
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
                    value={user.password}
                    onChange={handleInputs}
                    placeholder="Your Password"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cpassword">
                    <i className="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    autoComplete="off"
                    value={user.cpassword}
                    onChange={handleInputs}
                    placeholder="Confirm Your Password"
                  />
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    value="register"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    onClick={PostData}
                  />
                </div>
              </form>
            </div>
            <div className="signup-image">
              <figure>
                <img src={signup} alt="registration" />
              </figure>
              <NavLink to="/login" className="signup-image-link">
                I am already registered
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
