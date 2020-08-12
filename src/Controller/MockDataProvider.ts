import { Feature } from "../Model/Feature";
import { Observation } from "../Model/Observation";
import { ObservationStation } from "../Model/ObservationStation";
import { Position } from "../Model/Position";
import { Scale } from "../Model/Scale";
import { Color } from "../Model/Color";

export default class MockDataProvider {
    private static stations: { [key: string]: ObservationStation } = {};

    private static randomColor(): Color {
        return new Color(
            Math.random() * 255,
            Math.random() * 255,
            Math.random() * 255
        );
    }
    static mockFeature(): Feature {
        var colors: { [key: number]: string } = {};
        for (let index = 0; index < 5; index++) {
            var c = this.randomColor().getHex();
            colors[Math.floor(Math.random() * 100)] = c;
        }
        var scale = new Scale(true, colors);
        return new Feature(
            "mockFeature",
            "mockFeatureNameId",
            "mockFeatureDescriptionId",
            scale,
            "mockWeblinkId",
            100,
            "uoM",
            [
                "YearComparisonLineChart",
                "FeatureHistoryLineChart",
                "ComparisonToLastYearPieChart",
            ],
            ""
        );
    }
    private static mockStation(center: Position): ObservationStation {
        var id = Math.floor(Math.random() * 10000).toString();
        var station = new ObservationStation(
            id,
            "mockName",
            "mockDescription",
            new Position(
                center.getLatitude() + 6 * Math.random() - 3,
                center.getLongitude() + 6 * Math.random() - 3
            ),
            []
        );
        MockDataProvider.stations[station.getId()] = station;
        return station;
    }

    private static mockObservations(center: Position): Observation[] {
        var count = Math.floor(Math.random() * 9) + 2;
        var obs = [];
        for (let i = 0; i < count; i++) {
            obs.push(
                new Observation(
                    this.mockStation(center),
                    this.mockFeature(),
                    Math.random() * 100,
                    new Date(Date.now())
                )
            );
        }
        return obs;
    }

    static getLatestObservations(
        center: Position,
        radius: number,
        feature: Feature
    ): Observation[] {
        return this.mockObservations(center);
    }

    static getLatestObservation(
        station: ObservationStation,
        feature: Feature
    ): Observation {
        return new Observation(
            station,
            feature,
            Math.random() * 100,
            new Date(Date.now())
        );
    }

    static async getObservations(
        station: ObservationStation,
        start: Date,
        end: Date,
        feature: Feature,
        //how many observations per day are expected
        frequency: number
    ): Promise<Observation[]> {
        let date = start;
        let observations = new Array<Observation>();

        let previousValue = feature.getLimit() / 3;

        if (frequency <= 1) {
            while (date.valueOf() < end.valueOf()) {
                date = new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate() + 1 / frequency
                );
                let value = previousValue + Math.random() * 2 - 1;
                previousValue = value;
                let observation = new Observation(
                    station,
                    feature,
                    value,
                    date
                );
                observations.push(observation);
            }
        } else if (frequency > 1) {
            while (date.valueOf() < end.valueOf()) {
                date = new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    date.getHours() + 24 / frequency
                );
                let value = previousValue + Math.random() * 2 - 1;
                previousValue = value;
                let observation = new Observation(
                    station,
                    feature,
                    value,
                    date
                );
                observations.push(observation);
            }
        }

        return observations;
    }

    static getObservationStations(
        middle: Position,
        radius: number
    ): ObservationStation[] {
        var obs = [];
        for (let index = 0; index < 7; index++) {
            obs.push(this.mockStation(middle));
        }
        return obs;
    }

    static getStation(id: string): ObservationStation {
        var colors: { [key: number]: string } = {};
        for (let index = 0; index < 5; index++) {
            var c = this.randomColor().getHex();
            colors[Math.floor(Math.random() * 100)] = c;
        }
        var scale = new Scale(true, colors);

        return new ObservationStation(
            id,
            "mockName",
            "mockDesc",
            new Position(48.369665, 10.903877),

            [
                new Feature(
                    "saqn:op:ta",
                    "temperatureName",
                    "temperatureDesc",
                    scale,
                    "tempLink",
                    40,
                    "°C",
                    [
                        "YearComparisonLineChart",
                        "FeatureHistoryLineChart",
                        "ComparisonToLastYearPieChart",
                    ],
                    "thermometer-half"
                ),
                new Feature(
                    "saqn:op:mcpm2p5",
                    "PNC2.5Name",
                    "PNC2.5Desc",
                    scale,
                    "PNC2.5Link",
                    100,
                    "µg/m³",
                    [
                        "YearComparisonLineChart",
                        "FeatureHistoryLineChart",
                        "ComparisonToLastYearPieChart",
                    ],
                    "smog"
                ),
            ]
        );
    }
}
