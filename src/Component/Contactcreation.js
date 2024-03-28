import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import { addToContact, isSignedIn, getAllUser } from "../apicaller/auth";
import Footer from "./Footer";
import "../style/cardStyle.css";
import { successMessage, errorMessage, loadingMessage } from "./Message";

const Contactcreation = () => {
  const { user, token } = isSignedIn();
  const [allUser, setAllUser] = useState([]);
  const [loadingFriends, setLoadingFriends] = useState([]);
  const [values, setValues] = useState({
    email: "",
    error: "",
    success: "",
    loading: "",
  });
  useEffect(async () => {
    const data = await getAllUser(user, token);
    if (data.err) {
      alert(data.err);
      return;
    }
    setAllUser(data.data);
  }, []);
  const { email, error, success, loading } = values;
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event, email, id) => {
    event.preventDefault();
    setLoadingFriends((o) => [...o, id]);
    const data = await addToContact(email, user._id, token);
    setLoadingFriends((o) => {
      return o.filter((cur) => cur != id);
    });
    if (data.error) {
      alert(`Failed to add ${email}`);
    } else {
      alert(`${email} is added to contact`);
      setAllUser((old) => {
        return old.filter((cur) => cur._id != id);
      });
    }
  };
  return (
    <>
      <div
        className="fashion_section"
        style={{ overflowY: "auto", backgroundColor: "#f0de6e" }}
      >
        <Menu />
        <div className="logo_section mb-2">
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
          <div className="container">
            <table class="table caption-top">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allUser.map((cur, index) => (
                  <tr>
                    <th scope="row" title={index + 1}>
                      {index + 1}
                    </th>
                    <td className="heading-avatar-icon" title="image">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        alt="userimage"
                      />
                    </td>
                    <td title={cur.name}>{cur.name}</td>
                    <td title={cur.email}>{cur.email}</td>
                    <td>
                      <button
                        class="btn btn-primary"
                        type="button"
                        disabled={loadingFriends.includes(cur._id)}
                        onClick={(e) => handleSubmit(e, cur.email, cur._id)}
                      >
                        {loadingFriends.includes(cur._id) && (
                          <span
                            class="spinner-border spinner-border-sm"
                            aria-hidden="true"
                          ></span>
                        )}
                        <span role="status" className="m-2">
                          Follow
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Contactcreation;
