import { useEffect, useState } from "react";
import DateObject from "react-date-object";
import { isMobile } from "react-device-detect";
import { useToasts } from "react-toast-notifications";
import DeletePopper from "../../../components/DeletePopper";
import { useAppContext } from "../../../context/AppContext";
import { useUserContext } from "../../../context/UserContext";
import { deleteArticleById, getAllArtiles } from "../../../helper/article";
import config from "../../../helper/config";

const PageBlog = () => {
  const { userInfo } = useUserContext();
  const [articles, setArticles] = useState([]);
  const [currentTag, setCurrentTag] = useState("all");
  const { setLoading } = useAppContext();
  const { addToast } = useToasts();
  const [tcur, setTcur] = useState(0);
  const [cur, setCur] = useState(0);

  const leftClick = () => {
    if (tcur > 0) setTcur(tcur - 1);
  };

  const rightClick = () => {
    if ((tcur + 4) * 8 < articles.length) setTcur(tcur + 1);
  };

  useEffect(() => {
    setLoading(true);
    getAllArtiles()
      .then((res) => {
        setLoading(false);
        setArticles(res.articles);
      })
      .catch((error) => {
        setLoading(false);
        addToast("An error occured", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  }, []);

  const handleDeleteArticle = (articleId: string) => {
    deleteArticleById(articleId)
      .then((res) => {
        const updatedArticles = [...articles].filter(
          (article: any) => article.id !== articleId
        );
        setArticles(updatedArticles);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dateString = (d: any) => {
    var date = new DateObject({
      date: new Date(d),
    });

    return date.format("MMMM DD, YYYY");
  };

  const CArticles = () => {
    return articles.map((article: any) => (
      <div className="col-12 col-sm-6 col-lg-4" key={article.id}>
        <div className="post">
          {userInfo && userInfo.user.user_type === "ADMIN" ? (
            <DeletePopper
              setDeletePopupStatus={() => {}}
              onClickDelete={() => {
                handleDeleteArticle(article.id);
              }}
            />
          ) : (
            ""
          )}

          <a href={`/article/${article.id}`} className="post__img-blog">
            <img
              src={`${config.API_BASE_URL}/api/upload/get_file?path=${article.image}`}
              alt=""
            />
          </a>

          <div className="post__content-blog">
            <a href="/" className="post__category-blog">
              News
            </a>
            <h3 className="post__title-blog">
              <a href={`/article/${article.id}`}>{article.title}</a>
            </h3>
            <div className="post__meta">
              <span className="post__date">
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12,2A10,10,0,1,0,22,12,10.01114,10.01114,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20ZM14.09814,9.63379,13,10.26807V7a1,1,0,0,0-2,0v5a1.00025,1.00025,0,0,0,1.5.86621l2.59814-1.5a1.00016,1.00016,0,1,0-1-1.73242Z"></path>
                </svg>{" "} */}
                <img src="/img/icons/clock.svg" alt="" />
                {dateString(article.createdAt)}
              </span>
              <span className="post__comments">
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M17,9H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Zm-4,4H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2ZM12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,0-1.41A8,8,0,1,1,12,20Z"></path>
                </svg>{" "} */}
                <img src="/img/icons/message.svg" alt="" />0
              </span>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div
      className="container"
      style={{
        marginTop: isMobile ? 30 : 70,
        marginBottom: 70,
        padding: 0,
        zIndex: 999,
      }}
    >
      <div className="explorer__top">
        <p className="explorer__top-title">News</p>
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
                currentTag === "news"
                  ? "explorer__top-active--tag"
                  : "explorer__top-inactive--tag"
              }
              onClick={() => setCurrentTag("news")}
            >
              News
            </button>
            <button
              className={
                currentTag === "tag1"
                  ? "explorer__top-active--tag"
                  : "explorer__top-inactive--tag"
              }
              onClick={() => setCurrentTag("tag1")}
            >
              Tag Name
            </button>
            <button
              className={
                currentTag === "tag2"
                  ? "explorer__top-active--tag"
                  : "explorer__top-inactive--tag"
              }
              onClick={() => setCurrentTag("tag2")}
            >
              Tag Name
            </button> */}
          </div>
        </div>
      </div>
      {/* <div className="row row--grid">
        <div className="col-12">
          <div className="row row--grid">
            */}
      {/* {userInfo && userInfo.user.user_type === "ADMIN" ? (
              <div className="col-6 col-lg-2 col-md-3 btn_new_blog">
                <Link
                  to="/article/create"
                  className="main__load"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapsemore"
                  aria-expanded="false"
                  aria-controls="collapsemore"
                  style={{ marginTop: "0px" }}
                >
                  Create
                </Link>
              </div>
            ) : (
              ""
            )} */}
      {/* </div>
        </div>
      </div> */}

      <div className="tab-content" style={{ padding: isMobile ? 25 : 0 }}>
        <div className="tab-pane fade show active" id="tab-1" role="tabpanel">
          <div className="row row--grid">{CArticles()}</div>
        </div>

        <div className="tab-pane fade" id="tab-2" role="tabpanel">
          <div className="row row--grid">{CArticles()}</div>
        </div>
      </div>
      {!isMobile && (
        <div className="row row--grid">
          <div className="col-12">
            <div className="paginator" style={{ justifyContent: "flex-end" }}>
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

                {(tcur + 1) * 8 < articles.length ? (
                  <li className={cur === 1 ? "active" : ""}>
                    <button onClick={() => setCur(1)}>{tcur + 2}</button>
                  </li>
                ) : (
                  <></>
                )}

                {(tcur + 2) * 8 < articles.length ? (
                  <li className={cur === 2 ? "active" : ""}>
                    <button onClick={() => setCur(2)}>{tcur + 3}</button>
                  </li>
                ) : (
                  <></>
                )}

                {(tcur + 3) * 8 < articles.length ? (
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
          </div>
        </div>
      )}
      {!isMobile && <div style={{ height: 350 }}></div>}
    </div>
  );
};

export default PageBlog;
