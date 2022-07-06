import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/UserContext";
import config from "../../../helper/config";
import Author from "./author";
import Profile from "./profile";

const PageAuthor = () => {
  const { userInfo } = useUserContext();
  const [background, setBackground] = useState<any>();
  const [wallet, setWallet] = useState<string>(userInfo?.user?.wallet_address);
  const [walletNear, setWalletNear] = useState<string>(
    userInfo?.user?.wallet_address_near
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.user.background) {
      const backgroundUrl = `${config.API_BASE_URL}/api/upload/get_file?path=${userInfo.user.background}`;
      setBackground(backgroundUrl);
      setWallet(userInfo.user.wallet_address);
      console.log(backgroundUrl);
    } else {
    }
  }, [userInfo]);

  return (
    <div
      style={{
        marginBottom: isMobile ? 150 : 350,
        marginTop: isMobile ? 0 : 20,
        width: isMobile ? "100%" : 1224,
        zIndex: 999,
      }}
    >
      {/* banner image */}
      <div
        className="main__author"
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {isMobile && (
          <div
            style={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#14142F",
              width: 28,
              height: 28,
              left: 24,
              top: 20,
              borderRadius: 14,
            }}
            onClick={() => navigate("/")}
          >
            <img
              src="/img/icons/arrow-left.svg"
              alt=""
              style={{ width: 24, height: 24 }}
            />
          </div>
        )}
        &nbsp;
      </div>

      <div
        className="container"
        style={{
          padding: isMobile ? "0px 25px" : 0,
          maxWidth: 1224,
        }}
      >
        <div
          className={isMobile ? " " : "row row--grid"}
          style={{ width: "100%", marginLeft: 0 }}
        >
          <Author
            wallet={wallet}
            setWallet={setWallet}
            walletNear={walletNear}
            setWalletNear={setWalletNear}
          />
          <Profile wallet={wallet} walletNear={walletNear} />
        </div>
      </div>
    </div>
  );
};

export default PageAuthor;
