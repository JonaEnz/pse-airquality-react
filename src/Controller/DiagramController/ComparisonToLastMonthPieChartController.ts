import IDiagramController, { ChartType } from "./DiagramController";
import { ObservationStation } from "../../Model/ObservationStation";
import { Feature } from "../../Model/Feature";
import Timespan from "../../Model/Timespan";
import Language from "../Storage/Language";
import DataProvider from "../Frost/DataProvider";
import { Observation } from "../../Model/Observation";
import RequestReducer from "./RequestReducer";

let languageProvider = Language.getInstance();

class CTLMPCConfigurationOption {
    name: string;
    timespan: Timespan;
    frequency: number;
    additionalGraphicOptions: {};

    constructor(
        name: string,
        timespan: Timespan,
        frequency: number,
        additionalGraphicOptions: {}
    ) {
        this.name = name;
        this.timespan = timespan;
        this.frequency = frequency;
        this.additionalGraphicOptions = additionalGraphicOptions;
    }
}

export class ComparisonToLastMonthPieChartController
    implements IDiagramController {
    //support line charts
    private static readonly chartType = ChartType.PIE_CHART;
    //enable configuration
    private static readonly isConfigurable = false;
    // options for the graphical appearence
    private static readonly graphicsOptions = {};
    //configuration options
    private static readonly configurationOptions = [
        new CTLMPCConfigurationOption(
            "default_configuration",
            new Timespan(31 * 24 * 60 * 60 * 1000),
            24,
            {}
        ),
    ];

    observationStation: ObservationStation;
    feature: Feature;
    currentConfigurationOption: CTLMPCConfigurationOption;

    constructor(observationStation: ObservationStation, feature: Feature) {
        this.observationStation = observationStation;
        this.feature = feature;
        this.currentConfigurationOption =
            ComparisonToLastMonthPieChartController.configurationOptions[0];
    }

    setConfigurationOption(optionName: string) {
        this.currentConfigurationOption = this.getCTLMPCConfigurationOption(
            optionName
        );
    }

    getChartType(): ChartType {
        return ComparisonToLastMonthPieChartController.chartType;
    }

    getGraphicsOptions() {
        return {
            ...ComparisonToLastMonthPieChartController.graphicsOptions,
            ...this.currentConfigurationOption.additionalGraphicOptions,
        };
    }

    isConfigurable() {
        return ComparisonToLastMonthPieChartController.isConfigurable;
    }

    getConfigurationOptions() {
        return ComparisonToLastMonthPieChartController.configurationOptions.map(
            (option) => option.name
        );
    }

    //returns the name of the current configuration option
    getCurrentConfigurationOption() {
        return this.currentConfigurationOption.name;
    }

    async getData(
        configurationOptionName: string
    ): Promise<Array<Array<Date | number | string | null>>> {
        //configuration option by name
        var configuration = this.getCTLMPCConfigurationOption(
            configurationOptionName
        );

        ///get timespan
        var start: Date = configuration.timespan.getStart(new Date(Date.now()));
        var observations: Observation[] = [];

        while (start.valueOf() < Date.now()) {
            let end = new Date(
                start.getFullYear(),
                start.getMonth(),
                start.getDate() + 7,
                start.getHours()
            );

            //get observations
            let newObs = await RequestReducer.GetDataForDay(
                end,
                this.observationStation,
                this.feature
            );

            observations = observations.concat(newObs);

            start = end;
        }

        var lastObservationValue = observations.pop()?.getValue() as number;

        var higher = 0;
        var lower = 0;

        let higherTag = languageProvider.getText("higher");
        let lowerTag = languageProvider.getText("lower");

        observations.forEach((observation) => {
            observation.getValue() > lastObservationValue ? higher++ : lower++;
        });

        var data = [
            ["tag", "#days"],
            [higherTag, higher],
            [lowerTag, lower],
        ];
        return data;
    }

    //get configuration option by name
    private getCTLMPCConfigurationOption(
        name: string
    ): CTLMPCConfigurationOption {
        var options =
            ComparisonToLastMonthPieChartController.configurationOptions;

        for (let i = 0; i < options.length; i++) {
            //if option matches return it
            if (options[i].name === name) {
                return options[i];
            }
        }

        //no option matches, throw an error
        throw new Error(
            `${name} is an invalid configuration option for a diagram of type ComparisonToLastYearPieChart`
        );
    }
}
