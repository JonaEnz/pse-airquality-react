import React from "react";
import { Observation } from "../../Model/Observation";
import { Button, Typography, Grid, Box, Divider } from "@material-ui/core";
import Language from "../../Controller/Storage/Language";

import "./StationInfo.css";

let language: Language = Language.getInstance();

interface State {}
interface Props {
    lastObservation: Observation;
}

const DETAIL_PATH = "/pse-airquality-react/detail/";

export class StationInfo extends React.Component<Props, State> {
    openDetails() {
        window.location.href =
            DETAIL_PATH +
            this.props.lastObservation.getObservationStation().getId();
    }

    render() {
        var station = this.props.lastObservation.getObservationStation();
        return (
            <Box className="popup">
                <Grid container direction="column">
                    <Typography
                        className="title"
                        variant="h5"
                        color="textPrimary"
                    >
                        {station.getName()}
                    </Typography>
                    <Typography className="position" color="textSecondary">
                        {station.getPosition().getString()}
                    </Typography>
                    <Divider orientation="horizontal"></Divider>
                    <Grid container direction="row" justify="space-between">
                        <Typography
                            className="feature"
                            variant="subtitle1"
                            color="textSecondary"
                        >
                            {this.props.lastObservation.getFeature().getName() +
                                ":"}
                        </Typography>
                        <Typography color="primary">
                            <a
                                href={this.props.lastObservation
                                    .getFeature()
                                    .getRelatedWeblink()}
                                data-testid="featureWebLink"
                            >
                                ?
                            </a>
                        </Typography>
                    </Grid>
                    <Typography
                        className="value"
                        variant="h4"
                        display="inline"
                        color="primary"
                        data-testid="value"
                    >
                        {Math.floor(
                            this.props.lastObservation.getValue() * 100
                        ) / 100}{" "}
                        {this.props.lastObservation
                            .getFeature()
                            .getUnitOfMeasurement()}
                    </Typography>
                    <Button
                        className="info-button"
                        data-testid="info-button"
                        color="primary"
                        onClick={() => this.openDetails()}
                        variant="contained"
                    >
                        {language.getText("stationInfoButton")}
                    </Button>
                </Grid>
            </Box>
        );
    }
}
