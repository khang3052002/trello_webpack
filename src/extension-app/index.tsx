import { createRoot } from "react-dom/client";
import App from "./app";

let intervalId = setInterval(() => {
  if (document) {
    const divElements = document.querySelectorAll(
      '[data-testid="list-wrapper"]'
    );

    if (divElements.length > 0 && divElements) {
      console.log("lien tuc vao day");

      const root = document.createElement("div");
      root.id = "chrome-extension-view-root";

      document.body.append(root);
      createRoot(root).render(<App />);

      clearInterval(intervalId);
    }
  }
}, 100);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const message = request.message;
  switch (message) {
    case "life-check":
      sendResponse(isTicketRevenueRender());
      break;
    default:
      break;
  }
});

const isTicketRevenueRender = () => {
  return document.querySelector(".ticket-revenue") ? true : false;
};

// let observer = new MutationObserver(function (mutations) {
//   mutations.forEach(function (mutation) {
//     if (
//       mutation.type === "childList" &&
//       mutation.target instanceof Element &&
//       mutation.target.id === "board" &&
//       mutation.target.childElementCount > 0
//     ) {
//       console.log("Co thay doi");
//     }
//   });
// });

// let targetNode = document.getElementById("board"); // Node to observe

// if (targetNode) {
//   observer.observe(targetNode, {
//     attributes: false,
//     childList: true,
//     subtree: true,
//   });
// }
