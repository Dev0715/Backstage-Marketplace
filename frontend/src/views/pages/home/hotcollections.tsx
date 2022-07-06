import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import config from "../../../helper/config";
import { getAllCollections } from "../../../helper/event";

const Hotcollections = () => {
  const [collections, setCollections] = useState([]);
  // const [deletePopupStatus, setDeletePopupStatus] = useState(false);
  const [deletePopupStatus] = useState(false);
  const collectionCarousel = useRef<typeof OwlCarousel>(null);

  const titleHeader = () => {
    return (
      <div
        className="col-12"
        style={{ padding: 0, paddingLeft: isMobile ? 15 : 0 }}
      >
        <div className="main__sub--title">Hot Collections</div>
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

  useEffect(() => {
    getAllCollections().then((res) => {
      if (res.success) {
        console.log(res.collection);
        setCollections(res.collections);
      }
      console.log("AAAAAAA===> ", res);
    });
  }, []);

  return (
    <section className="row row--grid" style={{ margin: 0, padding: 0 }}>
      {titleHeader()}
      {collections.length > 0 ? (
        <div className="col-12" style={{ padding: 0 }}>
          <div className="carousel-wrapper">
            <div className="nav-wrapper">
              <button
                className="main__nav main__nav--prev"
                style={{ right: 65 }}
                type="button"
                onClick={() => prev(collectionCarousel)}
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
                onClick={() => next(collectionCarousel)}
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
              loop={collections.length < 4 ? (isMobile ? true : false) : true}
              ref={collectionCarousel as any}
            >
              {collections.map((collection: any) => (
                <div className="collection">
                  <Link
                    to={`/collection/${collection?.id}`}
                    className="collection__cover"
                    style={{
                      background: `url(${config.API_BASE_URL}/api/upload/get_file?path=${collection?.picture_large})`,
                      backgroundSize: "cover",
                      backgroundColor: "rgba(255, 255, 255, 0.07)",
                    }}
                  />
                  <div className="collection__meta">
                    <Link to="/author" className="collection__avatar">
                      <img
                        // src={`${config.API_BASE_URL}/api/upload/get_file?path=${collection?.creator?.avatar}`}
                        src={`${config.API_BASE_URL}/api/upload/get_file?path=${collection?.picture_small}`}
                        alt=""
                      />
                    </Link>
                    <div className="collection__name">
                      <Link to={`/collection/${collection?.id}`}>
                        {collection?.name}
                      </Link>
                      <div className="collection__name-verified" />
                    </div>
                    <span className="collection__number">
                      {collection?.category}
                    </span>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default Hotcollections;
