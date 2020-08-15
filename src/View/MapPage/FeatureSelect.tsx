import React, { useState, useEffect, Fragment } from "react";
import {
    Avatar,
    Card,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Typography,
    Divider,
} from "@material-ui/core";
import LayersIcon from "@material-ui/icons/Layers";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import MapConfiguration from "../../Controller/MapPage/MapConfiguration";
import { Feature } from "../../Model/Feature";
import NearConfiguration from "../../Controller/MapPage/NearConfiguration";
import StationConfiguration from "../../Controller/MapPage/StationConfiguration";
import PolygonConfiguration from "../../Controller/MapPage/PolygonConfiguration";
import FeatureProvider from "../../Controller/FeatureProvider";
import Language from "../../Controller/Storage/Language";
interface Props {
    onConfigurationChange(mapConfig: MapConfiguration): void;
    startConf?: { conf: string; feature: string };
}

let language = Language.getInstance();

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            background: theme.palette.primary.main,
            position: "relative",
        },
        title: {
            textAlign: "center",
            width: "100%",
            marginBottom: "10px",
        },
        popup: {
            padding: "20px",
            paddingBottom: "50px",
            marginBottom: "-40px",
        },
        formControl: {
            width: "100%",
            marginTop: "10px",
            marginBottom: "10px",
        },
    })
);

export default function FeatureSelect(props: Props) {
    const NEAR_CONFIG = "NearConfiguration";
    const POLY_CONFIG = "PolygonConfiguration";
    const STATION_CONFIG = "StationConfiguration";
    const classes = useStyles();
    const [open, setOpen] = useState<HTMLImageElement | null>(null);
    const [feature, setFeature] = useState<Feature | undefined>(
        FeatureProvider.getInstance().listAllFeatures()[0]
    );
    const [config, setConfig] = useState<string | null>(STATION_CONFIG);

    const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
        setOpen(open ? null : event.currentTarget);
    };

    useEffect(() => {
        if (props.startConf) {
            //Get start values from props
            setFeature(
                FeatureProvider.getInstance().getFeature(
                    props.startConf.feature
                )
            );
            setConfig(props.startConf.conf);
        }
    }, [props.startConf]);

    const changeConfig = (conf: string, feature: Feature) => {
        switch (conf) {
            case NEAR_CONFIG:
                var nearConf = new NearConfiguration(feature); //Create new config
                props.onConfigurationChange(nearConf);
                break;
            case POLY_CONFIG:
                var polyConf = new PolygonConfiguration(feature); //Create new config
                props.onConfigurationChange(polyConf);
                break;
            case STATION_CONFIG:
                var stationConf = new StationConfiguration(feature); //Create new config
                props.onConfigurationChange(stationConf);
                break;
            default:
                return;
        }
        setConfig(conf);
    };

    const handleFeatureChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        var f = FeatureProvider.getInstance().getFeature(
            event.target.value as string
        ); //Feature Id
        setFeature(f);

        if (f) {
            if (config) {
                changeConfig(config, f);
            }
        }
    };

    const handleConfigChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        if (feature) {
            changeConfig(event.target.value as string, feature);
        }
        //window.location.reload(); //Reload with new config
    };

    return (
        <Fragment>
            <Grid container direction="column" alignItems="flex-end">
                {open ? (
                    <Card className={classes.popup} variant="outlined">
                        <Grid container direction="column">
                            <Typography
                                id="title"
                                className={classes.title}
                                variant="subtitle1"
                                color="textSecondary"
                            >
                                {language.getText("map_configuration_title")}
                            </Typography>
                            <Divider orientation="horizontal"></Divider>
                            <FormControl className={classes.formControl}>
                                <InputLabel>{"Feature"}</InputLabel>
                                <Select
                                    id="featureSelectForm"
                                    onChange={handleFeatureChange}
                                    value={feature?.getId() ?? ""}
                                >
                                    {FeatureProvider.getInstance()
                                        .listAllFeatures()
                                        .map((f) => (
                                            <MenuItem value={f.getId()}>
                                                {f.getName()}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel>{"Style"}</InputLabel>
                                <Select
                                    id="confSelectForm"
                                    onChange={handleConfigChange}
                                    value={config ?? ""}
                                >
                                    <MenuItem value={POLY_CONFIG}>
                                        {language.getText(POLY_CONFIG)}
                                    </MenuItem>
                                    <MenuItem value={STATION_CONFIG}>
                                        {language.getText(STATION_CONFIG)}
                                    </MenuItem>
                                    <MenuItem value={NEAR_CONFIG}>
                                        {language.getText(NEAR_CONFIG)}
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Card>
                ) : (
                    ""
                )}
                <Avatar
                    className={classes.root}
                    id="avatarButton"
                    onClick={handleClick}
                >
                    <LayersIcon />
                </Avatar>
            </Grid>
        </Fragment>
    );
}
