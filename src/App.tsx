import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DetailPage from './View/DetailPage';
import { Grid } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <DetailPage id='1893' />
    </div>
  );
}

export default App;
