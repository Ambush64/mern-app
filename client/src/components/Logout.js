import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Logout = () => {
  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();
  // using promises

  useEffect(() => {
    fetch("https://mern-app-rho.vercel.app/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // accept is for property to accept application/json
        Accept: "application/json",
      },
      // credentials is for cookies to be sent properly
      // credentials is must for sending cookies/tokens etc
      credentials: "include",
    })
      .then((res) => {
        dispatch({ type: "USER", payload: false });
        // replace means that u should navigate to /
        navigate("/", { replace: true });

        if (!res.status === 200) {
          throw new Error("error message");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <h2>Logging Out....</h2>
      <h3>Clearing your cookies.......</h3>
    </>
  );
};

export default Logout;
