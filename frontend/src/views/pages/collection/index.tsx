import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getCollectionById,
  getEventCardInCollection,
} from "../../../helper/event";
import config from "../../../helper/config";
import CollectionComp from "../../../components/collection";
import { useUserContext } from "../../../context/UserContext";

const PageCollection = () => {
  const { id } = useParams();
  const [eventCards, setEventCards] = useState([]);
  const [collection, setCollection] = useState<any>({});
  const [collectionId, setCollectionId] = useState<any>();
  const [tcur, setTcur] = useState(0);
  const [cur, setCur] = useState(0);
  const { userInfo } = useUserContext();

  const leftClick = () => {
    if (tcur > 0) setTcur(tcur - 1);
  };

  const rightClick = () => {
    if ((tcur + 4) * 5 < eventCards.length) setTcur(tcur + 1);
  };

  useEffect(() => {
    setCollectionId(id);
    getCollectionById(id).then((res) => {
      if (res.success) {
        console.log(res.collection);
        setCollection(res.collection);
      }
    });
    getEventCardInCollection(id).then((res) => {
      console.log(res);
      if (res.success) {
        console.log(res.eventcards);
        setEventCards(res.eventcards);
      }
    });
  }, [id]);

  return (
    <div style={{ marginBottom: 70, marginTop: 70 }}>
      <div
        className="main__author"
        style={{
          backgroundImage: `url(${config.API_BASE_URL}/api/upload/get_file?path=${collection.picture_large})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        &nbsp;
      </div>
      <div className="container">
        <div className="row row--grid">
          <div className="col-12 col-xl-3">
            <div className="author author--page">
              <div className="author__meta">
                <Link
                  to="/author"
                  className="author__avatar author__avatar--verified"
                >
                  <img
                    src={`${config.API_BASE_URL}/api/upload/get_file?path=${collection.picture_small}`}
                    height={160}
                    alt=""
                  />
                </Link>
                <h1 className="author__name">
                  <Link to="#">{collection?.name}</Link>
                </h1>
                <h2 className="author__nickname">
                  <Link to="/author">@{collection?.creator?.name}</Link>
                </h2>
              </div>
              {userInfo &&
              (userInfo.user.user_type === "ADMIN" ||
                userInfo.user.user_type === "SUPER") ? (
                <div className="col-12">
                  <Link to={`/event/eventcard/create/${collection.id}`}>
                    <button
                      type="button"
                      className="sign__btn"
                      // onClick={handleCreate}
                    >
                      Create Event
                    </button>
                  </Link>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="col-12 col-xl-9">
            <div className="row row--grid">
              {eventCards.map((eventcard: any, index) => {
                const addons =
                  eventcard.addons === "" ? [] : JSON.parse(eventcard.addons);
                let addonPrice = 0;
                addons.forEach((addon: any) => {
                  addonPrice += Number(addon.price);
                });
                if (index >= (tcur + cur) * 5 && index < (tcur + cur + 1) * 5)
                  return (
                    <div className="col-12 col-sm-6 col-lg-4">
                      <div
                        className="card"
                        style={{ height: 460, width: 260, marginLeft: 20 }}
                      >
                        <Link
                          to={`/event/eventcard/${eventcard.id}`}
                          className="card__cover"
                        >
                          <img
                            src={`${config.API_BASE_URL}/api/upload/get_file?path=${eventcard.picture_small}`}
                            alt=""
                          />
                        </Link>
                        <h3 className="card__title">
                          <Link to={`/event/eventcard/${eventcard.id}`}>
                            {eventcard.name}
                          </Link>
                        </h3>

                        <div className="card__author card__author--verified">
                          <img src={`${eventcard.creator.avatar}`} alt="" />
                          <Link to="/author">@{eventcard.creator.name}</Link>
                        </div>

                        {addons.length ? (
                          <div className="card__info">
                            <div className="addon-box">
                              {addons.map((addon: any) => (
                                <img
                                  src={addon.icon}
                                  alt={addon.name}
                                  width={20}
                                />
                              ))}
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}

                        <div className="card__info">
                          <div className="card__price">
                            <span>Reserve price</span>
                            <span>{eventcard.price + addonPrice} €</span>
                          </div>

                          <button className="card__likes" type="button">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z" />
                            </svg>
                            <span>189</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
              })}
            </div>

            <div className="row row--grid">
              <div className="col-12">
                <div
                  className="paginator"
                  style={{ width: 926, marginLeft: 20 }}
                >
                  <span className="paginator__pages">{`${
                    eventCards.length > 5 ? 5 : eventCards.length
                  } from ${eventCards.length}`}</span>

                  <ul className="paginator__list">
                    <li>
                      <a onClick={leftClick}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z" />
                        </svg>
                      </a>
                    </li>

                    <li className={cur === 0 ? "active" : ""}>
                      <a onClick={() => setCur(0)}>{tcur + 1}</a>
                    </li>

                    {(tcur + 1) * 5 < eventCards.length ? (
                      <li className={cur === 1 ? "active" : ""}>
                        <a onClick={() => setCur(1)}>{tcur + 2}</a>
                      </li>
                    ) : (
                      <></>
                    )}

                    {(tcur + 2) * 5 < eventCards.length ? (
                      <li className={cur === 2 ? "active" : ""}>
                        <a onClick={() => setCur(2)}>{tcur + 3}</a>
                      </li>
                    ) : (
                      <></>
                    )}

                    {(tcur + 3) * 5 < eventCards.length ? (
                      <li className={cur === 3 ? "active" : ""}>
                        <a onClick={() => setCur(3)}>{tcur + 4}</a>
                      </li>
                    ) : (
                      <></>
                    )}

                    <li>
                      <a onClick={rightClick}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="row row--grid">
          <div className="col-12">
            <div className="main__title">
              <h2>Hot collections</h2>
            </div>
          </div>
          <div className="col-12">
            <div className="main__carousel-wrap">
              <div
                className="main__carousel main__carousel--collections owl-carousel owl-loaded"
                id="collections"
              >
                <div
                  className="owl-stage-outer owl-height"
                  style={{ height: 249 }}
                >
                  <div
                    className="owl-stage"
                    style={{
                      transform: "translate3d(-1330, 0, 0)",
                      transition: "all 0s ease 0s",
                      width: "4522",
                    }}
                  >
                    <CollectionComp collectionId={collectionId} />
                  </div>
                </div>
                <div className="owl-nav disabled">
                  <button
                    type="button"
                    role="presentation"
                    className="owl-prev"
                  >
                    <span aria-label="Previous">�</span>
                  </button>
                  <button
                    type="button"
                    role="presentation"
                    className="owl-next"
                  >
                    <span aria-label="Next">�</span>
                  </button>
                </div>
                <div className="owl-dots disabled" />
              </div>

              <button
                className="main__nav main__nav--prev"
                data-nav="#collections"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z" />
                </svg>
              </button>
              <button
                className="main__nav main__nav--next"
                data-nav="#collections"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PageCollection;
