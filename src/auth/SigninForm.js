import React from "react";
import ReactPasswordToggleIcon from "react-password-toggle-icon";
const SigninForm = React.forwardRef((props, ref) => {
  const { handleChange, handleSubmit, values, changeShowPassword } = props;
  const { email, password } = values;
  return (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <form>
          <div className="mb-3 form-group">
            <label className="fw-bold" style={{ fontSize: "20px" }}>
              Email
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              name="email"
            />
          </div>
          <div className="mb-3 form-group" style={{ position: "relative" }}>
            <label className="fw-bold" style={{ fontSize: "20px" }}>
              Password
            </label>
            <input
              ref={ref}
              className="form-control"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              name="password"
            />
            <ReactPasswordToggleIcon
              inputRef={ref}
              style={{ marginTop: "20px" }}
              hideIcon={() => {
                changeShowPassword();
                return <i className="fa fa-eye" aria-hidden="true"></i>;
              }}
              showIcon={() => {
                changeShowPassword();
                return <i className="fa fa-eye-slash" aria-hidden="true"></i>;
              }}
            />
          </div>
          <div class="addtoCart">
            <a href onClick={handleSubmit} type="submit">
              Sign In
            </a>
          </div>
          <div className="row">
            <div className="col-6">
              <a
                href="signup"
                className="createAccount"
                style={{
                  color: "black",
                  fontSize: "15px",
                  fontWeight: "normal",
                }}
              >
                Create new Account
              </a>
            </div>
            <div className="col-6" style={{ textAlign: "right" }}>
              <a
                href="forgetpassword"
                className="createAccount "
                style={{
                  color: "black",
                  fontSize: "15px",
                  fontWeight: "normal",
                }}
              >
                Forget Password
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});
export default SigninForm;
