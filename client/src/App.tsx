import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { setAccessToken } from './accessToken';
import { Header } from './components/Header';
import { BaseRouter } from './routes';

function App() {
  const [appLoading, setAppLoading] = useState(true)


  useEffect(() => {
    fetch("http://localhost:8000/refresh_token", {
      credentials: "include",
      method: "POST",
        }).then(  async x => {
      const resposne = await x.json();
      setAccessToken(resposne.accessToken)
      setAppLoading(false);
    })
  }, [])

  return (
    <div className="app">
      {appLoading ? (
        <div>app is loading.....</div>
      ) : (
        <>
          <BrowserRouter>
          <Header />
            <BaseRouter />
          </BrowserRouter>
        </>
        )}

    </div>
  );
}

export default App;
