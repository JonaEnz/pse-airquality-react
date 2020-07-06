import React from "react";
import { Button, Avatar, useTheme, Card, CardContent } from "@material-ui/core";
import LayersIcon from "@material-ui/icons/Layers";
import { withStyles } from "@material-ui/core/styles";
interface Props {}

interface State {
  open: boolean;
}

class FeatureSelect extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { open: false };
  }
  avatarClick() {
    this.setState({ open: !this.state.open });
  }
  render() {
    return (
      <div>
        <Avatar
          //@ts-ignore
          className={this.props.classes.root}
          onClick={() => this.avatarClick()}
        >
          <LayersIcon />
        </Avatar>
        {this.state.open ? (
          <Card variant="outlined">
            <CardContent>Test</CardContent>
          </Card>
        ) : (
          ""
        )}
      </div>
    );
  }
}

//@ts-ignore
const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
});

export default withStyles(styles)(FeatureSelect);
