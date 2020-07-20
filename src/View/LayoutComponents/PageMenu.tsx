import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import SecurityIcon from '@material-ui/icons/Security';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LanguageMenu from './LanguageMenu';
import Language from '../../Controller/Storage/Language';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

interface IPageMenuProps {
    language: Language;
}

interface IPageMenuState {
    open: boolean;
}

export default class PageMenu extends React.Component<IPageMenuProps, IPageMenuState> {

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
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component={Link} to='/pse-airquality-react/' style={{ textDecoration: 'none', color: 'unset' }}>
                            SmartAQnet
                        </Typography>
                        <div style={{ marginLeft: 'auto' }}>

                            <LanguageMenu language={this.language} />

                        </div>
                        <div>
                            <IconButton style={{ float: 'right' }} onClick={this.toogleDrawer}>
                                <MenuIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer anchor="right" open={this.state.open} onOpen={this.toogleDrawer} onClose={this.toogleDrawer}>
                    <div style={{ width: 250 }}>
                        <List>
                            <ListItem button onClick={this.toogleDrawer} component={Link} to='/pse-airquality-react/privacy-policy'>
                                <ListItemIcon>
                                    <SecurityIcon />
                                </ListItemIcon>
                                <ListItemText primary={this.language.getText("privacyPolicy")} />
                            </ListItem>
                            <ListItem button onClick={this.toogleDrawer} component={Link} to='/pse-airquality-react/about'>
                                <ListItemIcon>
                                    <InfoIcon />
                                </ListItemIcon>
                                <ListItemText primary={this.language.getText("about")} />
                            </ListItem>
                            <ListItem button onClick={this.toogleDrawer} component='a' href='https://www.smartaq.net'>
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