import { useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useAppContext } from "../../../context/AppContext";
import { forgetPassword } from "../../../helper/auth";
import { validateEmail } from "../../../utils";

const PageForgetpassword = () => {
  const { setLoading } = useAppContext();
  const [values, setValues] = useState({
    email: "",
  });
  const [validations, setValidations] = useState({
    email: "",
  });
  const { addToast } = useToasts();

  const handleChange = (prop: any, value: any) => {
    setValidations((prevState) => ({ ...prevState, [prop]: "" }));
    setValues({ ...values, [prop]: value });
  };

  const handleSend = () => {
    if (!checkvalidations()) return;

    setLoading(true);

    forgetPassword(values)
      .then((res) => {
        setLoading(false);
        if (res.success) {
          addToast(
            "Email with reset password link was sent. please check your mailbox",
            { appearance: "success", autoDismiss: true }
          );
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
    if (values.email === "") {
      setValidations({ email: "has-empty" });
      return false;
    } else if (!validateEmail(values.email)) {
      setValidations({ email: "has-danger" });
      return false;
    } else {
      setValidations({ email: "" });
    }

    return true;
  };

  return (
    <div style={{ width: "100%", marginBottom: 350 }}>
      <div className="sign">
        <div className="sign__content">
          <p className="sign__main-title">Restore Password</p>
          <p
            style={{
              fontSize: 16,
              fontWeight: 400,
              lineHeight: "20px",
              letterSpacing: "0.03em",
              color: "rgba(255, 255, 255, 0.66)",
              textAlign: "center",
            }}
          >
            Please enter your email address below <br /> to receive a password
            reset link.
          </p>
          <form action="#" className="sign__form">
            <div className="sign__group">
              <p className="sign__form-label">Your email</p>
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

            <div className="sign__group sign__group--checkbox">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                defaultChecked
              />
              <label htmlFor="remember">
                I agree to the &nbsp;
                <Link to="/privacy">Privacy Policy</Link>
              </label>
            </div>

            <button className="sign__btn" type="button" onClick={handleSend}>
              Reset My Password
            </button>

            {/* <span className="sign__text">We will send a password to your Email</span> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageForgetpassword;
