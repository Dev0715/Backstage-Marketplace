import emailjs from "@emailjs/browser";
import React, { useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import ReCAPTCHA from "react-google-recaptcha";

const PageContact = () => {
  const form = useRef();

  const recaptchaRef = React.createRef();
  const [captcha, setCaptcha] = useState(true);

  const onChangeCaptcha = (e: any) => {
    console.log(e);
    setCaptcha(e);
  };

  const submit = () => {
    console.log("request sent");
    if (captcha === null) return;
    emailjs
      .sendForm(
        "service_erw2ld9",
        "template_75tt6ir",
        form.current as any,
        "-dCe7JmPnoBko-5QM"
      )
      .then(
        (result) => {
          console.log(result.text);
          // alert("Successfully registered!");
        },
        (error) => {
          console.log(error.text);
        }
      );
    emailjs
      .sendForm(
        "service_erw2ld9",
        "template_v29fwqf",
        form.current as any,
        "-dCe7JmPnoBko-5QM"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Thanks to contact us");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div style={{ width: "100%", zIndex: 999 }}>
      <div className="sign__content">
        <form
          action="#"
          ref={form as any}
          className="sign__form"
          style={{ maxWidth: 312, padding: 0 }}
        >
          <p className="contact__main-title">Contact Us</p>
          <div className="sign__group">
            <p className="sign__form-label">Name</p>
            <input
              type="text"
              name="name"
              className="sign__input"
              onChange={(e) => console.log("name", e.target.value)}
            />
          </div>

          <div className="sign__group">
            <p className="sign__form-label">Email</p>
            <input
              type="text"
              name="email"
              className="sign__input"
              onChange={(e) => console.log("email", e.target.value)}
            />
          </div>

          <div className="sign__group">
            <p className="sign__form-label">Subject</p>
            <input
              type="text"
              name="subject"
              className="sign__input"
              onChange={(e) => console.log("subject", e.target.value)}
            />
          </div>

          <div className="sign__group">
            <p className="sign__form-label"> Your Message</p>
            <textarea
              name="message"
              className="sign__input"
              style={{ height: 175, resize: "none", padding: "10px 20px" }}
            />
          </div>
          {!captcha && (
            <div
              style={{
                color: "white",
                marginBottom: "20px",
                fontSize: 12,
                lineHeight: "12px",
              }}
            >
              Before you proceed, please complete the captcha below
            </div>
          )}
          {!captcha && (
            <div style={{ padding: 0 }}>
              <ReCAPTCHA
                ref={recaptchaRef as any}
                // size="invisible"
                sitekey="6LeaLwUgAAAAAIBN0ef2xzTx0rIfuLb1POyzr_ei"
                // sitekey="6Lf4RAUgAAAAAJbw7qXWVBfVtM2Ocggfs0KYGPjv"
                onChange={onChangeCaptcha}
              />
            </div>
          )}
          <button
            className={captcha ? "sign__btn" : "sign__btn-inactive"}
            type="button"
            onClick={() =>
              captcha
                ? submit()
                : console.log("You should complete the captcha!")
            }
          >
            Send
          </button>
        </form>
        <div className="contact__socials">
          <p style={{ letterSpacing: "0.02em" }}>
            You can also reach us through our social media channels
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="about__follow-icons">
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
              <a
                href="https://twitter.com/BackstageBks"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/img/icons/twitter.svg" alt="" />
              </a>
            </div>
            <div
              className="about__follow-icons"
              style={{ justifyContent: "center" }}
            >
              <a
                href="https://www.facebook.com/BKSBackstage"
                target="_blank"
                rel="noreferrer"
                style={{ marginRight: 15 }}
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
      </div>
      <div style={{ height: isMobile ? 200 : 350 }}></div>
    </div>
  );
};

export default PageContact;
