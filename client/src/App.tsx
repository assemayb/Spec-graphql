import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Link } from "react-router-dom"
import { BaseRouter } from "./routes"
import { useHelloQuery } from './generated/graphql';

function App() {
  const { data, loading, error } = useHelloQuery()
  // if (data || error) {
  //   console.log(data)
  // }
  return (
    <div className="app">
      <BrowserRouter>
        <Link to="/">home</Link>
        <Link to="/test">test</Link>
        <BaseRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
