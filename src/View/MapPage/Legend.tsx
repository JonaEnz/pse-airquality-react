import React from "react";
import { Scale } from "../../Model/Scale";
import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            padding: theme.spacing(1),
            width: "50px",
            backgroundColor: "white",
        },
    })
);

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
    const classes = useStyles();
    return (
        <Box className={classes.box} border={1}>
            <Grid container direction="column">
                <Typography variant="body2">
                    {Math.floor(props.max * 10) / 10}
                </Typography>
                <Box
                    style={getStyleFromScale(props.scale, props.min, props.max)}
                />
                <Typography variant="body2">
                    {Math.floor(props.min * 10) / 10}
                </Typography>
            </Grid>
        </Box>
    );
}

export default Legend;
