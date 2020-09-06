import { Feature } from "../../Model/Feature";
import { Observation } from "../../Model/Observation";
import { ObservationStation } from "../../Model/ObservationStation";
import { Position } from "../../Model/Position";
import FrostServer from "./FrostServer";
import { GetStationFactory } from "./factories/GetStation";
import { FrostResult } from "../../Model/FrostResult";
//import { GetObservationStationsFactory } from "./factories/GetObservationStations";
import { GetLatestObservationFactory } from "./factories/GetLatestObservation";
import { GetLatestObservationsFactory } from "./factories/GetLatestObservations";
import { GetObservationsFactory } from "./factories/GetObservations";

export default class DataProvider {
    private static server: FrostServer = new FrostServer(
        "https://api.smartaq.net/v1.0/"
    );

    private static handleFrostResult<T>(fr: FrostResult<T>): T {
        let result: T | null = fr.getResult();
        if (!fr.getSuccess() || result === null) {
            //Error handling here
            throw new Error(fr.getMessage());
        } else {
            return result;
        }
    }

    // returns all observation stations that are located within a specified radius around a geo position
    /* This method is unused, thus commented.
    static async getObservationStations(
        middle: Position,
        radius: number
    ): Promise<ObservationStation[]> {
        let frostFactory = new GetObservationStationsFactory();
        let options = { middle, radius };

        //fetch data
        let fr: FrostResult<ObservationStation[]> = await this.server.request(
            frostFactory,
            options
        );

        return this.handleFrostResult(fr);
    }
    */

    static async getLatestObservation(
        station: ObservationStation,
        feature: Feature
    ): Promise<Observation> {
        //fetch data
        let fr: FrostResult<Observation> = await this.server.request(
            new GetLatestObservationFactory(),
            { station, feature }
        );

        return this.handleFrostResult(fr);
    }

    static async getStation(id: string): Promise<ObservationStation> {
        let frostFactory = new GetStationFactory();
        let options = { id };

        //fetch data
        let fr: FrostResult<ObservationStation> = await this.server.request(
            frostFactory,
            options
        );

        //check whether something went wrong
        if (!fr.getSuccess()) {
            throw new Error(fr.getMessage());
        }

        return this.handleFrostResult(fr);
    }

    static async getLatestObservations(
        center: Position,
        radius: number,
        feature: Feature
    ): Promise<Observation[]> {
        let frostFactory = new GetLatestObservationsFactory();
        let options = { center, radius, feature };

        //fetch data
        let fr: FrostResult<Observation[]> = await this.server.request(
            frostFactory,
            options
        );

        return this.handleFrostResult(fr);
    }

    static async getObservations(
        station: ObservationStation,
        feature: Feature,
        start: Date,
        end: Date
    ): Promise<Observation[]> {
        let frostFactory = new GetObservationsFactory();

        let options = [];

        var step = new Date(start.getTime() + 6 * 60 * 60 * 1000);

        do {
            options.push({
                station,
                feature,
                start: new Date(start.getTime()),
                end: new Date(step < end ? step.getTime() : end.getTime()),
            });
            start.setHours(start.getHours() + 6);
            step.setHours(step.getHours() + 6);
        } while (step < end);

        var promises: Promise<FrostResult<Observation[]>>[] = [];

        options.forEach((o) => {
            promises.push(this.server.request(frostFactory, o));
        });
        let res = await Promise.all(promises);
        /*//fetch data
        let fr: FrostResult<Observation[]> = await this.server.request(
            frostFactory,
            options
        );*/
        var rr = res.map((r) => this.handleFrostResult(r));
        return ([] as Observation[]).concat(...rr);
    }

    static async getAddress(pos: Position): Promise<string> {
        var json = await (
            await fetch(
                "https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json"
                    .replace("{lat}", pos.getLatitude().toString())
                    .replace("{lon}", pos.getLongitude().toString())
            )
        ).json();
        if (json.address?.road && json.address?.city) {
            return json.address.road + ", " + json.address.city;
        } else {
            return "?";
        }
    }
}
