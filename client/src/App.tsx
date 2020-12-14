import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Link } from "react-router-dom"
import { BaseRouter } from "./routes"
import { useHelloQuery, useUsersListQuery } from './generated/graphql';

function App() {
  // const { data, loading, error } = useHelloQuery()

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
