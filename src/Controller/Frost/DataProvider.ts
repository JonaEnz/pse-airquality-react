import { Feature } from "../../Model/Feature";
import { Observation } from "../../Model/Observation";
import { ObservationStation } from "../../Model/ObservationStation";
import { Position } from "../../Model/Position";
import { Scale } from "../../Model/Scale";
import { Color } from "../../Model/Color";
import FeatureProvider from "../FeatureProvider";
import FrostServer from "../Frost/FrostServer";
import { GetStationFactory } from "../Frost/factories/GetStation";
import { FrostResult } from "../../Model/FrostResult";
import { GetObservationStationsFactory } from "../Frost/factories/GetObservationStations";
import { GetLatestObservationFactory } from "../Frost/factories/GetLatestObservation";
import { GetLatestObservationsFactory } from "./factories/GetLatestObservations";

export default class DataProvider {

    private static server: FrostServer = new FrostServer("https://api.smartaq.net/v1.0/");

    static async getObservationStations(middle: Position, radius: number): Promise<ObservationStation[]> {
        let fr: FrostResult<ObservationStation[]> = await this.server.request(new GetObservationStationsFactory(), { middle, radius });
        let obsnull: ObservationStation[] | null = fr.getResult();
        if (obsnull !== null) {
            return obsnull;
        }
        alert("dp error");
        alert(fr.getMessage());
        throw new Error(fr.getMessage());
    }

    static async getLatestObservation(station: ObservationStation, feature: Feature): Promise<Observation> {
        let fr: FrostResult<Observation> = await this.server.request(new GetLatestObservationFactory(), { station, feature });
        let obsnull: Observation | null = fr.getResult();
        if (obsnull !== null) {
            return obsnull;
        }
        throw new Error("nö");
    }

    static async getStation(id: string): Promise<ObservationStation> {
        let fr: FrostResult<ObservationStation> = await this.server.request(new GetStationFactory(), { id });
        let obsnull: ObservationStation | null = fr.getResult();
        if (obsnull !== null) {
            return obsnull;
        }
        alert("dp error");
        throw new Error("nö");
    }

    static async getLatestObservations(center: Position, radius: number, feature: Feature): Promise<Observation[]> {
        let fr: FrostResult<Observation[]> = await this.server.request(new GetLatestObservationsFactory(), { center, radius, feature });
        let obsnull: Observation[] | null = fr.getResult();
        if (obsnull !== null) {
            return obsnull;
        }
        alert(fr.getMessage() + "dp spec");
        return [];
    }
}
