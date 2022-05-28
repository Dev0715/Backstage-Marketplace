import React from "react";

import { Link } from "react-router-dom";
import { useUserContext } from "../../../context/UserContext";

const Nftevents = () => {
  const { userInfo } = useUserContext();
  return (
    <div
      className="home"
      style={{
        background: `url('/img/home_new/back (${Math.floor(Math.random() * 5) +
          1}).jpg') no-repeat bottom center/cover`,
        height: "400px",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="home__content">
              <h1 className="home__title">The events NFT marketplace</h1>
              <p className="home__text">
                A decentralized Ecosystems <br /> powering the events industry
              </p>
              <div className="home__btns">
                <Link to="/explorer" className="home__btn home__btn--clr">
                  Explore
                </Link>
                {!userInfo ? (
                  <React.Fragment>
                    <Link to="/Signin" className="home__btn">
                      Sign in
                    </Link>
                  </React.Fragment>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nftevents;
