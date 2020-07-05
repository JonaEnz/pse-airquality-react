import React from "react";
import { ObservationStation } from "../Model/ObservationStation";

interface State {}
interface Props {
  station: ObservationStation;
}

export class StationInfo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return <p>{this.props.station.getName()}</p>;
  }
}
