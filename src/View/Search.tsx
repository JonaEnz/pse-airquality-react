import React from "react";
import {
  TextField,
  Grid,
  Paper,
  InputBase,
  IconButton,
  Divider,
  Theme,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import LocationIcon from "@material-ui/icons/LocationOn";
import { Language } from "../Controller/Storage/Language";
import { withStyles, makeStyles, createStyles } from "@material-ui/styles";

const styles = (theme: Theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
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

interface Props {
  classes: any;
}

interface State {}

class Search extends React.Component<Props, State> {
  search() {}

  locationClick() {}

  render() {
    return (
      <Paper component="form" className={this.props.classes.root}>
        <TextField
          type="search"
          variant="outlined"
          className={this.props.classes.input}
          label={Language.getText("Suche")}
        />
        <IconButton
          type="submit"
          onClick={() => this.search()}
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
        >
          <LocationIcon />
        </IconButton>
      </Paper>
    );
  }
}

export default withStyles(styles)(Search);
