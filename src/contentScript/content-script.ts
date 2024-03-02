const url = `https://trello.com/1/authorize?key=f26580d3c5ea1b2074d761872ef96592&response_type=token&name=KyleTrello&return_url=${window.location.origin}%2Fauthorize.html&callback_method=fragment&expiration=never&scope=read,write,account`;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "authorizeTrello") {
  }
});
