import React from "react";
import {
    TextField,
    Paper,
    IconButton,
    Divider,
    Theme,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import LocationIcon from "@material-ui/icons/LocationOn";
import { withStyles } from "@material-ui/styles";
//@ts-ignore
import Geonames from "geonames.js";
import { Position } from "../../Model/Position";
import Language from "../../Controller/Storage/Language";

const styles = (theme: Theme) => ({
    root: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: "500px",
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
});

const geonames = new Geonames({
    username: "reactairqualityrea",
    lan: "de",
    encoding: "JSON",
});

let language = Language.getInstance();

interface Props {
    classes: any;
    onSearch(term: string): void;
    updatePosition(pos: Position): void;
}

interface State {
    searchTerm: string;
    locationEnabled: boolean;
}

class Search extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { searchTerm: "", locationEnabled: true };
        if ("geolocation" in navigator) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then((status: PermissionStatus) => {
                    if (status.state === "denied") {
                        //If permission was denied, disable button
                        this.setState({ locationEnabled: false });
                    }
                });
        }
    }

    locationClick() {
        if ("geolocation" in navigator) {
            console.log("Available");
            navigator.geolocation.getCurrentPosition(
                (res) => {
                    //Get position
                    var position = new Position(
                        res.coords.latitude,
                        res.coords.longitude
                    );
                    this.props.updatePosition(position);
                    this.setState({ locationEnabled: true });
                },
                (err) => {
                    //Location denied
                    console.log("Location denied.");
                    this.setState({ locationEnabled: false });
                }
            );
        } else {
            //Browser doesn't support geolocation
            console.log("Not Available");
            this.setState({ locationEnabled: false });
        }
    }

    render() {
        return (
            <Paper className={this.props.classes.root}>
                <TextField
                    type="search"
                    variant="outlined"
                    className={this.props.classes.input}
                    label={language.getText("search")}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            this.props.onSearch(this.state.searchTerm); //Enter key was pressed, search for this.state.searchTerm
                        }
                    }}
                    onChange={(e) => {
                        this.setState({ searchTerm: e.target.value });
                    }}
                    value={this.state.searchTerm}
                />
                <IconButton
                    onClick={() => this.locationClick()}
                    className={this.props.classes.iconButton}
                >
                    <SearchIcon />
                </IconButton>
                <Divider
                    orientation="vertical"
                    className={this.props.classes.divider}
                />
                <IconButton
                    color="primary"
                    onClick={() => this.locationClick()}
                    className={this.props.classes.iconButton}
                    disabled={!this.state.locationEnabled}
                >
                    <LocationIcon />
                </IconButton>
            </Paper>
        );
    }
}

export default withStyles(styles)(Search);
