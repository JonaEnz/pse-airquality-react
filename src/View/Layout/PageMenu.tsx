import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    SwipeableDrawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Hidden,
    Box,
    Button,
} from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import MenuIcon from "@material-ui/icons/Menu";
import InfoIcon from "@material-ui/icons/Info";
import SecurityIcon from "@material-ui/icons/Security";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LanguageMenu from "./LanguageMenu";
import Language from "../../Controller/Storage/Language";
import { Fragment } from "react";
import { Link } from "react-router-dom";

interface IPageMenuProps {
    language: Language;
}

interface IPageMenuState {
    open: boolean;
}

export default class PageMenu extends React.Component<
    IPageMenuProps,
    IPageMenuState
> {
    private language: Language;

    constructor(props: IPageMenuProps) {
        super(props);
        this.language = props.language;
        this.state = { open: false };
        this.toogleDrawer = this.toogleDrawer.bind(this);
    }

    private toogleDrawer() {
        const toogle = !this.state.open;
        this.setState({ open: toogle });
    }

    render() {
        return (
            <Fragment>
                <AppBar
                    position="static"
                    style={{
                        height: "64px",
                        boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2)",
                        position: "relative",
                        zIndex: 20,
                    }}
                >
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component={Link}
                            to="/pse-airquality-react/"
                            style={{ textDecoration: "none", color: "unset" }}
                        >
                            SmartAQNet
                        </Typography>
                        <Hidden smDown>
                            <Typography
                                variant="h6"
                                component={Link}
                                to="/pse-airquality-react/"
                                style={{
                                    textDecoration: "none",
                                    fontStyle: "italic",
                                    color: "unset",
                                }}
                            >
                                {this.language.getText("SmartAQNet")}
                            </Typography>
                        </Hidden>

                        <Box style={{ marginLeft: "auto" }}></Box>

                        <Button
                            startIcon={<HelpOutlineIcon />}
                            component={Link}
                            to="/pse-airquality-react/howitWorks"
                        >
                            <Hidden only={["sm", "xs"]}>
                                {this.language.getText("help")}
                            </Hidden>
                        </Button>

                        <Box style={{ marginLeft: "7px" }}>
                            <LanguageMenu language={this.language} />
                        </Box>

                        <IconButton
                            style={{ float: "right" }}
                            onClick={this.toogleDrawer}
                        >
                            <MenuIcon htmlColor="black" />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer
                    anchor="right"
                    open={this.state.open}
                    onOpen={this.toogleDrawer}
                    onClose={this.toogleDrawer}
                >
                    <div style={{ width: 250 }}>
                        <List>
                            <ListItem
                                button
                                onClick={this.toogleDrawer}
                                component={Link}
                                to="/pse-airquality-react/privacy-policy"
                            >
                                <ListItemIcon>
                                    <SecurityIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={this.language.getText(
                                        "privacyPolicy"
                                    )}
                                />
                            </ListItem>
                            <ListItem
                                button
                                onClick={this.toogleDrawer}
                                component={Link}
                                to="/pse-airquality-react/about"
                            >
                                <ListItemIcon>
                                    <InfoIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={this.language.getText("about")}
                                />
                            </ListItem>
                            <ListItem
                                button
                                onClick={this.toogleDrawer}
                                component="a"
                                href="https://www.smartaq.net"
                            >
                                <ListItemIcon>
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText primary="SmartAQnet" />
                            </ListItem>
                        </List>
                    </div>
                </SwipeableDrawer>
            </Fragment>
        );
    }
}
