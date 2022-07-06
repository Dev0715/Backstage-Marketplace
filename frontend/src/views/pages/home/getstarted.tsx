const GetStarted = () => {
  return (
    <div className="row" style={{ maxWidth: 1224, margin: 0 }}>
      <div className="col-12">
        <div className="main__sub--title" style={{ textAlign: "center" }}>
          Create and sell your NFTs
        </div>
      </div>
      <div className="feature">
        <div className="feature__item">
          <div className="feature__icon">
            <img src="/img/icons/register_platform.svg" alt="" />
          </div>
          <h3 className="feature__title">Register to the platform</h3>

          <p className="feature__text">
            By visiting Backstage NFT public web page, anybody can register on
            Backstage’s NFT Marketplace. The registration process is intuitive
            and requires downloading BKS Wallet. Once compliant with the
            mandatory KYC &amp; AML procedures, user will be enabled to collect,
            buy, and sell NFTs.
          </p>
        </div>
        <div className="feature-line"></div>

        <div className="feature__item">
          <span className="feature__icon">
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M19,7H18V6a3,3,0,0,0-3-3H5A3,3,0,0,0,2,6H2V18a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V10A3,3,0,0,0,19,7ZM5,5H15a1,1,0,0,1,1,1V7H5A1,1,0,0,1,5,5ZM20,15H19a1,1,0,0,1,0-2h1Zm0-4H19a3,3,0,0,0,0,6h1v1a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V8.83A3,3,0,0,0,5,9H19a1,1,0,0,1,1,1Z" />
            </svg> */}
            <img src="/img/icons/setup_wallet.svg" alt="" />
          </span>
          <h3 className="feature__title">Set up your Wallet</h3>
          <p className="feature__text">
            Connected with BKS Wallet, Backstage’s NFT Platform will help the
            Event Industry to fight counterfeiting and fraud on ticket sales: by
            adopting trusted real-time payments proceeding from ticket sales and
            bookings of services. <br />
            <a href="signin.html">Connect your wallet now</a>.
          </p>
        </div>
        <div className="feature-line" />

        <div className="feature__item">
          <span className="feature__icon feature__icon--green">
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M10,13H4a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V14A1,1,0,0,0,10,13ZM9,19H5V15H9ZM20,3H14a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,20,3ZM19,9H15V5h4Zm1,7H18V14a1,1,0,0,0-2,0v2H14a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V18h2a1,1,0,0,0,0-2ZM10,3H4A1,1,0,0,0,3,4v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,10,3ZM9,9H5V5H9Z" />
            </svg> */}
            <img src="/img/icons/mint_nft.svg" alt="" />
          </span>
          <h3 className="feature__title">Mint your NFT</h3>
          <p className="feature__text">
            Backstage’s NFT Platform provides the possibility to mint digital
            assets for users to build, purchase, and sell NFTs traded against
            the BKS token, and to also provide additional services.
          </p>
        </div>
        <div className="feature-line" />

        <div className="feature__item">
          <span className="feature__icon feature__icon--red">
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M15,12a1,1,0,1,0,1-1A1,1,0,0,0,15,12Zm6.71-.71-5-5A1,1,0,0,0,16,6H5A3,3,0,0,0,2,9v6a3,3,0,0,0,3,3H16a1,1,0,0,0,.71-.29l5-5A1,1,0,0,0,21.71,11.29ZM15.59,16H5a1,1,0,0,1-1-1V9A1,1,0,0,1,5,8H15.59l4,4Z" />
            </svg> */}
            <img src="/img/icons/list_sale.svg" alt="" />
          </span>
          <h3 className="feature__title">List them for sale</h3>
          <p className="feature__text">
            Furthermore, the NFT Platform enables content creators to
            immortalize their content and productions as NFTs. In this way,
            musicians, producers, creators of any content of interest can
            rapidly monetize on their talent within the Events Ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
