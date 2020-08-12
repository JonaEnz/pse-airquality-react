import { Feature } from "../../Model/Feature";
import { Observation } from "../../Model/Observation";
import { ObservationStation } from "../../Model/ObservationStation";
import { Position } from "../../Model/Position";
import FrostServer from "./FrostServer";
import { GetStationFactory } from "./factories/GetStation";
import { FrostResult } from "../../Model/FrostResult";
import { GetObservationStationsFactory } from "./factories/GetObservationStations";
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

    static async getObservationStations(
        middle: Position,
        radius: number
    ): Promise<ObservationStation[]> {
        let fr: FrostResult<ObservationStation[]> = await this.server.request(
            new GetObservationStationsFactory(),
            {
                middle,
                radius,
            }
        );
        return this.handleFrostResult(fr);
    }

    static async getLatestObservation(
        station: ObservationStation,
        feature: Feature
    ): Promise<Observation> {
        let fr: FrostResult<Observation> = await this.server.request(
            new GetLatestObservationFactory(),
            { station, feature }
        );
        return this.handleFrostResult(fr);
    }

    static async getStation(id: string): Promise<ObservationStation> {
        let fr: FrostResult<ObservationStation> = await this.server.request(
            new GetStationFactory(),
            { id }
        );
        return this.handleFrostResult(fr);
    }

    static async getLatestObservations(
        center: Position,
        radius: number,
        feature: Feature
    ): Promise<Observation[]> {
        let fr: FrostResult<Observation[]> = await this.server.request(
            new GetLatestObservationsFactory(),
            {
                center,
                radius,
                feature,
            }
        );
        let obsnull: Observation[] | null = fr.getResult();
        if (obsnull !== null) {
            return obsnull;
        }
        alert(fr.getMessage() + "dp spec");
        return [];
    }

    static async getObservations(
        station: ObservationStation,
        feature: Feature,
        start: Date,
        end: Date
    ): Promise<Observation[]> {
        let fr: FrostResult<Observation[]> = await this.server.request(
            new GetObservationsFactory(),
            {
                station,
                feature,
                start,
                end,
            }
        );
        let obsnull: Observation[] | null = fr.getResult();
        if (obsnull !== null) {
            return obsnull;
        }
        alert(fr.getMessage() + "dp spec");
        return [];
    }
}
