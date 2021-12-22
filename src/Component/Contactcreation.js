import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import { addToContact, isSignedIn } from "../apicaller/auth";
import Footer from "./Footer";
import "../style/cardStyle.css";
import { successMessage, errorMessage, loadingMessage } from "./Message";

const Contactcreation = () => {
  const { user, token } = isSignedIn();
  const [values, setValues] = useState({
    email: "",
    error: "",
    success: "",
    loading: "",
  });
  const { email, error, success, loading } = values;
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: false, success: false });
    const data = await addToContact(email, user._id, token);
    if (data.error) {
      setValues({
        ...values,
        error: data.error,
        success: false,
        loading: false,
      });
    } else {
      setValues({
        ...values,
        success: true,
        email: "",
        loading: false,
        error: false,
      });
    }
  };

  const contactForm = () => {
    return (
      <div>
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <h4 className="font-weight-bold">Enter Email</h4>
              <input
                className="form-control"
                type="text"
                value={email}
                onChange={handleChange}
                name="email"
              />
              <div class="addtoCart mt-4">
                <a type="submit" href onClick={handleSubmit}>
                  Add to Contact
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };
  return (
    <>
      <div
        className="fashion_section"
        style={{ overflowY: "auto", backgroundColor: "#f0de6e" }}
      >
        <Menu />
        <div className="logo_section mb-2">
          {/* // logo section */}
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="logo">
                  <img
                    alt="logo"
                    style={{ maxwidth: "100%" }}
                    src="https://fontmeme.com/permalink/211220/293d7532b26cd531b84fcc2c6d4fa661.png"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* logo ends here */}
          <div className="container">
            <Link
              className="btn btn-md btn-dark rounded mb-3"
              to="/user/dashboard"
            >
              Home
            </Link>
            {success && successMessage("Contact created Successfully")}
            {loading && loadingMessage("Loading...")}
            {error && errorMessage(error)}
            {contactForm()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Contactcreation;
