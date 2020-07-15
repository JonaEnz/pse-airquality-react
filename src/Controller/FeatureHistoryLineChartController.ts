import IDiagramController, { ChartType, IConfigurationOption } from './DiagramController';
import { ObservationStation } from '../Model/ObservationStation';
import { Feature } from '../Model/Feature';
import Timespan from '../Model/Timespan';
import MockDataProvider from './MockDataProvider';

class FHLCConfigurationOption implements IConfigurationOption {
    name: string;
    timespan: Timespan;
    frequency: number;
    //type and label for the xAxis
    xAxis: { type: string, label: string };

    constructor(name: string, timespan: Timespan, frequency: number, xAxis: { type: string, label: string }) {
        //unique name of configuration option
        this.name = name;
        this.timespan = timespan;
        //how many values per day are
        this.frequency = frequency;
        this.xAxis = xAxis;
    }

    //returns name of the option as a string
    getName(): string {
        return this.name;
    }
}

export default class FeatureHistoryLineChartController implements IDiagramController {
    //this controller controls a line chart
    private static readonly chartType = ChartType.LINE_CHART;
    //configuration is enabled
    private static readonly isConfigutable = true;
    //configuration options
    private static readonly configurationOptions = [
        //option that displays history of the last 24 hours
        new FHLCConfigurationOption('last_24_hours', new Timespan(24 * 60 * 60 * 1000), 24, { type: 'date', label: 'Day' }),
        //option that displays history of the last 7 days
        new FHLCConfigurationOption('last_7_days', new Timespan(7 * 24 * 60 * 60 * 1000), 7 * 24, { type: 'date', label: 'Day' }),
        //option that displays history of the last 31 days
        new FHLCConfigurationOption('last_31_days', new Timespan(31 * 7 * 24 * 60 * 60 * 1000), 31 * 7 * 24, { type: 'date', label: 'Day' }),
    ];
    //default configuration option
    private static readonly defaultConfigurationOption = FeatureHistoryLineChartController.configurationOptions[0];
    //display options
    private static readonly graphicsOptions = {};


    observationStation: ObservationStation;
    feature: Feature;
    yAxisLabel: string;

    constructor(observationStation: ObservationStation, feature: Feature) {
        this.observationStation = observationStation;
        this.feature = feature;
        this.yAxisLabel = this.feature.getName() + '[' + this.feature.getUnitOfMeasurement() + ']';
    }
    //return chart type
    getChartType(): ChartType {
        return FeatureHistoryLineChartController.chartType;
    };

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
        return FeatureHistoryLineChartController.defaultConfigurationOption.getName();
    }

    //return names of configuration options
    getConfigurationOptions(): string[] {
        var optionNames = FeatureHistoryLineChartController.configurationOptions.map(option => option.getName());
        return optionNames;
    }

    //return data to display
    getData(configurationOptionName: string): any[][] {
        var configurationOption: FHLCConfigurationOption = this.getFHLCConfigurationOption(configurationOptionName);
        var end: Date = new Date(Date.now());
        var start: Date = configurationOption.timespan.getStart(end);

        var observations = MockDataProvider.getObservations(
            this.observationStation,
            start,
            end,
            this.feature,
            configurationOption.frequency,
        );

        //add react google chart specific header
        var data: any[] = [
            [
                configurationOption.xAxis,
                this.yAxisLabel,
            ],
        ];

        //extract values from opbservations and add index as time value
        observations.forEach(observation => {
            let timestamp = observation.getTimeStamp();
            let value = observation.getValue();
            data.push([timestamp, value]);
        });

        return data;
    }

    private getFHLCConfigurationOption(name: string): FHLCConfigurationOption {
        for (let i = 0; i < FeatureHistoryLineChartController.length; i++) {
            if (name === FeatureHistoryLineChartController.configurationOptions[i].getName()) {
                return FeatureHistoryLineChartController.configurationOptions[i];
            }
        }
        throw new Error(`${name} is an invalid configuration option for a diagram of type FeatureHistoryLineChart`);
    }
}