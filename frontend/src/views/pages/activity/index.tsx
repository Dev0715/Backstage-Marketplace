import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../../helper/config";
import { userTickets, updateUserTickets } from "../../../helper/event";
import ReactTimeAgo from "react-time-ago";
import { useUserContext } from "../../../context/UserContext";

import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { injected } from "../../../helper/web3service";
import * as nearAPI from "near-api-js";

import {
  myNFTAddress_testnet,
  myNFTAddress_mainnet,
  myNFTABI,
  tokenURL_testnet,
} from "../../../utils/nft_contract";

import { useAppContext } from "../../../context/AppContext";
import { useToasts } from "react-toast-notifications";
// import {ipfsGet, ipfsUpload} from '@tatumio/tatum';
/* import the ipfs-http-client library */
import { create } from "ipfs-http-client";
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
  const [wallet, setWallet] = useState<any>();

  const [filters, setFilters] = useState([]);
  const [tickets, setTickets] = useState([]);

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

  async function mintNFT(data: any) {
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
      console.log("hushi_chainId", chainId);
      if (account) {
        addToast("Please wait ... It might takes some time", {
          appearance: "warning",
          autoDismiss: true,
        });
        setTickets(updateTicketProgressStatus(tickets, data.id, true));
        console.log("1", tickets);
        // const ipfsHash_img = await ipfsUpload('logo.jpg', 'fileName');
        //IPFS
        try {
          const tokenObject = {
            ImageIPFS: data.eventcard.picture_ipfs,
            metaData: {
              EventName: data.eventcard.name,
              Description: data.eventcard.description,
              Date: data.eventcard.date,
              Location: data.eventcard.location,
              Price: data.eventcard.price,
              Collection: data.eventcard.collection,
            },
          };
          const added = await client.add(JSON.stringify(tokenObject));
          const ipfs_url = `https://ipfs.infura.io/ipfs/${added.path}`;
          console.log("IPFS ulr:", ipfs_url);

          const provider = new ethers.providers.Web3Provider(
            (window as any).ethereum
          );
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
            console.log((e as Error).message);

            console.log("hushi_e", e);
            setTickets(updateTicketProgressStatus(tickets, data.id, false));
            addToast((e as Error).message, {
              appearance: "warning",
              autoDismiss: true,
            });
          }

          contract.on("Minted", (tokenId, tokenURI) => {
            console.log("First parameter :", tokenId);
            console.log("Second parameter :", tokenURI);
            data.tokenURL = `${tokenURL_testnet}${tokenId}`;
            data.ipfsURL = data.eventcard.picture_ipfs;
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
          });
        } catch (error) {
          console.log("Error: ", error);
          setTickets(updateTicketProgressStatus(tickets, data.id, false));
        }
      }
    }
    navigate("/activity");
  }

  async function initNearWallet() {
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
    setWallet(wallet);
    // const account = wallet.account();

    const account = await near.account("example-account.testnet");
    const contract: any = new nearAPI.Contract(
      account, // the account object that is connecting
      "example-contract.testnet",
      {
        // name of contract you're connecting to
        viewMethods: ["getMessages"], // view methods do not change state but usually return a value
        changeMethods: ["addMessage"], // change methods modify state
        // sender: account, // account object to initialize and sign transactions.
      }
    );

    await contract.mintNFT();
  }

  const signIn = () => {
    wallet.requestSignIn(
      "example-contract.testnet", // contract requesting access
      "Example App", // optional
      "http://YOUR-URL.com/success", // optional
      "http://YOUR-URL.com/failure" // optional
    );
  };

  const signOut = () => {
    wallet.signOut();
  };

  useEffect(() => {}, [userInfo]);

  useEffect(() => {
    wallet_connect();
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

  const cardView = (ticket: any) => {
    return (
      <div className="activity">
        <Link to="/item" className="activity__cover">
          <img
            src={`${config.API_BASE_URL}/api/upload/get_file?path=${ticket.eventcard.picture_small}`}
            alt=""
          />
        </Link>
        <div className="activity__content">
          <div className="nft-mint">
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
          </div>
          <p className="activity__text">
            Created by{" "}
            <Link to="/author">@{ticket.eventcard.creator.name}</Link>
            {/* <br/>for <b>{coin}</b> */}
          </p>
          <span className="activity__time">
            Purchased <ReactTimeAgo date={ticket.createdAt} locale="en-US" />
          </span>
          <br></br>
          {ticket.is_minted ? (
            <>
              <span className="activity__time">
                Click here to see{" "}
                <a target="_blank" href={ticket.ipfsURL}>
                  IPFS address
                </a>
              </span>
              <br></br>
              <span className="activity__time">
                Click here to see{" "}
                <a target="_blank" href={ticket.tokenURL}>
                  BSC NFT token
                </a>
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

      <div className="row">
        <div className="col-12 col-xl-3 order-xl-2">
          <div className="filter-wrap">
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
                  {/* <button type="button" onClick={onclearAll}>Clear all</button> */}
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

export default PageActivity;
