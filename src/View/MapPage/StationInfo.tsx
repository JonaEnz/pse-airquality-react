import React from "react";
import { ObservationStation } from "../../Model/ObservationStation";
import { Observation } from "../../Model/Observation";
import {
  Button,
  Container,
  Typography,
  TextField,
  Grid,
  Box,
} from "@material-ui/core";
import { Language } from "../../Controller/Storage/Language";
import { makeStyles } from "@material-ui/styles";

interface State {}
interface Props {
  lastObservation: Observation;
}

export class StationInfo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  openDetails() {
    //TODO: Remove hardcoded value
    window.location.href =
      "/details?id=" +
      this.props.lastObservation.getObservationStation().getId();
  }

  render() {
    var station = this.props.lastObservation.getObservationStation();
    return (
      <Container>
        <Typography variant="h4" color="secondary">
          {station.getName()}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {station.getPosition().getString()}
        </Typography>
        <Typography variant="h6">
          <Grid container direction="row" spacing={2}>
            <Grid item xs>
              {this.props.lastObservation.getFeature().getName() + ":"}
            </Grid>
            <Grid item xs>
              <Typography variant="h6" display="inline" color="primary">
                {this.props.lastObservation.getValue()}{" "}
                {this.props.lastObservation.getFeature().getUnitOfMeasurement()}
              </Typography>
            </Grid>
          </Grid>
        </Typography>
        <Button
          onClick={() => this.openDetails()}
          variant="contained"
          color="primary"
        >
          {Language.getText("Weitere Informationen")}
        </Button>
      </Container>
    );
  }
}
