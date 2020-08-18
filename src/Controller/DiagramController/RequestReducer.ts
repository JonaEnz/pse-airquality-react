import { Observation } from "../../Model/Observation";
import DataProvider from "../Frost/DataProvider";
import { ObservationStation } from "../../Model/ObservationStation";
import { Feature } from "../../Model/Feature";

const BLOCK_TIME = 1000 * 60 * 15; //15 minutes

export default class RequestReducer {
    private static reduceBlocks(obs: Observation[][]): Observation[] {
        var results: Observation[] = [];
        obs.forEach((hourBlock) => {
            if (hourBlock.length === 0) {
                return;
            }
            var avg =
                hourBlock.map((a) => a.getValue()).reduce((a, b) => a + b, 0) /
                hourBlock.length; //avg value
            results.push(
                new Observation(
                    hourBlock[0].getObservationStation(),
                    hourBlock[0].getFeature(),
                    avg,
                    hourBlock[0].getTimeStamp()
                )
            );
        });

        return results;
    }

    static async GetDataForDay(
        day: Date,
        observationStation: ObservationStation,
        feature: Feature
    ): Promise<Observation[]> {
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
                observationStation,
                feature,
                zero,
                new Date(zero.getTime() + BLOCK_TIME)
            )
        );
        promises.push(
            DataProvider.getObservations(
                observationStation,
                feature,
                eight,
                new Date(eight.getTime() + BLOCK_TIME)
            )
        );
        promises.push(
            DataProvider.getObservations(
                observationStation,
                feature,
                sixteen,
                new Date(sixteen.getTime() + BLOCK_TIME)
            )
        );
        var r = await Promise.all(promises);

        return this.reduceBlocks(r);
    }

    static async getDataByMonth(
        endDate: Date,
        observationStation: ObservationStation,
        feature: Feature
    ) {
        var startDate = new Date(endDate.getTime());
        startDate.setMonth(startDate.getMonth() - 1);

        var promises: Promise<Observation[]>[] = [];

        while (startDate < endDate) {
            promises.push(
                this.GetDataForDay(startDate, observationStation, feature)
            );
            startDate.setDate(startDate.getDate() + 1);
        }
        var results = await Promise.all(promises);
        return results.reduce((prev, next) => {
            return prev.concat(next);
        }, []);
    }

    static async getDataByYear(
        endDate: Date,
        observationStation: ObservationStation,
        feature: Feature
    ) {
        var observations: Promise<Observation[]>[] = [];
        //Months
        for (var i = 0; i < 12; i++) {
            endDate.setDate(1);
            observations.push(
                this.GetDataForDay(endDate, observationStation, feature)
            );
            endDate.setDate(8);
            observations.push(
                this.GetDataForDay(endDate, observationStation, feature)
            );
            endDate.setDate(15);
            observations.push(
                this.GetDataForDay(endDate, observationStation, feature)
            );
            endDate.setDate(22);
            observations.push(
                this.GetDataForDay(endDate, observationStation, feature)
            );

            endDate.setMonth(endDate.getMonth() - 1);
        }
        var res = await Promise.all(observations);
        return res.reduce((prev, next) => {
            return prev.concat(next);
        }, []);
    }

    private static async estimateObservationCount(
        start: Date,
        end: Date,
        observationStation: ObservationStation,
        feature: Feature
    ): Promise<number> {
        var lastHour = await DataProvider.getObservations(
            observationStation,
            feature,
            new Date(Date.now() - 60 * 60 * 1000),
            new Date(Date.now())
        );
        var estimate =
            lastHour.length *
            (((end.getTime() - start.getTime()) / 1000) * 60 * 60);
        return estimate;
    }
}
