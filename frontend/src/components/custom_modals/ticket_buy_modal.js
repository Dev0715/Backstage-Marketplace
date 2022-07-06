import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useAppContext } from "../../context/AppContext";
import { useUserContext } from "../../context/UserContext";
import { buyTicket } from "../../helper/event";

import BN from "bn.js";
import * as nearAPI from "near-api-js";

import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { isMobile } from "react-device-detect";
import { injected } from "../../helper/web3service";
import { getEventPrice } from "../../utils";
import {
  BUSDPayment_testnet,
  BUSDPayment_TEST_ABI,
  BUSD_MAIN_ABI,
  BUSD_TEST_ABI,
  paymentABI,
  paymentAddress_mainnet,
  paymentAddress_NEAR_testnet,
  paymentAddress_testnet,
} from "../../utils/payment_contract";
import SignupSuccessMoal from "./signup_success_modal";
import ParamModal from "./param_modal.js";

const TicketBuyModal = ({ eventCard, handleEnd, amount }) => {
  const {
    active,
    account,
    // library,
    // connector,
    chainId,
    activate,
    // deactivate,
    // error,
  } = useWeb3React();
  const { setLoading, setModal } = useAppContext();
  const { userInfo } = useUserContext();
  const [wallet, setWallet] = useState(userInfo.user.wallet_address);
  // const [walletChanged, setWalletChanged] = useState(true);
  const { addToast } = useToasts();
  const [validation, setValidation] = useState("");

  const { connect, keyStores, WalletConnection } = nearAPI;

  async function wallet_connect() {
    try {
      await activate(injected);
      setWallet(account);
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
    if (account) {
      setWallet(account);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  // useEffect(() => {
  //   wallet_connect();
  // }, []);

  // const handleWalletChange = (value) => {
  //   setValidation("");
  //   setWallet(value);
  //   setWalletChanged(true);
  // };

  // const confirmWalletAddress = () => {
  //   console.log("confirm wallet address");
  //   if (!checkValidation()) {
  //     return;
  //   }
  //   setWalletChanged(false);
  // };

  // const checkValidation = () => {
  //   console.log(wallet.indexOf("0x"), wallet.length);
  //   if (wallet.indexOf("0x") !== 0 || wallet.length !== 42) {
  //     setValidation("has-danger");
  //     return false;
  //   }
  //   setValidation("");
  //   return true;
  // };

  const createOrder = (data, actions) => {
    console.log("data: ", data);
    console.log("actions: ", actions);

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: getEventPrice(eventCard) * amount,
            currency_code: "EUR",
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    const orderid = data.orderID;
    handleBuyTicket(orderid, "paypal", "Paypal");
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
          console.log("BNB/EUR rate is ", rate);
          const price = (getEventPrice(eventCard) * amount) / rate;
          console.log("Real price is ", price);
          const payee_wallet = eventCard.payee_wallet.split(",");
          const payee_account = eventCard.payee_fee
            .split(",")
            .map((item) => Number(item));
          let txn = await contract.payWithBNB(
            eventCard.owner_wallet,
            payee_wallet,
            payee_account,
            {
              value: ethers.utils.parseEther(price.toString()),
            }
          );
          await txn.wait();
          handleBuyTicket(txn.hash, wallet, "Binance Smart Chain");
          // let txn = await contract.eventInfo(eventCard.id);
          // await txn.wait();
          // console.log(txn);
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
      const nearPrice = new BN(
        (getEventPrice(eventCard) * amount * 1000000) / price
      );
      try {
        localStorage.setItem(
          "buyInfo",
          JSON.stringify({
            wallet_address: account.accountId,
            blockchain: "NEAR Blockchain",
            eventcard: eventCard.id,
            price: getEventPrice(eventCard),
            pay_order_id: "orderid",
            count: amount.toString(),
          })
        );
        await contract.pay_with_near(
          {
            event_name: eventCard.id,
            percentage: eventCard.payee_fee,
            account: eventCard.payee_account,
          },
          300000000000000, // attached GAS (optional) 300TGas
          new BN("1000000000000000000")
            .mul(nearPrice)
            .add(new BN("1000000000000000000")) // 1 Near
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

  const getEurRate = async () => {
    const data = await axios.get(
      "https://api.coingecko.com/api/v3/coins/ethereum"
    );
    const price = data.data.market_data.current_price;
    return price.usd / price.eur;
  };

  const buyInBUSD = async (provide) => {
    // console.log("account", account, chainId);
    const provider = new ethers.providers.Web3Provider(provide);
    const chainId = Number(provider.provider.chainId);
    console.log("ChainId", chainId);
    if (chainId !== 56 && chainId !== 97) {
      addToast("Please change the network ", {
        appearance: "warning",
        autoDismiss: true,
      });
    } else {
      addToast("Please wait ... It might takes some time", {
        appearance: "warning",
        autoDismiss: true,
      });
      setLoading(true);
      try {
        console.log("Provider", provider);
        const account = await provider.getSigner().getAddress();
        console.log("Provider Account", account);
        const BUSD = new ethers.Contract(
          chainId === 97
            ? "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee"
            : "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          chainId === 97 ? BUSD_TEST_ABI : BUSD_MAIN_ABI,
          provider.getSigner()
        );
        const contract = new ethers.Contract(
          chainId === 97
            ? BUSDPayment_testnet
            : "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          chainId === 97 ? BUSDPayment_TEST_ABI : BUSD_MAIN_ABI,
          provider.getSigner()
        );
        const rate = await getEurRate();
        const price = getEventPrice(eventCard) * amount * rate;
        console.log(price);
        const ETH = ethers.BigNumber.from("1000000000000000000");
        const totalWei = await BUSD.balanceOf(account);
        const totalBUSD =
          ethers.BigNumber.from(totalWei)
            .mul(ethers.BigNumber.from(100))
            .div(ETH)
            .toNumber() / 100;
        console.log("Total Amount", totalBUSD);
        if (totalBUSD < price) {
          addToast("You have not enough BUSD in your wallet", {
            appearance: "error",
            autoDismiss: true,
          });
        } else {
          const amount = ethers.BigNumber.from(Math.floor(price * 100))
            .mul(ETH)
            .div(ethers.BigNumber.from(100));
          let txn = await BUSD.approve(BUSDPayment_testnet, amount);
          await txn.wait();
          console.log(txn.hash);
          const payees =
            eventCard.payees === ""
              ? []
              : JSON.parse(eventCard.payees).map((item) => item.wallet);
          const fees =
            eventCard.payees === ""
              ? []
              : JSON.parse(eventCard.payees).map((item) => Number(item.fee));
          let totalFee = 100;
          for (let i = 0; i < fees.length; i++) {
            totalFee -= fees[i];
          }
          payees.push(eventCard.owner_wallet);
          fees.push(totalFee);
          console.log(payees, fees);
          txn = await contract.payWithBUSD(account, amount, payees, fees);
          await txn.wait();
          handleBuyTicket(txn.hash, wallet, "Binance Smart Chain");
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        addToast(err.message, { appearance: "warning", autoDismiss: true });
      }
    }
    console.log("Buy with BUSD");
  };

  const buyWithBUSD = async (_provide) => {
    let provide = null;
    if (_provide === "Bitkeep" && window.isBitKeep) {
      provide = window.bitkeep.ethereum;
    } else if (_provide === "Metamask" && window.ethereum) {
      provide = window.ethereum;
    }

    if (provide === null) {
      addToast("You need to install " + _provide, {
        appearance: "warning",
        autoDismiss: true,
      });
      return;
    }

    const accounts = await provide.request({ method: "eth_accounts" });
    console.log("Accounts", accounts);
    if (accounts.length === 0)
      await provide.request({ method: "eth_requestAccounts" });
    buyInBUSD(provide);
  };

  const handleBuyTicket = (orderid, _wallet, _chain) => {
    setLoading(true);
    const param = {
      wallet_address: _wallet,
      blockchain: _chain,
      eventcard: eventCard.id,
      price: getEventPrice(eventCard),
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

  const buyWithParam = () => {
    setModal({ open: true, children: <ParamModal eventCard={eventCard} /> });
  };

  return (
    <div style={isMobile ? style.containerMobile : style.container}>
      {/*<h4 className="sign__title">Please enter your BSC address</h4>*/}
      <h4 className="modal__title">Proceed to Pay</h4>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={isMobile ? style.btn_closeMobile : style.btn_close}
        onClick={() => setModal({ open: false })}
      >
        <path
          d="M18 6L6 18"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6 6L18 18"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

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
      <button
        className="asset__btn asset__btn--full asset__btn--clr open-modal"
        onClick={buyWithParam}
      >
        Buy with Param kart
      </button>
      <p
        style={{
          fontSize: 12,
          fontWeight: 400,
          color: "rgba(255, 255, 255, 0.66)",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          textAlign: "center",
          margin: 0,
          marginTop: 10,
        }}
      >
        or
      </p>

      {/* <div>
        <button
          className="asset__btn asset__btn--full asset__btn--clr open-modal"
          onClick={buyWithCrypto}
        >
          Buy with BSC
        </button>
      </div> */}

      {/* <div>
        <button
          className="asset__btn asset__btn--full asset__btn--clr open-modal"
          onClick={buyWithCryptoNEAR}
        >
          Buy with NEAR
        </button>
      </div> */}

      <div>
        Buy with BUSD
        <button
          className="asset__btn asset__btn--full asset__btn--clr open-modal"
          onClick={() => buyWithBUSD("Metamask")}
        >
          {/* Metamask */}
          <img src="/img/metamask-seeklogo.com.svg" alt="" height={30} />
        </button>
        <button
          className="asset__btn asset__btn--full asset__btn--clr open-modal"
          onClick={() => buyWithBUSD("Bitkeep")}
        >
          {/* Bitkeep Wallet */}
          <img src="/img/bitkeep-seeklogo.com.svg" alt="" height={100} />
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
    padding: "20px 40px 25px",
    borderRadius: "12px",
    border: "1px solid #534f77",
    margin: "auto",
    position: "relative",
  },
  containerMobile: {
    maxWidth: "100%",
    width: "500px",
    backgroundColor: "#14142f",
    color: "white",
    padding: "35px 20px 30px",
    borderRadius: "12px",
    border: "1px solid #534f77",
    margin: "auto",
    position: "relative",
  },
  btn_close: {
    position: "absolute",
    top: "37px",
    right: "35px",
    width: "24px",
    height: "24px",
    cursor: "pointer",
  },
  btn_closeMobile: {
    position: "absolute",
    top: "30px",
    right: "15px",
    width: "24px",
    height: "24px",
    cursor: "pointer",
  },
};

export default TicketBuyModal;
