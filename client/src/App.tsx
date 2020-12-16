import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Link } from "react-router-dom"
import { BaseRouter } from "./routes"
import { useHelloQuery, useUsersListQuery } from './generated/graphql';
import { setAccessToken } from './accessToken';
import jwtDecode from 'jwt-decode';

function App() {
  // const { data, loading, error } = useHelloQuery()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    console.log("app effect")
    fetch("http://localhost:8000/refresh_token", {
      credentials: "include",
      method: "POST",
    }).then(async x => {
     
      const resposne  = await x.json();
      setAccessToken(resposne.accessToken)
      setLoading(false);
    })
  }, [])
  return (
    <div className="app">
      <BrowserRouter>
        <Link to="/">home</Link>
        <Link to="/test">test</Link>
        <Link to="/register">register</Link>
        <Link to="/login">login</Link>

        <BaseRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
