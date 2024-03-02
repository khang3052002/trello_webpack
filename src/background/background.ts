// const url = `https://trello.com/1/authorize?key=f26580d3c5ea1b2074d761872ef96592&response_type=token&name=KyleTrello&return_url=${window.location.origin}%2Fauthorize.html&callback_method=fragment&expiration=never&scope=read,write,account`;

let urlNow: string = "";
const regexCardUrl = /https:\/\/trello\.com\/c\/([^\/]+)\/([^\/]+)-([^\/]+)/;

// async function runTrelloLib() {
//   const [tab] = await chrome.tabs.query({
//     active: true,
//   });
//   if (typeof tab.id !== "undefined") {
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       files: ["./@libs/trello.min.js"],
//     });
//   }
// }

// runTrelloLib();

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (request.message === "storeToken") {
    sendResponse("OKAY");
    return true;
  }

  //   if (request.message === "pop-up-card-open") {
  //     const matches = tab.url?.match(regexCardUrl);
  //     const shortCode = matches ? matches[1] : "";

  //     if (typeof tab.id !== "undefined") {
  //       chrome.scripting.executeScript({
  //         target: { tabId: tab.id },
  //         files: ["card_content_script.bundle.js"],
  //       });
  //     }

  //     return;
  //   }
});

chrome.webNavigation.onHistoryStateUpdated.addListener(async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
  });

  console.log("tab: ", tab.url);

  if (typeof tab.id !== "undefined") {
    if (tab.url?.includes("https://trello.com/b/")) {
      executeScript(tab.id, "App.bundle.js");
      //   try {
      //     const response = await chrome.tabs.sendMessage(tab.id, {
      //       message: "life-check",
      //     });

      //     if (response === undefined || response === false) {
      //       executeScript(tab.id, "App.bundle.js");
      //     }s
      //   } catch (error) {
      //     executeScript(tab.id, "App.bundle.js");
      //   }
    } else if (tab.url?.includes("https://trello.com/c/")) {
      executeScript(tab.id, "card_content_script.bundle.js");
    }
  }
});

function executeScript(tabId: number, nameScript: string) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: [`${nameScript}`],
  });
}
