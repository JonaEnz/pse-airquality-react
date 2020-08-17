import Language from "../Storage/Language";
import IDiagramController, { ChartType } from "./DiagramController";
import { ObservationStation } from "../../Model/ObservationStation";
import { Feature } from "../../Model/Feature";
import Timespan from "../../Model/Timespan";
import DataProvider from "../Frost/DataProvider";
import { Observation } from "../../Model/Observation";
import { MicOutlined } from "@material-ui/icons";
import { start } from "repl";

let languageProvider = Language.getInstance();

class FHLCConfigurationOption {
    name: string;
    timespan: Timespan;
    frequency: number;
    additionalGraphicsOptions: {};

    constructor(
        nameId: string,
        timespan: Timespan,
        frequency: number,
        additionalGraphicsOptions: {}
    ) {
        this.name = languageProvider.getText(nameId);
        this.timespan = timespan;
        this.frequency = frequency;
        this.additionalGraphicsOptions = additionalGraphicsOptions;
    }
}

export class FeatureHistoryLineChartController implements IDiagramController {
    //support line charts
    private static readonly chartType = ChartType.LINE_CHART;
    //enable configuration
    private static readonly isConfigutable = true;
    //available configuration options
    private static readonly configurationOptions = [
        //last 24 hours
        new FHLCConfigurationOption(
            "last_24_hours",
            new Timespan(24 * 60 * 60 * 1000),
            24,
            {
                hAxis: {
                    format: "HH:mm",
                    gridlines: {
                        count: 6,
                    },
                },
            }
        ),
        //last 7 days
        new FHLCConfigurationOption(
            "last_7_days",
            new Timespan(7 * 24 * 60 * 60 * 1000),
            12,
            {
                hAxis: {
                    format: "dd.MM",
                    gridlines: {
                        count: 7,
                    },
                },
            }
        ),
        //last 31 days
        new FHLCConfigurationOption(
            "last_31_days",
            new Timespan(31 * 24 * 60 * 60 * 1000),
            6,
            {
                hAxis: {
                    format: "dd.MM",
                    gridlines: {
                        count: 6,
                    },
                },
            }
        ),
        //last year
        new FHLCConfigurationOption(
            "last_year",
            new Timespan(365 * 24 * 60 * 60 * 1000),
            1,
            {
                hAxis: {
                    format: "MMM",
                    gridlines: {
                        count: 6,
                    },
                },
            }
        ),
    ];
    // options for the graphical appearence (aplied for all configuration options)
    private static readonly graphicsOptions = {
        legend: { position: "none" },
    };

    observationStation: ObservationStation;
    feature: Feature;
    currentConfigurationOption: FHLCConfigurationOption;

    constructor(observationStation: ObservationStation, feature: Feature) {
        this.observationStation = observationStation;
        this.feature = feature;
        this.currentConfigurationOption =
            FeatureHistoryLineChartController.configurationOptions[0];
    }
    //returns chart type
    getChartType(): ChartType {
        return FeatureHistoryLineChartController.chartType;
    }

    //returns options that specify how the diagram is displayed
    getGraphicsOptions() {
        return {
            ...FeatureHistoryLineChartController.graphicsOptions,
            ...this.currentConfigurationOption.additionalGraphicsOptions,
        };
    }

    //returns whether the diagram is configurable
    isConfigurable() {
        return FeatureHistoryLineChartController.isConfigutable;
    }

    //sets the current configurationOption of the diagram
    setConfigurationOption(optionName: string) {
        this.currentConfigurationOption = this.getFHLCConfigurationOption(
            optionName
        );
    }

