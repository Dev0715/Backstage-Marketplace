import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { useUserContext } from "../../context/UserContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { buyTicket } from "../../helper/event";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import * as nearAPI from "near-api-js";
import BN from "bn.js";

import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { injected } from "../../helper/web3service";
import {
  paymentAddress_testnet,
  paymentAddress_mainnet,
  paymentABI,
  paymentAddress_NEAR_testnet,
} from "../../utils/payment_contract";

const TicketBuyModal = ({ eventCard, handleEnd, amount }) => {
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
  const { setLoading, setModal } = useAppContext();
  const { userInfo } = useUserContext();
  const [wallet, setWallet] = useState(userInfo.user.wallet_address);
  const [walletChanged, setWalletChanged] = useState(true);
  const { addToast } = useToasts();
  const [validation, setValidation] = useState("");

  const { connect, keyStores, WalletConnection } = nearAPI;

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
    wallet_connect();
  }, []);

  const handleWalletChange = (value) => {
    setValidation("");
    setWallet(value);
    setWalletChanged(true);
  };

  const confirmWalletAddress = () => {
    console.log("confirm wallet address");
    if (!checkValidation()) {
      return;
    }
    setWalletChanged(false);
  };

  const checkValidation = () => {
    console.log(wallet.indexOf("0x"), wallet.length);
    if (wallet.indexOf("0x") != 0 || wallet.length != 42) {
      setValidation("has-danger");
      return false;
    }
    setValidation("");
    return true;
  };

  const createOrder = (data, actions) => {
    console.log("data: ", data);
    console.log("actions: ", actions);

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: eventCard.price * amount,
            currency_code: "EUR",
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    const orderid = data.orderID;
    handleBuyTicket(orderid);
  };

  async function buyWithCrypto() {
    if (!active) {
      await wallet_connect();
    }
    console.log("account", account, chainId);
    if (chainId !== 56 && chainId !== 97) {
      addToast("Please change the network ", {
        appearance: "warning",
        autoDismiss: true,
      });
    } else {
      console.log(chainId);
      if (account) {
        addToast("Please wait ... It might takes some time", {
          appearance: "warning",
          autoDismiss: true,
        });
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(
            chainId === 97
              ? paymentAddress_testnet
              : chainId === 56
              ? paymentAddress_mainnet
              : "",
            paymentABI,
            provider.getSigner()
          );
          console.log(eventCard.id);
          console.log("Initialize payment");
          const txnRate = await contract.getPrice();
          const rate = Number(txnRate);
          console.log("BNB/EUR rate is ", rate, eventCard.price);
          const price = (eventCard.price * amount) / rate;
          console.log("Real price is ", price);
          let txn = await contract.payWithBNB(eventCard.id, {
            value: ethers.utils.parseEther(price.toString()),
          });
          await txn.wait();
          handleBuyTicket(txn.hash);
        } catch (err) {
          console.log(err);
          addToast(err.message, { appearance: "warning", autoDismiss: true });
        }
      }
    }
  }

  async function buyWithCryptoNEAR() {
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
    const contract = new nearAPI.Contract(
      account, // the account object that is connecting
      paymentAddress_NEAR_testnet,
      {
        viewMethods: ["check_token"],
        changeMethods: ["pay_with_near"],
        // sender: account, // account object to initialize and sign transactions.
      }
    );

    if (account) {
      addToast("Please wait ... It might takes some time", {
        appearance: "warning",
        autoDismiss: true,
      });
      const rateData = await axios.get(
        "https://api.coingecko.com/api/v3/coins/near"
      );
      const price = rateData["data"]["market_data"]["current_price"]["usd"];
      const nearPrice = new BN((eventCard.price * amount * 1000000) / price);
      try {
        localStorage.setItem(
          "buyInfo",
          JSON.stringify({
            wallet_address: account.accountId,
            eventcard: eventCard.id,
            price: eventCard.price,
            pay_order_id: "orderid",
            count: amount.toString(),
          })
        );
        await contract.pay_with_near(
          {
            event_name: eventCard.id,
            percentage: 10,
          },
          300000000000000, // attached GAS (optional) 300TGas
          new BN("1000000000000000000").mul(nearPrice.add(new BN("1"))) // 1 Near
        );
      } catch (err) {
        console.log(err);
        localStorage.removeItem("buyInfo");
        addToast(err.message, { appearance: "warning", autoDismiss: true });
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
      paymentAddress_NEAR_testnet // contract requesting access
    );
  };

  const handleBuyTicket = (orderid) => {
    setLoading(true);
    const param = {
      wallet_address: wallet,
      eventcard: eventCard.id,
      price: eventCard.price,
      pay_order_id: orderid,
      count: amount.toString(),
    };
    buyTicket(param)
      .then((res) => {
        setLoading(false);
        if (res.success) {
          addToast("You bought the ticket", {
            appearance: "success",
            autoDismiss: true,
          });
          setModal({ open: false });
          handleEnd();
        } else {
          addToast("failed", { appearance: "error", autoDismiss: true });
          setModal({ open: false });
        }
      })
      .catch((error) => {
        addToast("failed", { appearance: "error", autoDismiss: true });
        setModal({ open: false });
      });
  };

  return (
    <div style={style.container}>
      {/*<h4 className="sign__title">Please enter your BSC address</h4>*/}
      <h4 className="sign__title">Proceed to Pay</h4>
      <span style={style.btn_close} onClick={() => setModal({ open: false })}>
        <svg
          style={{ marginTop: "-4px" }}
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="#ffffff"
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          ></path>
        </svg>
      </span>

      {/* <div className="sign__group sign__group--row">
                <label className="sign__label" htmlFor="placebid"></label>
               <input id="placebid" type="text" name="placebid" className="sign__input" 
                    value={wallet}
                    onChange={e => handleWalletChange(e.target.value)}
                />
                {validation == 'has-danger' ? (<span className='text-error'>invalid wallet address*</span>) : ''}
                <span className="sign__text sign__text--small" style={{marginTop: '5px'}}>You can change this wallet address.</span>
            </div> */}

      <div style={{ marginTop: "35px" }}>
        {/*               {walletChanged ? 
                    <button className="sign__btn" type="button"
                        onClick={confirmWalletAddress}
                    >Confirm Wallet Address</button> : */}
        <PayPalScriptProvider
          options={{
            "client-id":
              "AffFVjpeVWCzGzYRB3hs1btcwdt1R0adzgVROBak5Fn0hClbBVFea-DznT-WXjcH1h1qjrkqKvPQ6ia-",
            currency: "EUR",
          }}
        >
          <PayPalButtons
            style={{ layout: "horizontal", tagline: false, label: "pay" }}
            createOrder={createOrder}
            onApprove={onApprove}
          />
        </PayPalScriptProvider>
        {/*}*/}
      </div>

      <div>
        <button
          className="asset__btn asset__btn--full asset__btn--clr open-modal"
          onClick={buyWithCrypto}
        >
          Buy with crypto: BSC
        </button>
      </div>

      <div>
        <button
          className="asset__btn asset__btn--full asset__btn--clr open-modal"
          onClick={buyWithCryptoNEAR}
        >
          Buy with crypto: NEAR
        </button>
      </div>
    </div>
  );
};

const style = {
  container: {
    maxWidth: "80%",
    width: "700px",
    backgroundColor: "#14142f",
    color: "white",
    padding: "40px 40px 25px",
    borderRadius: "10px",
    border: "1px solid #534f77",
    margin: "auto",
    position: "relative",
  },
  btn_close: {
    position: "absolute",
    top: "37px",
    right: "35px",
    width: "20px",
    height: "25px",
    display: "inline-block",
    border: "1px solid #534f77",
    paddingBottom: "2px",
    borderRadius: "3px",
    marginLeft: "10px",
    verticalAlign: "top",
    cursor: "pointer",
  },
};

export default TicketBuyModal;
