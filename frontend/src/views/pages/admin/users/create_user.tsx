import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useAppContext } from "../../../../context/AppContext";
import { useUserContext } from "../../../../context/UserContext";
import { signup } from "../../../../helper/auth";
import config from "../../../../helper/config";

const PageUserCreate = () => {
  const { userInfo } = useUserContext();
  const { setLoading } = useAppContext();
  const { addToast } = useToasts();
  const { setModal } = useAppContext();

  const [background, setBackground] = useState<any>();
  useEffect(() => {
    if (userInfo && userInfo.user.background) {
      const backgroundUrl = `${config.API_BASE_URL}/api/upload/get_file?path=${userInfo.user.background}`;
      setBackground(backgroundUrl);
      console.log(backgroundUrl);
    } else {
    }
  }, [userInfo]);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm_pwd: "",
  });

  const initialValidation = {
    name: "",
    email: "",
    password: "",
    confirm_pwd: "",
  };

  const [validations, setValidations] = useState(initialValidation);

  const checkvalidations = () => {
    if (values.name === "") {
      setValidations({ ...initialValidation, name: "has-empty" });
      return false;
    } else if (values.email === "") {
      setValidations({ ...initialValidation, email: "has-empty" });
      return false;
    } else if (values.password === "") {
      setValidations({ ...initialValidation, password: "has-empty" });
      return false;
    } else if (values.confirm_pwd === "") {
      setValidations({ ...initialValidation, confirm_pwd: "has-empty" });
      return false;
    } else if (values.confirm_pwd !== values.password) {
      setValidations({ ...initialValidation, confirm_pwd: "not-match" });
      return false;
    } else {
      setValidations({ ...initialValidation });
    }
    return true;
  };

  const handleChange = (prop: any, value: any) => {
    setValidations((prevState) => ({ ...prevState, [prop]: "" }));
    setValues({ ...values, [prop]: value });
  };

  const handleCreate = async () => {
    console.log("handle create");
    if (!checkvalidations()) return;

    setLoading(true);

    signup({ ...values, user_type: "SUPER" })
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res.success) {
          // setModal({ open: true, children: <SignupSuccessMoal /> });
          addToast(
            "Register success. Email was sent. Please verify the email",
            { appearance: "success", autoDismiss: true }
          );
          return;
        } else {
          addToast(res.message, { appearance: "error", autoDismiss: true });
        }
      })
      .catch((error) => {
        setLoading(false);
        addToast("failed", { appearance: "error", autoDismiss: true });
      });
  };

  return (
    <div style={{ marginBottom: 700, marginTop: 70, zIndex: 999 }}>
      <h2 className="cr__email--title">Create Super User</h2>
      <div className="cr__email--formContainer">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <p className="cr__email--subtitle">Name</p>
            <div className="sign__group cr__email-50">
              <input
                id="name"
                type="text"
                name="name"
                className="sign__input"
                value={values.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              {validations.name === "has-empty" ? (
                <span className="text-error">Name Required*</span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <p className="cr__email--subtitle">Email</p>
            <div className="sign__group cr__email-50">
              <input
                id="email"
                type="text"
                name="email"
                className="sign__input"
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {validations.email === "has-empty" ? (
                <span className="text-error">email Required*</span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <p className="cr__email--subtitle">Password</p>
            <div className="sign__group cr__email-50">
              <input
                id="password"
                type="password"
                name="password"
                className="sign__input"
                value={values.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              {validations.password === "has-empty" ? (
                <span className="text-error">password Required*</span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <p className="cr__email--subtitle">Confirm Password</p>
            <div className="sign__group cr__email-50">
              <input
                id="confirm_pwd"
                type="password"
                name="confirm_pwd"
                className="sign__input"
                value={values.confirm_pwd}
                onChange={(e) => handleChange("confirm_pwd", e.target.value)}
              />
              {validations.confirm_pwd === "has-empty" ? (
                <span className="text-error">Confirm Password Required*</span>
              ) : (
                ""
              )}
              {validations.confirm_pwd === "not-match" ? (
                <span className="text-error">
                  Should be matched with Password*
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className=""
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 25,
        }}
      >
        <button
          type="button"
          className="sign__btn"
          onClick={handleCreate}
          style={{ width: 410, marginRight: 0 }}
        >
          Create User
        </button>
      </div>
    </div>
  );
};

export default PageUserCreate;
