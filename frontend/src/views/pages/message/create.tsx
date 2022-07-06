import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "react-rte";
import { useToasts } from "react-toast-notifications";
import { useAppContext } from "../../../context/AppContext";
import { useUserContext } from "../../../context/UserContext";
import config from "../../../helper/config";
import { createMessage } from "../../../helper/message";
import { validateEmail } from "../../../utils";

const PageMessageCreate = () => {
  const { userInfo } = useUserContext();
  const { setLoading } = useAppContext();
  const { addToast } = useToasts();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    receiver: "",
    link: "",
    content: RichTextEditor.createEmptyValue(),
  });

  const [validations, setValidations] = useState({
    receiver: "",
    link: "",
    content: "",
  });

  const [background, setBackground] = useState<any>();
  useEffect(() => {
    if (userInfo && userInfo.user.background) {
      const backgroundUrl = `${config.API_BASE_URL}/api/upload/get_file?path=${userInfo.user.background}`;
      setBackground(backgroundUrl);
      console.log(backgroundUrl);
    } else {
    }
  }, [userInfo]);

  const checkvalidations = () => {
    if (values.receiver === "") {
      setValidations({ receiver: "has-empty", link: "", content: "" });
      return false;
    } else if (!validateEmail(values.receiver)) {
      setValidations({ receiver: "has-danger", link: "", content: "" });
      return false;
    } else if (values.link === "") {
      setValidations({ receiver: "", link: "has-empty", content: "" });
      return false;
      // } else if (!validateHtmlEditorValue(values.content)) {
      //     setValidations({ receiver: '', link: '', content: 'has-empty' });
      //     return false;
    } else {
      setValidations({ receiver: "", link: "", content: "" });
    }

    return true;
  };

  const handleChange = (prop: any, value: any) => {
    setValidations((prevState) => ({ ...prevState, [prop]: "" }));
    setValues({ ...values, [prop]: value });
  };

  const handleCreate = () => {
    console.log("handle create");

    if (!checkvalidations()) return;

    setLoading(true);

    createMessage({ ...values, content: values.content.toString("html") })
      .then((res) => {
        setLoading(false);
        if (res.success) {
          addToast("Created Email", {
            appearance: "success",
            autoDismiss: true,
          });
          navigate("/");
        } else {
          addToast("failed", { appearance: "error", autoDismiss: true });
        }
      })
      .catch((error) => {
        setLoading(false);
        addToast("An error occured", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  return (
    <div style={{ marginBottom: 700, marginTop: 0, zIndex: 999 }}>
      <h2 className="cr__email--title">Create Email</h2>
      <div className="cr__email--formContainer">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="">
            <p className="cr__email--subtitle">Receiver</p>
            <div className="sign__group cr__email-50">
              <input
                id="receiver"
                type="text"
                name="receiver"
                className="sign__input"
                placeholder="e. g. 'john@gmail.com'"
                value={values.receiver}
                onChange={(e) => handleChange("receiver", e.target.value)}
              />
              {validations.receiver === "has-empty" ? (
                <span className="text-error">Receiver Required*</span>
              ) : (
                ""
              )}
              {validations.receiver === "has-danger" ? (
                <span className="text-error">Receiver should be email.</span>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="">
            <p className="cr__email--subtitle">Item details</p>
            <div className="sign__group cr__email-50">
              <input
                id="itemname"
                type="text"
                name="itemname"
                className="sign__input"
                placeholder="e. g. 'Crypto Heart'"
                value={values.link}
                onChange={(e) => handleChange("link", e.target.value)}
              />

              {validations.link === "has-empty" ? (
                <span className="text-error">Link Required*</span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className="sign__group">
          <p className="cr__email--subtitle">Content</p>
          <div className="text-editor-wrapper">
            <RichTextEditor
              value={values.content}
              onChange={(e) => handleChange("content", e)}
              rootStyle={{
                background: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.33)",
                borderRadius: 4,
                overflow: "hidden",
              }}
              toolbarStyle={{
                background: "white",
                padding: 8,
                paddingBottom: 0,
                margin: 0,
              }}
              editorStyle={{ color: "#fff", overflow: "hidden", height: 180 }}
            />
          </div>

          {validations.content === "has-empty" ? (
            <span className="text-error">Content Required*</span>
          ) : (
            ""
          )}
          {/* <textarea id="description" name="description" className="sign__textarea"
            placeholder="e. g. 'After purchasing you will able to recived...'"
            value={values.content}
            onChange={e => handleChange('content', e.target.value)}                
          ></textarea> */}
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
          style={{ width: 360, marginRight: 0 }}
        >
          Create Email
        </button>
      </div>
    </div>
  );
};

export default PageMessageCreate;
