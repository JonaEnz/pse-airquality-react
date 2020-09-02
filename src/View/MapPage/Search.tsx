import React, { Fragment, SyntheticEvent } from "react";
import {
    IconButton,
    Divider,
    InputBase,
    Grid,
    Card,
    Box,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import { Position } from "../../Model/Position";
import Language from "../../Controller/Storage/Language";

import "./Search.css";

let language = Language.getInstance();

interface Props {
    onSearch(event: SyntheticEvent, term: string): void;
    updatePosition(pos: Position): void;
}

interface State {
    searchTerm: string;
    locationEnabled: boolean;
}

export default class Search extends React.Component<Props, State> {
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
            <Fragment>
                <Card className="root">
                    <form
                        className="search-form"
                        onSubmit={(e) =>
                            this.props.onSearch(e, this.state.searchTerm)
                        }
                    >
                        <InputBase
                            className="input-field"
                            data-testid="textBox"
                            type="search"
                            onChange={(e) => {
                                this.setState({
                                    searchTerm: e.target.value,
                                });
                            }}
                            placeholder={language.getText("search")}
                        />
                        <IconButton
                            className="search-button"
                            data-testid="searchButton"
                            type="submit"
                            onClick={(e) =>
                                this.props.onSearch(e, this.state.searchTerm)
                            }
                        >
                            <SearchIcon />
                        </IconButton>
                        <Box className="divider"></Box>
                        <IconButton
                            className="location-button"
                            data-testid="locationButton"
                            onClick={() => this.locationClick()}
                            disabled={!this.state.locationEnabled}
                        >
                            <GpsFixedIcon data-testid="locationIcon" />
                        </IconButton>
                    </form>
                </Card>
            </Fragment>
        );
    }
}
