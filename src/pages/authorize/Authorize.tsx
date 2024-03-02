import React from "react";

const Authorize = () => {
  const auth = () => {
    var token = window.location.hash.substring(7);
    if (window.opener) {
      window.opener.authorize(token);
    } else {
      localStorage.setItem("token", token);
    }

    setTimeout(function () {
      window.close();
    }, 1000);
  };

  auth();

  return (
    <>
      <div>
        This window should close automatically. If it doesn't, go ahead and
        close it.
      </div>
    </>
  );
};

export default Authorize;
