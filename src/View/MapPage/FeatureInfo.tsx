import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { Avatar, Button, Box } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/InfoRounded";
import { Feature } from "../../Model/Feature";
import Language from "../../Controller/Storage/Language";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        typography: {
            padding: theme.spacing(2),
        },
        icon: {
            background: theme.palette.primary.main,
            marginBottom: "10px",
        },
        box: {
            alignItems: "center",
            display: "flex",
            padding: "1px",
        },
    })
);

let language = Language.getInstance();
const LINK_BUTTON = "RelatedLink";

interface IProps {
    feature: Feature | null | undefined;
}

export default function FeatureInfo(props: IProps) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<HTMLImageElement | null>(
        null
    );

    const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <div>
            <Avatar
                className={classes.icon}
                aria-describedby={id}
                onClick={handleClick}
                style={{ visibility: props.feature ? "visible" : "hidden" }}
            >
                <InfoIcon />
            </Avatar>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Box className={classes.box}>
                    <Typography className={classes.typography}>
                        {props.feature?.getDescription() ??
                            language.getText("error")}
                    </Typography>
                    <Button
                        color="secondary"
                        variant="outlined"
                        href={
                            props.feature?.getRelatedWeblink() ??
                            language.getText("error")
                        }
                    >
                        {language.getText(LINK_BUTTON)}
                    </Button>
                </Box>
            </Popover>
        </div>
    );
}
