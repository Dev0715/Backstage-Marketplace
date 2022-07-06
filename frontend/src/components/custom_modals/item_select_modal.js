import { useAppContext } from "../../context/AppContext";

const ItemSelectModal = ({ title, handleEnd, icons }) => {
  const { setModal } = useAppContext();

  const onItemSelect = (src) => {
    setModal({ open: false });
    handleEnd(src);
  };

  return (
    <div style={style.container}>
      {/*<h4 className="sign__title">Please enter your BSC address</h4>*/}
      <h4 className="sign__title">{title}</h4>
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

      <div className="row row--grid">
        {icons.map((icon) => (
          <div
            className="col-3 addon-icon"
            onClick={() => onItemSelect(icon.src)}
          >
            <img src={icon.src} alt={icon.id} width="100%" />
          </div>
        ))}
      </div>

      <div>
        <button
          className="asset__btn asset__btn--full asset__btn--clr open-modal"
          onClick={() => setModal({ open: false })}
        >
          Close
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

export default ItemSelectModal;
