import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "typeface-roboto";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import lightGreen from "@material-ui/core/colors/green";
import Layout from "./View/Layout/Layout";
import Configuration from "./Controller/Storage/Configuration";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: lightGreen[500],
        },
        secondary: {
            main: purple[500],
        },
    },
});

Configuration.getInstance(); //Initialize App Config

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Layout />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
