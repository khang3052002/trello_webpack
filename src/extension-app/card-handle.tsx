import { useEffect } from "react";
import ReactDOM from "react-dom";
import LifeCycleTicketComponent from "../ui/life-cycle-ticket.component";

const regexCardUrl = /https:\/\/trello\.com\/c\/([^\/]+)\/([^\/]+)-([^\/]+)/;

const CardHandle = () => {
  const url = window.location.href;
  const matches = url.match(regexCardUrl);
  const shortCode = matches ? matches[1] : "";

  useEffect(() => {
    console.log("location: ", shortCode);
    let intervalId = setInterval(() => {
      if (document) {
        const cardDetailWindow = document.querySelector(".card-detail-window");

        if (cardDetailWindow) {
          const cardDetailData = document.querySelector(".card-detail-data");

          if (cardDetailData) {
            let newNode = document.createElement("div");
            newNode.id = `pw-trello-exts-${shortCode}`;
            ReactDOM.render(
              <LifeCycleTicketComponent shortCode={shortCode} />,
              newNode
            );

            cardDetailData.insertBefore(newNode, cardDetailData.firstChild);
          }

          clearInterval(intervalId);
        }
      }
    }, 100);
  }, []);

  return null;
};

export default CardHandle;
