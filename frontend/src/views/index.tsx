import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { isMobile } from "react-device-detect";
import { Route, Routes, useLocation } from "react-router-dom";
import CustomModalComponent from "../components/custom_modals";
import { MessageDialog } from "../components/Dialogs";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import { useUserContext } from "../context/UserContext";
import { getAllSettings } from "../helper/setting";
import routes from "../routes";
import Footer from "./layout/footer";
import Header from "./layout/header";

const View = () => {
  const [cookies] = useCookies();
  const {
    loading,
    message,
    setMessage,
    modal,
    setModal,
    setSettings,
  } = useAppContext();
  const { setUserInfo } = useUserContext();
  const location = useLocation();

  useEffect(() => {
    console.log("cookieChange");
    if (Boolean(cookies.userInfo)) {
      setUserInfo(cookies.userInfo);
    } else {
      setUserInfo(false);
    }
    getAllSettings().then((res) => {
      if (res.success) {
        setSettings(res.settings);
      }
    });
  }, [cookies, setUserInfo, location]);

  const getRoutes = () => {
    return routes.map((prop, key) => {
      return <Route key={key} {...prop} />;
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          position: "relative",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {location.pathname === "/" && (
          <div style={{ position: "absolute", top: 0 }}>
            <img
              src="/img/icons/background_logo.svg"
              alt=""
              style={{ width: isMobile ? 350 : 1064 }}
            />
          </div>
        )}
        <Header />
        <Routes>{getRoutes()}</Routes>
        <Footer />
        <div style={{ position: "absolute", bottom: 0, opacity: 0.2 }}>
          <img
            src="/img/icons/background_footer.png"
            alt=""
            style={{
              width: "100%",
              mixBlendMode: "soft-light",
            }}
          />
        </div>
        {/* {chainId === 97 && ( */}
        <div className="header__redbar">You are in test mode.</div>
        {/* )} */}
      </div>
      <MessageDialog
        open={message.open}
        title={message.title}
        description={message.description}
        onClose={(event: any, reason: any) =>
          reason !== "clickaway" && setMessage({ ...message, open: false })
        }
      />
      <CustomModalComponent
        open={modal.open}
        children={modal.children}
        onClose={(event: any, reason: any) =>
          setModal({ ...modal, open: false })
        }
      />
      <Loader open={loading} />
    </>
  );
};

export default View;
