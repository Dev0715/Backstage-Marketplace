import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import DeletePopper from "../../../components/DeletePopper";
import EventCountDown from "../../../components/event_countdown";
import { useUserContext } from "../../../context/UserContext";
import config from "../../../helper/config";
import {
  deleteEventCardById,
  getLatestEventCards,
  updateEventLike,
} from "../../../helper/event";
import { getEventPrice } from "../../../utils";

const Lastevents = () => {
  const { userInfo } = useUserContext();
  const [latestEvents, setLatestEvents] = useState([]);
  const [deletePopupStatus, setDeletePopupStatus] = useState(false);
  const latestEventCarousel = useRef<typeof OwlCarousel>(null);

  useEffect(() => {
    console.log("Is Mobile??? ", isMobile);
    getLatestEventCards().then((res) => {
      if (res.success) {
        console.log(res.eventcards);
        setLatestEvents(res.eventcards);
      }
    });
  }, []);

  const handleDeleteEventCard = (eventCardId: string) => {
    deleteEventCardById(eventCardId)
      .then((res) => {
        if (res) {
          const updatedEvents = [...latestEvents].filter(
            (article: any) => article.id !== eventCardId
          );
          setLatestEvents(updatedEvents);
        }
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
      likes = JSON.parse((latestEvents[index] as any).likes_number);
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
      id: (latestEvents[index] as any).id,
      likes_number: JSON.stringify(likes),
    }).then((res) => {
      if (res.success) {
        const _eventCards = [...latestEvents];
        (_eventCards[index] as any).likes_number = JSON.stringify(likes);
        setLatestEvents(_eventCards);
      }
    });
  };

  const titleHeader = () => {
    return (
      <div
        className="col-12"
        style={{ padding: 0, paddingLeft: isMobile ? 15 : 0 }}
      >
        <div className="main__sub--title">Latest Events</div>
      </div>
    );
  };

  const next = (eleRf: any) => {
    const ele: any = eleRf.current;
    ele.next(500);
  };

  const prev = (eleRf: any) => {
    const ele: any = eleRf.current;
    ele.prev(500);
  };

  return (
    <section className="row row--grid" style={{ margin: 0, padding: 0 }}>
      {titleHeader()}
      {latestEvents.length > 0 ? (
        <div className="col-12" style={{ padding: 0 }}>
          <div className="carousel-wrapper">
            <div className="nav-wrapper">
              <button
                className="main__nav main__nav--prev"
                style={{ right: 65 }}
                type="button"
                onClick={() => prev(latestEventCarousel)}
              >
                <svg
                  width="45"
                  height="45"
                  viewBox="0 0 45 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="22.3677"
                    cy="22.9785"
                    r="22"
                    transform="rotate(-180 22.3677 22.9785)"
                    fill="#14142F"
                  />
                  <circle
                    cx="22.3677"
                    cy="22.9785"
                    r="21.5"
                    transform="rotate(-180 22.3677 22.9785)"
                    stroke="white"
                    stroke-opacity="0.33"
                  />
                  <path
                    d="M25.3677 16.9785L19.3677 22.9785L25.3677 28.9785"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button
                className="main__nav main__nav--next"
                style={{ right: 5 }}
                type="button"
                onClick={() => next(latestEventCarousel)}
              >
                <svg
                  width="45"
                  height="45"
                  viewBox="0 0 45 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="22.3677" cy="22.9785" r="22" fill="#14142F" />
                  <circle
                    cx="22.3677"
                    cy="22.9785"
                    r="21.5"
                    stroke="white"
                    stroke-opacity="0.33"
                  />
                  <path
                    d="M19.3677 28.9785L25.3677 22.9785L19.3677 16.9785"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
            <OwlCarousel
              className="owl-theme"
              margin={isMobile ? 15 : 30}
              items={isMobile ? 1 : 4}
              autoplay={!deletePopupStatus}
              dots={isMobile ? false : true}
              loop={latestEvents.length < 4 ? (isMobile ? true : false) : true}
              ref={latestEventCarousel as any}
            >
              {latestEvents.map((eventcard: any, i) => {
                // const addons =
                //   eventcard.addons === "" ? [] : JSON.parse(eventcard.addons);
                return (
                  <div key={i} className="card">
                    {userInfo && userInfo.user.user_type === "ADMIN" ? (
                      <DeletePopper
                        setDeletePopupStatus={setDeletePopupStatus}
                        onClickDelete={() => {
                          handleDeleteEventCard(eventcard.id);
                        }}
                      />
                    ) : (
                      ""
                    )}
                    <Link
                      to={`/event/eventcard/${eventcard.id}`}
                      className="card__cover"
                    >
                      <img
                        src={`${config.API_BASE_URL}/api/upload/get_file?path=${eventcard.picture_small}`}
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
                      <div className="card__title">
                        <Link to={`/event/eventcard/${eventcard.id}`}>
                          {eventcard.name}
                        </Link>
                        <EventCountDown
                          date={new Date(eventcard.date).toISOString()}
                        />
                      </div>
                      <div className="text__location">
                        <div className="text__location-item">
                          <p className="text__location-key">Date</p>
                          <p className="text__location-val">
                            {
                              new Date(eventcard.date)
                                .toISOString()
                                .toString()
                                .split("T")[0]
                            }
                          </p>
                        </div>
                        <div className="text__location-item">
                          <p className="text__location-key">Location</p>
                          <p className="text__location-val">
                            {eventcard.location}
                          </p>
                        </div>
                      </div>

                      <div className="card__info">
                        <div className="card__price">
                          <p className="text__location-key">Current price</p>
                          <p className="text__location-price">
                            {getEventPrice(eventcard)} €
                          </p>
                        </div>

                        <button
                          className="card__likes"
                          type="button"
                          onClick={() => onClickLike(i)}
                        >
                          {userInfo && eventcard.likes_number &&
                          eventcard.likes_number.includes(userInfo.user.id) ? (
                            <img src="/img/icons/liked_blue.svg" alt="" />
                          ) : (
                            <img src="/img/icons/liked_white.svg" alt="" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </OwlCarousel>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default Lastevents;
