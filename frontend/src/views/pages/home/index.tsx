import { isMobile } from "react-device-detect";
import GetStarted from "./getstarted";
import Hotcollections from "./hotcollections";
import Lastevents from "./lastevents";
import Nftevents from "./nftevents";
import Topsellers from "./topsellers";

const Home = () => {
  return (
    <main className="main">
      <Nftevents />
      <div
        className="container"
        style={{
          padding: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Hotcollections />
        <Lastevents />
        <Topsellers />
        {/* <Explorers />         */}
        <GetStarted />
        {!isMobile && <div style={{ height: 350 }}></div>}
      </div>
    </main>
  );
};

export default Home;
