import IDiagramController, { ChartType } from './DiagramController';
import { ObservationStation } from '../../Model/ObservationStation';
import { Feature } from '../../Model/Feature';
import Timespan from '../../Model/Timespan';
import MockDataProvider from '../MockDataProvider';


class CTLYPCConfigurationOption {
    name: string;
    timespan: Timespan;
    frequency: number;

    constructor(name: string, timespan: Timespan, frequency: number) {
        this.name = name;
        this.timespan = timespan;
        this.frequency = frequency;
    }
}

export class ComparisonToLastYearPieChartController implements IDiagramController {
    //support line charts
    private static readonly chartType = ChartType.PIE_CHART;

    //enable configuration
    private static readonly isConfigurable = false;

    // options for the graphical appearence
    private static readonly graphicsOptions = {};

    //configuration options
    private static readonly configurationOptions = [
        new CTLYPCConfigurationOption('default_configuration', new Timespan(365 * 24 * 60 * 60 * 1000), 24),
    ];

    //default configuration option
    private static readonly defaultConfigurationOption = ComparisonToLastYearPieChartController.configurationOptions[0];

    observationStation: ObservationStation;
    feature: Feature;

    constructor(observationStation: ObservationStation, feature: Feature) {
        this.observationStation = observationStation;
        this.feature = feature;
    }

    getChartType(): ChartType {
        return ComparisonToLastYearPieChartController.chartType;
    }

    getGraphicsOptions() {
        return ComparisonToLastYearPieChartController.graphicsOptions;
    }

    isConfigurable() {
        return ComparisonToLastYearPieChartController.isConfigurable;
    }

    getConfigurationOptions() {
        return ComparisonToLastYearPieChartController.configurationOptions.map(option => option.name);
    };

    getDefaultConfigurationOption() {
        return ComparisonToLastYearPieChartController.defaultConfigurationOption.name;
    }

    getData(configurationOptionName: string): any[][] {
        //configuration option by name
        var configuration = this.getCTLYPCConfigurationOption(configurationOptionName);

        //get timespan
        var end: Date = new Date(Date.now());
        var start: Date = configuration.timespan.getStart(end);

        //get mock observations
        var observations = MockDataProvider.getObservations(
            this.observationStation,
            start,
            end,
            this.feature,
            configuration.frequency,
        );

        var lastObservationValue = observations.pop()?.getValue() as number;

        var higher = 0;
        var lower = 0;

        observations.forEach(observation => {
            (observation.getValue() > lastObservationValue) ? (higher++) : (lower++);
        });

        var data = [
            ['Vergleich zum letzten Messwert', 'Anzahl Tage'],
            ['higher', higher],
            ['lower', lower],
        ];
        return data;
    }

    //get configuration option by name
    private getCTLYPCConfigurationOption(name: string): CTLYPCConfigurationOption {
        var options = ComparisonToLastYearPieChartController.configurationOptions;

        for (let i = 0; i < options.length; i++) {

            //if option matches return it
            if (options[i].name === name) {
                return options[i];
            }

        }

        //no option matches, throw an error
        throw new Error(`${name} is an invalid configuration option for a diagram of type ComparisonToLastYearPieChart`);
    }
}

