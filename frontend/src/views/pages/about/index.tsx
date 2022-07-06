import { isMobile } from "react-device-detect";

const About = () => {
  return (
    <div
      className="container"
      style={{
        alignItems: "center",
        marginTop: isMobile ? 30 : 70,
        marginBottom: 70,
        zIndex: 999,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 className="about__title">About</h1>
        <img src="/img/icons/logo-circle.svg" alt="" />
        <p className="about__description">
          Backstage is powering the crypto revolution in the events industry.
          Through the BKS token and our blockchain ecosystem, Backstage aims to
          solve the current challenges facing the events and entertainment
          sectors. <br /> <br />
          From financing and payments to NFT ticketing and marketplaces,
          Backstage $BKS will take the events industry toward a more
          sustainable, profitable and fair future. Backstage has a very strong
          and open community and everyone can join and contribute to the
          platform’s development by purchasing tokens and helping fund the
          entertainment industry.{" "}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p className="about__follow-title">follow us</p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="about__follow-icons">
            <a
              href="https://t.me/BKSBackstage"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/img/icons/global.svg" alt="" />
            </a>
            <a
              href="https://t.me/BKSBackstage"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/img/icons/telegram.svg" alt="" />
            </a>

            <a
              href="https://medium.com/BackstageBks"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/img/icons/medium.svg" alt="" />
            </a>
          </div>
          <div className="about__follow-icons">
            <a
              href="https://twitter.com/BackstageBks"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/img/icons/twitter.svg" alt="" />
            </a>
            <a
              href="https://www.facebook.com/BKSBackstage"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/img/icons/facebook.svg" alt="" />
            </a>
            <a
              href="https://www.instagram.com/bksbackstage/?hl=en"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/img/icons/instagram.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
      <div style={{ height: 350 }} />
    </div>
  );
};

export default About;