    //returns the name of the current configuration option
    getCurrentConfigurationOption() {
        return this.currentConfigurationOption.name;
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
        //get timespan
        var start: Date = this.currentConfigurationOption.timespan.getStart(
            new Date(Date.now())
        );
        var observations: Observation[] = [];

        /*
        while (start.valueOf() < Date.now()) {
            let end = new Date(
                start.getFullYear(),
                start.getMonth(),
                start.getDate(),
                start.getHours() + 6
            );

            
            //get observations
            let newObs = await DataProvider.getObservations(
                this.observationStation,
                this.feature,
                start,
                end
            );
            
            let newObs = await this.reduceGetData(start, end);

            observations = observations.concat(newObs);

            start = end;
        }
        */

        var end = new Date(Date.now());
        var length = end.getTime() - start.getTime();
        const MONTH_IN_MILLI = 1000 * 60 * 60 * 24 * 30;
        const YEAR_IN_MILLI = MONTH_IN_MILLI * 12;
        if (length >= YEAR_IN_MILLI) {
            observations = await this.getDataByYear(end);
        } else if (length >= MONTH_IN_MILLI) {
            observations = await this.getDataByMonth(end);
        } else {
            observations = await DataProvider.getObservations(
                this.observationStation,
                this.feature,
                start,
                end
            );
        }

        let data: Array<[Date, number]> = [];

        //extract values and timestamps from observations
        observations.forEach((observation, index) => {
            let timestamp = observation.getTimeStamp();
            let value = observation.getValue();
            data.push([timestamp, value]);
        });

        data.sort((row1, row2) => {
            if (row1[0].valueOf() < row2[0].valueOf()) {
                return -1;
            } else {
                return 1;
            }
        });

        //add react google chart specific header
        let table: any = data;
        table.splice(0, 0, ["Date", "Value"]);

        return table;
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

    private async GetDataForDay(day: Date): Promise<Observation[]> {
        const hourMilliSec = 1000 * 60 * 60;
        var promises: Promise<Observation[]>[] = [];

        day.setMinutes(0);

        var zero = new Date(day.getTime());
        var eight = new Date(day.getTime());
        var sixteen = new Date(day.getTime());

        zero.setHours(0, 0, 0);
        eight.setHours(8, 0, 0);
        sixteen.setHours(16, 0, 0);

        promises.push(
            DataProvider.getObservations(
                this.observationStation,
                this.feature,
                zero,
                new Date(zero.getTime() + hourMilliSec)
            )
        );
        promises.push(
            DataProvider.getObservations(
                this.observationStation,
                this.feature,
                eight,
                new Date(eight.getTime() + hourMilliSec)
            )
        );
        promises.push(
            DataProvider.getObservations(
                this.observationStation,
                this.feature,
                sixteen,
                new Date(sixteen.getTime() + hourMilliSec)
            )
        );
        var r = await Promise.all(promises);
        var results: Observation[] = [];
        r.map((hourBlock) => {
            if (hourBlock.length === 0) {
                return;
            }
            var avg =
                hourBlock.map((a) => a.getValue()).reduce((a, b) => a + b, 0) /
                hourBlock.length; //avg value
            results.push(
                new Observation(
                    this.observationStation,
                    this.feature,
                    avg,
                    hourBlock[0].getTimeStamp()
                )
            );
        });

        return results;
    }

    private async getDataByMonth(endDate: Date) {
        var startDate = new Date(endDate.getTime());
        startDate.setMonth(startDate.getMonth() - 1);

        var promises: Promise<Observation[]>[] = [];

        while (startDate < endDate) {
            promises.push(this.GetDataForDay(startDate));
            startDate.setDate(startDate.getDate() + 1);
        }
        var results = await Promise.all(promises);
        return results.reduce((prev, next) => {
            return prev.concat(next);
        }, []);
    }

    private async getDataByYear(endDate: Date) {
        var observations: Promise<Observation[]>[] = [];
        //Months
        for (var i = 0; i < 12; i++) {
            endDate.setDate(1);
            observations.push(this.GetDataForDay(endDate));
            endDate.setDate(8);
            observations.push(this.GetDataForDay(endDate));
            endDate.setDate(15);
            observations.push(this.GetDataForDay(endDate));
            endDate.setDate(22);
            observations.push(this.GetDataForDay(endDate));

            endDate.setMonth(endDate.getMonth() - 1);
        }
        var res = await Promise.all(observations);
        return res.reduce((prev, next) => {
            return prev.concat(next);
        }, []);
    }

    private async estimateObservationCount(
        start: Date,
        end: Date
    ): Promise<number> {
        var lastHour = await DataProvider.getObservations(
            this.observationStation,
            this.feature,
            new Date(Date.now() - 60 * 60 * 1000),
            new Date(Date.now())
        );
        var estimate =
            lastHour.length *
            (((end.getTime() - start.getTime()) / 1000) * 60 * 60);
        return estimate;
    }
}
