import React from "react";
import { Observation } from "../../Model/Observation";
import { Button, Typography, Grid } from "@material-ui/core";
import Language from "../../Controller/Storage/Language";
import FeatureInfo from "./FeatureInfo";

let language: Language = Language.getInstance();

interface State {}
interface Props {
    lastObservation: Observation;
}

const DETAIL_PATH = "detail/";

export class StationInfo extends React.Component<Props, State> {
    openDetails() {
        //TODO: Remove hardcoded value
        window.location.href =
            DETAIL_PATH +
            this.props.lastObservation.getObservationStation().getId();
    }

    render() {
        var station = this.props.lastObservation.getObservationStation();
        return (
            <Grid alignContent="center" direction="column" spacing={5}>
                <Typography variant="h4" color="secondary">
                    {station.getName()}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {station.getPosition().getString()}
                </Typography>
                <Typography variant="h6">
                    <Grid container direction="row" spacing={2}>
                        <Grid item xs>
                            <FeatureInfo
                                feature={this.props.lastObservation.getFeature()}
                            />
                        </Grid>
                        <Grid item xs>
                            {this.props.lastObservation.getFeature().getName() +
                                ":"}
                        </Grid>
                        <Grid item xs>
                            <Typography
                                variant="h6"
                                display="inline"
                                color="primary"
                            >
                                {this.props.lastObservation.getValue()}{" "}
                                {this.props.lastObservation
                                    .getFeature()
                                    .getUnitOfMeasurement()}
                            </Typography>
                        </Grid>
                    </Grid>
                </Typography>
                <Button
                    onClick={() => this.openDetails()}
                    variant="contained"
                    color="primary"
                    style={{ minWidth: "250px" }}
                >
                    {language.getText("stationInfoButton")}
                </Button>
            </Grid>
        );
    }
}
