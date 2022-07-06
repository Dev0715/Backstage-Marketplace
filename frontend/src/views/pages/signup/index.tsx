import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Link, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import SignupSuccessMoal from "../../../components/custom_modals/signup_success_modal";
import { useAppContext } from "../../../context/AppContext";
import { useUserContext } from "../../../context/UserContext";
import { signup } from "../../../helper/auth";
import { validateEmail } from "../../../utils";
import ReCAPTCHA from "react-google-recaptcha";

const PageSignup = () => {
  const { userInfo } = useUserContext();
  const navigate = useNavigate();
  const { setLoading, setModal } = useAppContext();
  const { addToast } = useToasts();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [validations, setValidations] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const recaptchaRef = React.createRef();
  const [captcha, setCaptcha] = useState(false);

  const onChangeCaptcha = (e: any) => {
    console.log(e);
    setCaptcha(e);
  };

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [navigate, userInfo]);

  const handleChange = (prop: any, value: any) => {
    setValidations((prevState) => ({ ...prevState, [prop]: "" }));
    setValues({ ...values, [prop]: value });
  };

  const handleSignup = () => {
    console.log("signup");
    if (!checkvalidations()) return;

    setLoading(true);

    signup(values)
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res.success) {
          setModal({ open: true, children: <SignupSuccessMoal /> });
          return;
          // addToast('Register success. Email was sent. Please verify your email', {appearance: 'success', autoDismiss: true});
        } else {
          addToast(res.message, { appearance: "error", autoDismiss: true });
        }
      })
      .catch((error) => {
        setLoading(false);
        addToast("failed", { appearance: "error", autoDismiss: true });
      });
  };

  const checkvalidations = () => {
    if (values.name === "") {
      setValidations({
        name: "has-empty",
        email: "",
        password: "",
        confirmpassword: "",
      });
      return false;
    } else if (values.email === "") {
      setValidations({
        name: "",
        email: "has-empty",
        password: "",
        confirmpassword: "",
      });
      return false;
    } else if (!validateEmail(values.email)) {
      setValidations({
        name: "",
        email: "has-danger",
        password: "",
        confirmpassword: "",
      });
      return false;
    } else if (values.password === "") {
      setValidations({
        name: "",
        email: "",
        password: "has-empty",
        confirmpassword: "",
      });
      return false;
    } else if (values.password === "") {
      setValidations({
        name: "",
        email: "",
        password: "",
        confirmpassword: "has-empty",
      });
      return false;
    } else {
      setValidations({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
      });
    }

    return true;
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="sign">
        {isMobile && (
          <Link
            to="/"
            style={{
              color: "#fff",
              fontSize: 30,
              position: "absolute",
              right: 30,
              top: 30,
              zIndex: 666,
            }}
          >
            &times;
          </Link>
        )}
        <div className="sign__content">
          <form action="#" className="sign__form">
            <p className="sign__main-title">Sign Up</p>
            <div className="sign__group">
              <p className="sign__form-label">Name</p>
              <input
                type="text"
                className="sign__input"
                placeholder="Name"
                value={values.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              {validations.name === "has-empty" ? (
                <span className="text-error">Name Required*</span>
              ) : (
                ""
              )}
            </div>

            <div className="sign__group">
              <p className="sign__form-label">Email</p>
              <input
                type="text"
                className="sign__input"
                placeholder="Email"
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {validations.email === "has-empty" ? (
                <span className="text-error">Email Required*</span>
              ) : (
                ""
              )}
              {validations.email === "has-danger" ? (
                <span className="text-error">Input Correct Format*</span>
              ) : (
                ""
              )}
            </div>

            <div className="sign__group">
              <p className="sign__form-label">Password</p>
              <input
                type="password"
                className="sign__input"
                placeholder="Password"
                value={values.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              {validations.password === "has-empty" ? (
                <span className="text-error">Password Required*</span>
              ) : (
                ""
              )}
            </div>

            <div className="sign__group">
              <p className="sign__form-label"> Confirm Password</p>
              <input
                type="password"
                className="sign__input"
                placeholder="Confirm Password"
                value={values.confirmpassword}
                onChange={(e) =>
                  handleChange("confirmpassword", e.target.value)
                }
              />
              {validations.password === "has-empty" ? (
                <span className="text-error">Password Required*</span>
              ) : (
                ""
              )}
            </div>

            {!isMobile && (
              <div className="sign__group sign__group--checkbox">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  defaultChecked
                />
                <label htmlFor="remember">
                  I agree to the
                  <Link to="/privacy"> Privacy Policy</Link>
                </label>
              </div>
            )}

            {!isMobile && (
              <div className="sign__group sign__group--checkbox">
                <input
                  id="remember2"
                  name="remember2"
                  type="checkbox"
                  defaultChecked
                />
                <label htmlFor="remember2">
                  I agree to the
                  <Link to="/terms"> Terms and Conditions</Link>
                </label>
              </div>
            )}
            {!captcha && (
              <div
                style={{
                  color: "white",
                  // marginTop: "10px",
                }}
              >
                Before you proceed, please complete the captcha below
              </div>
            )}
            {!captcha && (
              <ReCAPTCHA
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  alignSelf: "flex-start",
                }}
                ref={recaptchaRef as any}
                // size="invisible"
                sitekey="6LeaLwUgAAAAAIBN0ef2xzTx0rIfuLb1POyzr_ei"
                // sitekey="6Lf4RAUgAAAAAJbw7qXWVBfVtM2Ocggfs0KYGPjv"
                onChange={onChangeCaptcha}
              />
            )}
            <button
              className={captcha ? "sign__btn" : "sign__btn-disable"}
              type="button"
              onClick={captcha ? handleSignup : () => {}}
            >
              Sign up
            </button>
            {/* <span className="sign__text">
              Already have an account?&nbsp;
              <Link to="/signin">Sign in!</Link>
            </span> */}
          </form>
        </div>
      </div>
      {!isMobile && <div style={{ height: 200, width: 200 }} />}
    </div>
  );
};

export default PageSignup;
