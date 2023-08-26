import { useEffect, useState } from "react";
import aboutpic from "../images/aboutpic.jpg";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

const About = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const callAboutPage = async () => {
    // we need to call the about page in auth.js (Server) and authenticate whether
    // the user is valid or not

    try {
      const res = await fetch("http://localhost:8000/about", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // accept is for property to accept application/json
          Accept: "application/json",
        },
        // credentials is for cookies to be sent properly
        // credentials is must for sending cookies/tokens etc
        credentials: "include"
      });
      console.log("object");
      const data = await res.json();
      console.log(data);
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <div className="container emp-profile">
        <form method="GET">
          <div className="row emp-profile-row">
            <div className="col-md-4">
              <div className="profile-img">
                <img
                  src={userData.name === "mohd" ? aboutpic : logo}
                  alt="about"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>{userData.name}</h5>
                <h6>Web Developer</h6>
                <p className="profile-rating mt-3 mb-5">
                  RANKING: <span> 1/10</span>
                </p>
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                      className="nav-link active"
                      id="nav-home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home"
                      type="button"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                    >
                      Home
                    </button>
                    <button
                      className="nav-link"
                      id="nav-profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile"
                      type="button"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                    >
                      Profile
                    </button>
                  </div>
                </nav>
              </div>
            </div>
            <div className="col-md-2">
              <input
                type="submit"
                className="profile-edit-btn"
                value="Edit Profile"
                name="btnAddMore"
              />
            </div>
          </div>

          <div className="row">
            {/* left side url */}

            <div className="col-md-4">
              <div className="profile-work">
                <p>Work LINK</p>
                <a href="https://www.youtube.com" target="_blank">
                  Youtube
                </a>{" "}
                <br />
                <a href="https://www.youtube.com" target="_blank">
                  Demo
                </a>
                <br />
                <a href="https://www.youtube.com" target="_blank">
                  Demo
                </a>
                <br />
              </div>
            </div>

            {/* right side data toggle */}
            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade active show"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <p>User ID</p>
                    </div>
                    <div className="col-md-6">
                      <p>{userData._id}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <p>Name</p>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.name}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <p>Email</p>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.email}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <p>Phone</p>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.phone}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <p>Profession</p>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.work}</p>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <p>USER ID</p>
                    </div>
                    <div className="col-md-6">
                      <p>{userData._id}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <p>Name</p>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.name}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <p>Experience</p>
                    </div>
                    <div className="col-md-6">
                      <p>blank</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
