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

interface State {
  searchTerm: string;
}

class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { searchTerm: "" };
  }
  search() {
    console.log(this.state.searchTerm);
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
