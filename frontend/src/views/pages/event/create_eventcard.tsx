import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useAppContext } from "../../../context/AppContext";
import { useUserContext } from "../../../context/UserContext";
import config from "../../../helper/config";
import {
  createEventCard,
  getAllAddonIcons,
  getCollectionById,
} from "../../../helper/event";

import { useWeb3React } from "@web3-react/core";
import { injected } from "../../../helper/web3service";

import * as nearAPI from "near-api-js";

/* import the ipfs-http-client library */
// import { create } from "ipfs-http-client";
import ItemSelectModal from "../../../components/custom_modals/item_select_modal";

/* Create an instance of the client */
// const client = create('https://ipfs.infura.io:5001/api/v0');
// const client = create({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
// });

const PageEventCardCreate = () => {
  // const { active, account, chainId, activate } = useWeb3React();
  const { activate } = useWeb3React();
  const { userInfo } = useUserContext();
  const { id } = useParams();
  const [collectionName, setCollectionName] = useState("");
  const [largeFile, setLargeFile] = useState<any>();
  // const [largeFileSize, setLargeFileSize] = useState({ width: 0, height: 0 });
  const [largeFileSize, setLargeFileSize] = useState({ width: 0, height: 0 });
  const [smallFile, setSmallFile] = useState<any>();
  const [isLargeImageChanged, setIsLargeImageChanged] = useState(false);
  const [largeImagePreview, setLargeImagePreview] = useState<any>("");
  const [isSmallImageChanged, setIsSmallImageChanged] = useState(false);
  const [smallImagePreview, setSmallImagePreview] = useState<any>("");
  const [greenPass, setGreenPass] = useState(0);
  const { setLoading, setModal, settings } = useAppContext();
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const { connect, keyStores, WalletConnection } = nearAPI;

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
    location: "",
    price: "",
    date: "",
    venue_description: "",
    description: "",
    facebook: "",
    twitter: "",
    instagram: "",
    tiktok: "",
    telegram: "",
    discord: "",
    category: "",
    collection: `${id}`,
    total_tickets: "",
    // tags: "",
    owner_wallet: "",
    owner_account: "test.testnet",
    // fee_percentage: "",
  });

  const initialValidation = {
    picture_large: "",
    picture_small: "",
    name: "",
    location: "",
    price: "",
    date: "",
    venue_description: "",
    description: "",
    category: "",
    collection: "",
    total_tickets: "",
    owner_wallet: "",
    owner_account: "",
    // fee_percentage: "",
    // royalty: "",
  };

  const [validations, setValidations] = useState(initialValidation);
  const [addons, setAddons] = useState<any>([]);
  const [addonName, setAddonName] = useState("");
  const [addonDescription, setAddonDescription] = useState("");
  const [addonPrice, setAddonPrice] = useState("");
  const [addonIcon, setAddonIcon] = useState("");
  const [addonIcons, setAddonIcons] = useState<any>([]);

  const [royalties, setRoyalties] = useState<any>([]);
  const [royaltyWallet, setRoyaltyWallet] = useState("");
  const [royaltyAccount, setRoyaltyAccount] = useState("");
  const [royaltyFee, setRoyaltyFee] = useState("");

  const [payees, setPayees] = useState<any>([]);
  const [payeeWallet, setPayeeWallet] = useState("");
  const [payeeAccount, setPayeeAccount] = useState("");
  const [payeeFee, setPayeeFee] = useState("");

  // const minPaymentFee = useMemo(() => {
  //   return Number(
  //     settings.find((item: any) => item.key === "minPaymentFee")?.value
  //   );
  // }, [settings]);

  const shortAddress = (str: string) => {
    return str.slice(0, 5) + "..." + str.slice(str.length - 4);
  };

  const add_Addons = () => {
    if (
      addonName === "" ||
      addonDescription === "" ||
      addonIcon === "" ||
      addonPrice === ""
    ) {
      addToast("Please input all traits for the Addon", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
    setAddons([
      ...addons,
      {
        name: addonName,
        description: addonDescription,
        price: addonPrice,
        icon: addonIcon,
      },
    ]);
    setAddonName("");
    setAddonDescription("");
    setAddonPrice("");
    setAddonIcon("");
  };

  const remove_Addon = (index: number) => {
    setAddons(addons.slice(0, index).concat(addons.slice(index + 1)));
  };

  const set_Icon = (icon_src: any) => {
    setAddonIcon(icon_src);
  };

  const select_Icon = () => {
    setModal({
      open: true,
      children: (
        <ItemSelectModal
          title="Select Item Icon"
          handleEnd={set_Icon}
          icons={addonIcons}
        />
      ),
    });
  };

  const add_Payee = () => {
    if (payees.length > 9) return;
    if (payeeWallet === "" || payeeAccount === "" || payeeFee === "") {
      addToast("Please input all traits for the Payee", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
    setPayees([
      ...payees,
      {
        wallet: payeeWallet,
        account: payeeAccount,
        fee: payeeFee,
      },
    ]);
    setPayeeWallet("");
    setPayeeAccount("");
    setPayeeFee("");
  };

  const remove_Payee = (index: number) => {
    setPayees(payees.slice(0, index).concat(payees.slice(index + 1)));
  };

  const add_Royalty = () => {
    if (royalties.length > 9) return;
    if (royaltyWallet === "" || royaltyAccount === "" || royaltyFee === "") {
      addToast("Please input all traits for the Royalty", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
    setRoyalties([
      ...royalties,
      {
        wallet: royaltyWallet,
        account: royaltyAccount,
        fee: royaltyFee,
      },
    ]);
    setRoyaltyWallet("");
    setRoyaltyAccount("");
    setRoyaltyFee("");
  };

  const remove_Royalty = (index: number) => {
    setRoyalties(royalties.slice(0, index).concat(royalties.slice(index + 1)));
  };

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

  useEffect(() => {
    getCollectionById(id).then((res) => {
      if (res.success) {
        setCollectionName(res.collection.name);
      }
    });
    getAllAddonIcons().then((res) => {
      if (res.success) {
        setAddonIcons(res.addonicons);
      }
    });
    wallet_connect().then((res) => {
      setValues({
        ...values,
        owner_wallet: (window as any).ethereum.selectedAddress,
      });
    });
    initNearAddress().then((account) => {
      setValues({
        ...values,
        owner_account: account,
      });
    });
  }, []);

  const initNearAddress = async () => {
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    const config = {
      networkId: "testnet",
      keyStore,
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
      headers: {},
    };
    const near = await connect(config);
    const wallet = new WalletConnection(near, null);

    if (wallet.isSignedIn()) {
      return wallet.account().accountId;
    } else return "";
  };

  const checkvalidations = () => {
    if (values.category === "") {
      setValidations({ ...initialValidation, category: "has-empty" });
      return false;
    } else if (!largeFile) {
      setValidations({ ...initialValidation, picture_large: "has-empty" });
      return false;
      // } else if (!isLargeFileValid()) {
      //   setValidations({ ...initialValidation, picture_large: "has-invalid" });
      //   return false;
    } else if (!smallFile) {
      setValidations({ ...initialValidation, picture_small: "has-empty" });
      return false;
    } else if (values.name === "") {
      setValidations({ ...initialValidation, name: "has-empty" });
      return false;
    } else if (values.category !== "Category2" && values.location === "") {
      setValidations({ ...initialValidation, location: "has-empty" });
      return false;
    } else if (!values.price) {
      setValidations({ ...initialValidation, price: "has-empty" });
      return false;
    } else if (values.category !== "Category2" && !values.date) {
      setValidations({ ...initialValidation, date: "has-empty" });
      return false;
    } else if (
      values.category !== "Category2" &&
      values.venue_description === ""
    ) {
      setValidations({ ...initialValidation, venue_description: "has-empty" });
      return false;
    } else if (values.description === "") {
      setValidations({ ...initialValidation, description: "has-empty" });
      return false;
    } else if (values.collection === "") {
      setValidations({ ...initialValidation, collection: "has-empty" });
      return false;
    } else if (!isWalletValid(values.owner_wallet)) {
      setValidations({ ...initialValidation, owner_wallet: "has-empty" });
      return false;
    } else if (!isAccountValid(values.owner_account)) {
      setValidations({ ...initialValidation, owner_account: "has-empty" });
      return false;
    } else if (!values.total_tickets) {
      setValidations({ ...initialValidation, total_tickets: "has-empty" });
      return false;
      // } else if (
      //   !values.fee_percentage ||
      //   Number(values.fee_percentage) < minPaymentFee
      // ) {
      //   setValidations({ ...initialValidation, fee_percentage: "has-empty" });
      //   return false;
    } else if (!isPayeeValid()) {
      addToast(
        "Payee fee should be less than 100% and wallet addresses should be valid",
        {
          appearance: "error",
          autoDismiss: true,
        }
      );
      return false;
    } else if (!isRoyaltyValid()) {
      addToast(
        "Royalty fee should be less than 10% and wallet addresses should be valid",
        {
          appearance: "error",
          autoDismiss: true,
        }
      );
      return false;
    } else {
      setValidations({ ...initialValidation });
    }

    return true;
  };

  const isWalletValid = (str: String) => {
    console.log("asdfsdaf");
    const len = str.length;
    if (len !== 42) return false;
    console.log("CHECK 1");
    if (str[0] !== "0" || str[1] !== "x") return false;
    console.log("CHECK 2");
    for (let i = 2; i < len; i++)
      if (
        (str[i] < "a" || str[i] > "f") &&
        (str[i] < "A" || str[i] > "F") &&
        (str[i] < "0" || str[i] > "9")
      )
        return false;
    console.log("CHECK 3");
    return true;
  };

  const isAccountValid = (str: String) => {
    const _arr = str.split(".");
    const len = _arr.length;
    if (_arr[len - 1] === "testnet") return true;
    else return false;
  };

  const isPayeeValid = () => {
    const total = 100;
    let _payees = payees;

    if (payeeWallet !== "" && payeeAccount !== "" && payeeFee !== "") {
      _payees = [
        ...payees,
        {
          wallet: payeeWallet,
          account: payeeAccount,
          fee: payeeFee,
        },
      ];
    }

    let subTotal = 0;
    _payees.map((item: any) => {
      if (!isWalletValid(item.wallet)) subTotal = total + 1;
      else if (!isAccountValid(item.account)) subTotal = total + 1;
      else subTotal += Number(item.fee);
    });

    if (total < subTotal) {
      return false;
    } else return true;
  };

  const isRoyaltyValid = () => {
    const total = 10;
    let _royalties = royalties;

    if (royaltyWallet !== "" && royaltyAccount !== "" && royaltyFee !== "") {
      _royalties = [
        ...royalties,
        {
          wallet: royaltyWallet,
          account: royaltyAccount,
          fee: royaltyFee,
        },
      ];
    }

    let subTotal = 0;
    _royalties.map((item: any) => {
      if (!isWalletValid(item.wallet)) subTotal = total + 1;
      else if (!isAccountValid(item.account)) subTotal = total + 1;
      else subTotal += Number(item.fee);
    });

    if (total < subTotal) {
      return false;
    } else return true;
  };

  const largeImageLoaded = (target: any) => {
    setLargeFileSize({
      width: target.target.naturalWidth,
      height: target.target.naturalHeight,
    });
  };

  // const isLargeFileValid = () => {
  //   if (largeFileSize.width < 1900 || largeFileSize.width > 1950) return false;
  //   else if (largeFileSize.height < 1250 || largeFileSize.height > 1300)
  //     return false;
  //   return true;
  // };

  const toggleGreenPass = () => {
    if (greenPass) {
      setGreenPass(0);
    } else {
      setGreenPass(1);
    }
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

    setIsLargeImageChanged(true);
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

    setIsSmallImageChanged(true);
  };

  const handleChange = (prop: any, value: any) => {
    setValidations((prevState) => ({ ...prevState, [prop]: "" }));
    setValues({ ...values, [prop]: value });
  };

  const handleCreate = async () => {
    console.log("handle create");

    if (!checkvalidations()) {
      addToast("You need to input correct values for all the inputs", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    setLoading(true);

    let ipfs_url = "";
    //upload image to IPFS
    // try {
    //   const added = await client.add(smallFile);
    //   ipfs_url = `https://ipfs.infura.io/ipfs/${added.path}`;
    //   console.log(ipfs_url);
    // } catch (err) {
    //   console.log(err);
    // }

    let _addons = addons;
    let _royalties = royalties;
    let _payees = payees;

    if (
      addonName !== "" &&
      addonDescription !== "" &&
      addonIcon !== "" &&
      addonPrice !== ""
    ) {
      _addons = [
        ...addons,
        {
          name: addonName,
          description: addonDescription,
          price: addonPrice,
          icon: addonIcon,
        },
      ];
    }

    if (royaltyWallet !== "" && royaltyAccount !== "" && royaltyFee !== "") {
      _royalties = [
        ...royalties,
        {
          wallet: royaltyWallet,
          account: royaltyAccount,
          fee: royaltyFee,
        },
      ];
    }

    if (payeeWallet !== "" && payeeAccount !== "" && payeeFee !== "") {
      _payees = [
        ...payees,
        {
          wallet: payeeWallet,
          account: payeeAccount,
          fee: payeeFee,
        },
      ];
    }

    const fd = new FormData();
    fd.append("large_image", largeFile);
    fd.append("small_image", smallFile);
    fd.append("picture_ipfs", ipfs_url);
    fd.append("creator", userInfo.user.id);
    fd.append("green_pass_needed", greenPass as any);
    fd.append("addons", JSON.stringify(_addons));
    fd.append("payees", JSON.stringify(_payees));
    fd.append("royalties", JSON.stringify(_royalties));
    // fd.append(
    //   "payee_wallet",
    //   _royalties.map((item: any) => item.wallet).join(",")
    // );
    // fd.append(
    //   "payee_account",
    //   _royalties.map((item: any) => item.account).join(",")
    // );
    // fd.append("payee_fee", _royalties.map((item: any) => item.fee).join(","));

    // if (key ==='date'){
    //     console.log(new Date(value).toISOString())
    //     value = new Date(value).toISOString().toString()
    // }
    // console.log(values.date);
    // setValues({...values, 'date': new Date(values.date).toISOString().toString()})

    for (const [key, value] of Object.entries(values)) {
      if (key === "date") {
        if (values.category !== "Category2")
          fd.append(key, new Date(value).toISOString().toString());
        else fd.append(key, new Date().toISOString().toString());
      } else {
        fd.append(key, value as any);
      }
    }
    console.log(values);
    createEventCard(fd)
      .then((res) => {
        if (res.success) {
          // setIsImageChanged(false);
          console.log(res);
          // await creatEventOnContract(values, res.eventcard);
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

  // async function creatEventOnContract(event: any, eventcard: any) {
  //   if (!active) {
  //     await wallet_connect();
  //   }
  //   if (chainId !== 56 && chainId !== 97) {
  //     addToast("Please change the network ", {
  //       appearance: "warning",
  //       autoDismiss: true,
  //     });
  //   } else {
  //     if (account) {
  //       addToast("Please wait ... It might takes some time", {
  //         appearance: "warning",
  //         autoDismiss: true,
  //       });
  //       try {
  //         const provider = new ethers.providers.Web3Provider(
  //           (window as any).ethereum
  //         );
  //         const contract = new ethers.Contract(
  //           chainId === 97
  //             ? paymentAddress_testnet
  //             : chainId === 56
  //             ? paymentAddress_mainnet
  //             : "",
  //           paymentABI,
  //           provider.getSigner()
  //         );

  //         console.log(
  //           "Initialize payment",
  //           eventcard.id,
  //           event.owner_wallet,
  //           royalties.map((item: any) => item.wallet),
  //           royalties.map((item: any) => Number(item.fee)),
  //           event.price
  //         );
  //         let txn = await contract.addEvent(
  //           eventcard.id,
  //           event.owner_wallet,
  //           royalties.map((item: any) => item.wallet),
  //           royalties.map((item: any) => Number(item.fee)),
  //           event.price
  //         );
  //         await txn.wait();
  //         addToast("Successfully Created", {
  //           appearance: "success",
  //           autoDismiss: true,
  //         });
  //       } catch (err) {
  //         console.log(err);
  //         addToast((err as Error).message, {
  //           appearance: "warning",
  //           autoDismiss: true,
  //         });
  //       }
  //     }
  //   }
  // }

  return (
    <div
      style={{
        marginBottom: 70,
        marginTop: 70,
        maxWidth: 1224,
        width: "100%",
        zIndex: 1,
      }}
    >
      <div
        className="main__author"
        style={
          background
            ? {
                backgroundImage: `url(${background})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }
            : {}
        }
      ></div>
      <div className="container">
        <div className="row row--grid">
          <div className="col-12 col-xl-4" style={{ padding: 0 }}>
            <div className="collection__author-meta">
              <Link to="/author" className="collection__author-avatar">
                {userInfo && userInfo.user && userInfo.user.avatar ? (
                  <img
                    // src={`${config.API_BASE_URL}/api/upload/get_file?path=${userInfo.user.avatar}`}
                    src={`${userInfo.user.avatar}`}
                    alt=""
                  />
                ) : (
                  <img src="/img/avatars/avatar5.jpg" alt="" />
                )}
              </Link>
              <h1 className="collection__author-name">
                <Link to="/author">{userInfo?.user.name}</Link>
                <div className="sellers-list__author--verified" />
              </h1>
              <h2 className="collection__author-nickname">
                <Link to="/author">@l1rose</Link>
              </h2>
              <p className="collection__author-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
          {/* <div className="col-12 col-xl-3">
            <div className="author author--page">
              <div className="author__meta">
                <Link
                  to="/author"
                  className="author__avatar author__avatar--verified"
                >
                  {userInfo && userInfo.user && userInfo.user.avatar ? (
                    <img
                      // src={`${config.API_BASE_URL}/api/upload/get_file?path=${userInfo.user.avatar}`}
                      src={`${userInfo.user.avatar}`}
                      alt=""
                      style={{ height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <img src="img/avatars/avatar5.jpg" alt="" />
                  )}
                </Link>
                <h1 className="author__name">
                  <Link to="/author">
                    {userInfo ? <>{userInfo.user.name}</> : ""}
                  </Link>
                </h1>
                <h2 className="author__nickname"><Link to="/author">@l1rose</Link></h2>
                <p className="author__text">
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary
                </p>
                <div className="author__code">
                  <input
                    type="text"
                    value="XAVUW3sw3ZunitokcLtemEfX3tGuX2plateWdh"
                    id="author-code"
                  />
                  <button type="button">
                    <span>Copied</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M18,19H6a3,3,0,0,1-3-3V8A1,1,0,0,0,1,8v8a5,5,0,0,0,5,5H18a1,1,0,0,0,0-2Zm5-9.06a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19l-.09,0L16.06,3H8A3,3,0,0,0,5,6v8a3,3,0,0,0,3,3H20a3,3,0,0,0,3-3V10S23,10,23,9.94ZM17,6.41,19.59,9H18a1,1,0,0,1-1-1ZM21,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V6A1,1,0,0,1,8,5h7V8a3,3,0,0,0,3,3h3Z"></path>
                    </svg>
                  </button>
                </div>
                <a href="/#" className="author__link">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M21.41,8.64s0,0,0-.05a10,10,0,0,0-18.78,0s0,0,0,.05a9.86,9.86,0,0,0,0,6.72s0,0,0,.05a10,10,0,0,0,18.78,0s0,0,0-.05a9.86,9.86,0,0,0,0-6.72ZM4.26,14a7.82,7.82,0,0,1,0-4H6.12a16.73,16.73,0,0,0,0,4Zm.82,2h1.4a12.15,12.15,0,0,0,1,2.57A8,8,0,0,1,5.08,16Zm1.4-8H5.08A8,8,0,0,1,7.45,5.43,12.15,12.15,0,0,0,6.48,8ZM11,19.7A6.34,6.34,0,0,1,8.57,16H11ZM11,14H8.14a14.36,14.36,0,0,1,0-4H11Zm0-6H8.57A6.34,6.34,0,0,1,11,4.3Zm7.92,0h-1.4a12.15,12.15,0,0,0-1-2.57A8,8,0,0,1,18.92,8ZM13,4.3A6.34,6.34,0,0,1,15.43,8H13Zm0,15.4V16h2.43A6.34,6.34,0,0,1,13,19.7ZM15.86,14H13V10h2.86a14.36,14.36,0,0,1,0,4Zm.69,4.57a12.15,12.15,0,0,0,1-2.57h1.4A8,8,0,0,1,16.55,18.57ZM19.74,14H17.88A16.16,16.16,0,0,0,18,12a16.28,16.28,0,0,0-.12-2h1.86a7.82,7.82,0,0,1,0,4Z"></path>
                  </svg>
                  https://bksbackstage.io
                </a>
                <div className="author__social">
                  <a href="/#" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M20.07,6.35H15V7.76h5.09ZM19,16.05a2.23,2.23,0,0,1-1.3.37A2.23,2.23,0,0,1,16,15.88a2.49,2.49,0,0,1-.62-1.76H22a6.47,6.47,0,0,0-.17-2,5.08,5.08,0,0,0-.8-1.73,4.17,4.17,0,0,0-1.42-1.21,4.37,4.37,0,0,0-2-.45,4.88,4.88,0,0,0-1.9.37,4.51,4.51,0,0,0-1.47,1,4.4,4.4,0,0,0-.95,1.52,5.4,5.4,0,0,0-.33,1.91,5.52,5.52,0,0,0,.32,1.94A4.46,4.46,0,0,0,14.16,17a4,4,0,0,0,1.46,1,5.2,5.2,0,0,0,1.94.34,4.77,4.77,0,0,0,2.64-.7,4.21,4.21,0,0,0,1.63-2.35H19.62A1.54,1.54,0,0,1,19,16.05Zm-3.43-4.12a1.87,1.87,0,0,1,1-1.14,2.28,2.28,0,0,1,1-.2,1.73,1.73,0,0,1,1.36.49,2.91,2.91,0,0,1,.63,1.45H15.41A3,3,0,0,1,15.52,11.93Zm-5.29-.48a3.06,3.06,0,0,0,1.28-1,2.72,2.72,0,0,0,.43-1.58,3.28,3.28,0,0,0-.29-1.48,2.4,2.4,0,0,0-.82-1,3.24,3.24,0,0,0-1.27-.52,7.54,7.54,0,0,0-1.64-.16H2V18.29H8.1a6.55,6.55,0,0,0,1.65-.21,4.55,4.55,0,0,0,1.43-.65,3.13,3.13,0,0,0,1-1.14,3.41,3.41,0,0,0,.37-1.65,3.47,3.47,0,0,0-.57-2A3,3,0,0,0,10.23,11.45ZM4.77,7.86H7.36a4.17,4.17,0,0,1,.71.06,1.64,1.64,0,0,1,.61.22,1.05,1.05,0,0,1,.42.44,1.42,1.42,0,0,1,.16.72,1.36,1.36,0,0,1-.47,1.15,2,2,0,0,1-1.22.35H4.77ZM9.61,15.3a1.28,1.28,0,0,1-.45.5,2,2,0,0,1-.65.26,3.33,3.33,0,0,1-.78.08h-3V12.69h3a2.4,2.4,0,0,1,1.45.41,1.65,1.65,0,0,1,.54,1.39A1.77,1.77,0,0,1,9.61,15.3Z"></path>
                    </svg>
                  </a>

                  <a href="/#" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M17.34,5.46h0a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Zm4.6,2.42a7.59,7.59,0,0,0-.46-2.43,4.94,4.94,0,0,0-1.16-1.77,4.7,4.7,0,0,0-1.77-1.15,7.3,7.3,0,0,0-2.43-.47C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.3,7.3,0,0,0-2.43.47A4.78,4.78,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.78,4.78,0,0,0,1.77,1.15,7.3,7.3,0,0,0,2.43.47C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.3,7.3,0,0,0,2.43-.47,4.7,4.7,0,0,0,1.77-1.15,4.85,4.85,0,0,0,1.16-1.77,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.06,3.06,0,0,1-.75,1.15,3.19,3.19,0,0,1-1.15.75,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.73,5.73,0,0,1,6.1,19.8,3.27,3.27,0,0,1,5,19.05a3,3,0,0,1-.74-1.15A5.54,5.54,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.54,5.54,0,0,1,4.21,6.1,3,3,0,0,1,5,5,3.14,3.14,0,0,1,6.1,4.2,5.73,5.73,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34A3.06,3.06,0,0,1,19.05,5,3.06,3.06,0,0,1,19.8,6.1,5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16ZM12,6.87A5.13,5.13,0,1,0,17.14,12,5.12,5.12,0,0,0,12,6.87Zm0,8.46A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z"></path>
                    </svg>
                  </a>

                  <a href="/#" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M22,5.8a8.49,8.49,0,0,1-2.36.64,4.13,4.13,0,0,0,1.81-2.27,8.21,8.21,0,0,1-2.61,1,4.1,4.1,0,0,0-7,3.74A11.64,11.64,0,0,1,3.39,4.62a4.16,4.16,0,0,0-.55,2.07A4.09,4.09,0,0,0,4.66,10.1,4.05,4.05,0,0,1,2.8,9.59v.05a4.1,4.1,0,0,0,3.3,4A3.93,3.93,0,0,1,5,13.81a4.9,4.9,0,0,1-.77-.07,4.11,4.11,0,0,0,3.83,2.84A8.22,8.22,0,0,1,3,18.34a7.93,7.93,0,0,1-1-.06,11.57,11.57,0,0,0,6.29,1.85A11.59,11.59,0,0,0,20,8.45c0-.17,0-.35,0-.53A8.43,8.43,0,0,0,22,5.8Z"></path>
                    </svg>
                  </a>

                  <a href="/#" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M21.20905,6.41669H22V4.08331H14.51978l-2.48584,9.16663h-.068L9.50269,4.08331H2V6.41663h.76837A.89578.89578,0,0,1,3.5,7.11139v9.83032a.84093.84093,0,0,1-.73163.6416H2v2.33338H8V17.58331H6.5V7.25h.08752L10.0451,19.91669h2.712L16.25989,7.25h.07355V17.58331H14.83337v2.33338H22V17.58331h-.79095a.83931.83931,0,0,1-.70905-.6416V7.11145A.8976.8976,0,0,1,21.20905,6.41669Z"></path>
                    </svg>
                  </a>
                </div>
                <div className="author__wrap">
                  <div className="author__followers">
                    <p>3829</p>
                    <span>Followers</span>
                  </div>
                  <button className="author__follow" type="button">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div> */}

          <div
            className="col-12 col-xl-8"
            style={{ paddingRight: 0, paddingLeft: 30 }}
          >
            <h2 className="cr__evcard--title">Create Item</h2>

            <div className="">
              <div className="">
                <form action="#">
                  <div className="cr__evcard-subItem">
                    <h4 className="cr__evcard--subtitle">
                      <span></span>Item Category
                    </h4>
                    <div className="cr__evcard-rowParent">
                      <div className="sign__group cr__evcard-50">
                        <p className="cr__evcard-labelTitle">Select Category</p>
                        <select
                          id="category"
                          name="category"
                          className="sign__select"
                          value={values.category}
                          onChange={(e) =>
                            handleChange("category", e.target.value)
                          }
                        >
                          <option value="">Select Category</option>
                          <option value="Category1">Tickets/Events</option>
                          <option value="Category2">Digital Arts</option>
                          <option value="Category3">Services</option>
                        </select>
                        <img
                          src="/img/icons/arrow-down.svg"
                          alt=""
                          className="cr__evcard-selectArrow"
                        />

                        {validations.category === "has-empty" ? (
                          <span className="text-error">Category Required*</span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Upload EvCard Image */}
                  <div className="cr__evcard-subItem">
                    <h4 className="cr__evcard--subtitle">
                      <span></span>Upload Item Image
                    </h4>
                    <div className="cr__evcard-rowParent">
                      <div className="cr__evcard-50">
                        <p className="cr__evcard-labelTitle">Large Picture</p>
                        <p className="cr__evcard-labelDesc">
                          Image resolution 1920 * 1080
                        </p>
                        <div className="cr__evcard-uploadImg">
                          <label
                            id="file1"
                            htmlFor="largeimage-upload"
                            className="input__upload"
                          >
                            {largeImagePreview ? (
                              largeFile.name
                            ) : (
                              <>
                                <img src="/img/icons/upload-1.svg" alt="" />{" "}
                                <span>upload</span>
                              </>
                            )}
                          </label>
                          <input
                            data-name="#file1"
                            id="largeimage-upload"
                            name="file"
                            type="file"
                            accept=".png,.jpg,.jpeg,.gif,.mp3,.wav,.mp4,.mov,.avi"
                            onChange={largeImageChange}
                            src={largeImagePreview}
                          />

                          {validations.picture_large === "has-empty" ? (
                            <span className="text-error">
                              Large Image Required*
                            </span>
                          ) : validations.picture_large === "has-invalid" ? (
                            <span className="text-error">
                              Image Size should be 1900px * 1250px ~ 1950px *
                              1300px*
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        {largeImagePreview ? (
                          <img
                            src={largeImagePreview}
                            onLoad={largeImageLoaded}
                            className="text-center"
                            width={"100%"}
                            style={{ display: "none" }}
                            alt=""
                          />
                        ) : (
                          // <img src="img/posts/2.jpg" alt="" width={'100%'}/>
                          ""
                        )}
                      </div>
                      <div className="cr__evcard-50">
                        <p className="cr__evcard-labelTitle">Small Picture</p>
                        <p className="cr__evcard-labelDesc">
                          Image resolution 260 * 300
                        </p>
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
                            <span className="text-error">
                              Small Image Required*
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        {smallImagePreview ? (
                          <div
                            className="text-center"
                            style={{ textAlign: "center", display: "none" }}
                          >
                            <img src={smallImagePreview} width={"50%"} alt="" />
                          </div>
                        ) : (
                          // <img src="img/posts/2.jpg" alt="" width={'100%'}/>
                          ""
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="cr__evcard-subItem">
                    <h4 className="cr__evcard--subtitle">
                      <span></span>Item details
                    </h4>
                    <div className="cr__evcard-rowParent">
                      <div className="sign__group cr__evcard-50">
                        <p className="cr__evcard-labelTitle">Name</p>
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
                      <div className="sign__group cr__evcard-50">
                        <p className="cr__evcard-labelTitle">Price</p>
                        <input
                          id="price"
                          type="number"
                          name="price"
                          className="sign__input"
                          value={values.price}
                          onChange={(e) =>
                            handleChange("price", e.target.value)
                          }
                        />

                        {validations.price === "has-empty" ? (
                          <span className="text-error">Price Required*</span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    {values.category !== "Category2" && (
                      <div className="cr__evcard-rowParent">
                        <div className="sign__group cr__evcard-50">
                          <p className="cr__evcard-labelTitle">Location</p>
                          <input
                            id="location"
                            type="text"
                            name="location"
                            className="sign__input"
                            value={values.location}
                            onChange={(e) =>
                              handleChange("location", e.target.value)
                            }
                          />
                          {validations.location === "has-empty" ? (
                            <span className="text-error">
                              Location Required*
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="sign__group cr__evcard-50">
                          <p className="cr__evcard-labelTitle">Date and Time</p>
                          <input
                            id="date"
                            type="datetime-local"
                            name="date"
                            className="sign__input"
                            value={values.date}
                            onChange={(e) =>
                              handleChange("date", e.target.value)
                            }
                          />

                          {validations.date === "has-empty" ? (
                            <span className="text-error">Date Required*</span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    )}
                    {values.category !== "Category2" && (
                      <div className="cr__evcard-100">
                        <p className="cr__evcard-labelTitle">
                          Venue Description
                        </p>
                        <textarea
                          id="venue_description"
                          name="venue_description"
                          className="sign__input"
                          style={{
                            height: 90,
                            resize: "none",
                            padding: "10px 20px",
                            marginBottom: 10,
                          }}
                          value={values.venue_description}
                          onChange={(e) =>
                            handleChange("venue_description", e.target.value)
                          }
                        ></textarea>
                        {validations.venue_description === "has-empty" ? (
                          <span className="text-error">
                            Venue Description Required*
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                    <div className="cr__evcard-100">
                      <p className="cr__evcard-labelTitle">
                        General Description
                      </p>
                      <textarea
                        id="description"
                        name="description"
                        className="sign__input"
                        style={{
                          height: 90,
                          resize: "none",
                          padding: "10px 20px",
                        }}
                        value={values.description}
                        onChange={(e) =>
                          handleChange("description", e.target.value)
                        }
                      ></textarea>
                      {validations.description === "has-empty" ? (
                        <span className="text-error">
                          Description Required*
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="cr__evcard-subItem">
                    <h4 className="cr__evcard--subtitle">
                      <span></span>Links
                    </h4>
                    <div className="cr__evcard-rowParent">
                      <div className="sign__group cr__evcard-50">
                        <p className="cr__evcard-labelTitle">Facebook</p>
                        <input
                          id="facebook"
                          type="text"
                          name="facebook"
                          className="sign__input"
                          value={values.facebook}
                          onChange={(e) =>
                            handleChange("facebook", e.target.value)
                          }
                        />
                      </div>
                      <div className="sign__group cr__evcard-50">
                        <p className="cr__evcard-labelTitle">Twitter</p>
                        <input
                          id="twitter"
                          type="text"
                          name="twitter"
                          className="sign__input"
                          value={values.twitter}
                          onChange={(e) =>
                            handleChange("twitter", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="cr__evcard-rowParent">
                      <div className="sign__group cr__evcard-50">
                        <p className="cr__evcard-labelTitle">Instagram</p>
                        <input
                          id="instagram"
                          type="text"
                          name="instagram"
                          className="sign__input"
                          value={values.instagram}
                          onChange={(e) =>
                            handleChange("instagram", e.target.value)
                          }
                        />
                      </div>
                      <div className="sign__group cr__evcard-50">
                        <p className="cr__evcard-labelTitle">TikTok</p>
                        <input
                          id="tiktok"
                          type="text"
                          name="tiktok"
                          className="sign__input"
                          value={values.tiktok}
                          onChange={(e) =>
                            handleChange("tiktok", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="cr__evcard-rowParent">
                      <div className="sign__group cr__evcard-50">
                        <p className="cr__evcard-labelTitle">Telegram</p>
                        <input
                          id="telegram"
                          type="text"
                          name="telegram"
                          className="sign__input"
                          value={values.telegram}
                          onChange={(e) =>
                            handleChange("telegram", e.target.value)
                          }
                        />
                      </div>
                      <div className="sign__group cr__evcard-50">
                        <p className="cr__evcard-labelTitle">Discord</p>
                        <input
                          id="discord"
                          type="text"
                          name="discord"
                          className="sign__input"
                          value={values.discord}
                          onChange={(e) =>
                            handleChange("discord", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="cr__evcard-rowParent">
                      <div className="sign__group cr__evcard-50">
                        <p className="cr__evcard-labelTitle">Collection Name</p>
                        <select
                          id="collection"
                          name="collection"
                          className="sign__select"
                          placeholder="Collection"
                          value={values.collection}
                          disabled
                          // onChange={(e) =>
                          //   handleChange("collection", e.target.value)
                          // }
                        >
                          <option value="">Select collection</option>
                          <option value={id}>{collectionName}</option>
                          <option value="collection2">collection2</option>
                          <option value="collection3">collection3</option>
                          <option value="collection4">collection4</option>
                        </select>
                        <img
                          src="/img/icons/arrow-down.svg"
                          alt=""
                          className="cr__evcard-selectArrow"
                        />

                        {validations.collection === "has-empty" ? (
                          <span className="text-error">
                            Collection Required*
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="sign__group cr__evcard-50">
                        <p className="cr__evcard-labelTitle">
                          BSC Wallet Owner
                        </p>
                        <input
                          id="owner_wallet"
                          type="text"
                          name="owner_wallet"
                          className="sign__input"
                          value={values.owner_wallet}
                          onChange={(e) =>
                            handleChange("owner_wallet", e.target.value)
                          }
                        />

                        {validations.owner_wallet === "has-empty" ? (
                          <span className="text-error">
                            Correct BSC wallet address Required*
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="cr__evcard-rowParent">
                      <div className="sign__group cr__evcard-50">
                        <p className="cr__evcard-labelTitle">
                          Number of total tickets
                        </p>
                        <input
                          id="total_tickets"
                          type="text"
                          name="total_tickets"
                          className="sign__input"
                          value={values.total_tickets}
                          onChange={(e) =>
                            handleChange("total_tickets", e.target.value)
                          }
                        />
                        {validations.total_tickets === "has-empty" ? (
                          <span className="text-error">
                            Number of total tickets Required*
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <div className="cr__evcard-rowParent">
                    <div className="sign__group cr__evcard-50">
                      <p className="cr__evcard-labelTitle">
                        Payment Fee for Platform
                      </p>
                      <input
                        id="fee_percentage"
                        type="text"
                        name="fee_percentage"
                        className="sign__input"
                        value={values.fee_percentage}
                        onChange={(e) =>
                          handleChange("fee_percentage", e.target.value)
                        }
                      />

                      {validations.fee_percentage === "has-empty" ? (
                        <span className="text-error">
                          {`Payment fee should be more than ${minPaymentFee}*`}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="sign__group cr__evcard-50">
                      <p className="cr__evcard-labelTitle">NEAR Wallet Owner</p>
                      <input
                        id="owner_account"
                        type="text"
                        name="owner_account"
                        className="sign__input"
                        value={values.owner_account}
                        onChange={(e) =>
                          handleChange("owner_account", e.target.value)
                        }
                      />

                      {validations.owner_account === "has-empty" ? (
                        <span className="text-error">
                          Correct account for NEAR is required*
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div> */}
                  <div className="cr__evcard-100">
                    <div className="sign__group sign__group--checkbox">
                      <input
                        id="type5"
                        name="type5"
                        type="checkbox"
                        defaultChecked
                        onClick={toggleGreenPass}
                      />
                      <label
                        htmlFor="type5"
                        style={{ color: "#fff", letterSpacing: "0.03em" }}
                      >
                        Green Pass Required
                      </label>
                    </div>
                  </div>

                  <div className="cr__evcard-subItem">
                    <h4 className="cr__evcard--subtitle">
                      <span></span>Add Addons
                    </h4>
                    {addons.map((addon: any, index: number) => (
                      <div className="" style={{}}>
                        <div
                          className=""
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingBottom: 10,
                            marginBottom: 20,
                            borderBottom: "1px solid rgba(255, 255, 255, 0.33)",
                          }}
                        >
                          <p
                            style={{
                              color: "#fff",
                              width: 30,
                              marginBottom: 0,
                            }}
                          >
                            {index + 1}
                          </p>
                          <p
                            className=""
                            style={{
                              color: "#fff",
                              width: 150,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              textTransform: "uppercase",
                              letterSpacing: "0.03em",
                              marginBottom: 0,
                            }}
                          >
                            {addon.name}
                          </p>
                          <p
                            className=""
                            style={{
                              flex: 1,
                              color: "#fff",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              resize: "none",
                              border: "none",
                              marginBottom: 0,
                              marginRight: 20,
                            }}
                          >
                            {addon.description}
                          </p>
                          <p
                            className=""
                            style={{
                              color: "#fff",
                              width: 60,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              textTransform: "uppercase",
                              letterSpacing: "0.03em",
                              marginBottom: 0,
                            }}
                          >
                            {addon.price} €
                          </p>
                          <img
                            src={addon.icon}
                            alt=""
                            height={32}
                            width={32}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              background: "red",
                              borderRadius: 22,
                              width: 44,
                              height: 44,
                              marginRight: 20,
                            }}
                          />
                          <div
                            className="sign__btn-second"
                            style={{
                              width: 120,
                              margin: 0,
                              background: "#ed5e68",
                            }}
                            onClick={() => remove_Addon(index)}
                          >
                            Delete
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="cr__evcard-rowParent">
                      <div className="sign__group cr__evcard-50">
                        <p className="cr__evcard-labelTitle">Name</p>
                        <input
                          type="text"
                          className="sign__input"
                          value={addonName}
                          onChange={(e) => setAddonName(e.target.value)}
                        />
                      </div>
                      <div className="sign__group cr__evcard-50">
                        <p className="cr__evcard-labelTitle">Price</p>
                        <input
                          type="text"
                          className="sign__input"
                          value={addonPrice}
                          onChange={(e) => setAddonPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="cr__evcard-rowParent">
                      <div className="sign__group cr__evcard-50">
                        <p className="cr__evcard-labelTitle">Description</p>
                        <textarea
                          className="sign__input"
                          style={{
                            height: 90,
                            resize: "none",
                            padding: "10px 20px",
                            marginBottom: 10,
                          }}
                          value={addonDescription}
                          onChange={(e) => setAddonDescription(e.target.value)}
                        />
                      </div>
                      <div
                        className="sign__group cr__evcard-50"
                        style={{ marginTop: 10, alignItems: "flex-start" }}
                      >
                        <div className="cr__evcard-uploadImg">
                          <div className="input__upload" onClick={select_Icon}>
                            {addonIcon ? (
                              <>
                                <img src={addonIcon} alt="AddOnIcon" />{" "}
                                <span>Select Icon</span>
                              </>
                            ) : (
                              <>
                                <img src="/img/icons/select-icon.svg" alt="" />{" "}
                                <span>Select Icon</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sign__group cr__evcard-100">
                      <div className="sign__btn-second" onClick={add_Addons}>
                        Add
                      </div>
                    </div>
                  </div>
                  <div className="cr__evcard-subItem">
                    <h4 className="cr__evcard--subtitle">
                      <span></span>Add Payment Split Settings
                    </h4>
                    {payees.map((payee: any, index: number) => (
                      <div className="" style={{}}>
                        <div
                          className=""
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingBottom: 10,
                            marginBottom: 20,
                            borderBottom: "1px solid rgba(255, 255, 255, 0.33)",
                          }}
                        >
                          <p
                            style={{
                              color: "#fff",
                              width: 30,
                              marginBottom: 0,
                            }}
                          >
                            {index + 1}
                          </p>
                          <p
                            className=""
                            style={{
                              color: "#fff",
                              width: 280,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              textTransform: "uppercase",
                              letterSpacing: "0.03em",
                              marginBottom: 0,
                            }}
                          >
                            {shortAddress(payee.wallet)}
                          </p>
                          <p
                            className=""
                            style={{
                              flex: 1,
                              color: "#fff",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              resize: "none",
                              border: "none",
                              marginBottom: 0,
                              marginRight: 20,
                            }}
                          >
                            {payee.account}
                          </p>
                          <p
                            className=""
                            style={{
                              color: "#fff",
                              width: 60,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              textTransform: "uppercase",
                              letterSpacing: "0.03em",
                              marginBottom: 0,
                            }}
                          >
                            {payee.fee}
                          </p>
                          <div
                            className="sign__btn-second"
                            style={{
                              width: 120,
                              margin: 0,
                              background: "#ed5e68",
                            }}
                            onClick={() => remove_Payee(index)}
                          >
                            Delete
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="cr__evcard-rowParent">
                      <div className="sign__group cr__evcard-50">
                        <p className="cr__evcard-labelTitle">BSC Wallet</p>
                        <input
                          type="text"
                          className="sign__input"
                          value={payeeWallet}
                          onChange={(e) => setPayeeWallet(e.target.value)}
                        />
                      </div>
                      <div className="sign__group cr__evcard-50">
                        <p className="cr__evcard-labelTitle">NEAR Account</p>
                        <input
                          type="text"
                          className="sign__input"
                          value={payeeAccount}
                          onChange={(e) => setPayeeAccount(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="cr__evcard-rowParent">
                      <div className="sign__group cr__evcard-50">
                        <p className="cr__evcard-labelTitle">Payee Fee</p>
                        <input
                          type="text"
                          className="sign__input"
                          value={payeeFee}
                          onChange={(e) => setPayeeFee(e.target.value)}
                        />
                      </div>
                      <div className="sign__group cr__evcard-50"></div>
                    </div>
                    <div className="sign__group cr__evcard-100">
                      <div className="sign__btn-second" onClick={add_Payee}>
                        Add
                      </div>
                    </div>
                  </div>
                  <div className="cr__evcard-subItem">
                    <h4 className="cr__evcard--subtitle">
                      <span></span>Add Royalty Settings
                    </h4>
                    {royalties.map((royalty: any, index: number) => (
                      <div className="" style={{}}>
                        <div
                          className=""
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingBottom: 10,
                            marginBottom: 20,
                            borderBottom: "1px solid rgba(255, 255, 255, 0.33)",
                          }}
                        >
                          <p
                            style={{
                              color: "#fff",
                              width: 30,
                              marginBottom: 0,
                            }}
                          >
                            {index + 1}
                          </p>
                          <p
                            className=""
                            style={{
                              color: "#fff",
                              width: 280,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              textTransform: "uppercase",
                              letterSpacing: "0.03em",
                              marginBottom: 0,
                            }}
                          >
                            {shortAddress(royalty.wallet)}
                          </p>
                          <p
                            className=""
                            style={{
                              flex: 1,
                              color: "#fff",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              resize: "none",
                              border: "none",
                              marginBottom: 0,
                              marginRight: 20,
                            }}
                          >
                            {royalty.account}
                          </p>
                          <p
                            className=""
                            style={{
                              color: "#fff",
                              width: 60,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              textTransform: "uppercase",
                              letterSpacing: "0.03em",
                              marginBottom: 0,
                            }}
                          >
                            {royalty.fee}
                          </p>
                          <div
                            className="sign__btn-second"
                            style={{
                              width: 120,
                              margin: 0,
                              background: "#ed5e68",
                            }}
                            onClick={() => remove_Royalty(index)}
                          >
                            Delete
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="cr__evcard-rowParent">
                      <div className="sign__group cr__evcard-50">
                        <p className="cr__evcard-labelTitle">BSC Wallet</p>
                        <input
                          type="text"
                          className="sign__input"
                          value={royaltyWallet}
                          onChange={(e) => setRoyaltyWallet(e.target.value)}
                        />
                      </div>
                      <div className="sign__group cr__evcard-50">
                        <p className="cr__evcard-labelTitle">NEAR Account</p>
                        <input
                          type="text"
                          className="sign__input"
                          value={royaltyAccount}
                          onChange={(e) => setRoyaltyAccount(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="cr__evcard-rowParent">
                      <div className="sign__group cr__evcard-50">
                        <p className="cr__evcard-labelTitle">Royalty Fee</p>
                        <input
                          type="text"
                          className="sign__input"
                          value={royaltyFee}
                          onChange={(e) => setRoyaltyFee(e.target.value)}
                        />
                      </div>
                      <div className="sign__group cr__evcard-50"></div>
                    </div>
                    <div className="sign__group cr__evcard-100">
                      <div className="sign__btn-second" onClick={add_Royalty}>
                        Add
                      </div>
                    </div>
                  </div>
                </form>

                {/* {!isMobile && ( */}
                <div className="sign__group sign__group--checkbox">
                  <input
                    id="remember2"
                    name="remember2"
                    type="checkbox"
                    defaultChecked
                  />
                  <label htmlFor="remember2">
                    I agree to the
                    <Link to="/terms" target="_blank">
                      {" "}
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
                {/* )} */}

                <div className="sign__group cr__evcard-100">
                  <div
                    className="sign__btn"
                    onClick={handleCreate}
                    style={{ marginTop: 30, marginBottom: 200 }}
                  >
                    Create Item
                  </div>
                </div>

                {/* <div className="col-12" style={{ marginTop: "25px" }}>
                  <h4 className="sign__title">Add Royalty Setting</h4>
                </div>
                <div
                  className="col-12"
                  style={{
                    marginBottom: "12px",
                  }}
                >
                  {validations.royalty == "has-empty" ? (
                    <span className="text-error">
                      Please input correct addresses and fee values*
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                {royalties.map((royalty: any, index: number) => (
                  <div className="col-12">
                    <div className="row row--grid sign__group addon-group">
                      <div className="padding-div col-12 col-xl-4">
                        <input
                          type="text"
                          className="sign__input"
                          placeholder="BSC Wallet"
                          value={royalty.wallet}
                          disabled
                        />
                      </div>
                      <div className="padding-div col-6 col-xl-4">
                        <input
                          type="text"
                          className="sign__input"
                          placeholder="Near Account"
                          value={royalty.account}
                          disabled
                        />
                      </div>
                      <div className="padding-div col-3 col-xl-2">
                        <input
                          type="text"
                          className="sign__input"
                          placeholder="Royalty Fee"
                          value={royalty.fee}
                          disabled
                        />
                      </div>
                      <div className="padding-div col-3 col-xl-2">
                        <div
                          className="sign__input add-btn remove-btn"
                          onClick={() => remove_Royalty(index)}
                        >
                          Delete
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="col-12">
                  <div className="row row--grid sign__group addon-group">
                    <div className="padding-div col-12 col-xl-4">
                      <input
                        type="text"
                        className="sign__input"
                        placeholder="BSC Wallet"
                        value={royaltyWallet}
                        onChange={(e) => setRoyaltyWallet(e.target.value)}
                      />
                    </div>
                    <div className="padding-div col-6 col-xl-4">
                      <input
                        type="text"
                        className="sign__input"
                        placeholder="Near Account"
                        value={royaltyAccount}
                        onChange={(e) => setRoyaltyAccount(e.target.value)}
                      />
                    </div>
                    <div className="padding-div col-3 col-xl-2">
                      <input
                        type="text"
                        className="sign__input"
                        placeholder="Royalty Fee"
                        value={royaltyFee}
                        onChange={(e) => setRoyaltyFee(e.target.value)}
                      />
                    </div>
                    <div className="padding-div col-3 col-xl-2">
                      <div
                        className="sign__input add-btn"
                        onClick={add_Royalty}
                      >
                        Add
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageEventCardCreate;
