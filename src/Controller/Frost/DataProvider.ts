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

    // returns all observation stations that are located within a specified radius around a geo position
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

        //check whether something went wrong
        if (!fr.getSuccess()) {
            throw new Error(fr.getMessage());
        }

        //everything went well
        //return result
        return fr.getResult() as ObservationStation[]; //null type is impossible because of specific frost factory
    }

    static async getLatestObservation(
        station: ObservationStation,
        feature: Feature
    ): Promise<Observation> {
        let frostFactory = new GetLatestObservationFactory();
        let options = { station, feature };

        //fetch data
        let fr: FrostResult<Observation> = await this.server.request(
            new GetLatestObservationFactory(),
            { station, feature }
        );

        //check whether something went wrong
        if (!fr.getSuccess()) {
            throw new Error(fr.getMessage());
        }

        //everything went well
        //return result
        return fr.getResult() as Observation; //null type is impossible because of specific frost factory
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

        //everything went well
        //return result
        return fr.getResult() as ObservationStation; //null type is impossible because of specific frost factory
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

        //check whether something went wrong
        if (!fr.getSuccess()) {
            throw new Error(fr.getMessage());
        }

        //everything went well
        //return result
        return fr.getResult() as Observation[]; //null type is impossible because of specific frost factory
    }

    static async getObservations(
        station: ObservationStation,
        feature: Feature,
        start: Date,
        end: Date
    ): Promise<Observation[]> {
        let frostFactory = new GetObservationsFactory();
        let options = { station, feature, start, end };

        //fetch data
        let fr: FrostResult<Observation[]> = await this.server.request(
            frostFactory,
            options
        );

        //check whether something went wrong
        if (!fr.getSuccess()) {
            throw new Error(fr.getMessage());
        }

        //everything went well
        //return result
        return fr.getResult() as Observation[]; //null type is impossible because of specific frost factory
    }
}
