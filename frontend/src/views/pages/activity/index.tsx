import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useUserContext } from "../../../context/UserContext";
import config from "../../../helper/config";
import { updateUserTickets, userTickets } from "../../../helper/event";

import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import * as nearAPI from "near-api-js";
import BN from "bn.js";
import { injected } from "../../../helper/web3service";

import {
  myNFTAddress_testnet,
  myNFTAddress_mainnet,
  myNFTABI,
  tokenURL_mainnet,
  tokenURL_testnet,
  myNFTAddress_NEAR_testnet,
} from "../../../utils/nft_contract";

import { useToasts } from "react-toast-notifications";
import { useAppContext } from "../../../context/AppContext";
// import {ipfsGet, ipfsUpload} from '@tatumio/tatum';
/* import the ipfs-http-client library */
import { create } from "ipfs-http-client";
import { isMobile } from "react-device-detect";
import { getEventPrice } from "../../../utils";
import ReCAPTCHA from "react-google-recaptcha";
const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const PageActivity = () => {
  const {
    active,
    account,
    library,
    connector,
    chainId,
    activate,
    deactivate,
    error,
  } = useWeb3React();
  const { userInfo, setUserInfo } = useUserContext();
  const { setLoading } = useAppContext();
  const { addToast } = useToasts();
  const navigate = useNavigate();

  const { connect, keyStores, WalletConnection } = nearAPI;
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentTag, setCurrentTag] = useState("all");

  const [wallet, setWallet] = useState<any>();

  const [filters, setFilters] = useState([]);
  const [tickets, setTickets] = useState([]);

  const [tcur, setTcur] = useState(0);
  const [cur, setCur] = useState(0);
  const [activities, setActivities] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [isFilter, setIsFiilter] = useState(false);

  const recaptchaRef = React.createRef();
  const [captcha, setCaptcha] = useState(true);

  const onChangeCaptcha = (e: any) => {
    console.log(e);
    setCaptcha(e);
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

  async function wallet_disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  const updateTicketProgressStatus = (
    tickets: any,
    id: string,
    in_progress: boolean
  ) => {
    return tickets.map((ticket: any) => {
      var temp = Object.assign({}, ticket);
      if (temp.id === id) {
        temp.in_progress = in_progress;
      }
      return temp;
    });
  };

  const mintNFT = async (data: any, _provide: string) => {
    // if (!active) {
    //   await wallet_connect();
    // }

    let provide = null;
    if (_provide === "Bitkeep" && (window as any).isBitKeep) {
      provide = (window as any).bitkeep.ethereum;
    } else if (_provide === "Metamask" && (window as any).ethereum) {
      provide = (window as any).ethereum;
    }

    if (provide === null) {
      addToast("You need to install " + _provide, {
        appearance: "warning",
        autoDismiss: true,
      });
      return;
    }

    const accounts = await provide.request({ method: "eth_accounts" });
    let account = null;
    console.log("Accounts", accounts);
    if (accounts.length === 0) {
      const accounts = await provide.request({ method: "eth_requestAccounts" });
      account = accounts[0];
    } else account = accounts[0];

    const provider = new ethers.providers.Web3Provider(provide);
    const chainId = Number((provider.provider as any).chainId);
    console.log("ChainId", chainId);

    console.log(account, "data", data, "connector: ", connector);
    if (chainId !== 56 && chainId !== 97) {
      addToast("Please change the network ", {
        appearance: "warning",
        autoDismiss: true,
      });
    } else {
      if (account) {
        addToast("Please wait ... It might takes some time", {
          appearance: "warning",
          autoDismiss: true,
        });
        setLoading(true);
        setTickets(updateTicketProgressStatus(tickets, data.id, true));
        console.log("1", tickets);
        //IPFS
        try {
          const tokenObject = {
            ImageIPFS: data.eventcard.picture_ipfs,
            metaData: {
              EventName: data.eventcard.name,
              Description: data.eventcard.description,
              Date: data.eventcard.date,
              Location: data.eventcard.location,
              Price: getEventPrice(data.eventcard),
              Collection: data.eventcard.collection,
            },
          };

          const added = await client.add(JSON.stringify(tokenObject));
          const ipfs_url = `https://ipfs.infura.io/ipfs/${added.path}`;

          // const ipfs_url = `https://ipfs.infura.io/ipfs/test`; // #placeholder
          console.log("IPFS ulr:", ipfs_url);

          // const provider = new ethers.providers.Web3Provider(
          //   (window as any).ethereum
          // );
          // const contract = new ethers.Contract(myNFTAddress_mainnet, myNFTABI, provider.getSigner());
          const contract = new ethers.Contract(
            chainId === 97
              ? myNFTAddress_testnet
              : chainId === 56
              ? myNFTAddress_mainnet
              : "",
            myNFTABI,
            provider.getSigner()
          );
          try {
            await contract.mintNFT(account, ipfs_url);
          } catch (e) {
            console.log(e);
            setLoading(false);
            setTickets(updateTicketProgressStatus(tickets, data.id, false));
          }
          contract.on("Minted", (tokenId, tokenURI) => {
            console.log("First parameter :", tokenId);
            console.log("Second parameter :", tokenURI);
            data.tokenURL = `${tokenURL_testnet}${tokenId}`;
            data.ipfsURL = data.eventcard.picture_ipfs;
            data.is_minted = 1; // BSC
            console.log(data);
            updateUserTickets(data).then((res) => {
              if (res.success) {
                addToast("Successfully Minted", {
                  appearance: "success",
                  autoDismiss: true,
                });
                userTickets().then((res) => {
                  if (res.success) {
                    setTickets(res.tickets);
                  }
                });
              } else {
                addToast("Failed save database", {
                  appearance: "error",
                  autoDismiss: true,
                });
              }
            });
            setLoading(false);
            setTickets(updateTicketProgressStatus(tickets, data.id, false));
          });
        } catch (error) {
          console.log("Error: ", error);
          setLoading(false);
          setTickets(updateTicketProgressStatus(tickets, data.id, false));
        }
      }
    }
    navigate("/activity");
  };

  useEffect(() => {
    const func1 = async () => {
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

      addToast(
        "NEAR Wallet has been connected, Please mint your NFT on NEAR!",
        {
          appearance: "warning",
          autoDismiss: true,
        }
      );
      navigate("/admin/activity");
    };

    const func2 = () => {
      const data = JSON.parse(localStorage.getItem("userInfo") || "{}");
      setTickets(updateTicketProgressStatus(tickets, data.id, true));
      data.tokenURL = `https://wallet.testnet.near.org/`;
      data.ipfsURL = data.eventcard.picture_ipfs;
      data.is_minted = 2; // NEAR
      updateUserTickets(data).then((res) => {
        if (res.success) {
          addToast("Successfully Minted", {
            appearance: "success",
            autoDismiss: true,
          });
          userTickets().then((res) => {
            if (res.success) {
              setTickets(res.tickets);
            }
          });
        } else {
          addToast("Failed save database", {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
      localStorage.removeItem("userInfo");
      navigate("/admin/activity");
    };

    if (searchParams.get("account_id")) func1();
    else if (searchParams.get("transactionHashes")) func2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  async function mintNFTonNear(data: any) {
    // const account = await near.account("example-account.testnet");
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

    if (!wallet.isSignedIn()) {
      await signIn();
      return;
    }

    const account = wallet.account();
    const contract: any = new nearAPI.Contract(
      account, // the account object that is connecting
      myNFTAddress_NEAR_testnet,
      {
        viewMethods: ["check_token"],
        changeMethods: ["nft_mint"],
        // sender: account, // account object to initialize and sign transactions.
      }
    );

    if (account) {
      addToast("Please wait ... It might takes some time", {
        appearance: "warning",
        autoDismiss: true,
      });
      setTickets(updateTicketProgressStatus(tickets, data.id, true));

      try {
        const tokenObject = {
          ImageIPFS: data.eventcard.picture_ipfs,
          metaData: {
            EventName: data.eventcard.name,
            Description: data.eventcard.description,
            Date: data.eventcard.date,
            Location: data.eventcard.location,
            Price: getEventPrice(data.eventcard),
            Collection: data.eventcard.collection,
          },
        };

        const added = await client.add(JSON.stringify(tokenObject));
        const ipfs_url = `https://ipfs.infura.io/ipfs/${added.path}`;
        console.log("IPFS ulr:", ipfs_url);

        try {
          localStorage.setItem("userInfo", JSON.stringify(data));
          await contract.nft_mint(
            {
              token_id: `${account.accountId}-${data.id}`,
              receiver_id: account.accountId,
              metadata: {
                title: tokenObject.metaData.EventName,
                description: tokenObject.metaData.Description,
                media: ipfs_url,
              },
            },
            300000000000000, // attached GAS (optional)
            new BN("1000000000000000000000000")
          );
        } catch (e) {
          console.log(e);
          localStorage.removeItem("userInfo");
          setTickets(updateTicketProgressStatus(tickets, data.id, false));
        }
      } catch (error) {
        console.log("Error: ", error);
        setTickets(updateTicketProgressStatus(tickets, data.id, false));
      }
    }
  }

  const signIn = async () => {
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

    wallet.requestSignIn(
      myNFTAddress_NEAR_testnet // contract requesting access
    );
  };

  const leftClick = () => {
    if (tcur > 0) setTcur(tcur - 1);
  };

  const rightClick = () => {
    if ((tcur + 4) * 8 < activities.length) setTcur(tcur + 1);
  };

  useEffect(() => {}, [userInfo]);

  useEffect(() => {
    // wallet_connect();
    userTickets().then((res) => {
      if (res.success) {
        setTickets(res.tickets);
      }
    });
  }, []);

  const onclearAll = (e: React.MouseEvent<HTMLButtonElement>): void => {
    // @ts-ignore
    document.getElementById("type8").setAttribute("checked", "true");
    // @ts-ignore
    document.getElementById("type7").setAttribute("defaultChecked", "true");
  };
  const onChecked = (e: React.MouseEvent<HTMLElement>): void => {
    alert(e.currentTarget);
    // this.state.filters.push(e.currentTarget.id);
  };

  const ticketBuyTime = (time: any) => {
    const now = new Date();
    // const diff = moment.utc(moment(now.toUTCString(),"DD/MM/YYYY HH:mm:ss").diff(moment(time,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
    // console.log(diff);
    // const createTime = new Date(time);
    return "";
  };

  const clearFilter = () => {
    var clist = document.getElementsByTagName("input");
    for (var i = 0; i < clist.length; ++i) {
      clist[i].checked = false;
    }
  };

  const tempTickets = [
    {
      id: 0,
      buyer: {
        name: "Baby Pig",
      },
      createdAt: "2022-05-13T21:58:48.981Z",
      eventcard: {
        creator: {
          name: "name",
        },
        name: "Jack Jin",
        picture_small: "assets/uploads/eventcards/bHvATBxPVhegwfXS.jpg",
      },
      in_progress: true,
      is_minted: true,
      minted_by: "BSC",
      ipfsURL: null,
      tokenURL: null,
    },
    {
      id: 1,
      buyer: {
        name: "Admin",
      },
      createdAt: "2022-05-20T12:17:13.219Z",
      eventcard: {
        creator: {
          name: "Admin",
        },
        name: "Fed",
        picture_small: "assets/uploads/eventcards/qnhawvmKwsSpVBOB.jpg",
      },
      in_progress: false,
      is_minted: true,
      minted_by: "NEAR",
      ipfsURL: null,
      tokenURL: null,
    },
    {
      id: 2,
      buyer: {
        name: "Admin",
      },
      createdAt: "2022-05-13T21:58:48.981Z",
      eventcard: {
        creator: {
          name: "Admin",
        },
        name: "Fed",
        picture_small: "assets/uploads/eventcards/aDqHzVAxCEupRZhp.jpg",
      },
      in_progress: true,
      is_minted: false,
      ipfsURL: null,
      tokenURL: null,
    },
    {
      id: 3,
      buyer: {
        name: "Admin",
      },
      createdAt: "2022-06-07T15:13:56.659Z",
      eventcard: {
        creator: {
          name: "name",
        },
        name: "asfsdf",
        picture_small: "assets/uploads/eventcards/bcfQBpuJGIpxJTOD.jpg",
      },
      in_progress: false,
      is_minted: false,
      ipfsURL: null,
      tokenURL: null,
    },
  ];

  const cardView = (ticket: any) => {
    return (
      <div className="activity">
        <Link to="/item" className="activity__card-avatar">
          <img
            src={`${config.API_BASE_URL}/api/upload/get_file?path=${ticket.eventcard.picture_small}`}
            alt=""
          />
        </Link>
        <div className="activity__card-content">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: 25,
              width: "100%",
            }}
          >
            <div style={{ display: "flex" }}>
              <p className="activity__card-title" style={{ paddingRight: 15 }}>
                <Link to="/item">{ticket.eventcard.name}</Link>
              </p>
              {!isMobile && (
                <>
                  {ticket.is_minted ? (
                    <p className="activity__card-minted">
                      Minted on {ticket.is_minted === 1 ? "BSC" : "NEAR"}
                    </p>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <p className="activity__card-mint">Mint with BUSD</p>
                      <button
                        className={
                          captcha
                            ? "activity__card-btn"
                            : "activity__card-btn-disable"
                        }
                        onClick={
                          captcha ? () => mintNFT(ticket, "Metamask") : () => {}
                        }
                      >
                        <img
                          src="/img/metamask-seeklogo.com.svg"
                          alt=""
                          height={16}
                        />
                      </button>
                      <button
                        className={
                          captcha
                            ? "activity__card-btn"
                            : "activity__card-btn-disable"
                        }
                        onClick={
                          captcha ? () => mintNFT(ticket, "Bitkeep") : () => {}
                        }
                        // onClick={
                        //   captcha ? () => mintNFTonNear(ticket) : () => {}
                        // }
                      >
                        <img
                          src="/img/bitkeep-seeklogo.com.svg"
                          alt=""
                          height={49}
                        />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
            <p className="activity__card-quantity">
              QTY <span className="activity__card-amount">1</span>
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              width: "100%",
              marginLeft: 25,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                marginTop: isMobile ? 5 : 15,
              }}
            >
              <div style={{ width: 140 }}>
                <p className="activity__card-key">Created by</p>
                <p className="activity__card-val">Admin</p>
              </div>
              <div style={{ marginTop: isMobile ? 7 : 0 }}>
                <p className="activity__card-key">Purchased by</p>
                <div style={{ display: "flex" }}>
                  <p className="activity__card-val">Admin</p>
                  <div className="sellers-list__author--verified" />
                </div>
              </div>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 10 }}
            >
              <img src="/img/icons/clock.svg" alt="" />
              <p className="activity__card-ago">A week ago</p>
            </div>
            {/* <div className="nft-mint">
              <h3 className="activity__title">
                <Link to="/item">{ticket.eventcard.name}</Link>
              </h3>
              {ticket.in_progress && (
                <label className="in_progress">In progress</label>
              )}
              {!ticket.in_progress &&
                userInfo.user.name === ticket.buyer.name &&
                (!ticket.is_minted ? (
                  <button
                    onClick={() => {
                      mintNFT(ticket);
                    }}
                    className="btn mint-btn"
                  >
                    Claim NFT
                  </button>
                ) : (
                  <label className="minted">Minted</label>
                ))}
            </div> */}
            {/* <p className="activity__text">
              Created by{" "}
              <Link to="/author">@{ticket.eventcard.creator.name}</Link>
              <br/>for <b>{coin}</b>
            </p>
            <span className="activity__time">
              Purchased <ReactTimeAgo date={ticket.createdAt} locale="en-US" />
            </span>
            <br></br> */}
            {/* {ticket.is_minted ? (
              <>
                <span className="activity__time">
                  Click here to see{" "}
                  <a target="_blank" href={ticket.ipfsURL} rel="noreferrer">
                    IPFS address
                  </a>
                </span>
                <br></br>
                <span className="activity__time">
                  Click here to see{" "}
                  <a target="_blank" href={ticket.tokenURL} rel="noreferrer">
                    BSC NFT token
                  </a>
                </span>
              </>
            ) : (
              <></>
            )} */}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div
      className="container"
      style={{
        marginTop: isMobile ? 0 : 70,
        marginBottom: 70,
        padding: 0,
        zIndex: 999,
      }}
    >
      <div className="explorer__top">
        <p className="explorer__top-title">Activity</p>
        <div className="explorer__top-main">
          {isMobile ? (
            <button
              className="activity__fillter--btn"
              onClick={() => setIsFiilter(true)}
            >
              <img src="/img/icons/filter.svg" alt="" />
              Filter
              {!isMobile && <img src="/img/icons/dropdown.svg" alt="" />}
            </button>
          ) : (
            <div className="explorer__top-tags">
              <button
                className={
                  currentTag === "all"
                    ? "explorer__top-active--tag"
                    : "explorer__top-inactive--tag"
                }
                onClick={() => setCurrentTag("all")}
              >
                All
              </button>
              {/* <button
                className={
                  currentTag === "news"
                    ? "explorer__top-active--tag"
                    : "explorer__top-inactive--tag"
                }
                onClick={() => setCurrentTag("news")}
              >
                Listings
              </button>
              <button
                className={
                  currentTag === "tag1"
                    ? "explorer__top-active--tag"
                    : "explorer__top-inactive--tag"
                }
                onClick={() => setCurrentTag("tag1")}
              >
                Purchases
              </button>
              <button
                className={
                  currentTag === "tag2"
                    ? "explorer__top-active--tag"
                    : "explorer__top-inactive--tag"
                }
                onClick={() => setCurrentTag("tag2")}
              >
                Sales
              </button>
              <button
                className={
                  currentTag === "transfers"
                    ? "explorer__top-active--tag"
                    : "explorer__top-inactive--tag"
                }
                onClick={() => setCurrentTag("transfers")}
              >
                Transfers
              </button>
              <button
                className={
                  currentTag === "bids"
                    ? "explorer__top-active--tag"
                    : "explorer__top-inactive--tag"
                }
                onClick={() => setCurrentTag("bids")}
              >
                Bids
              </button>
              <button
                className={
                  currentTag === "likes"
                    ? "explorer__top-active--tag"
                    : "explorer__top-inactive--tag"
                }
                onClick={() => setCurrentTag("likes")}
              >
                Likes
              </button>
              <button
                className={
                  currentTag === "follows"
                    ? "explorer__top-active--tag"
                    : "explorer__top-inactive--tag"
                }
                onClick={() => setCurrentTag("follows")}
              >
                Follows
              </button> */}
            </div>
          )}
        </div>
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
            }}
            ref={recaptchaRef as any}
            // size="invisible"
            sitekey="6LeaLwUgAAAAAIBN0ef2xzTx0rIfuLb1POyzr_ei"
            // sitekey="6Lf4RAUgAAAAAJbw7qXWVBfVtM2Ocggfs0KYGPjv"
            onChange={onChangeCaptcha}
          />
        )}
        {isFilter && isMobile && (
          <div className="header__menu-mobile">
            <div className="header__menu-top">
              <p
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                  color: "#fff",
                  textAlign: "center",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: 0,
                }}
              >
                Filter
              </p>
              <button onClick={() => setIsFiilter(false)}> &times;</button>
            </div>
            {/* Menu Item Lists */}
            <div className="header__menu-items">
              <div
                className="header__menu-item"
                onClick={() => console.log("checkbox")}
              >
                <div className="activity__filter--checkbox">
                  <input id="listings" name="listings" type="checkbox" />
                  <label htmlFor="listings">Listings</label>
                </div>
              </div>
              <div
                className="header__menu-item"
                onClick={() => console.log("checkbox")}
              >
                <div className="activity__filter--checkbox">
                  <input id="purchases" name="purchases" type="checkbox" />
                  <label htmlFor="purchases">Purchases</label>
                </div>
              </div>
              <div
                className="header__menu-item"
                onClick={() => console.log("checkbox")}
              >
                <div className="activity__filter--checkbox">
                  <input id="sales" name="sales" type="checkbox" />
                  <label htmlFor="sales">Sales</label>
                </div>
              </div>
              <div
                className="header__menu-item"
                onClick={() => console.log("checkbox")}
              >
                <div className="activity__filter--checkbox">
                  <input id="transfers" name="transfers" type="checkbox" />
                  <label htmlFor="transfers">Transfers</label>
                </div>
              </div>
              <div
                className="header__menu-item"
                onClick={() => console.log("checkbox")}
              >
                <div className="activity__filter--checkbox">
                  <input id="bids" name="bids" type="checkbox" />
                  <label htmlFor="bids">Bids</label>
                </div>
              </div>
              <div
                className="header__menu-item"
                onClick={() => console.log("checkbox")}
              >
                <div className="activity__filter--checkbox">
                  <input id="likes" name="likes" type="checkbox" />
                  <label htmlFor="likes">Likes</label>
                </div>
              </div>
              <div
                className="header__menu-item"
                onClick={() => console.log("checkbox")}
              >
                <div className="activity__filter--checkbox">
                  <input id="follows" name="follows" type="checkbox" />
                  <label htmlFor="follows">Follows</label>
                </div>
              </div>
            </div>
            {/* Sign buttons */}
            <div style={{ padding: "30px 20px", display: "flex" }}>
              <button
                className="sign__btn-second"
                style={{ marginRight: 10 }}
                type="button"
                onClick={() => clearFilter()}
              >
                Clear All
              </button>
              <button
                className="sign__btn"
                style={{ marginLeft: 10 }}
                type="button"
                onClick={() => console.log("checkbox")}
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="row" style={{ margin: isMobile ? 0 : "auto" }}>
        {/* {tempTickets.map((ticket, index) => { */}
        {tickets.map((ticket, index) => {
          return (
            <div
              className="col-12"
              key={index}
              style={{ margin: 0, padding: isMobile ? 20 : 0 }}
            >
              {cardView(ticket)}
            </div>
          );
        })}
      </div>
      {!isMobile && (
        <div className="row row--grid">
          <div className="col-12">
            <div className="paginator" style={{ justifyContent: "flex-end" }}>
              <ul className="paginator__list">
                <li>
                  <button onClick={leftClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z" />
                    </svg>
                  </button>
                </li>

                <li className={cur === 0 ? "active" : ""}>
                  <button onClick={() => setCur(0)}>{tcur + 1}</button>
                </li>

                {(tcur + 1) * 8 < activities.length ? (
                  <li className={cur === 1 ? "active" : ""}>
                    <button onClick={() => setCur(1)}>{tcur + 2}</button>
                  </li>
                ) : (
                  <></>
                )}

                {(tcur + 2) * 8 < activities.length ? (
                  <li className={cur === 2 ? "active" : ""}>
                    <button onClick={() => setCur(2)}>{tcur + 3}</button>
                  </li>
                ) : (
                  <></>
                )}

                {(tcur + 3) * 8 < activities.length ? (
                  <li className={cur === 3 ? "active" : ""}>
                    <button onClick={() => setCur(3)}>{tcur + 4}</button>
                  </li>
                ) : (
                  <></>
                )}

                <li>
                  <button onClick={rightClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z" />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {!isMobile && <div style={{ height: 350 }}></div>}
    </div>
  );
};

export default PageActivity;
