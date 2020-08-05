import { ObservationStation } from "../../Model/ObservationStation";
import { Feature } from "../../Model/Feature";

export default interface IDiagramController {
    observationStation: ObservationStation;
    feature: Feature;

    //returns type of chart
    getChartType: () => ChartType;

    //returns options that specify how the diagram is displayed
    getGraphicsOptions: () => {};

    //returns whether a diagram can be configured via a select form. In this case getSelectOprions must return an Array of select options
    isConfigurable: () => boolean;

    //returns all options that can be selected to configure the diagram
    getConfigurationOptions: () => string[];

    //returns default configuration option
    getDefaultConfigurationOption: () => string;

    //returns the data that can be displayed in the diagram
    getData: (
        configurationOptionName: string
    ) => Promise<Array<Array<Date | null | number | string>>>;
}

export enum ChartType {
    LINE_CHART = "LineChart",
    PIE_CHART = "PieChart",
    SCATTER_CHART = "ScatterChart",
}
