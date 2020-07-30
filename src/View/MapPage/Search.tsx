import React, { Fragment, SyntheticEvent } from "react";
import {
    IconButton,
    Divider,
    InputBase,
    Grid,
    Card,
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
                    <Grid
                        container
                        direction="row"
                        alignContent="space-between"
                    >
                        <form
                            className='search-form'
                            onSubmit={(e) => this.props.onSearch(e, this.state.searchTerm)}
                        >
                            <InputBase
                                className="input"
                                type="search"
                                onChange={(e) => {
                                    this.setState({
                                        searchTerm: e.target.value,
                                    });
                                }}
                                placeholder={language.getText("search")}
                            />
                            <IconButton
                                type='submit'
                                onClick={(e) => this.props.onSearch(e, this.state.searchTerm)}
                                className='search-button'
                            >
                                <SearchIcon />
                            </IconButton>
                        </form>
                        <Divider orientation="vertical" flexItem={true} />
                        <IconButton
                            onClick={() => this.locationClick()}
                            className="location-button"
                            disabled={!this.state.locationEnabled}
                        >
                            <GpsFixedIcon />
                        </IconButton>
                    </Grid>
                </Card>
            </Fragment >
        );
    }
}
