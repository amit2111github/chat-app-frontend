import React from "react";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";
import "../style/footer.css";
const Footer = () => {
  return (
    <div
      className="footer_section layout_padding"
      style={{ paddingTop: "10px" }}
    >
      <div className="container">
        <div className="footer_logo">
          <a href>
            <img
              alt="logo"
              src="https://fontmeme.com/permalink/211220/293d7532b26cd531b84fcc2c6d4fa661.png"
            />
          </a>
        </div>
        <div className="footer_menu">
          <ul>
            <li style={{ listStyleType: "none" }}>
              <FaTwitter />
              <span style={{ marginLeft: "10px" }}>Twitter</span>
            </li>
            <li style={{ listStyleType: "none" }}>
              <FaFacebook />
              <span style={{ marginLeft: "10px" }}>Facebook</span>
            </li>
            <li style={{ listStyleType: "none" }}>
              <FaMailBulk />
              <span style={{ marginLeft: "10px" }}>Mail</span>
            </li>
            <li style={{ listStyleType: "none" }}>
              <FaInstagram />
              <span style={{ marginLeft: "10px" }}>Instagram</span>
            </li>
            <li>
              <FaYoutube />
              <span style={{ marginLeft: "10px" }}>Youtube</span>
            </li>
          </ul>
        </div>
        <div className="location_main">
          Help Line Number : <a href>+1 1800 1200 1200</a>
        </div>
        <p class="copyright_text">
          © {new Date().getFullYear()} All Rights Reserved. Design by
          <a
            href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new"
            style={{ textDecoration: "none" }}
          >
            @ Amit
          </a>
        </p>
      </div>
    </div>
  );
};
export default Footer;
