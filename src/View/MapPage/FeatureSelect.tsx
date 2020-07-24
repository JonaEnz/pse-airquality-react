import React, { useState, useEffect } from "react";
import {
    Avatar,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";
import LayersIcon from "@material-ui/icons/Layers";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import MapConfiguration from "../../Controller/MapConfiguration";
import { Feature } from "../../Model/Feature";
import TestConfiguration from "../../Controller/TestConfiguration";
import NearConfiguration from "../../Controller/NearConfiguration";
import StationConfiguration from "../../Controller/StationConfiguration";
import PolygonConfiguration from "../../Controller/MapPage/PolygonConfiguration";
import FeatureProvider from "../../Controller/FeatureProvider";
interface Props {
    onConfigurationChange(mapConfig: MapConfiguration): void;
    startConf?: { conf: string; feature: string };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            background: theme.palette.primary.main,
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    })
);

export default function FeatureSelect(props: Props) {
    const TEST_CONFIG = "TestConfiguration";
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
    }, []);
    const changeConfig = (conf: string, feature: Feature) => {
        console.log(conf);
        setConfig(conf);
        switch (conf) {
            case TEST_CONFIG:
                var testConf = new TestConfiguration(feature); //Create new config
                props.onConfigurationChange(testConf);
                break;
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
                break;
        }
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
            } else {
                throw new Error("No config selected");
            }
        }
    };

    const handleConfigChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        if (!feature) {
            return; //A feature has to be selected, should never happen.
        }
        changeConfig(event.target.value as string, feature);
        //window.location.reload(); //Reload with new config
    };

    return (
        <div>
            <Avatar className={classes.root} onClick={handleClick}>
                <LayersIcon />
            </Avatar>
            {open ? (
                <Card variant="outlined">
                    <CardContent>
                        <FormControl className={classes.formControl}>
                            <InputLabel>{"Feature"}</InputLabel>
                            <Select
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
                                onChange={handleConfigChange}
                                value={config ?? ""}
                            >
                                <MenuItem value={POLY_CONFIG}>
                                    {POLY_CONFIG}
                                </MenuItem>
                                <MenuItem value={STATION_CONFIG}>
                                    {STATION_CONFIG}
                                </MenuItem>
                                <MenuItem value={NEAR_CONFIG}>
                                    {NEAR_CONFIG}
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </CardContent>
                </Card>
            ) : (
                ""
            )}
        </div>
    );
}
