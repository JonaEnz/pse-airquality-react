import React from "react";
import logo from "./logo.svg";
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
      <MuiThemeProvider theme={theme}>
        <DetailPage id='1893' />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
