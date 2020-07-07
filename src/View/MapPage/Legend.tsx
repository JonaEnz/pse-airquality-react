import React from "react";
import { Scale } from "../../Model/Scale";
import { Box } from "@material-ui/core";

interface Props {
  scale: Scale;
  min: number;
  max: number;
}

function getStyleFromScale(scale: Scale, min: number, max: number) {
  var grad = "linear-gradient(0deg,";
  for (let index = 0; index < 10; index++) {
    grad =
      grad +
      scale.getColor(min + (max - min) * (index / 10)).getHex() +
      " " +
      index * 10 +
      "%, ";
  }
  grad = grad.slice(0, -2) + ")";
  return {
    background: grad,
    height: "80px",
    width: "40px",
  };
}

function Legend(props: Props) {
  return <Box style={getStyleFromScale(props.scale, props.min, props.max)} />;
}

export default Legend;
