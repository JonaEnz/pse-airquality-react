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
import { Language } from "../Controller/Storage/Language";
import { withStyles } from "@material-ui/styles";
//@ts-ignore
import Geonames from "geonames.js";
import { Position } from "../Model/Position";

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

const geonames = new Geonames({
  username: "reactairqualityrea",
  lan: "en",
  encoding: "JSON",
});

interface Props {
  classes: any;
  onSearch(position: Position): void;
}

interface State {
  searchTerm: string;
}

class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { searchTerm: "" };
  }
  search() {
    var search = this.state.searchTerm;
    // promise
    geonames
      .search({ q: search }) //get continents
      .then((resp: any) => {
        var firstResult = resp.geonames[0];
        var position = new Position(firstResult.lat, firstResult.lng);
        this.props.onSearch(position);
      })
      .catch((err: any) => console.error(err));
  }

  locationClick() {}

  render() {
    return (
      <Paper className={this.props.classes.root}>
        <TextField
          type="search"
          variant="outlined"
          className={this.props.classes.input}
          label={Language.getText("Suche")}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              this.search();
            }
          }}
          onChange={(e) => {
            this.setState({ searchTerm: e.target.value });
          }}
          value={this.state.searchTerm}
        />
        <IconButton
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
