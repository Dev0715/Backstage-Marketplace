import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <div className="container" style={{ marginTop: 70, marginBottom: 70 }}>
      <div className="row row--grid">
        <div className="col-12">
          <ul className="breadcrumb">
            <li className="breadcrumb__item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb__item breadcrumb__item--active">
              Terms and Conditions
            </li>
          </ul>
        </div>

        <div className="col-12">
          <div className="main__title main__title--page">
            <h1>Terms and Conditions</h1>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="partners owl-carousel owl-loaded">
            <div className="owl-stage-outer">
              <div className="owl-stage"></div>
            </div>
            <div className="owl-nav disabled">
              <button type="button" role="presentation" className="owl-prev">
                <span aria-label="Previous">‹</span>
              </button>
              <button type="button" role="presentation" className="owl-next">
                <span aria-label="Next">›</span>
              </button>
            </div>
            <div className="owl-dots disabled"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
