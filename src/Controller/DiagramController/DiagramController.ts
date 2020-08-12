import { ObservationStation } from "../../Model/ObservationStation";
import { Feature } from "../../Model/Feature";

export default interface IDiagramController {
    observationStation: ObservationStation;
    feature: Feature;

    //returns type of chart
    getChartType: () => ChartType;

    //returns options that specify how the diagram is displayed
    getGraphicsOptions: () => {};

    //returns whether the diagram is configurable
    isConfigurable: () => boolean;

    //returns the name of the current configuration option
    getCurrentConfigurationOption: () => string;

    //return names of configuration options
    getConfigurationOptions: () => string[];

    //sets the curren configuration option of the diagram
    setConfigurationOption: (optionName: string) => void;

    //returns the data that can be displayed in the diagram
    getData: (
        configurationOptionName: string
    ) => Promise<Array<Array<Date | null | number | string>>>;
}

export enum ChartType {
    LINE_CHART = "LineChart",
    PIE_CHART = "PieChart",
}
