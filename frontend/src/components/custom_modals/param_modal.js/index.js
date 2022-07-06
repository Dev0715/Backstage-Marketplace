import styles from "./index.module.css";
import { useAppContext } from "../../../context/AppContext";
import { isMobile } from "react-device-detect";
import { testInfo } from "../../../utils/param";
import { useState } from "react";
import { getEventPrice } from "../../../utils";
import axios from "axios";

const ParamModal = ({ eventCard }) => {
  const { setModal } = useAppContext();
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("4546711234567894");
  const [expDate, setExpDate] = useState("12/26");
  const [CVC, setCVC] = useState("000");
  const [phoneNumber, setPhoneNumber] = useState("");
  const buyWithParam = async () => {
    const orderId = "sipariş" + cardNumber + new Date().getTime();
    const hataUrl = "http://google.com.tr?q=hatali";
    const basariliUrl = "http://google.com.tr?q=basarili";
    const Islem_Tutar = getEventPrice(eventCard);
    const Toplam_Tutar = getEventPrice(eventCard);
    const Islem_Hash_Raw =
      testInfo.CLIENT_CODE +
      testInfo.GUID +
      Islem_Tutar +
      Toplam_Tutar +
      orderId +
      hataUrl +
      basariliUrl;
    const Islem_Hash = await axios.get(
      `${testInfo.api}/SHA2B64?Data=${Islem_Hash_Raw}`
    );
    console.log("XML", Islem_Hash);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(Islem_Hash.data, "text/xml");
    const hash = xmlDoc.getElementsByTagName("string")[0].childNodes[0]
      .nodeValue;
    console.log("Hash", hash);
    const xml = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <TP_Islem_Odeme_WD xmlns="https://turkpos.com.tr/">
          <G>
            <CLIENT_CODE>${testInfo.CLIENT_CODE}</CLIENT_CODE>
            <CLIENT_USERNAME>${testInfo.CLIENT_USERNAME}</CLIENT_USERNAME>
            <CLIENT_PASSWORD>${testInfo.CLIENT_PASSWORD}</CLIENT_PASSWORD>
          </G>
          <Doviz_Kodu>1002</Doviz_Kodu>
          <GUID>${testInfo.GUID}</GUID>
          <KK_Sahibi>${name}</KK_Sahibi>
          <KK_No>${cardNumber}</KK_No>
          <KK_SK_Ay>${expDate.split("/")[0]}</KK_SK_Ay>
          <KK_SK_Yil>${expDate.split("/")[1]}</KK_SK_Yil>
          <KK_CVC>${CVC}</KK_CVC>
          <KK_Sahibi_GSM>${phoneNumber}</KK_Sahibi_GSM>
          <Hata_URL>${hataUrl}</Hata_URL>
          <Basarili_URL>${basariliUrl}</Basarili_URL>
          <Siparis_ID>${orderId}</Siparis_ID>
          <Siparis_Aciklama></Siparis_Aciklama>
          <Islem_Tutar>${Islem_Tutar}</Islem_Tutar>
          <Toplam_Tutar>${Toplam_Tutar}</Toplam_Tutar>
          <Islem_Hash>${hash}</Islem_Hash>
          <Islem_Guvenlik_Tip>NS</Islem_Guvenlik_Tip>
          <Islem_ID></Islem_ID>
          <IPAdr>127.0.0.1</IPAdr>
          <Ref_URL></Ref_URL>
          <Data1></Data1>
          <Data2></Data2>
          <Data3></Data3>
          <Data4></Data4>
          <Data5></Data5>
        </TP_Islem_Odeme_WD>
      </soap:Body>
    </soap:Envelope>`;
    axios
      .post(testInfo.api, xml, {
        headers: {
          "Content-Type": "text/xml",
          SOAPAction: "https://turkpos.com.tr/TP_Islem_Odeme_WD",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className={styles.container}
      style={isMobile ? { maxWidth: "100%" } : { maxWidth: "80%" }}
    >
      <div className={styles.title}>
        Pay with Param kart
        <div
          className={styles.btn_close}
          onClick={() => setModal({ open: false })}
        >
          <svg
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="#ffffff"
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            ></path>
          </svg>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.input_wrapper_half}>
          Name: <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className={styles.input_wrapper_half}>
          GSM:
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className={styles.input_wrapper_full}>
          Card Number:
          <input
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>
        <div className={styles.input_wrapper_half}>
          Expiration Date:
          <input value={expDate} onChange={(e) => setExpDate(e.target.value)} />
        </div>
        <div className={styles.input_wrapper_half}>
          CVC: <input value={CVC} onChange={(e) => setCVC(CVC)} />
        </div>
      </div>
      <button
        className="asset__btn asset__btn--full asset__btn--clr open-modal"
        onClick={buyWithParam}
      >
        Buy
      </button>
    </div>
  );
};

export default ParamModal;
