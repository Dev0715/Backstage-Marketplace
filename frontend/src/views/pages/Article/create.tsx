import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "react-rte";
import { useToasts } from "react-toast-notifications";
import { useAppContext } from "../../../context/AppContext";
import { useUserContext } from "../../../context/UserContext";
import { createArticle } from "../../../helper/article";
import config from "../../../helper/config";

const PageArticleCreate = () => {
  const { userInfo } = useUserContext();
  const [file, setFile] = useState<any>();
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [imagePreview, setImagePreview] = useState<any>("");
  const { loading, setLoading, setMessage, setModal } = useAppContext();
  const { addToast } = useToasts();
  const navigate = useNavigate();

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
    title: "",
    description: RichTextEditor.createEmptyValue(),
  });

  const [validations, setValidations] = useState({
    image: "",
    title: "",
    description: "",
  });

  const checkvalidations = () => {
    if (!file) {
      setValidations({ image: "has-empty", title: "", description: "" });
      return false;
    } else if (values.title === "") {
      setValidations({ image: "", title: "has-empty", description: "" });
      return false;
      // } else if (values.description === '') {
      //     setValidations({ image: '', title: '', description: 'has-empty' });
      //     return false;
    } else {
      setValidations({ image: "", title: "", description: "" });
    }

    return true;
  };

  const imageChange = (e: any) => {
    console.log("Image change clicked!", e);
    e.preventDefault();
    const reader = new FileReader();
    const f = e.target.files[0];
    console.log(f);
    if (reader !== undefined && f !== undefined) {
      reader.onloadend = () => {
        setFile(f);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(f);
    }

    setIsImageChanged(true);
  };

  const handleChange = (prop: any, value: any) => {
    setValidations((prevState) => ({ ...prevState, [prop]: "" }));
    setValues({ ...values, [prop]: value });
  };

  const handleCreate = () => {
    console.log("handle create");

    if (!checkvalidations()) return;

    const fd = new FormData();
    fd.append("image", file);
    fd.append("title", values.title);
    fd.append("description", values.description.toString("html"));

    setLoading(true);

    createArticle(fd)
      .then((res) => {
        setLoading(false);
        if (res.success) {
          // setIsImageChanged(false);
          navigate("/blog");
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
      <h2 className="cr__email--title">Create Article</h2>

      <div className="cr__email--formContainer">
        <div>
          <p className="cr__article--subtitle">Upload article image</p>
          <p className="cr__email--propstitle" style={{ marginBottom: 0 }}>
            Image resolution 1920x1280
          </p>
          <div className="cr__evcard-uploadImg">
            <label
              id="file"
              htmlFor="article__file-upload"
              className="input__upload"
            >
              {imagePreview ? (
                file.name
              ) : (
                <>
                  <img src="/img/icons/upload-1.svg" alt="" />{" "}
                  <span>upload</span>
                </>
              )}
            </label>
            <input
              data-name="#file1"
              id="article__file-upload"
              name="file"
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={imageChange}
              src={imagePreview}
            />

            {validations.image === "has-empty" ? (
              <span className="text-error">Image Required*</span>
            ) : (
              ""
            )}
            {imagePreview ? (
              <img
                src={imagePreview}
                style={{ maxWidth: "100%", display: "none" }}
                alt=""
              />
            ) : (
              // <img src="img/posts/2.jpg" alt="" width={'100%'}/>
              ""
            )}
          </div>
        </div>
        <div style={{ marginTop: 50 }}>
          <p className="cr__article--subtitle">Article Details</p>
          <p className="cr__email--propstitle" style={{ marginBottom: 0 }}>
            Item Details
          </p>
          <div className="sign__group">
            <input
              id="itemname"
              type="text"
              name="itemname"
              className="sign__input"
              placeholder="e. g. 'Crypto Heart'"
              value={values.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
            {validations.title === "has-empty" ? (
              <span className="text-error">Name Required*</span>
            ) : (
              ""
            )}
          </div>
        </div>

        <div style={{ marginTop: 50 }}>
          <p className="cr__email--propstitle" style={{ marginBottom: 0 }}>
            Content
          </p>
          {/* <textarea id="description" name="description" className="sign__textarea"
              placeholder="e. g. 'After purchasing you will able to recived...'"
              value={values.description}
              onChange={e => handleChange('description', e.target.value)}                
            ></textarea> */}
          <div className="text-editor-wrapper">
            <RichTextEditor
              value={values.description}
              onChange={(e) => handleChange("description", e)}
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
          {validations.description === "has-empty" ? (
            <span className="text-error">Description Required*</span>
          ) : (
            ""
          )}
        </div>
      </div>
      <div
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
          Create Post
        </button>
      </div>
    </div>
  );
};

export default PageArticleCreate;
