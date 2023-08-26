import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "./Cookie";

const Contact = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const navigate = useNavigate();

  const userContact = async () => {
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
      console.log("object");
      const data = await res.json();
      console.log(data);
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  // changing data in states
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // send data to backend

  const contactForm = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;

    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });
    const data = await res.json();

    if (!data) {
      console.log("msg not sent");
    } else {
      window.alert("message sent");
      setUserData({ ...userData, message: "" });
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  return (
    <>
      <div className="contact_info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
              {/* phone */}
              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <img
                  src="https://img.icons8.com/office/24/000000/iphone.png"
                  alt="phone"
                />
                <div className="contact_info_content">
                  <div className="contact_info_title">Phone</div>
                  <div className="contact_info_text">+91 111 111 1234</div>
                </div>
              </div>
              {/* email */}
              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <img
                  src="https://img.icons8.com/office/24/000000/iphone.png"
                  alt="phone"
                />
                <div className="contact_info_content">
                  <div className="contact_info_title">Email</div>
                  <div className="contact_info_text">demo@gmail.com</div>
                </div>
              </div>
              {/* address */}
              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <img
                  src="https://img.icons8.com/office/24/000000/iphone.png"
                  alt="phone"
                />
                <div className="contact_info_content">
                  <div className="contact_info_title">Address</div>
                  <div className="contact_info_text">Mumbai</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* contact form */}
      <div className="contact_form">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container py-2">
                <div className="contact_form_title">Get in Touch</div>
                <form id="contact_form" method="POST">
                  <div className="contact_form_name d-flex justify-content-between align-items-between">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={userData.name}
                      onChange={handleInputs}
                      disabled
                      required={true}
                      className="contact_form_name input_field"
                      id="contact_form_name"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={userData.email}
                      onChange={handleInputs}
                      disabled
                      required={true}
                      className="contact_form_email input_field"
                      id="contact_form_email"
                    />
                    <input
                      type="number"
                      name="phone"
                      placeholder="Your Phone"
                      value={userData.phone}
                      onChange={handleInputs}
                      disabled
                      required={true}
                      className="contact_form_phone input_field"
                      id="contact_form_phone"
                    />
                  </div>

                  <div className="contact_form_text mt-4">
                    <textarea
                      className="contact_form_text text_field"
                      placeholder="Message"
                      name="message"
                      value={userData.message}
                      onChange={handleInputs}
                      cols="30"
                      rows="10"
                    ></textarea>
                    <div className="contact_form_button">
                      <button
                        type="submit"
                        className="button contact_submit_button"
                        onClick={contactForm}
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
