import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Link, useParams } from "react-router-dom";
// import CollectionComp from "../../../components/collection";
import { useUserContext } from "../../../context/UserContext";
import config from "../../../helper/config";
import {
  getCollectionById,
  getEventCardInCollection,
  updateEventLike,
} from "../../../helper/event";
import { getEventPrice } from "../../../utils";

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

  const onClickLike = (index: number) => {
    // if (!userInfo) 
    return;
    let likes: any[] = [];
    try {
      likes = JSON.parse((eventCards[index] as any).likes_number);
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
      id: (eventCards[index] as any).id,
      likes_number: JSON.stringify(likes),
    }).then((res) => {
      if (res.success) {
        const _eventCards = [...eventCards];
        (_eventCards[index] as any).likes_number = JSON.stringify(likes);
        setEventCards(_eventCards);
      }
    });
  };

  return (
    <div
      style={{
        marginBottom: 70,
        marginTop: isMobile ? 0 : 20,
        width: isMobile ? "100%" : 1224,
        zIndex: 999,
      }}
    >
      {/* banner image */}
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
      <div
        className="container"
        style={{
          padding: isMobile ? "0px 25px" : 0,
          maxWidth: 1224,
        }}
      >
        <div
          className={isMobile ? " " : "row row--grid"}
          style={{ width: "100%", marginLeft: 0 }}
        >
          {/* Author */}
          <div className="col-12 col-xl-4" style={{ padding: 0 }}>
            <div className="collection__author-meta">
              <Link to="/author" className="collection__author-avatar">
                {userInfo && userInfo.user && userInfo.user.avatar ? (
                  <img
                    src={`${config.API_BASE_URL}/api/upload/get_file?path=${collection.picture_small}`}
                    alt=""
                  />
                ) : (
                  <img src="/img/avatars/avatar5.jpg" alt="" />
                )}
              </Link>
              <h1 className="collection__author-name">
                <Link to="#">{collection?.name}</Link>
                <div className="sellers-list__author--verified" />
              </h1>
              <h2 className="collection__author-nickname">
                {userInfo && userInfo.user.user_type === "NORMAL" ? (
                  <span>by</span>
                ) : (
                  <></>
                )}
                <Link to="/author">@{collection?.creator?.name}</Link>
              </h2>
              <p className="collection__author-description">
                {collection?.description}
              </p>
              {userInfo && userInfo.user.user_type === "NORMAL" ? (
                <>
                  <div style={{ display: "flex", width: "100%" }}>
                    <div style={{ width: "50%" }}>
                      <p className="collection__author-key">Items</p>
                      <p className="collection__author-val">315</p>
                    </div>
                    <div>
                      <p className="collection__author-key">Owners</p>
                      <p className="collection__author-val">98</p>
                    </div>
                  </div>

                  {!isMobile && (
                    <div style={{ display: "flex", width: "100%" }}>
                      <div style={{ width: "50%" }}>
                        <p className="collection__author-key">Placeholder</p>
                        <p className="collection__author-val">Value</p>
                      </div>
                      <div>
                        <p className="collection__author-key">Placeholder</p>
                        <p className="collection__author-val">Value</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
            {userInfo &&
            (userInfo.user.user_type === "ADMIN" ||
              userInfo.user.user_type === "SUPER") ? (
              <div style={{ padding: "20px 0px", maxWidth: 390 }}>
                <Link to={`/event/eventcard/create/${collection.id}`}>
                  <button
                    type="button"
                    className="sign__btn"
                    // onClick={handleCreate}
                  >
                    Create Item
                  </button>
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>
          {/* Lists */}
          <div className={isMobile ? " " : "col-12 col-xl-8"}>
            <div className={isMobile ? " " : "row row--grid"}>
              {eventCards.map((eventcard: any, index) => {
                const addons =
                  eventcard.addons === "" ? [] : JSON.parse(eventcard.addons);
                if (index >= (tcur + cur) * 5 && index < (tcur + cur + 1) * 5)
                  return (
                    <div
                      className="col-12 col-sm-6 col-lg-4"
                      style={{
                        display: "flex",
                        justifyContent: isMobile ? "center" : "flex-end",
                        paddingRight: 0,
                        paddingLeft: 0,
                      }}
                    >
                      <div
                        className="collection__card"
                        // style={{ height: 460, width: 260, marginLeft: 20 }}
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
                        <h3 className="collection__card-title">
                          <Link to={`/event/eventcard/${eventcard.id}`}>
                            {eventcard.name}
                          </Link>
                        </h3>
                        <div
                          style={{
                            marginLeft: 20,
                            paddingBottom: 25,
                          }}
                        >
                          <p className="collection__card-key">creator</p>
                          <div className="collection__card-author">
                            <img src={`${eventcard.creator.avatar}`} alt="" />
                            <Link to="/author">@{eventcard.creator.name}</Link>
                            <div className="sellers-list__author--verified" />
                          </div>
                        </div>
                        <div className="addon-box">
                          {addons.length ? (
                            addons.map((addon: any) => (
                              <img
                                src={addon.icon}
                                alt={addon.name}
                                width={20}
                              />
                            ))
                          ) : (
                            <></>
                          )}{" "}
                        </div>

                        <div
                          className="card__info"
                          style={{ paddingLeft: 20, paddingRight: 20 }}
                        >
                          <div>
                            <p className="collection__card-key">
                              Reserve price
                            </p>
                            <p
                              style={{
                                color: "#fff",
                                fontSize: 24,
                                fontWeight: 700,
                                letterSpacing: 1,
                              }}
                            >
                              {getEventPrice(eventcard)} €
                            </p>
                          </div>

                          <button
                            className="collection__card-likes"
                            type="button"
                            onClick={() => onClickLike(index)}
                          >
                            {userInfo && eventcard.likes_number &&
                            eventcard.likes_number.includes(
                              userInfo.user.id
                            ) ? (
                              <img src="/img/icons/liked_blue.svg" alt="" />
                            ) : (
                              <img src="/img/icons/liked_white.svg" alt="" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                return <></>;
              })}
            </div>
            {/* Pagination */}
            {!isMobile && (
              <div className="row row--grid">
                <div className="col-12" style={{ paddingRight: 0 }}>
                  <div className="paginator">
                    <span className="paginator__pages">
                      {`Showing ${
                        eventCards.length > 5 ? 5 : eventCards.length
                      } out of ${eventCards.length}`}
                    </span>

                    <ul className="paginator__list">
                      <li>
                        <button onClick={leftClick}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z" />
                          </svg>
                        </button>
                      </li>

                      <li className={cur === 0 ? "active" : ""}>
                        <button onClick={() => setCur(0)}>{tcur + 1}</button>
                      </li>

                      {(tcur + 1) * 5 < eventCards.length ? (
                        <li className={cur === 1 ? "active" : ""}>
                          <button onClick={() => setCur(1)}>{tcur + 2}</button>
                        </li>
                      ) : (
                        <></>
                      )}

                      {(tcur + 2) * 5 < eventCards.length ? (
                        <li className={cur === 2 ? "active" : ""}>
                          <button onClick={() => setCur(2)}>{tcur + 3}</button>
                        </li>
                      ) : (
                        <></>
                      )}

                      {(tcur + 3) * 5 < eventCards.length ? (
                        <li className={cur === 3 ? "active" : ""}>
                          <button onClick={() => setCur(3)}>{tcur + 4}</button>
                        </li>
                      ) : (
                        <></>
                      )}

                      <li>
                        <button onClick={rightClick}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z" />
                          </svg>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ height: 350 }}></div>
      </div>
    </div>
  );
};

export default PageCollection;
