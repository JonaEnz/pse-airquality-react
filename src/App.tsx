import React from "react";
import Layout from "./View/Layout";

import "./App.css";
import DetailPage from './View/DetailPage';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors'

function App() {

  const theme = createMuiTheme({
    palette: {
      primary: green,
    }
  });

  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
