import { useEffect, useState } from "react";
import { getCookie } from "./Cookie";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);

  const userHome = async () => {
    // we need to call the about page in auth.js (Server) and authenticate whether
    // the user is valid or not

    try {
      const res = await fetch("https://colorful-hen-earrings.cyclic.cloud/getdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie()}`,
        },
        credentials: 'include'
      });

      const data = await res.json()
      setUserName(data.name);
      setShow(true);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userHome();
  }, []);
  return (
    <>
      <div className="home-page">
        <div className="home-div">
          <p className="pt-5">WELCOME</p>
          <h1>{userName}</h1>
          <h2>{show ? "Happy, to see you back" : "MERN DEVELOPMENT"}</h2>
        </div>
      </div>
    </>
  );
};

export default Home;
