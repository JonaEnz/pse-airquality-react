import React from 'react';
import { Menu, Button, MenuItem } from '@material-ui/core';
import { Translate, ExpandMore } from '@material-ui/icons';
import Language from '../../Controller/Storage/Language';

interface IState {
    selectedLang: string;
    anchorEl: Element | null;
}

interface IProps {

}

export default class LanguageMenu extends React.Component<IProps, IState> {

    private availableLanguages: string[];
    private ref: any;

    constructor(props: IProps) {
        super(props)
        this.state = {
            selectedLang: Language.getSelectedLanguage(),
            anchorEl: null
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.availableLanguages = Language.getAvailabeleLanguages();
    }

    handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose(): void {
        this.setState({ anchorEl: null })
    }

    render(): JSX.Element {

        return (
            <div>
                <Button onClick={this.handleClick} color='inherit' startIcon={<Translate />} endIcon={<ExpandMore />} aria-controls="simple-menu" aria-haspopup="true">
                    {this.state.selectedLang}
                </Button>
                <Menu open={Boolean(this.state.anchorEl)} anchorEl={this.state.anchorEl}>
                    {this.availableLanguages.map((lang, index) =>
                        <MenuItem onClick={this.handleClose} >
                            {lang}
                        </MenuItem>
                    )}
                </Menu>
            </div>
        );
    }
}