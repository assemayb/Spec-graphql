import React, { useState, useEffect, useContext, createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { setAccessToken } from "./accessToken";

import { Header2 } from "./components/Header2";
import { Footer } from "./components/Footer";
import { Skeleton } from "./smallComps/Skeleton";


import { BaseRouter } from "./routes";
import { Container } from "@chakra-ui/react";

import {FastBigSpinner} from "./smallComps/Spinners"


// const User = createContext(null)
// const UserContext = () => {
//   return useContext(User)
// }

function App() {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/refresh_token", {
      credentials: "include",
      method: "POST",
    }).then(async (x) => {
      const resposne = await x.json();
      setAccessToken(resposne.accessToken);
      setAppLoading(false);
    });
  }, []);

  return (
    <div className="app">
      {appLoading ? (
        <Container marginLeft="auto" marginRight="auto" marginTop="10rem">
          <FastBigSpinner />
        </Container>
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
