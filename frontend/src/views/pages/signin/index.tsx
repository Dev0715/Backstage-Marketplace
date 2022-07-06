import * as queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { isMobile } from "react-device-detect";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import EmailVerifyMoal from "../../../components/custom_modals/email_verify_modal";
import { useAppContext } from "../../../context/AppContext";
import { useUserContext } from "../../../context/UserContext";
import { login, verifyEmail } from "../../../helper/auth";
import { validateEmail } from "../../../utils";

const PageSignin = (props: any) => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const { userInfo } = useUserContext();
  const navigate = useNavigate();
  const { loading, setLoading, setModal } = useAppContext();
  const [emailVerify, setEmailVerify] = useState(false);
  // const [redirect, setredirect] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [validations, setValidations] = useState({
    email: "",
    password: "",
  });
  const { addToast } = useToasts();

  const recaptchaRef = React.createRef();
  const [captcha, setCaptcha] = useState(null);

  const onChangeCaptcha = (e: any) => {
    console.log(e);
    setCaptcha(e);
  };

  useEffect(() => {
    const params = queryString.parse(window.location.search);
    console.log(loading);
    if (params.email_verify && !emailVerify) {
      const code = params.email_verify;

      setLoading(true);
      setEmailVerify(false);

      verifyEmail({ code: code })
        .then((res) => {
          console.log(res);
          if (res.success) {
            setLoading(false);
            setModal({ open: true, children: <EmailVerifyMoal /> });
            return;
            // navigate('/signin');
          } else {
            setLoading(false);
            addToast("verification failed", {
              appearance: "error",
              autoDismiss: true,
            });
            navigate("/signin");
          }
        })
        .catch((err) => {
          setLoading(false);
          addToast("verification failed", {
            appearance: "error",
            autoDismiss: true,
          });
          navigate("/signin");
        });
    }
  }, [emailVerify]);

  //// already login then go to home page
  useEffect(() => {
    if (userInfo) {
      const user_redirect = cookies.userRedirect;
      if (Boolean(user_redirect)) {
        // console.log("hushi_login", user_redirect);
        removeCookies("userRedirect");
        navigate(`${user_redirect}`);
      } else {
        navigate("/");
      }
    }
  }, [userInfo]);

  const handleChange = (prop: any, value: any) => {
    setValidations((prevState) => ({ ...prevState, [prop]: "" }));
    setValues({ ...values, [prop]: value });
  };

  const handleLogin = () => {
    if (!checkvalidations()) return;

    setLoading(true);

    login(values)
      .then((res) => {
        setLoading(false);
        if (res.success) {
          setCookie("userInfo", JSON.stringify(res.data));
          navigate("/");
        } else {
          addToast(res.message, { appearance: "error", autoDismiss: true });
        }
      })
      .catch((error) => {
        setLoading(false);
        addToast("Login failed", { appearance: "error", autoDismiss: true });
      });
  };

  const checkvalidations = () => {
    if (values.email === "") {
      setValidations({ email: "has-empty", password: "" });
      return false;
    } else if (!validateEmail(values.email)) {
      setValidations({ email: "has-danger", password: "" });
      return false;
    } else if (values.password === "") {
      setValidations({ email: "", password: "has-empty" });
      return false;
    } else {
      setValidations({ email: "", password: "" });
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
            <p className="sign__main-title">Sign In</p>

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
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p className="sign__form-label">Password</p>
                {!isMobile && (
                  <span className="sign__text-forget">
                    <Link to="/forget">Forgot password?</Link>
                  </span>
                )}
              </div>

              <input
                type="password"
                className="sign__input"
                placeholder="Password"
                value={values.password}
                onChange={(e) => handleChange("password", e.target.value)}
                onKeyUp={(e) => e.keyCode === 13 && handleLogin()}
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
                <label htmlFor="remember">Remember Me</label>
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
              onClick={captcha ? handleLogin : () => {}}
            >
              Sign in
            </button>
            {isMobile && (
              <span className="sign__text-forget">
                <Link to="/forget">Forgot password?</Link>
              </span>
            )}
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                marginTop: 80,
                marginBottom: 10,
              }}
            >
              <div className="sign__separated-line"></div>
              <span className="sign__text">Don't have an account?&nbsp;</span>
              <div className="sign__separated-line"></div>
            </div>

            <Link to="/signup" className="sign__btn-second">
              Sign up
            </Link>
          </form>
        </div>
      </div>
      {!isMobile && <div style={{ height: 200, width: 200 }} />}
    </div>
  );
};

export default PageSignin;
