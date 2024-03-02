import "./Popup.css";
import React, { useEffect } from "react";

// declare const TrelloPowerUp: any;
// const t = TrelloPowerUp.iframe();

// var t = window.TrelloPowerUp.iframe();
const t = (window as any).TrelloPowerUp.iframe();

// const Trello = (window as any).Trello;

const Popup = () => {
  const token =
    "ATTA2b312bcf8334ac61e2c49a8c39345901c6bde25598c91c720a44d48f51205c7d72384ED4";
  const apiKey = "f26580d3c5ea1b2074d761872ef96592";

  const url = `https://trello.com/1/authorize?key=f26580d3c5ea1b2074d761872ef96592&response_type=token&name=KyleTrello&return_url=${window.location.origin}%popup.html&callback_method=fragment&expiration=never&scope=read,write,account`;

  const handleClick = async () => {
    t.authorize(url)
      .then(function (token: string) {
        console.log("TOKEN: ", token);
        chrome.runtime.sendMessage(
          { originator: "client", message: "storeToken", token: token },
          (response) => {
            console.log(response);
          }
        );
      })
      .then(function () {
        console.log(t);
        // return t.closePopup();
      });
  };

  const handleIsAuth = async () => {
    console.log("ahaha");

    const data = await t.getAll();

    // return data;
  };

  return (
    <>
      <div>
        <button id="btn-click" onClick={() => handleClick()}>
          Click me!
        </button>
        <button onClick={() => handleIsAuth()}>Is Authorize</button>
      </div>
    </>
  );
};

export default Popup;
