import React, { useEffect, useState } from "react";
import DateObject from "react-date-object";
import { isMobile } from "react-device-detect";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useAppContext } from "../../../context/AppContext";
import { getArticleById } from "../../../helper/article";
import config from "../../../helper/config";

const PageArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<any>({});
  const { loading, setLoading } = useAppContext();
  const { addToast } = useToasts();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getArticleById(id)
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res.success) {
          setArticle(res.article);
        } else {
          addToast(res.message, { appearance: "error", autoDismiss: true });
        }
      })
      .catch((err) => {
        setLoading(false);
        addToast("An error occured", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  }, []);

  const dateString = (d: any) => {
    var date = new DateObject({
      date: new Date(d),
    });

    return date.format("MMMM DD, YYYY");
  };

  return (
    <div className="article">
      {isMobile ? (
        <div className="article__top">
          <div onClick={() => navigate("/blog")}>
            <img src="/img/icons/arrow-left.svg" alt="" />
          </div>
          <p>Article</p>
          <div>
            <img src="/img/icons/upload.svg" alt="" />
          </div>
        </div>
      ) : (
        <div className="article__top">
          <ul className="breadcrumb">
            <li className="breadcrumb__item">
              <Link to="/blog">News</Link>
            </li>
            <li className="breadcrumb__item breadcrumb__item--active">
              Article
            </li>
          </ul>
        </div>
      )}
      <div className="article__content">
        <div className="img-wrapper">
          <img
            src={`${config.API_BASE_URL}/api/upload/get_file?path=${article.image}`}
            alt=""
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className="article__news-group">
              <a href="/#" className="article__category">
                News
              </a>
              {isMobile ? (
                <span className="article__date">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12,2A10,10,0,1,0,22,12,10.01114,10.01114,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20ZM14.09814,9.63379,13,10.26807V7a1,1,0,0,0-2,0v5a1.00025,1.00025,0,0,0,1.5.86621l2.59814-1.5a1.00016,1.00016,0,1,0-1-1.73242Z"></path>
                  </svg>{" "}
                  {dateString(article.createdAt)} &nbsp; &#8226;
                </span>
              ) : (
                <span className="article__date">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12,2A10,10,0,1,0,22,12,10.01114,10.01114,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20ZM14.09814,9.63379,13,10.26807V7a1,1,0,0,0-2,0v5a1.00025,1.00025,0,0,0,1.5.86621l2.59814-1.5a1.00016,1.00016,0,1,0-1-1.73242Z"></path>
                  </svg>{" "}
                  {dateString(article.createdAt)}
                </span>
              )}
            </div>
            <div className="article__message">
              <img src="/img/icons/message.svg" alt="" />
              <p style={{ margin: 0 }}>3</p>
            </div>
          </div>
        </div>

        {!loading && !article ? <h1>Can't find the article</h1> : ""}

        {!loading && article ? (
          <React.Fragment>
            <h1>{article.title}</h1>
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.description }}
            />
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
      {!isMobile && <div style={{ marginBottom: 200 }} />}
    </div>
  );
};

export default PageArticle;
