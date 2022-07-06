import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import DeletePopper from "../../../components/DeletePopper";
import { useUserContext } from "../../../context/UserContext";
import config from "../../../helper/config";
import { deleteEventCardById, getAllEventCards, updateEventLike } from "../../../helper/event";
import { getEventPrice } from "../../../utils";

const PageExplorer = () => {
  const { userInfo } = useUserContext();
  const [events, setEvents] = useState([]);
  const [tcur, setTcur] = useState(0);
  const [cur, setCur] = useState(0);
  const [currentTag, setCurrentTag] = useState("all");
  const [currentBtn, setCurrentBtn] = useState("");

  const leftClick = () => {
    if (tcur > 0) setTcur(tcur - 1);
  };

  const rightClick = () => {
    if ((tcur + 4) * 8 < events.length) setTcur(tcur + 1);
  };

  useEffect(() => {
    getAllEventCards().then((res) => {
      if (res.success) {
        console.log(res.eventcards);
        setEvents(res.eventcards);
      }
    });
  }, []);

  const handleDeleteEventCard = (eventCardId: string) => {
    deleteEventCardById(eventCardId)
      .then((res) => {
        const updatedEvents = [...events].filter(
          (article: any) => article.id !== eventCardId
        );
        setEvents(updatedEvents);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickLike = (index: number) => {
    // if (!userInfo) 
    return;
    let likes: any[] = [];
    try {
      likes = JSON.parse((events[index] as any).likes_number);
    } catch (err) {
      likes = [];
      console.log(err);
    }
    if (typeof likes !== "object") likes = [];
    console.log(likes);
    const userId = userInfo.user.id;
    if (likes.includes(userId)) {
      const index = likes.indexOf(userId);
      likes.splice(index, 1);
    } else {
      likes.push(userId);
    }
    updateEventLike({
      id: (events[index] as any).id,
      likes_number: JSON.stringify(likes),
    }).then((res) => {
      if (res.success) {
        const _eventCards = [...events];
        (_eventCards[index] as any).likes_number = JSON.stringify(likes);
        setEvents(_eventCards);
      }
    });
  };

  return (
    <div
      className="container"
      style={{
        marginTop: isMobile ? 30 : 70,
        marginBottom: 70,
        padding: isMobile ? 0 : 25,
        zIndex: 999,
      }}
    >
      <div className="explorer__top">
        <p className="explorer__top-title">Explore</p>
        <div className="explorer__top-main">
          <div className="explorer__top-tags">
            <button
              className={
                currentTag === "all"
                  ? "explorer__top-active--tag"
                  : "explorer__top-inactive--tag"
              }
              onClick={() => setCurrentTag("all")}
            >
              All
            </button>
            {/* <button
              className={
                currentTag === "top"
                  ? "explorer__top-active--tag"
                  : "explorer__top-inactive--tag"
              }
              onClick={() => setCurrentTag("top")}
            >
              Top
            </button>
            <button
              className={
                currentTag === "trending"
                  ? "explorer__top-active--tag"
                  : "explorer__top-inactive--tag"
              }
              onClick={() => setCurrentTag("trending")}
            >
              Trending
            </button>
            <button
              className={
                currentTag === "events"
                  ? "explorer__top-active--tag"
                  : "explorer__top-inactive--tag"
              }
              onClick={() => setCurrentTag("events")}
            >
              Events
            </button>
            <button
              className={
                currentTag === "art"
                  ? "explorer__top-active--tag"
                  : "explorer__top-inactive--tag"
              }
              onClick={() => setCurrentTag("art")}
            >
              Art
            </button> */}
          </div>
          <div className="explorer__top-buttons">
            <div className="explorer__top-btn--group">
              <button
                className={
                  currentBtn === "filter"
                    ? "explorer__top-active--btn"
                    : "explorer__top-inactive--btn"
                }
                onClick={() =>
                  currentBtn === ""
                    ? setCurrentBtn("filter")
                    : setCurrentBtn("")
                }
              >
                <img src="/img/icons/filter.svg" alt="" />
                <p className="explorer__btn-text">Filter</p>
                {!isMobile && <img src="/img/icons/dropdown.svg" alt="" />}
              </button>
              {currentBtn === "filter" && (
                <div
                  className={
                    isMobile
                      ? "explorer__top-btn-opts-mb"
                      : "explorer__top-btn-opts"
                  }
                >
                  <div className="explorer__top-checkbox">
                    <input
                      id="recent"
                      name="recent"
                      type="checkbox"
                      defaultChecked
                    />
                    <label htmlFor="recent">Recently Listed</label>
                  </div>
                  <div className="explorer__top-checkbox">
                    <input id="newest" name="newest" type="checkbox" />
                    <label htmlFor="newest">Newest</label>
                  </div>
                  <div className="explorer__top-checkbox">
                    <input id="lowest" name="lowest" type="checkbox" />
                    <label htmlFor="lowest">Lowest</label>
                  </div>
                  <div className="explorer__top-checkbox">
                    <input id="likes" name="likes" type="checkbox" />
                    <label htmlFor="likes">Most Likes</label>
                  </div>
                </div>
              )}
            </div>
            <div className="explorer__top-btn--group">
              <button
                className={
                  currentBtn === "sort"
                    ? "explorer__top-active--btn"
                    : "explorer__top-inactive--btn"
                }
                onClick={() =>
                  currentBtn === "" ? setCurrentBtn("sort") : setCurrentBtn("")
                }
              >
                <img src="/img/icons/sort.svg" alt="" />
                <p className="explorer__btn-text">Sort</p>
                {!isMobile && <img src="/img/icons/dropdown.svg" alt="" />}
              </button>
              {currentBtn === "sort" && (
                <div className="explorer__top-btn-opts">
                  <div className="explorer__top-checkbox">
                    <input
                      id="recent"
                      name="recent"
                      type="checkbox"
                      defaultChecked
                    />
                    <label htmlFor="recent">Recently Listed</label>
                  </div>
                  <div className="explorer__top-checkbox">
                    <input id="newest" name="newest" type="checkbox" />
                    <label htmlFor="newest">Newest</label>
                  </div>
                  <div className="explorer__top-checkbox">
                    <input id="lowest" name="lowest" type="checkbox" />
                    <label htmlFor="lowest">Lowest</label>
                  </div>
                  <div className="explorer__top-checkbox">
                    <input id="likes" name="likes" type="checkbox" />
                    <label htmlFor="likes">Most Likes</label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={isMobile ? " " : "row row--grid"}
        style={{
          width: "calc(100% + 20px)",
          marginRight: -10,
          paddingRight: 0,
          marginLeft: 0,
        }}
      >
        {events.map((eventCard: any, i) => {
          if (i >= (tcur + cur) * 8 && i < (tcur + cur + 1) * 8)
            return (
              <div
                key={`explorer_event_${i}`}
                className={
                  isMobile
                    ? "explorer__card-item"
                    : "col-12 col-sm-6 col-lg-4 col-xl-3"
                }
                style={{ padding: 0 }}
              >
                <div
                  className="card"
                  style={{
                    height: 454,
                    width: 288,
                    marginRight: isMobile ? 0 : 30,
                  }}
                >
                  {userInfo && userInfo.user.user_type === "ADMIN" ? (
                    <DeletePopper
                      setDeletePopupStatus={() => {}}
                      onClickDelete={() => {
                        handleDeleteEventCard(eventCard.id);
                      }}
                    />
                  ) : (
                    ""
                  )}
                  <Link
                    to={`/event/eventcard/${eventCard.id}`}
                    className="card__cover"
                  >
                    <img
                      src={`${config.API_BASE_URL}/api/upload/get_file?path=${eventCard.picture_small}`}
                      alt=""
                    />
                  </Link>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}
                  >
                    <h3 className="explorer__card-title">
                      <Link to={`/event/eventcard/${eventCard.id}`}>
                        {eventCard.name}
                      </Link>
                    </h3>
                    <div className="text__location">
                      <div className="text__location-item">
                        <p className="text__card-key">Collection</p>
                        <div className="card__author">
                          <img src="/img/avatars/avatar5.jpg" alt="" />
                          <Link to="/author">cName</Link>
                        </div>
                      </div>
                      <div className="text__location-item">
                        <p className="text__card-key">Creator</p>
                        <div className="card__author">
                          {eventCard.creator.avatar ? (
                            <img
                              // src={`${config.API_BASE_URL}/api/upload/get_file?path=${eventCard.creator.avatar}`}
                              src={`${eventCard.creator.avatar}`}
                              alt=""
                            />
                          ) : (
                            <img src="/img/avatars/avatar.jpg" alt="" />
                          )}
                          <Link to="/author">{eventCard.creator.name}</Link>
                        </div>
                      </div>
                    </div>

                    <div className="card__explorer-info">
                      <div className="card__price">
                        <p className="text__location-key">Reserve price</p>
                        <p className="text__location-price">
                          {getEventPrice(eventCard)} €
                        </p>
                      </div>

                      <button
                        className="card__likes"
                        type="button"
                        onClick={() => onClickLike(i)}
                      >
                        {userInfo && eventCard.likes_number &&
                        eventCard.likes_number.includes(userInfo.user.id) ? (
                          <img src="/img/icons/liked_blue.svg" alt="" />
                        ) : (
                          <img src="/img/icons/liked_white.svg" alt="" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          return <></>;
        })}
      </div>

      {!isMobile && (
        <div className="paginator" style={{ width: 1224 }}>
          <span className="paginator__pages">
            {`Showing ${events.length > 8 ? 8 : events.length} out of ${
              events.length
            } results`}
          </span>
          <ul className="paginator__list">
            <li>
              <button onClick={leftClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z" />
                </svg>
              </button>
            </li>

            <li className={cur === 0 ? "active" : ""}>
              <button onClick={() => setCur(0)}>{tcur + 1}</button>
            </li>

            {(tcur + 1) * 8 < events.length ? (
              <li className={cur === 1 ? "active" : ""}>
                <button onClick={() => setCur(1)}>{tcur + 2}</button>
              </li>
            ) : (
              <></>
            )}

            {(tcur + 2) * 8 < events.length ? (
              <li className={cur === 2 ? "active" : ""}>
                <button onClick={() => setCur(2)}>{tcur + 3}</button>
              </li>
            ) : (
              <></>
            )}

            {(tcur + 3) * 8 < events.length ? (
              <li className={cur === 3 ? "active" : ""}>
                <button onClick={() => setCur(3)}>{tcur + 4}</button>
              </li>
            ) : (
              <></>
            )}

            <li>
              <button onClick={rightClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z" />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      )}
      {!isMobile && <div style={{ height: 350 }}></div>}
    </div>
  );
};

export default PageExplorer;
