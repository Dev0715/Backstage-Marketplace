import React from "react";

import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../context/UserContext";
const Nftevents = () => {
  const { userInfo } = useUserContext();
  return (
    <div className="home">
      <div className="home__content">
        {!isMobile ? (
          <h1 className="home__title">
            Welcome to the Backstage <br /> events NFT marketplace
          </h1>
        ) : (
          <h1 className="home__title">
            Welcome to the <br /> Backstage events NFT <br /> marketplace
          </h1>
        )}
        <p className="home__text">
          A decentralized Ecosystem powering the events industry
        </p>
        <div className="home__btns">
          <Link to="/explorer" className="home__btn">
            Explore
          </Link>
          {!userInfo ? (
            <React.Fragment>
              <Link to="/Signin" className="home__btn-blank">
                Sign in
              </Link>
            </React.Fragment>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Nftevents;
