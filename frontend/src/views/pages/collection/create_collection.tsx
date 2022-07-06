import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useAppContext } from "../../../context/AppContext";
import { useUserContext } from "../../../context/UserContext";
import config from "../../../helper/config";
import { createCollection } from "../../../helper/event";

import { useWeb3React } from "@web3-react/core";
import { injected } from "../../../helper/web3service";

/* import the ipfs-http-client library */
import { create } from "ipfs-http-client";

/* Create an instance of the client */
// const client = create('https://ipfs.infura.io:5001/api/v0');
const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const PageCollectionCreate = () => {
  const { active, account, chainId, activate } = useWeb3React();
  const { userInfo } = useUserContext();
  const [largeFile, setLargeFile] = useState<any>();
  const [smallFile, setSmallFile] = useState<any>();
  const [largeImagePreview, setLargeImagePreview] = useState<any>("");
  const [smallImagePreview, setSmallImagePreview] = useState<any>("");
  const { setLoading } = useAppContext();
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
    name: "",
    category: "",
    wallet_address: "",
    description: "",
  });

  const initialValidation = {
    picture_large: "",
    picture_small: "",
    name: "",
    category: "",
    wallet_address: "",
    description: "",
  };

  const [validations, setValidations] = useState(initialValidation);

  async function wallet_connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log("connection failed", ex);
      addToast("Connection failed!", {
        appearance: "error",
        autoDismiss: true,
      });
      // navigate("/activity");
    }
  }

  // useEffect(() => {
  //   wallet_connect().then((res) => {
  //     setValues({
  //       ...values,
  //       wallet_address: (window as any).ethereum.selectedAddress,
  //     });
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const checkvalidations = () => {
    if (!largeFile) {
      setValidations({ ...initialValidation, picture_large: "has-empty" });
      return false;
    } else if (!smallFile) {
      setValidations({ ...initialValidation, picture_small: "has-empty" });
      return false;
    } else if (values.name === "") {
      setValidations({ ...initialValidation, name: "has-empty" });
      return false;
    } else if (values.category === "") {
      setValidations({ ...initialValidation, category: "has-empty" });
      return false;
    } else if (!values.wallet_address) {
      setValidations({ ...initialValidation, wallet_address: "has-empty" });
      return false;
    } else if (!values.description) {
      setValidations({ ...initialValidation, description: "has-empty" });
      return false;
    } else {
      setValidations({ ...initialValidation });
    }

    return true;
  };

  const largeImageChange = (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    const f = e.target.files[0];
    if (reader !== undefined && f !== undefined) {
      reader.onloadend = () => {
        setLargeFile(f);
        setLargeImagePreview(reader.result);
      };
      reader.readAsDataURL(f);
    }
  };

  const smallImageChange = (e: any) => {
    console.log("small image change");
    e.preventDefault();
    const reader = new FileReader();
    const f = e.target.files[0];
    if (reader !== undefined && f !== undefined) {
      reader.onloadend = () => {
        setSmallFile(f);
        setSmallImagePreview(reader.result);
      };
      reader.readAsDataURL(f);
    }
  };

  const handleChange = (prop: any, value: any) => {
    setValidations((prevState) => ({ ...prevState, [prop]: "" }));
    setValues({ ...values, [prop]: value });
  };

  const handleCreate = async () => {
    console.log("handle create");

    if (!checkvalidations()) return;

    setLoading(true);

    //upload image to IPFS
    const added = await client.add(smallFile);
    const ipfs_url = `https://ipfs.infura.io/ipfs/${added.path}`;
    console.log(ipfs_url);

    const fd = new FormData();
    fd.append("large_image", largeFile);
    fd.append("small_image", smallFile);
    fd.append("picture_ipfs", ipfs_url);
    fd.append("creator", userInfo.user.id);

    for (const [key, value] of Object.entries(values)) {
      if (key === "date") {
        fd.append(key, new Date(value).toISOString().toString());
      } else {
        fd.append(key, value as any);
      }
    }
    console.log(values);

    createCollection(fd)
      .then(async (res) => {
        if (res.success) {
          setLoading(false);
          navigate("/");
        } else {
          addToast("failed", { appearance: "error", autoDismiss: true });
          setLoading(false);
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
    <div style={{ marginBottom: 700, marginTop: 70, zIndex: 999 }}>
      <h2 className="cr__email--title">Create Collection</h2>
      <div className="cr__email--formContainer">
        <p className="cr__article--subtitle">Upload Collection image</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: 380 }}>
            <p className="cr__evcard-labelTitle">Large Picture</p>
            <p className="cr__evcard-labelDesc">Image resolution 1920 * 1080</p>
            <div className="cr__evcard-uploadImg">
              <label
                id="file"
                htmlFor="largeimage-upload"
                className="input__upload"
              >
                {largeImagePreview ? (
                  largeFile.name
                ) : (
                  <>
                    <img src="/img/icons/upload-1.svg" alt="" />
                    <span>upload</span>
                  </>
                )}
              </label>
              <input
                data-name="#file1"
                id="largeimage-upload"
                name="file"
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={largeImageChange}
                src={largeImagePreview}
              />
              {validations.picture_large === "has-empty" ? (
                <span className="text-error">Large Image Required*</span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div style={{ width: 380 }}>
            <p className="cr__evcard-labelTitle">Small Picture</p>
            <p className="cr__evcard-labelDesc">Image resolution 260 * 300</p>
            <div className="cr__evcard-uploadImg">
              <label
                id="file2"
                htmlFor="smallimage-upload"
                className="input__upload"
              >
                {smallImagePreview ? (
                  smallFile.name
                ) : (
                  <>
                    <img src="/img/icons/upload-1.svg" alt="" />{" "}
                    <span>upload</span>
                  </>
                )}
              </label>
              <input
                data-name="#file2"
                id="smallimage-upload"
                name="file"
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={smallImageChange}
                src={smallImagePreview}
              />

              {validations.picture_small === "has-empty" ? (
                <span className="text-error">Small Image Required*</span>
              ) : (
                ""
              )}
            </div>
            {smallImagePreview ? (
              <div className="text-center" style={{ textAlign: "center" }}>
                <img
                  src={smallImagePreview}
                  width={"50%"}
                  style={{ display: "none" }}
                  alt="smallImg"
                />
              </div>
            ) : (
              // <img src="img/posts/2.jpg" alt="" width={'100%'}/>
              ""
            )}
          </div>
        </div>
        <p className="cr__article--subtitle" style={{ marginTop: 54 }}>
          Collection Details
        </p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <p className="cr__evcard-labelTitle">Name</p>
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
            <p className="cr__evcard-labelTitle">Category</p>
            <div className="sign__group cr__email-50">
              <input
                id="category"
                type="text"
                className="sign__input"
                value={values.category}
                onChange={(e) => handleChange("category", e.target.value)}
              />
              {validations.category === "has-empty" ? (
                <span className="text-error">category Required*</span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <p className="cr__evcard-labelTitle">Owner wallet address</p>
            <div className="sign__group cr__email-50">
              <input
                id="wallet_address"
                type="text"
                name="wallet_address"
                className="sign__input"
                value={values.wallet_address}
                onChange={(e) => handleChange("wallet_address", e.target.value)}
              />
              {validations.wallet_address === "has-empty" ? (
                <span className="text-error">
                  Address of owner wallet Required*
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="sign__group cr__evcard-50"></div>
        </div>
        <div className="cr__evcard-100">
          <p className="cr__evcard-labelTitle">General Description</p>
          <textarea
            id="description"
            name="description"
            className="sign__input"
            style={{
              height: "90px",
              resize: "none",
              padding: "10px 20px",
            }}
            value={values.description}
            onChange={(e) => handleChange("description", e.target.value)}
          ></textarea>
          {validations.description === "has-empty" ? (
            <span className="text-error">Description Required*</span>
          ) : (
            ""
          )}
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
          Create Collection
        </button>
      </div>
    </div>
  );
};

export default PageCollectionCreate;
