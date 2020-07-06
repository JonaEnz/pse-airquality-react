import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export default class NavBar extends React.Component {



    render() {
        return (
            <div className="NavBar">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            SmartAqNet
                    </Typography>
                    </Toolbar>
                </AppBar>
            </div >
        );
    }
}