import React from 'react';
import { Menu, Button, MenuItem } from '@material-ui/core';
import { Translate, ExpandMore } from '@material-ui/icons';
import Language from '../../Controller/Storage/Language';

interface IState {
    selectedLang: string;
    anchorEl: Element | null;
}

interface IProps {
    language: Language;
}

export default class LanguageMenu extends React.Component<IProps, IState> {

    private availableLanguages: Map<string, string>;
    private ref: any;
    private language: Language;

    constructor(props: IProps) {
        super(props)
        this.language = props.language;
        this.state = {
            selectedLang: this.language.getSelectedLanguage(),
            anchorEl: null
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.availableLanguages = this.language.getAvailabeleLanguages();
    }

    isSelectedLang(lang: string): boolean {
        //return lang === this.state.selectedLang;
        return false;
    }

    handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose(): void {
        this.setState({ anchorEl: null })
    }

    handleMenuItemClick(event: React.MouseEvent<HTMLElement>, id: string): void {
        this.language.changeLanguage(id);
        this.setState({ anchorEl: null, selectedLang: this.language.getSelectedLanguage() })
    }

    langList(): JSX.Element[] {
        let list: JSX.Element[] = [];
        this.availableLanguages.forEach((lang: string, id: string) => {
            list.push(
                <MenuItem onClick={(e) => this.handleMenuItemClick(e, id)} selected={id == this.language.getSelectedLanguageId()}>
                    {lang}
                </MenuItem>
            )
        });
        return list;
    }

    render(): JSX.Element {

        return (
            <div>
                <Button onClick={this.handleClick} color='inherit' startIcon={<Translate />} endIcon={<ExpandMore />} aria-controls="simple-menu" aria-haspopup="true">
                    {this.state.selectedLang}
                </Button>
                <Menu open={Boolean(this.state.anchorEl)} anchorEl={this.state.anchorEl} onClose={this.handleClose}>
                    {this.langList()}
                </Menu>
            </div>
        );
    }
}