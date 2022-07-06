import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

const Topsellers = () => {
  return (
    <section className="row row--grid" style={{ maxWidth: 1224, margin: 0 }}>
      <div className="col-12" style={{ paddingLeft: isMobile ? 15 : 0 }}>
        <div className="main__sub--title">Top Backstagers</div>
      </div>
      <div className="sellers-list__container">
        <div className="sellers-list">
          <div className="sellers-list__item">
            <p className="sellers-list__number">1</p>
            <div className="sellers-list__author">
              <img src="img/avatars/avatar.jpg" alt="" />
              <Link to="#">@miriuuu</Link>
            </div>
            <div className="sellers-list__author--verified" />
          </div>

          <div className="sellers-list__item">
            <p className="sellers-list__number">2</p>
            <div className="sellers-list__author">
              <img src="img/avatars/avatar2.jpg" alt="" />
              <Link to="#">@sc00ty</Link>
            </div>
            <div className="sellers-list__author--verified" />
          </div>

          <div className="sellers-list__item">
            <p className="sellers-list__number">3</p>
            <div className="sellers-list__author">
              <img src="img/avatars/avatar3.jpg" alt="" />
              <Link to="#">@redalert</Link>
            </div>
            <div className="sellers-list__author--verified" />
          </div>
        </div>

        <div className="sellers-list sellers-hidden">
          <div className="sellers-list__item">
            <p className="sellers-list__number">4</p>
            <div className="sellers-list__author">
              <img src="img/avatars/avatar4.jpg" alt="" />
              <Link to="#">@1one</Link>
            </div>
            <div className="sellers-list__author--verified" />
          </div>

          <div className="sellers-list__item">
            <p className="sellers-list__number">5</p>
            <div className="sellers-list__author">
              <img src="img/avatars/avatar5.jpg" alt="" />
              <Link to="#">@kateblank</Link>
            </div>
            <div className="sellers-list__author--verified" />
          </div>

          <div className="sellers-list__item">
            <p className="sellers-list__number">6</p>
            <div className="sellers-list__author">
              <img src="img/avatars/avatar6.jpg" alt="" />
              <Link to="#">@johndoe</Link>
            </div>
            <div className="sellers-list__author--verified" />
          </div>
        </div>
        <div className="sellers-list sellers-hidden">
          <div className="sellers-list__item">
            <p className="sellers-list__number">7</p>
            <div className="sellers-list__author">
              <img src="img/avatars/avatar7.jpg" alt="" />
              <Link to="#">@nickname</Link>
            </div>
            <div className="sellers-list__author--verified" />
          </div>

          <div className="sellers-list__item">
            <p className="sellers-list__number">8</p>
            <div className="sellers-list__author">
              <img src="img/avatars/avatar8.jpg" alt="" />
              <Link to="#">@lllily</Link>
            </div>
            <div className="sellers-list__author--verified" />
          </div>

          <div className="sellers-list__item">
            <p className="sellers-list__number">9</p>
            <div className="sellers-list__author">
              <img src="img/avatars/avatar9.jpg" alt="" />
              <Link to="#">@fantraingle</Link>
            </div>
            <div className="sellers-list__author--verified" />
          </div>
        </div>
        <div className="sellers-list sellers-hidden">
          <div className="sellers-list__item">
            <p className="sellers-list__number">10</p>
            <div className="sellers-list__author">
              <img src="img/avatars/avatar10.jpg" alt="" />
              <Link to="#">@oxyoxyoxy</Link>
            </div>
            <div className="sellers-list__author--verified" />
          </div>

          <div className="sellers-list__item">
            <p className="sellers-list__number">11</p>
            <div className="sellers-list__author">
              <img src="img/avatars/avatar11.jpg" alt="" />
              <Link to="#">@vandam</Link>
            </div>
            <div className="sellers-list__author--verified" />
          </div>

          <div className="sellers-list__item">
            <p className="sellers-list__number">12</p>
            <div className="sellers-list__author">
              <img src="img/avatars/avatar12.jpg" alt="" />
              <Link to="#">@dididi</Link>
            </div>
            <div className="sellers-list__author--verified" />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <button className="sellers-list__btn">See More</button>
      </div>
    </section>
  );
};
export default Topsellers;
