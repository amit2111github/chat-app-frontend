import React, { useState, useEffect, useRef } from 'react';
import { isValidLink, resetpassword } from '../apicaller/auth';
import { Redirect } from 'react-router-dom';
import { successMessage, errorMessage, loadingMessage } from './Message';
import Menu from './Menu';
import Footer from './Footer';
import ChangePasswordForm from './ChangePasswordForm';

const PasswordResetPage = ({ history }) => {
  const [valid, setValid] = useState(true);
  const showPasswordRef = useRef();
  const showConfirmPasswordRef = useRef();
  const [{ password, confirmPassword }, setPassword] = useState({ password: '', confirmPassword: '' });
  const [values, setValues] = useState({ error: '', loading: '', success: '', didRedirect: '' });
  const { error, loading, success, didRedirect } = values;
  const preload = async (token) => {
    const data = await isValidLink(token);
    if (data.error) setValid(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setValues({ ...values, error: 'Password and Confirm password should be same' });
      return;
    }
    if (password.length < 5) {
      setValues({ ...values, error: 'password should be 6 chars long' });
      return;
    }
    setValues({ ...values, loading: true, error: false, success: false });
    const token = history.location.search.split('=')[1];
    const data = await resetpassword(password, token);
    if (data.error || data.errors) {
      setValues({ ...values, error: data.error || data.errors[0].msg, success: false });
    } else {
      setValues({ ...values, success: true, didRedirect: false, error: false });
      setPassword('');
      setTimeout(() => {
        setValues({ ...values, didRedirect: true });
      }, 2000);
    }
  };

  const handleChange = (event) => {
    setPassword((val) => ({ ...val, [event.target.name]: event.target.value }));
  };
  const redirect = () => {
    return <Redirect to="pathnotfound" />;
  };
  const getRedirect = () => {
    return <Redirect to="/signin" />;
  };
  useEffect(() => {
    const token = history.location.search.split('=')[1];
    preload(token);
  }, []);
  return (
    <>
      {valid && (
        <>
          <div
            className="fashion_section"
            style={{ backgroundColor: "#f0de6e" }}
          >
            <Menu />
            <div className="logo_section mb-2">
              {/* // logo section */}
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="logo">
                      <a href>
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
                {success && successMessage("Password Changed")}
                {didRedirect && getRedirect()}
                {loading && loadingMessage("Processing...")}

                <ChangePasswordForm
                  password={password}
                  confirmPassword={confirmPassword}
                  setPassword={setPassword}
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  values={values}
                  ref={{ showPasswordRef, showConfirmPasswordRef }}
                />
              </div>
              {/* logo ends here */}
            </div>
          </div>

          <Footer />
        </>
      )}
      {!valid && redirect()}
    </>
  );
};
export default PasswordResetPage;
