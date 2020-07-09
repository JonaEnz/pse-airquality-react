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
    const classes = useStyles();
    const [open, setOpen] = useState<HTMLImageElement | null>(null);
    const [feature, setFeature] = useState<Feature | null>(null);
    const [config, setConfig] = useState<string | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
        setOpen(open ? null : event.currentTarget);
    };

    const getSelectedFeature = (): Feature | null => {
        return feature;
    };

    const handleFeatureChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        //TODO: FeatureProvider
        setFeature(
            new Feature("", "", "", new Scale(false, {}), "", 10, "", [])
        );
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
                            <Select>
                                <MenuItem>Features here when</MenuItem>
                                <MenuItem>FeatureProvider exists</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel>{"Style"}</InputLabel>
                            <Select>
                                <MenuItem>TestConfiguration</MenuItem>
                                <MenuItem>OtherConfiguration</MenuItem>
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
