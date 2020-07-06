import React from "react";
import { Button, Avatar, useTheme } from "@material-ui/core";
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
    if (!this.state.open) {
      return (
        <Avatar
          //@ts-ignore
          className={this.props.classes.root}
          onClick={() => this.avatarClick()}
        >
          <LayersIcon />
        </Avatar>
      );
    } else {
      return <Button />;
    }
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
