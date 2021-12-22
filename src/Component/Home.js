import React from "react";
import Footer from "./Footer";
import Menu from "./Menu";
import "../style/cardStyle.css";
// import Post from "./Post";
import PostSection from "./PostSection"

const Home = ({ history }) => {
  return (
    <>
      <div
        className="fashion_section"
        style={{ backgroundColor: "#d99c02", overflow: "hidden" }}
      >
        <Menu />
        <div className="logo_section mb-2">
          {/* // logo section */}
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="logo">
                  <a href="/">
                    <img
                      alt="eflyer"
                      style={{ maxwidth: "100%" }}
                      src="https://fontmeme.com/permalink/211220/293d7532b26cd531b84fcc2c6d4fa661.png"
                    />
                  </a>
                </div>
              </div>
            </div>
            <PostSection history={history} />
          </div>
          {/* logo ends here */}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Home;
