import React, { useEffect, useState } from "react";
import { useCookies, withCookies } from "react-cookie";
import { isMobile } from "react-device-detect";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const Header = (props: any) => {
  // const { cookies } = props;
  const [cookies, setCookie, removeCookies] = useCookies();
  const { userInfo, setUserInfo } = useUserContext();
  const [menuOn, setMenuOn] = useState(false);
  const [searchOn, setSearchOn] = useState(false);
  const navigate = useNavigate();

  const handleSignout = () => {
    // cookies.remove("userInfo");
    removeCookies("userInfo");
    setUserInfo(null);
    navigate("/");
  };

  useEffect(() => {}, [userInfo]);

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo">
          <Link to="/">
            <img src="/img/logo.png" alt="" />
          </Link>
        </div>
        {!isMobile && (
          <div className="header__subcontainer">
            <div className="header__search">
              <input
                type="text"
                placeholder="Search items, collections, and creators"
              />
              <button type="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" />
                </svg>
              </button>
              <button type="button" className="close">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" />
                </svg>
              </button>
            </div>

            <ul className="header__nav">
              <li className="header__nav-item">
                <Link to="/explorer">
                  <div id={"explorer"} className="header__nav-link">
                    <img src="/img/icons/explore.svg" alt="" />
                    <p>Explorer</p>
                  </div>
                </Link>
              </li>
              <li className="header__nav-item">
                <Link to="/blog">
                  <div id={"blog"} className="header__nav-link">
                    <img src="/img/icons/news.svg" alt="" />
                    <p>News</p>
                  </div>
                </Link>
              </li>
              {!userInfo && (
                <li className="header__nav-item">
                  <Link to="/Signin">
                    <div id={"blog"} className="header__nav-link">
                      <img src="/img/icons/user.svg" alt="" />
                      <p>Sign in</p>
                    </div>
                  </Link>
                </li>
              )}
            </ul>
            {userInfo ? (
              <div className="header__actions">
                <div className="header__action header__action--search">
                  <button className="header__action-btn" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" />
                    </svg>
                  </button>
                </div>

                <div className="header__action header__action--profile">
                  <React.Fragment>
                    <a
                      className="header__profile-btn header__profile-btn--verified"
                      href="/#"
                      role="button"
                      id="dropdownMenuProfile"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {userInfo.user.avatar ? (
                        <img
                          // src={`${config.API_BASE_URL}/api/upload/get_file?path=${userInfo.user.avatar}`}
                          src={`${userInfo.user.avatar}`}
                          alt=""
                        />
                      ) : (
                        <img src="/img/avatars/avatar5.jpg" alt="" />
                      )}

                      <div>
                        <p
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontSize: 14,
                            fontWeight: 700,
                          }}
                        >
                          {userInfo.user.name}
                        </p>
                        <span
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontSize: 10,
                            fontWeight: 400,
                            letterSpacing: "0.15em",
                          }}
                        >
                          {userInfo.user.user_type === "ADMIN"
                            ? "ADMIN USER"
                            : userInfo.user.user_type === "SUPER"
                            ? "SUPER USER"
                            : "NORMAL USER"}
                        </span>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z" />
                      </svg>
                    </a>

                    <ul
                      className="dropdown-menu header__profile-menu"
                      aria-labelledby="dropdownMenuProfile"
                    >
                      <li>
                        <Link
                          to={
                            userInfo && userInfo.user.user_type === "ADMIN"
                              ? "/admin/activity"
                              : "/activity"
                          }
                        >
                          <img src="/img/icons/activity-white.svg" alt="" />
                          {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M3.71,16.29a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21,1,1,0,0,0-.21.33,1,1,0,0,0,.21,1.09,1.15,1.15,0,0,0,.33.21.94.94,0,0,0,.76,0,1.15,1.15,0,0,0,.33-.21,1,1,0,0,0,.21-1.09A1,1,0,0,0,3.71,16.29ZM7,8H21a1,1,0,0,0,0-2H7A1,1,0,0,0,7,8ZM3.71,11.29a1,1,0,0,0-1.09-.21,1.15,1.15,0,0,0-.33.21,1,1,0,0,0-.21.33.94.94,0,0,0,0,.76,1.15,1.15,0,0,0,.21.33,1.15,1.15,0,0,0,.33.21.94.94,0,0,0,.76,0,1.15,1.15,0,0,0,.33-.21,1.15,1.15,0,0,0,.21-.33.94.94,0,0,0,0-.76A1,1,0,0,0,3.71,11.29ZM21,11H7a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2ZM3.71,6.29a1,1,0,0,0-.33-.21,1,1,0,0,0-1.09.21,1.15,1.15,0,0,0-.21.33.94.94,0,0,0,0,.76,1.15,1.15,0,0,0,.21.33,1.15,1.15,0,0,0,.33.21,1,1,0,0,0,1.09-.21,1.15,1.15,0,0,0,.21-.33.94.94,0,0,0,0-.76A1.15,1.15,0,0,0,3.71,6.29ZM21,16H7a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z" />
                          </svg> */}
                          <span>Activity</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={
                            userInfo && userInfo.user.user_type === "ADMIN"
                              ? "/admin/activity"
                              : "/activity"
                          }
                        >
                          {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M3.71,16.29a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21,1,1,0,0,0-.21.33,1,1,0,0,0,.21,1.09,1.15,1.15,0,0,0,.33.21.94.94,0,0,0,.76,0,1.15,1.15,0,0,0,.33-.21,1,1,0,0,0,.21-1.09A1,1,0,0,0,3.71,16.29ZM7,8H21a1,1,0,0,0,0-2H7A1,1,0,0,0,7,8ZM3.71,11.29a1,1,0,0,0-1.09-.21,1.15,1.15,0,0,0-.33.21,1,1,0,0,0-.21.33.94.94,0,0,0,0,.76,1.15,1.15,0,0,0,.21.33,1.15,1.15,0,0,0,.33.21.94.94,0,0,0,.76,0,1.15,1.15,0,0,0,.33-.21,1.15,1.15,0,0,0,.21-.33.94.94,0,0,0,0-.76A1,1,0,0,0,3.71,11.29ZM21,11H7a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2ZM3.71,6.29a1,1,0,0,0-.33-.21,1,1,0,0,0-1.09.21,1.15,1.15,0,0,0-.21.33.94.94,0,0,0,0,.76,1.15,1.15,0,0,0,.21.33,1.15,1.15,0,0,0,.33.21,1,1,0,0,0,1.09-.21,1.15,1.15,0,0,0,.21-.33.94.94,0,0,0,0-.76A1.15,1.15,0,0,0,3.71,6.29ZM21,16H7a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z" />
                          </svg> */}
                          <img src="/img/icons/liked_white.svg" alt="" />
                          <span>Liked</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/author">
                          {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z" />
                          </svg> */}
                          <img src="/img/icons/user.svg" alt="" />
                          <span>Profile Settings</span>
                        </Link>
                      </li>

                      {/* <li><Link to="/create">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M10,13H4a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V14A1,1,0,0,0,10,13ZM9,19H5V15H9ZM20,3H14a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,20,3ZM19,9H15V5h4Zm1,7H18V14a1,1,0,0,0-2,0v2H14a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V18h2a1,1,0,0,0,0-2ZM10,3H4A1,1,0,0,0,3,4v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,10,3ZM9,9H5V5H9Z"/>
                        </svg>
                        <span>Add Asset</span></Link></li> */}
                      {/* {userInfo.user.user_type === "ADMIN" && ( */}
                      {userInfo.user.user_type === "ADMIN" && (
                        <>
                          <li className="border-top-item">
                            <Link to="/admin/settings">
                              <img src="/img/icons/user.svg" alt="" />
                              <span>Admin Settings</span>
                            </Link>
                          </li>
                          <li className="border-top-item">
                            <Link
                              to="/article/create"
                              style={{
                                borderTop:
                                  "1px solid rgba(255, 255, 255, 0.2);",
                              }}
                            >
                              <img src="/img/icons/plus-circle.svg" alt="" />
                              <span>New Article</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/collection/create">
                              <img src="/img/icons/plus-circle.svg" alt="" />
                              <span>New Collection</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/message/create">
                              <img src="/img/icons/plus-circle.svg" alt="" />
                              <span>New Email</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/admin/users">
                              <img src="/img/icons/users.svg" alt="" />
                              <span>See Users</span>
                            </Link>
                          </li>
                        </>
                      )}
                      <li className="border-top-item">
                        <a onClick={handleSignout}>
                          {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z" />
                          </svg> */}
                          <img src="/img/icons/log-out-white.svg" alt="" />
                          <span>Sign out</span>
                        </a>
                      </li>
                    </ul>
                  </React.Fragment>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        )}

        {isMobile && (
          <div>
            <ul className="header__nav">
              <li className="header__nav-item">
                <div
                  id={"search"}
                  className="header__nav-link"
                  onClick={() => setSearchOn(true)}
                >
                  <img src="/img/icons/search.svg" alt="" />
                </div>
              </li>
              <li className="header__nav-item">
                <div id={"user"} className="header__nav-link">
                  <img src="/img/icons/user.svg" alt="" />
                </div>
              </li>
              <li className="header__nav-item">
                <div
                  id={"menu"}
                  className="header__nav-link"
                  onClick={() => setMenuOn(true)}
                >
                  <img src="/img/icons/menu.svg" alt="" />
                </div>
              </li>
            </ul>
            {menuOn && (
              <div className="header__menu-mobile">
                <div className="header__menu-top">
                  {userInfo ? (
                    <div className="header__menu-user">
                      <div className="header__menu-user--logo">
                        {userInfo.user.avatar ? (
                          <img src={`${userInfo.user.avatar}`} alt="" />
                        ) : (
                          <img src="/img/avatars/avatar5.jpg" alt="" />
                        )}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div className="header__menu-user--info">
                          <p className="header__menu-user--name">
                            {userInfo.user.name}
                          </p>
                          <img src="/img/icons/verified.svg" alt="" />
                        </div>
                        <p className="header__menu-user--type">
                          {userInfo.user.user_type === "ADMIN"
                            ? "ADMIN USER"
                            : userInfo.user.user_type === "SUPER"
                            ? "SUPER USER"
                            : "NORMAL USER"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <img src="/img/logo.png" alt="" />
                  )}
                  <button onClick={() => setMenuOn(false)}> &times;</button>
                </div>
                {/* Menu Item Lists */}
                <div className="header__menu-items">
                  <div
                    className="header__menu-item"
                    onClick={() => {
                      setMenuOn(false);
                      navigate("/explorer");
                    }}
                  >
                    <div className="header__menu-item--container">
                      <img src="/img/icons/explore.svg" alt="" />
                      <p className="header__menu-text">Explore</p>
                    </div>
                    <img src="/img/icons/arrow-right.svg" alt="" />
                  </div>
                  <div
                    className="header__menu-item"
                    onClick={() => {
                      setMenuOn(false);
                      navigate("/blog");
                    }}
                  >
                    <div className="header__menu-item--container">
                      <img src="/img/icons/news.svg" alt="" />
                      <p className="header__menu-text">News</p>
                    </div>
                    <img src="/img/icons/arrow-right.svg" alt="" />
                  </div>
                  {userInfo && (
                    <>
                      <div
                        className="header__menu-item"
                        onClick={() => {
                          setMenuOn(false);
                          navigate("/activity");
                        }}
                      >
                        <div className="header__menu-item--container">
                          <img src="/img/icons/activity-white.svg" alt="" />
                          <p className="header__menu-text">Activity</p>
                        </div>
                        <img src="/img/icons/arrow-right.svg" alt="" />
                      </div>
                      <div
                        className="header__menu-item"
                        onClick={() => {
                          setMenuOn(false);
                          navigate("/blog");
                        }}
                      >
                        <div className="header__menu-item--container">
                          <img src="/img/icons/liked_white.svg" alt="" />
                          <p className="header__menu-text">Liked</p>
                        </div>
                        <img src="/img/icons/arrow-right.svg" alt="" />
                      </div>
                      <div
                        className="header__menu-item"
                        onClick={() => {
                          setMenuOn(false);
                          navigate("/author");
                        }}
                      >
                        <div className="header__menu-item--container">
                          <img src="/img/icons/user.svg" alt="" />
                          <p className="header__menu-text">Profile Settings</p>
                        </div>
                        <img src="/img/icons/arrow-right.svg" alt="" />
                      </div>
                      {userInfo.user.user_type === "ADMIN" && (
                        <div
                          className="header__menu-item"
                          style={{ flexDirection: "column", height: "auto" }}
                        >
                          <div
                            className="header__menu-item--container"
                            style={{
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <div style={{ display: "flex", borderTop: "none" }}>
                              <img src="/img/icons/settings.svg" alt="" />
                              <p className="header__menu-text">Admin menu</p>
                            </div>
                            <div style={{ marginTop: -10, marginBottom: 20 }}>
                              <div
                                className="admin__menu-item"
                                style={{ borderTop: "none" }}
                                onClick={() => {
                                  setMenuOn(false);
                                  navigate("/");
                                }}
                              >
                                <img src="/img/icons/plus-circle.svg" alt="" />
                                <p className="admin__menu-text">New Article</p>
                              </div>
                              <div
                                className="admin__menu-item"
                                onClick={() => {
                                  setMenuOn(false);
                                  navigate("/");
                                }}
                              >
                                <img src="/img/icons/plus-circle.svg" alt="" />
                                <p className="admin__menu-text">
                                  New Collection
                                </p>
                              </div>
                              <div
                                className="admin__menu-item"
                                onClick={() => {
                                  setMenuOn(false);
                                  navigate("/");
                                }}
                              >
                                <img src="/img/icons/plus-circle.svg" alt="" />
                                <p className="admin__menu-text">New Email</p>
                              </div>
                              <div
                                className="admin__menu-item"
                                onClick={() => {
                                  setMenuOn(false);
                                  navigate("/");
                                }}
                              >
                                <img src="/img/icons/users.svg" alt="" />
                                <p className="admin__menu-text">See Users</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                {/* Sign buttons */}
                <div style={{ padding: "30px 20px" }}>
                  {userInfo ? (
                    <button
                      className="sign__btn-second"
                      type="button"
                      onClick={() => {
                        handleSignout();
                        setMenuOn(false);
                        navigate("/");
                      }}
                    >
                      <img src="/img/icons/log-out-white.svg" alt="" />
                      Sign out
                    </button>
                  ) : (
                    <button
                      className="sign__btn"
                      type="button"
                      onClick={() => navigate("/signin")}
                    >
                      <img src="/img/icons/log_in.svg" alt="" />
                      Sign in
                    </button>
                  )}
                </div>
              </div>
            )}
            {searchOn && (
              <div className="header__search-mobile">
                <div className="header__search-top">
                  <div className="header__search">
                    <input
                      type="text"
                      placeholder="Search Backstage marketplace"
                    />
                    <button type="button">
                      <svg
                        fill="#642d2d"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" />
                      </svg>
                    </button>
                  </div>
                  <button onClick={() => setSearchOn(false)}> &times;</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default withCookies(Header);
