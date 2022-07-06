/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import config from "../../../../helper/config";
import ReactTimeAgo from "react-time-ago";
import { allTickets, updateUserTickets } from "../../../../helper/event";
import { useUserContext } from "../../../../context/UserContext";

import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { injected } from "../../../../helper/web3service";
import * as nearAPI from "near-api-js";
import BN from "bn.js";
import ReCAPTCHA from "react-google-recaptcha";

import {
  myNFTAddress_testnet,
  myNFTAddress_mainnet,
  myNFTABI,
  tokenURL_mainnet,
  tokenURL_testnet,
  myNFTAddress_NEAR_testnet,
} from "../../../../utils/nft_contract";

import { useAppContext } from "../../../../context/AppContext";
import { useToasts } from "react-toast-notifications";
import { ConstructorFragment } from "ethers/lib/utils";

/* import the ipfs-http-client library */
import { create } from "ipfs-http-client";
import { getEventPrice } from "../../../../utils";

/* Create an instance of the client */
// const client = create('https://ipfs.infura.io:5001/api/v0');
const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const PageAdminActivity = () => {
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
  const { addToast } = useToasts();
  const navigate = useNavigate();

  const { connect, keyStores, WalletConnection } = nearAPI;
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState([]);
  const [tickets, setTickets] = useState([]);

  const { setLoading } = useAppContext();

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
    }
  }

  async function wallet_disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }
  // hushi_need_check
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

  const mintNFT = async (data: any) => {
    if (!active) {
      await wallet_connect();
    }
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

          const provider = new ethers.providers.Web3Provider(
            (window as any).ethereum
          );
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
                allTickets().then((res) => {
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
          });
        } catch (error) {
          console.log("Error: ", error);
          setTickets(updateTicketProgressStatus(tickets, data.id, false));
        }
      }
    }
    navigate("/admin/activity");
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
          allTickets().then((res) => {
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

  useEffect(() => {
    // wallet_connect();
    allTickets().then((res) => {
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

  const cardView = (ticket: any) => {
    console.log("ticket", ticket);
    return (
      <div className="activity">
        <Link to="/item" className="activity__cover">
          <img
            src={`${config.API_BASE_URL}/api/upload/get_file?path=${ticket.eventcard.picture_small}`}
            alt=""
          />
        </Link>
        <div className="activity__content">
          <div className="top-right-amount">
            {ticket.count ? `( ${ticket.count} )` : ""}
          </div>
          <div className="nft-mint">
            <div className="activity__title">
              <Link to="/item">{ticket.eventcard.name}</Link>
            </div>
            {ticket.in_progress && (
              <label className="in_progress">In progress</label>
            )}
            {!ticket.in_progress &&
              userInfo.user.name === ticket.buyer.name &&
              (ticket.is_minted === 0 ? (
                <div className="activity-mint-wrapper">
                  Please mint with
                  <div className="activity-mint-btns">
                    <button
                      onClick={() => {
                        if (captcha) mintNFT(ticket);
                      }}
                      className={`btn mint-btn ${
                        !captcha ? "asset__btn--disable" : ""
                      }`}
                    >
                      BSC
                    </button>
                    <button
                      onClick={() => {
                        if (captcha) mintNFTonNear(ticket);
                      }}
                      className={`btn mint-btn ${
                        !captcha ? "asset__btn--disable" : ""
                      }`}
                    >
                      NEAR
                    </button>
                  </div>
                </div>
              ) : (
                <label className="minted">{`Minted ${
                  ticket.is_minted === 1 ? "BSC" : "NEAR"
                }`}</label>
              ))}
          </div>
          <p className="activity__text">
            Created by{" "}
            <Link to="/author">@{ticket.eventcard.creator.name}</Link>
            {/* <br/>for <b>{coin}</b> */}
          </p>
          <p className="activity__text mb-0">
            Purchased by <Link to="/author">@{ticket.buyer.name}</Link>
          </p>
          <span className="activity__time">
            Purchased <ReactTimeAgo date={ticket.createdAt} locale="en-US" />
          </span>
          <br></br>
          {ticket.is_minted ? (
            <>
              <span className="activity__time">
                Click here to see{" "}
                <a target="_blank" href={ticket.ipfsURL} rel="noreferrer">
                  IPFS address
                </a>
              </span>
              <br></br>
              <span className="activity__time">
                {`${
                  ticket.is_minted === 1 ? "Click here to see " : "NFT is on "
                }`}
                <a target="_blank" href={ticket.tokenURL} rel="noreferrer">
                  {`${ticket.is_minted === 1 ? "BSC NFT token" : "Wallet"}`}
                </a>
                {`${ticket.is_minted === 1 ? "" : " Collectibles tab"}`}
              </span>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container" style={{ marginBottom: 70, marginTop: 70 }}>
      <div className="row row--grid">
        <div className="col-12">
          <ul className="breadcrumb">
            <li className="breadcrumb__item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb__item breadcrumb__item--active">
              Activity
            </li>
          </ul>
        </div>
        <div className="col-12">
          <div className="main__title main__title--page">
            <h1>Activity</h1>
          </div>
        </div>
      </div>

      {!captcha && (
        <div
          style={{
            color: "white",
            marginTop: "10px",
          }}
        >
          Before you proceed, please complete the captcha below
        </div>
      )}
      {!captcha && (
        <ReCAPTCHA
          style={{ marginTop: "20px" }}
          ref={recaptchaRef as any}
          // size="invisible"
          sitekey="6LeaLwUgAAAAAIBN0ef2xzTx0rIfuLb1POyzr_ei"
          // sitekey="6Lf4RAUgAAAAAJbw7qXWVBfVtM2Ocggfs0KYGPjv"
          onChange={onChangeCaptcha}
        />
      )}
      <div className="row">
        <div className="col-12 col-xl-3 order-xl-2">
          <div className="filter-wrap" style={{ display: "none" }}>
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

            <div className="collapse filter-wrap__content" id="collapseFilter">
              <div className="filter filter--sticky">
                <h4 className="filter__title">
                  Filters
                  {/* <button type="button" onClick={onclearAll}>
                    Clear all
                  </button> */}
                </h4>

                <div className="filter__group">
                  <ul className="filter__checkboxes">
                    <li>
                      <input
                        id="type5"
                        type="checkbox"
                        name="type5"
                        onClick={onChecked}
                      />
                      <label htmlFor="type5">Listings</label>
                    </li>
                    <li>
                      <input
                        id="type6"
                        type="checkbox"
                        name="type6"
                        onClick={onChecked}
                      />
                      <label htmlFor="type6">Purchases</label>
                    </li>
                    <li>
                      <input
                        id="type7"
                        type="checkbox"
                        name="type7"
                        onClick={onChecked}
                      />
                      <label htmlFor="type7">Sales</label>
                    </li>
                    <li>
                      <input
                        id="type8"
                        type="checkbox"
                        name="type8"
                        onClick={onChecked}
                      />
                      <label htmlFor="type8">Transfers</label>
                    </li>
                    <li>
                      <input
                        id="type9"
                        type="checkbox"
                        name="type9"
                        onClick={onChecked}
                      />
                      <label htmlFor="type9">Bids</label>
                    </li>
                    <li>
                      <input
                        id="type10"
                        type="checkbox"
                        name="type10"
                        onClick={onChecked}
                      />
                      <label htmlFor="type10">Likes</label>
                    </li>
                    <li>
                      <input
                        id="type11"
                        type="checkbox"
                        name="type11"
                        onClick={onChecked}
                      />
                      <label htmlFor="type11">Followings</label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-9 order-xl-1">
          <div className="row row--grid">
            {tickets.map((ticket, index) => {
              return (
                <div className="col-12 col-lg-6" key={index}>
                  {cardView(ticket)}
                </div>
              );
            })}
          </div>

          {/* <div className="row row--grid">
                        <div className="col-12">
                            <button className="main__load" type="button" data-toggle="collapse"
                                    data-target="#collapsemore" aria-expanded="false"
                                    aria-controls="collapsemore">Load
                                more
                            </button>
                        </div>
                    </div> */}
        </div>
      </div>
    </div>
  );
};

export default PageAdminActivity;
