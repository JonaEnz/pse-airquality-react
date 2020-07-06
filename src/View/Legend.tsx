import React from "react";
import { Scale } from "../Model/Scale";
import { Button, Box, withStyles, Theme } from "@material-ui/core";
import { Color } from "../Model/Color";

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
  console.log(grad);
  return {
    background: grad,
    height: "200px",
  };
}

function Legend(props: Props) {
  return (
    <Button style={getStyleFromScale(props.scale, props.min, props.max)} />
  );
}

export default Legend;
