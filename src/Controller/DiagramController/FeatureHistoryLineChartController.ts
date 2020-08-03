import Language from "../Storage/Language";
import IDiagramController, { ChartType } from "./DiagramController";
import { ObservationStation } from "../../Model/ObservationStation";
import { Feature } from "../../Model/Feature";
import Timespan from "../../Model/Timespan";
import MockDataProvider from "../MockDataProvider";
import DataProvider from "../Frost/DataProvider";

let languageProvider = Language.getInstance();

class FHLCConfigurationOption {
    name: string;
    timespan: Timespan;
    frequency: number;
    //type and label for the xAxis
    xAxis: { type: string; label: string };

    constructor(
        nameId: string,
        timespan: Timespan,
        frequency: number,
        xAxis: { type: string; label: string }
    ) {
        this.name = languageProvider.getText(nameId);
        this.timespan = timespan;
        this.frequency = frequency;
        this.xAxis = xAxis;
    }
}

export class FeatureHistoryLineChartController implements IDiagramController {
    //support line charts
    private static readonly chartType = ChartType.LINE_CHART;

    //enable configuration
    private static readonly isConfigutable = true;

    //configuration options
    private static readonly configurationOptions = [
        //last 24 hours
        new FHLCConfigurationOption(
            "last_24_hours",
            new Timespan(24 * 60 * 60 * 1000),
            24,
            { type: "date", label: "Day" }
        ),
        //last 7 days
        new FHLCConfigurationOption(
            "last_7_days",
            new Timespan(7 * 24 * 60 * 60 * 1000),
            12,
            { type: "date", label: "Day" }
        ),
        //last 31 days
        new FHLCConfigurationOption(
            "last_31_days",
            new Timespan(31 * 24 * 60 * 60 * 1000),
            6,
            { type: "date", label: "Day" }
        ),
        //last year
        new FHLCConfigurationOption(
            "last_year",
            new Timespan(365 * 24 * 60 * 60 * 1000),
            1,
            { type: "date", label: "Day" }
        ),
    ];

    //default configuration option
    private static readonly defaultConfigurationOption =
        FeatureHistoryLineChartController.configurationOptions[0];

    // options for the graphical appearence
    private static readonly graphicsOptions = {
        legend: { position: "none" },
    };

    //concerning observation station
    observationStation: ObservationStation;
    //concerning feature
    feature: Feature;
    yAxisLabel: string;

    constructor(observationStation: ObservationStation, feature: Feature) {
        this.observationStation = observationStation;
        this.feature = feature;
        this.yAxisLabel =
            this.feature.getName() +
            "[" +
            this.feature.getUnitOfMeasurement() +
            "]";
    }
    //return chart type
    getChartType(): ChartType {
        return FeatureHistoryLineChartController.chartType;
    }

    getGraphicsOptions() {
        return FeatureHistoryLineChartController.graphicsOptions;
    }

    //return names of graphics options
    getViewOptions() {
        return FeatureHistoryLineChartController.graphicsOptions;
    }

    //return that the corresponding diagram to this controller is configurable
    isConfigurable() {
        return FeatureHistoryLineChartController.isConfigutable;
    }

    //returns default configuration option
    getDefaultConfigurationOption(): string {
        return FeatureHistoryLineChartController.defaultConfigurationOption
            .name;
    }

    //return names of configuration options
    getConfigurationOptions(): string[] {
        //translate options to current language
        var optionNames = FeatureHistoryLineChartController.configurationOptions.map(
            (option) => option.name
        );
        return optionNames;
    }

    //return data to display
    async getData(
        configurationOptionName: string
    ): Promise<Array<Array<Date | number | string | null>>> {
        //get option object
        var configurationOption: FHLCConfigurationOption = this.getFHLCConfigurationOption(
            configurationOptionName
        );

        //get timespan
        var end: Date = new Date(Date.now());
        var start: Date = configurationOption.timespan.getStart(end);

        //get observations
        var observations = await DataProvider.getObservations(
            this.observationStation,
            this.feature,
            start,
            end
        );

        console.log(observations);

        //add react google chart specific header
        var data: any[] = [[configurationOption.xAxis, this.yAxisLabel]];

        //extract values and timestamps from observations
        observations.forEach((observation) => {
            let timestamp = observation.getTimeStamp();
            let value = observation.getValue();
            data.push([timestamp, value]);
        });

        return data;
    }

    //get configuration option by name
    private getFHLCConfigurationOption(name: string): FHLCConfigurationOption {
        var options = FeatureHistoryLineChartController.configurationOptions;

        for (let i = 0; i < options.length; i++) {
            //if option matches return it
            if (options[i].name === name) {
                return options[i];
            }
        }

        //no option matches, throw an error
        throw new Error(
            `${name} is an invalid configuration option for a diagram of type FeatureHistoryLineChart`
        );
    }
}
