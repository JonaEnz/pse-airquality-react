import React from 'react';
import { Menu, Button } from '@material-ui/core';
import { Translate, ExpandMore } from '@material-ui/icons';

interface IState {
    selectedLang: string;
    menuOpen: boolean;
}

interface IProps {

}

export default class LanguageMenu extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
        this.state = {
            selectedLang: 'Deutsch',
            menuOpen: false
        }
    }

    render() {
        return (
            <div>
                <Button color='inherit' startIcon={<Translate />} endIcon={<ExpandMore />} aria-controls="simple-menu" aria-haspopup="true">
                    {this.state.selectedLang}
                </Button>
                <Menu open={this.state.menuOpen}>

                </Menu>
            </div>
        );
    }
}