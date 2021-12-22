import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import { signin, storeInLocalStorage } from "../apicaller/auth";
import Menu from "../Component/Menu";
import SigninForm from "./SigninForm";
import Footer from "../Component/Footer";
import {
  errorMessage,
  successMessage,
  loadingMessage,
} from "../Component/Message";
const Signin = () => {
  const showPasswordRef = useRef();
  const [values, setValues] = useState({
    email: "",
    password: "",
    success: "",
    error: "",
    loading: "",
    didRedirect: false,
  });
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const changeShowPassword = () => {
    if (!showPasswordRef.current) return;
    if (showPasswordRef.current.type === "text") {
      showPasswordRef.current.type = "password";
      return;
    }
    showPasswordRef.current.type = "text";
  };
  const getRedirect = () => {
    return <Redirect to="/user/dashboard" />;
  };
  const { email, password, error, loading, success, didRedirect } = values;
  const handleSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: false, success: false });
    const data = await signin(email, password);
    setValues({ ...values, loading: false });
    if (data.error || data.errors) {
      setValues({
        ...values,
        error: data.error || data.errors[0].msg,
        success: false,
      });
    } else {
      setValues({
        ...values,
        success: true,
        didRedirect: false,
        email: "",
        password: "",
        error: false,
      });
      storeInLocalStorage(data, () => {
        setTimeout(() => {
          setValues({ ...values, didRedirect: true });
        }, 2000);
      });
    }
  };

  return (
    <>
      <div className="fashion_section" style={{ backgroundColor: "#f0de6e" }}>
        <Menu />
        <div className="logo_section mb-2">
          {/* // logo section */}
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="logo">
                  <a href="/">
                    <img
                      alt="Logo"
                      style={{ maxwidth: "100%" }}
                      src="https://fontmeme.com/permalink/211220/293d7532b26cd531b84fcc2c6d4fa661.png"
                    />
                  </a>
                </div>
              </div>
            </div>
            <p className="messages font-weight-normal">Welcome Back</p>
            {error && errorMessage(error)}
            {success && successMessage("Signin Successfully")}
            {didRedirect && getRedirect()}
            {loading && loadingMessage("Processing...")}

            <SigninForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              values={values}
              ref={showPasswordRef}
              changeShowPassword={changeShowPassword}
            />
          </div>
          {/* logo ends here */}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Signin;
