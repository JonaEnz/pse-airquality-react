import IDiagramController, { ChartType } from "./DiagramController";
import { ObservationStation } from "../../Model/ObservationStation";
import { Feature } from "../../Model/Feature";
import MockDataProvider from "../MockDataProvider";
import { Observation } from "../../Model/Observation";
import DataProvider from "../Frost/DataProvider";

class YCLCCConfigurationOption {
    name: string;
    numberOfYears: number;
    frequency: number;

    constructor(name: string, numberOfYears: number, frequency: number) {
        this.name = name;
        this.numberOfYears = numberOfYears;
        this.frequency = frequency;
    }
}

export class YearComparisonLineChartController implements IDiagramController {
    //support line charts
    private static readonly chartType = ChartType.LINE_CHART;

    //enable configuration
    private static readonly isConfigutable = false;

    //configuration options
    private static readonly configurationOptions = [
        new YCLCCConfigurationOption("default_configuration", 3, 1),
    ];

    //default configuration option
    private static readonly defaultConfigurationOption = new YCLCCConfigurationOption(
        "default_configuration",
        10,
        1
    );

    // options for the graphical appearence
    private static readonly graphicsOptions = {
        hAxis: {
            format: "MMM",
            gridlines: { count: 6 },
        },
    };

    //concerning observation station
    observationStation: ObservationStation;
    //concerning feature
    feature: Feature;
    yAxisLabel: string;

    constructor(observationStation: ObservationStation, feature: Feature) {
        this.observationStation = observationStation;
        this.feature = feature;
        this.yAxisLabel = `${this.feature.getName()} [${this.feature.getUnitOfMeasurement()}]`;
    }
    //return chart type
    getChartType(): ChartType {
        return YearComparisonLineChartController.chartType;
    }

    getGraphicsOptions() {
        return YearComparisonLineChartController.graphicsOptions;
    }

    //return that the corresponding diagram to this controller is configurable
    isConfigurable() {
        return YearComparisonLineChartController.isConfigutable;
    }

    //returns default configuration option
    getDefaultConfigurationOption(): string {
        return YearComparisonLineChartController.defaultConfigurationOption
            .name;
    }

    //return names of configuration options
    getConfigurationOptions(): string[] {
        return YearComparisonLineChartController.configurationOptions.map(
            (option) => option.name
        );
    }

    getYCLCCConfigurationOption(name: string) {
        for (let option of YearComparisonLineChartController.configurationOptions) {
            if (option.name === name) return option;
        }
        throw new Error(
            "Configuration option: " +
                name +
                " does not exist for YearComparisonLineChart"
        );
    }

    //return data to display
    async getData(
        configurationOptionName: string
    ): Promise<Array<Array<Date | number | string | null>>> {
        let configurationOption = this.getYCLCCConfigurationOption(
            configurationOptionName
        );
        let numberOfYears = configurationOption.numberOfYears;
        let frequency = configurationOption.frequency;

        let now = new Date(Date.now());

        //get timespan
        let start = new Date(now.getFullYear() - numberOfYears, 0, 1);
        var observations: Observation[] = [];

        while (start.valueOf() < Date.now()) {
            let end = new Date(
                start.getFullYear(),
                start.getMonth(),
                start.getDate() + 1
            );

            //get observations
            let newObs = await DataProvider.getObservations(
                this.observationStation,
                this.feature,
                start,
                end
            );

            observations = observations.concat(newObs);

            start = end;
        }
        console.log(observations);

        //filter out the null values
        let cleanedObservations = observations.filter((observation) => {
            return observation !== null;
        });

        //determine the displayed years
        let years: number[] = new Array<number>();
        for (let i = 0; i < numberOfYears; i++) {
            years.push(now.getFullYear() - i);
        }

        //define header
        let header: string[] = years.map((year) => year.toString());
        header.splice(0, 0, "dates");

        //define new data table with header
        let dt = new DataTable(header);

        //add every observation to the table
        for (let observation of cleanedObservations) {
            let date = observation.getTimeStamp();
            let year = date.getFullYear().toString();
            let value = observation.getValue();
            dt.addValue(date, year, value);
        }

        //return data table as a twodimensional array
        let dtAsArray = dt.toArray();
        return dtAsArray;
    }
}

class DTRow {
    date: Date;
    values: Array<number>;

    constructor(date: Date, numberOfValues: number) {
        this.date = date;
        this.values = new Array<number>(numberOfValues);
    }

    addValue(value: number, index: number) {
        this.values[index] = value;
    }

    toArray(): Array<Date | number> {
        let arrayRepresentation = new Array<Date | number>();
        arrayRepresentation = this.values;
        arrayRepresentation.splice(0, 0, this.date);
        return arrayRepresentation;
    }

    static sort(dtrowA: DTRow, dtrowB: DTRow): number {
        return dtrowA.date.valueOf() <= dtrowB.date.valueOf() ? -1 : 1;
    }
}

class DataTable {
    static readonly BASE_YEAR = 2020;

    header: string[];
    rows: DTRow[];
    numberOfValues: number;

    constructor(header: string[]) {
        this.header = header;
        this.numberOfValues = header.length - 1;
        this.rows = new Array<DTRow>();
    }

    addValue(date: Date, columnKey: string, value: number) {
        //get row
        let rowIndex = this.getRowIndex(date);
        if (rowIndex === null) {
            this.rows.push(
                new DTRow(this.getBaseDate(date), this.numberOfValues)
            );
            rowIndex = this.rows.length - 1;
        }

        //get column
        let columnIndex = this.getColumnIndex(columnKey);
        if (columnKey === null) {
            throw new Error(`No column key: ${columnKey} in this data table`);
        }
        columnIndex = columnIndex as number;

        //add value
        this.rows[rowIndex].addValue(value, columnIndex);
    }

    getColumnIndex(key: string): number | null {
        for (let index = 0; index < this.header.length; index++) {
            if (key === this.header[index]) {
                return index - 1;
            }
        }
        return null;
    }

    getRowIndex(date: Date): number | null {
        for (let index = 0; index < this.rows.length; index++) {
            if (this.datesAreEqual(date, this.rows[index].date)) {
                return index;
            }
        }
        return null;
    }

    getBaseDate(date: Date) {
        let baseDate = new Date(
            DataTable.BASE_YEAR,
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        );
        return baseDate;
    }

    //returns whether two dates are the same except their years
    datesAreEqual(dateA: Date, dateB: Date): boolean {
        let equal: boolean =
            dateA.getMonth() === dateB.getMonth() &&
            dateA.getDate() === dateB.getDate() &&
            dateA.getHours() === dateB.getHours() &&
            dateA.getMinutes() === dateB.getMinutes() &&
            dateA.getSeconds() === dateB.getSeconds() &&
            dateA.getMilliseconds() === dateB.getMilliseconds();
        return equal;
    }

    sort() {
        this.rows.sort(DTRow.sort);
    }

    toArray() {
        this.sort();

        let arrayRepresentation = new Array<
            Array<string | Date | number | null>
        >();
        arrayRepresentation = this.rows.map((row) => row.toArray());
        arrayRepresentation.splice(0, 0, this.header);
        return arrayRepresentation;
    }
}
