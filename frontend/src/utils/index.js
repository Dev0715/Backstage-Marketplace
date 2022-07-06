import moment from "moment";

const getCookie = (cookiename) => {
  let cookiestring = RegExp(cookiename + "=[^;]+").exec(document.cookie);
  return decodeURIComponent(
    !!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : ""
  );
};

const deleteAllCookies = () => {
  let cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let eqPos = cookie.indexOf("=");
    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};

const validateEmail = (value) => {
  let emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRex.test(value)) {
    return true;
  }
  return false;
};

const validateHtmlEditorValue = (value) => {
  let html = value.toString("html");
  html = html
    .replaceAll("\n", "")
    .replaceAll("&nbsp;", "")
    .replaceAll("<p><br></p>", "")
    .replaceAll("<p></p>", "");
  console.log(html);
  if (html === "") return false;
  return true;
};

const getDateString = (timestamp) => {
  return moment(timestamp).format("MMM DD, YYYY");
};

const getEventPrice = (eventCard) => {
  const addons = eventCard.addons === "" ? [] : JSON.parse(eventCard.addons);
  let addonPrice = 0;
  const len = addons.length;
  for (let i = 0; i < len; i++) {
    addonPrice += Number(addons[i].price);
  }
  return eventCard.price + addonPrice;
  // return (
  //   ((Number(eventCard.price) + addonPrice) *
  //     (100 + Number(eventCard.fee_percentage))) /
  //   100
  // );
};

const isVideoFile = (str) => {
  const fileName = str.split(".");
  const ext = fileName[fileName.length - 1].toLowerCase();
  return ext === "mp4" || ext === "mov" || ext === "avi";
};

export {
  getCookie,
  deleteAllCookies,
  validateEmail,
  getDateString,
  validateHtmlEditorValue,
  getEventPrice,
  isVideoFile
};
