import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import { setAccessToken } from "./accessToken";

import { Header2 } from "./components/Header2";
import {Footer} from "./components/Footer"
import { Skeleton } from "./smallComps/Skeleton";

import { useIsUserLoggedInQuery } from "./generated/graphql";
import { BaseRouter } from "./routes";

function App() {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/refresh_token", {
      credentials: "include",
      method: "POST",
    }).then(async (x) => {
      const resposne = await x.json();
      console.log(resposne.accessToken);
      setAccessToken(resposne.accessToken);
      setAppLoading(false);
    });
  }, []);

  return (
    <div className="app">
      {appLoading ? (
        <div>app is loading.....</div>
      ) : (
        <>
          <BrowserRouter>
            {/* <Header /> */}
            <Header2 />
            <Skeleton>
              <BaseRouter />
            </Skeleton>
            <Footer />
          </BrowserRouter>
        </>
      )}
    </div>
  );
}

export default App;
