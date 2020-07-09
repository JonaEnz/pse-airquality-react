import React, { useState } from "react";
import {
    Button,
    Avatar,
    useTheme,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";
import LayersIcon from "@material-ui/icons/Layers";
import {
    withStyles,
    createStyles,
    Theme,
    makeStyles,
} from "@material-ui/core/styles";
import MapConfiguration from "../../Controller/MapConfiguration";
import { Feature } from "../../Model/Feature";
import { Scale } from "../../Model/Scale";
import TestConfiguration from "../../Controller/TestConfiguration";
interface Props {
    onConfigurationChange(mapConfig: MapConfiguration): void;
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
    const DEFAULT_CONFIG = TEST_CONFIG;
    const classes = useStyles();
    const [open, setOpen] = useState<HTMLImageElement | null>(null);
    const [feature, setFeature] = useState<Feature | null>(
        new Feature(
            "",
            "",
            "",
            new Scale(false, { 0: "#FFFFFF", 20: "#000000" }),
            "",
            10,
            "",
            []
        )
    );
    const [config, setConfig] = useState<string | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
        setOpen(open ? null : event.currentTarget);
    };

    const getSelectedFeature = (): Feature | null => {
        return feature;
    };

    const changeConfig = (conf: string, feature: Feature) => {
        console.log(conf);
        setConfig(conf);
        switch (conf) {
            case TEST_CONFIG:
                var testConf = new TestConfiguration(feature); //Create new config
                props.onConfigurationChange(testConf);
                break;

            default:
                break;
        }
    };

    const handleFeatureChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        //TODO: FeatureProvider
        setFeature(
            new Feature("", "", "", new Scale(false, {}), "", 10, "", [])
        );
        if (feature) {
            changeConfig(config ?? DEFAULT_CONFIG, feature);
        }
    };

    const handleConfigChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        if (!feature) {
            return; //A feature has to be selected, should never happen.
        }
        changeConfig(event.target.value as string, feature);
        window.location.reload(); //Reload with new config
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
                                value={feature?.getName() ?? ""}
                            >
                                <MenuItem>Features here when</MenuItem>
                                <MenuItem>FeatureProvider exists</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel>{"Style"}</InputLabel>
                            <Select
                                onChange={handleConfigChange}
                                value={config ?? DEFAULT_CONFIG}
                            >
                                <MenuItem value={TEST_CONFIG}>
                                    {TEST_CONFIG}
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
