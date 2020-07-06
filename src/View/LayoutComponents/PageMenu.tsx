import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

interface IProps {

}

interface IState {
    open?: boolean;
}

export default class PageMenu extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = { open: false };
        this.toogleDrawer = this.toogleDrawer.bind(this);
    }

    toogleDrawer() {
        const toogle = !this.state.open;
        this.setState({ open: toogle });
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            SmartAQnet
                        </Typography>
                        <IconButton style={{ marginLeft: 'auto' }} onClick={this.toogleDrawer}>
                            <MenuIcon style={{ color: 'white' }} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer anchor="right" open={this.state.open} onClose={this.toogleDrawer}>
                    <div style={{ width: 250 }}>
                        <List>
                            <ListItem button>
                                <ListItemText primary="test" />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            </div>
        );
    }
}