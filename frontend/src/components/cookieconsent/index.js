import { useAppContext } from "../../context/AppContext";
import styles from "./index.module.css";

const Btn = ({ title, onClick }) => {
  return (
    <div className={styles.button} onClick={onClick}>
      <div className={styles.button_title}>{title}</div>
    </div>
  );
};

const CookieConsent = () => {
  const { isCookiePopup, setCookiePopup } = useAppContext();

  const onAllow = () => {
    setCookiePopup(false);
    localStorage.setItem("consent", "accept");
  };
  const onDeny = () => {
    setCookiePopup(false);
  };

  if (isCookiePopup)
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>Cookie Consent</div>
        <div className={styles.content}>
          This website uses cookies or similar technologies, to enhance your
          browsing experience and provide personalized recommendations.
        </div>
        <div className={styles.buttonWrapper}>
          <Btn title="Deny" onClick={onDeny} />
          <Btn title="Accept" onClick={onAllow} />
        </div>
      </div>
    );
  else return <></>;
};

export default CookieConsent;
