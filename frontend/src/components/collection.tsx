import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../helper/config";
import { getAllCollections } from "../helper/event";

const CollectionComp = (props: any) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    getAllCollections().then((res) => {
      if (res.success) {
        console.log(res.collection);
        setCollections(res.collections);
      }
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {collections.map((collection: any) =>
        collection ? (
          <div
            className="owl-item cloned"
            style={{ width: 288, marginRight: 30 }}
            key={collection?.id}
          >
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
                <Link
                  to="/author"
                  className="collection__avatar"
                  style={{ backgroundColor: "pink" }}
                >
                  <img
                    // src={`${config.API_BASE_URL}/api/upload/get_file?path=${collection?.creator?.avatar}`}
                    src={`${config.API_BASE_URL}/api/upload/get_file?path=${collection?.picture_small}`}
                    alt=""
                  />
                </Link>
                <h3 className="collection__name">
                  <Link to={`/collection/${collection?.id}`}>
                    {collection?.name}
                  </Link>
                </h3>
                <span className="collection__number">
                  {collection?.category}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )
      )}
    </div>
  );
};

export default CollectionComp;
