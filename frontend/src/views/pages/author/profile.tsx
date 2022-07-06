import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import ItemSelectModal from "../../../components/custom_modals/item_select_modal";
import { useAppContext } from "../../../context/AppContext";
import { getAllUserBackgrounds } from "../../../helper/user";
// import { useUserContext } from "../../../context/UserContext";
// import config from "../../../helper/config";
// import { getAvailableEvents, userTickets } from "../../../helper/event";
// import { getEventPrice } from "../../../utils";
// import ChangePassword from "./change-password";
// import ProfileDetail from "./profile-detail";

const Profile = ({ wallet, walletNear }: any) => {
  // const [tickets, setTickets] = useState([]);
  // const [availableEvents, setAvailableEvents] = useState([]);
  // const [tcur, setTcur] = useState(0);
  // const [cur, setCur] = useState(0);
  // const { userInfo } = useUserContext();
  const { setModal } = useAppContext();
  const [tapState, setTapState] = useState("general");
  const [imagePreview, setImagePreview] = useState<any>("");
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [userBackgrounds, setUserBackgrounds] = useState<any>([]);

  useEffect(() => {
    getAllUserBackgrounds().then((res) => {
      if (res.success) {
        setUserBackgrounds(res.userbackgrounds);
      }
    });
  }, []);

  const set_Icon = (icon_src: any) => {
    // setAddonIcon(icon_src);
    setImagePreview(icon_src);
    setIsImageChanged(true);
    console.log(icon_src);
  };

  const [generalValidations, setGeneralValidations] = useState({
    name: "",
    email: "",
    mobile: "",
    website: "",
    bsc: "",
    img: "",
    description: "",
  });

  const [generalValues, setGeneralValues] = useState({
    name: "",
    email: "",
    mobile: "",
    website: "",
    bsc: "",
    img: "",
    description: "",
  });

  const [socialValidations, setSocialValidations] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    medium: "",
  });

  const [socialValues, setSocialValues] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    medium: "",
  });

  const [pwdValidations, setPwdValidations] = useState({
    oldPwd: "",
    newPwd: "",
    confirmPwd: "",
  });

  const [pwdValues, setPwdValues] = useState({
    oldPwd: "",
    newPwd: "",
    confirmPwd: "",
  });

  const [isGeneralChanged, setIsGeneralChanged] = useState(false);
  const [isSocialChanged, setIsSocialChanged] = useState(false);
  const [isPwdChanged, setIsPwdChanged] = useState(false);

  const handleGeneralChange = (prop: any, value: any) => {
    setIsGeneralChanged(true);
    setGeneralValidations((prevState) => ({ ...prevState, [prop]: "" }));
    setGeneralValues({ ...generalValues, [prop]: value });
  };

  const handleSocialChange = (prop: any, value: any) => {
    setIsSocialChanged(true);
    setSocialValidations((prevState) => ({ ...prevState, [prop]: "" }));
    setSocialValues({ ...socialValues, [prop]: value });
  };

  const handlePwdChange = (prop: any, value: any) => {
    setIsPwdChanged(true);
    setPwdValidations((prevState) => ({ ...prevState, [prop]: "" }));
    setPwdValues({ ...pwdValues, [prop]: value });
  };
  const imageChange = (e: any) => {
    // e.preventDefault();
    // const reader = new FileReader();
    // const f = e.target.files[0];
    // if (reader !== undefined && f !== undefined) {
    //     reader.onloadend = () => {
    //         setFile(f)
    //         setImagePreview(reader.result)
    //     }
    //     reader.readAsDataURL(f);
    // }

    setModal({
      open: true,
      children: (
        <ItemSelectModal
          title="Select User Background"
          handleEnd={set_Icon}
          icons={userBackgrounds}
        />
      ),
    });
  };

  const renderGeneralTab = () => (
    <>
      {isMobile && (
        <p
          style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          General
        </p>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          marginTop: 20,
        }}
      >
        <div className="sign__group" style={{ marginRight: isMobile ? 0 : 55 }}>
          <p className="sign__form-label">{isMobile ? "Username" : "Name"}</p>
          <input
            type="text"
            className="sign__input"
            value={generalValues.name}
            onChange={(e) => handleGeneralChange("name", e.target.value)}
          />
        </div>
        <div className="sign__group">
          <p className="sign__form-label">Email</p>
          <input
            type="text"
            className="sign__input"
            value={generalValues.email}
            onChange={(e) => handleGeneralChange("email", e.target.value)}
          />
        </div>
      </div>
      <div
        style={{ display: "flex", flexDirection: isMobile ? "column" : "row" }}
      >
        <div className="sign__group" style={{ marginRight: isMobile ? 0 : 55 }}>
          <p className="sign__form-label">Mobile Number</p>
          <input
            type="text"
            className="sign__input"
            value={generalValues.mobile}
            onChange={(e) => handleGeneralChange("mobile", e.target.value)}
          />
        </div>
        <div className="sign__group">
          <p className="sign__form-label">Website</p>
          <input
            type="text"
            className="sign__input"
            value={generalValues.website}
            onChange={(e) => handleGeneralChange("website", e.target.value)}
          />
        </div>
      </div>
      <div
        style={{ display: "flex", flexDirection: isMobile ? "column" : "row" }}
      >
        {/* <div className="sign__group" style={{ marginRight: isMobile ? 0 : 55 }}>
          <p className="sign__form-label">BSC Wallet Address</p>
          <input
            type="text"
            className="sign__input"
            value={generalValues.bsc}
            onChange={(e) => handleGeneralChange("bsc", e.target.value)}
          />
        </div> */}
        <div className="sign__group">
          <p className="sign__form-label">Background Image</p>
          <p className="input__upload" onClick={imageChange}>
            <img
              src="/img/icons/upload-1.svg"
              alt=""
              style={{ width: 16, height: 16, marginRight: 10 }}
            />{" "}
            <span
              style={{
                textTransform: "uppercase",
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: "0.15em",
              }}
            >
              upload
            </span>
          </p>
        </div>
      </div>
      <div className="sign__group" style={{ marginRight: isMobile ? 0 : 55 }}>
        <p className="sign__form-label">Description</p>
        <textarea
          name="message"
          className="sign__input"
          style={{ height: 90, resize: "none", padding: "10px 20px" }}
        />
      </div>
      <button
        className={isGeneralChanged ? "sign__btn" : "sign__btn-inactive"}
        type="button"
        onClick={() =>
          isGeneralChanged
            ? console.log("Sibmit")
            : console.log("You should complete the forms!")
        }
      >
        Save
      </button>
    </>
  );

  const renderSocialTab = () => (
    <>
      {isMobile && (
        <p
          style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginTop: 50,
          }}
        >
          Social media
        </p>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          marginTop: 20,
        }}
      >
        <div className="sign__group" style={{ marginRight: isMobile ? 0 : 55 }}>
          <p className="sign__form-label">Facebook</p>
          <input
            type="text"
            className="sign__input"
            value={socialValues.facebook}
            onChange={(e) => handleSocialChange("facebook", e.target.value)}
          />
        </div>
        <div className="sign__group">
          <p className="sign__form-label">Twitter</p>
          <input
            type="text"
            className="sign__input"
            value={socialValues.twitter}
            onChange={(e) => handleSocialChange("twitter", e.target.value)}
          />
        </div>
      </div>
      <div
        style={{ display: "flex", flexDirection: isMobile ? "column" : "row" }}
      >
        <div className="sign__group" style={{ marginRight: isMobile ? 0 : 55 }}>
          <p className="sign__form-label">Instagram</p>
          <input
            type="text"
            className="sign__input"
            value={socialValues.instagram}
            onChange={(e) => handleSocialChange("instagram", e.target.value)}
          />
        </div>
        <div className="sign__group">
          <p className="sign__form-label">Medium</p>
          <input
            type="text"
            className="sign__input"
            value={socialValues.medium}
            onChange={(e) => handleSocialChange("medium", e.target.value)}
          />
        </div>
      </div>

      <button
        className={isSocialChanged ? "sign__btn" : "sign__btn-inactive"}
        type="button"
        onClick={() =>
          isSocialChanged
            ? console.log("Sibmit")
            : console.log("You should complete the forms!")
        }
      >
        Save
      </button>
    </>
  );

  const renderPwdTab = () => (
    <>
      {isMobile && (
        <p
          style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginTop: 50,
          }}
        >
          Change Password
        </p>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          marginTop: 20,
        }}
      >
        <div className="sign__group" style={{ marginRight: isMobile ? 0 : 55 }}>
          <p className="sign__form-label">Old Password</p>
          <input
            type="text"
            className="sign__input"
            value={pwdValues.oldPwd}
            onChange={(e) => handlePwdChange("oldPwd", e.target.value)}
          />
        </div>
        <div className="sign__group">
          <p className="sign__form-label">New Password</p>
          <input
            type="text"
            className="sign__input"
            value={pwdValues.newPwd}
            onChange={(e) => handlePwdChange("newPwd", e.target.value)}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: isMobile ? "100%" : "50%",
          paddingRight: isMobile ? 0 : 28,
        }}
      >
        <div className="sign__group">
          <p className="sign__form-label">Confirm New Password</p>
          <input
            type="text"
            className="sign__input"
            value={pwdValues.confirmPwd}
            onChange={(e) => handlePwdChange("confirmPwd", e.target.value)}
          />
        </div>
      </div>

      <button
        className={isPwdChanged ? "sign__btn" : "sign__btn-inactive"}
        type="button"
        onClick={() =>
          isPwdChanged
            ? console.log("Sibmit")
            : console.log("You should complete the forms!")
        }
      >
        Change Password
      </button>
    </>
  );

  return (
    <div className={isMobile ? " " : "col-12 col-xl-8"}>
      <div className="profile__settings-header">
        <p className="profile__settings-title">Profile Settings</p>
        {!isMobile && (
          <div className="profile__settings-tags">
            <p
              className={
                tapState === "general"
                  ? "profile__settings-active"
                  : "profile__settings-inactive"
              }
              onClick={() => setTapState("general")}
            >
              General
            </p>
            <p
              className={
                tapState === "social"
                  ? "profile__settings-active"
                  : "profile__settings-inactive"
              }
              onClick={() => setTapState("social")}
            >
              Social Media
            </p>
            <p
              className={
                tapState === "pwd"
                  ? "profile__settings-active"
                  : "profile__settings-inactive"
              }
              onClick={() => setTapState("pwd")}
            >
              Change Password
            </p>
          </div>
        )}
      </div>
      {tapState === "general" && renderGeneralTab()}
      {tapState === "social" && renderSocialTab()}
      {tapState === "pwd" && renderPwdTab()}
      {isMobile && (
        <>
          {renderSocialTab()} {renderPwdTab()}
        </>
      )}
    </div>
  );
};
export default Profile;
// eslint-disable-next-line no-lone-blocks
{
  /* const cardView = (eventcard: any) => {
    return (
      <div className="card" style={{ height: 460, width: 260, marginLeft: 20 }}>
        <Link to={`/event/eventcard/${eventcard.id}`} className="card__cover">
          <img
            src={`${config.API_BASE_URL}/api/upload/get_file?path=${eventcard.picture_small}`}
            alt=""
          />
          <span className="card__time">
            <EventCountDown date={eventcard.date} />
          </span>
        </Link>
        <h3 className="card__title">
          <Link to={`/event/eventcard/${eventcard.id}`}>{eventcard.name}</Link>
        </h3>
        <div className="card__author card__author--verified">
          {eventcard.creator.avatar ? (
            <img
              src={`${config.API_BASE_URL}/api/upload/get_file?path=${eventcard.creator.avatar}`}
              alt=""
            />
          ) : (
            <img src="img/avatars/avatar5.jpg" alt="" />
          )}
          <Link to="/author">@{eventcard.creator.name}</Link>
        </div>
        <div className="card__info">
          <div className="card__price">
            <span>Current price</span>
            <span>{getEventPrice(eventcard)} €</span>
          </div>

          <button className="card__likes" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z" />
            </svg>
            <span>{Number(eventcard.likes_number)}</span>
          </button>
        </div>
      </div>
    );
  }; 
  return (
    <div className="col-12 col-xl-9">
      <div className="profile" style={{ width: 925, marginLeft: 20 }}>
        <ul
          className="nav nav-tabs profile__tabs"
          id="profile__tabs"
          role="tablist"
        >
          <li className="nav-item">
            <a
              className="nav-link active"
              data-toggle="tab"
              href="#tab-1"
              role="tab"
              aria-controls="tab-1"
              aria-selected="true"
            >
              Profile
            </a>
          </li>

           <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="tab"
              href="#tab-2"
              role="tab"
              aria-controls="tab-2"
              aria-selected="false"
            >
              Created
            </a>
          </li> 

          <li className="nav-item">
             <a
              className="nav-link"
              data-toggle="tab"
              href="#tab-3"
              role="tab"
              aria-controls="tab-3"
              aria-selected="false"
            > 
            <Link
              to={
                userInfo.user.user_type === "ADMIN"
                  ? "/admin/activity"
                  : "/activity"
              }
              className="nav-link"
            >
              My Activity
            </Link>

            {/* </a> 
          </li>

          {/* <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="tab"
              href="#tab-4"
              role="tab"
              aria-controls="tab-4"
              aria-selected="false"
            >
              On Sale
            </a>
          </li> 
        </ul>
      </div>

      <div className="tab-content">
        <div className="tab-pane fade show active" id="tab-1" role="tabpanel">
          <div className="row row--grid">
            <ProfileDetail wallet={wallet} walletNear={walletNear} />
            <ChangePassword />
          </div>
        </div>

        <div className="tab-pane fade" id="tab-2" role="tabpanel">
          {/* <div className="row row--grid">
            <div className="col-12 col-sm-6 col-lg-4">
              <div
                className="card"
                style={{ height: 460, width: 260, marginLeft: 20 }}
              >
                <Link to="/item" className="card__cover">
                  <img src="img/cover/cover8.jpg" alt="" />
                </Link>
                <h3 className="card__title">
                  <Link to="/item">Walking on Air</Link>
                </h3>
                <div className="card__author card__author--verified">
                  <img src="img/avatars/avatar5.jpg" alt="" />
                  <Link to="/author">@l1rose</Link>
                </div>
                <div className="card__info">
                  <div className="card__price">
                    <span>Was sold for</span>
                    <span>4.89 ETH</span>
                  </div>

                  <button className="card__likes" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z" />
                    </svg>
                    <span>189</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-4">
              <div
                className="card"
                style={{ height: 460, width: 260, marginLeft: 20 }}
              >
                <Link to="/item" className="card__cover">
                  <img src="img/cover/cover7.jpg" alt="" />
                </Link>
                <h3 className="card__title">
                  <Link to="/item">
                    Les Immortels, the Treachery of Artificial Shadows
                  </Link>
                </h3>
                <div className="card__author card__author--verified">
                  <img src="img/avatars/avatar5.jpg" alt="" />
                  <Link to="/author">@l1rose</Link>
                </div>
                <div className="card__info">
                  <div className="card__price">
                    <span>Was sold for</span>
                    <span>2.61 ETH</span>
                  </div>

                  <button className="card__likes" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z" />
                    </svg>
                    <span>702</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-4">
              <div
                className="card"
                style={{ height: 460, width: 260, marginLeft: 20 }}
              >
                <Link to="/item" className="card__cover">
                  <img src="img/cover/cover6.jpg" alt="" />
                </Link>
                <h3 className="card__title">
                  <Link to="/item">Flowers in Concrete</Link>
                </h3>
                <div className="card__author card__author--verified">
                  <img src="img/avatars/avatar5.jpg" alt="" />
                  <Link to="/author">@l1rose</Link>
                </div>
                <div className="card__info">
                  <div className="card__price">
                    <span>Was sold for</span>
                    <span>3.19 ETH</span>
                  </div>

                  <button
                    className="card__likes card__likes--active"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z" />
                    </svg>
                    <span>37</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-4">
              <div
                className="card"
                style={{ height: 460, width: 260, marginLeft: 20 }}
              >
                <a href="item.html" className="card__cover">
                  <img src="img/cover/cover5.jpg" alt="" />
                </a>
                <h3 className="card__title">
                  <a href="item.html">Industrial Revolution</a>
                </h3>
                <div className="card__author card__author--verified">
                  <img src="img/avatars/avatar5.jpg" alt="" />
                  <Link to="/author">@l1rose</Link>
                </div>
                <div className="card__info">
                  <div className="card__price">
                    <span>Was sold for</span>
                    <span>1.11 ETH</span>
                  </div>

                  <button className="card__likes" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z" />
                    </svg>
                    <span>23</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-4">
              <div
                className="card"
                style={{ height: 460, width: 260, marginLeft: 20 }}
              >
                <a href="item.html" className="card__cover">
                  <img src="img/cover/cover4.jpg" alt="" />
                </a>
                <h3 className="card__title">
                  <a href="item.html">I Love You</a>
                </h3>
                <div className="card__author card__author--verified">
                  <img src="img/avatars/avatar5.jpg" alt="" />
                  <Link to="/author">@l1rose</Link>
                </div>
                <div className="card__info">
                  <div className="card__price">
                    <span>Was sold for</span>
                    <span>0.99 ETH</span>
                  </div>

                  <button className="card__likes" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z" />
                    </svg>
                    <span>358</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-4">
              <div
                className="card"
                style={{ height: 460, width: 260, marginLeft: 20 }}
              >
                <a href="item.html" className="card__cover">
                  <img src="img/cover/cover3.jpg" alt="" />
                </a>
                <h3 className="card__title">
                  <a href="item.html">To Infinity And Beyond</a>
                </h3>
                <div className="card__author card__author--verified">
                  <img src="img/avatars/avatar5.jpg" alt="" />
                  <Link to="/author">@l1rose</Link>
                </div>
                <div className="card__info">
                  <div className="card__price">
                    <span>Was sold for</span>
                    <span>3.33 ETH</span>
                  </div>

                  <button className="card__likes" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z" />
                    </svg>
                    <span />
                  </button>
                </div>
              </div>
            </div>
          </div> 

          <div className="row row--grid">
            {tickets.map((ticket, index) => {
              if (index >= (tcur + cur) * 5 && index < (tcur + cur + 1) * 5)
                return (
                  <div className="col-12 col-lg-6 col-xl-12" key={index}>
                    {ticketView(ticket)}
                  </div>
                );
            })}
          </div>

          <div className="row row--grid">
            <div className="col-12">
              <div className="paginator">
                <span className="paginator__pages">{`${
                  tickets.length > 5 ? 5 : tickets.length
                } from ${tickets.length}`}</span>
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

                  {(tcur + 1) * 5 < tickets.length ? (
                    <li className={cur === 1 ? "active" : ""}>
                      <a onClick={() => setCur(1)}>{tcur + 2}</a>
                    </li>
                  ) : (
                    <></>
                  )}

                  {(tcur + 2) * 5 < tickets.length ? (
                    <li className={cur === 2 ? "active" : ""}>
                      <a onClick={() => setCur(2)}>{tcur + 3}</a>
                    </li>
                  ) : (
                    <></>
                  )}

                  {(tcur + 3) * 5 < tickets.length ? (
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

        <div className="tab-pane fade" id="tab-3" role="tabpanel">
          <div className="row">
            <div className="col-12 col-xl-4 order-xl-2">
              <div className="filter-wrap">
                <button
                  className="filter-wrap__btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseFilter"
                  aria-expanded="false"
                  aria-controls="collapseFilter"
                >
                  Open filter
                </button>

                <div
                  className="collapse filter-wrap__content"
                  id="collapseFilter"
                >
                  <div className="filter filter--sticky" style={{ width: 280 }}>
                    {/* <h4 className="filter__title">Filters <button type="button">Clear all</button></h4> 

                    <div className="filter__group">
                      <ul className="filter__checkboxes">
                        <li>
                          <input id="type5" type="checkbox" name="type5" />
                          <label htmlFor="type5">Listings</label>
                        </li>
                        <li>
                          <input id="type6" type="checkbox" name="type6" />
                          <label htmlFor="type6">Purchases</label>
                        </li>
                        <li>
                          <input id="type7" type="checkbox" name="type7" />
                          <label htmlFor="type7">Sales</label>
                        </li>
                        <li>
                          <input id="type8" type="checkbox" name="type8" />
                          <label htmlFor="type8">Transfers</label>
                        </li>
                        <li>
                          <input id="type9" type="checkbox" name="type9" />
                          <label htmlFor="type9">Bids</label>
                        </li>
                        <li>
                          <input id="type10" type="checkbox" name="type10" />
                          <label htmlFor="type10">Likes</label>
                        </li>
                        <li>
                          <input id="type11" type="checkbox" name="type11" />
                          <label htmlFor="type11">Followings</label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-xl-8 order-xl-1">
              <div className="row row--grid">
                {tickets.map((ticket, index) => {
                  return (
                    <div className="col-12 col-lg-6 col-xl-12" key={index}>
                      {ticketView(ticket)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="tab-pane fade" id="tab-4" role="tabpanel">
          <div className="row row--grid">
            {availableEvents.map((event, index) => {
              return (
                <div className="col-12 col-sm-6 col-lg-4" key={index}>
                  {cardView(event)}
                </div>
              );
            })}
          </div>

          {/* <div className="row row--grid">
                        <div className="col-12">
                            <button className="main__load" type="button" data-toggle="collapse"
                                    data-target="#collapsemore" aria-expanded="false"
                                    aria-controls="collapsemore">Load more
                            </button>
                        </div>
                    </div> 
        </div>
      </div>
    </div>
  );
};
*/
}
