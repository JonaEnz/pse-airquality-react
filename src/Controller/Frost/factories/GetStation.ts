import QueryBuilder from "../QueryBuilder";
import FrostFactory from "../FrostFactory";
import { ObservationStation } from "../../../Model/ObservationStation";
import ResultModelConverter from "../ResultModelConverter";
import { Position } from "../../../Model/Position";
import { Feature } from "../../../Model/Feature";
import FeatureProvider from "../../FeatureProvider";

export class GetStationFactory extends FrostFactory<ObservationStation> {
    constructor() {
        super(new GetStationConverter(), new GetStationBuilder());
    }
}

export class GetStationConverter
    implements ResultModelConverter<ObservationStation> {
    public convert(
        json: ObservationStationEntity,
        options: getStationOptions
    ): ObservationStation {
        let pos: Position;
        if (json.Locations === undefined || json.Locations === null || json.Locations[0] === undefined || json.Locations[0] === null) {
            throw new Error("Thing has no Location");
        } else {
            pos = new Position(
                json.Locations[0].location.coordinates[1],
                json.Locations[0].location.coordinates[0]
            );
        }

        let features: Feature[] = [];

        let fp: FeatureProvider = FeatureProvider.getInstance();
        json.Datastreams.forEach((element) => {
            let getfeat: Feature | undefined = fp.getFeature(
                element.ObservedProperty["@iot.id"]
            );
            if (getfeat !== undefined) {
                let feat: Feature = getfeat;
                let isin: boolean = false;
                features.forEach(f => {
                    if (f.getId() === feat.getId()) {
                        isin = true;
                    }
                })
                if (isin === false) {
                    features.push(getfeat);
                }
            }
        });

        return new ObservationStation(
            json["@iot.id"],
            json.name,
            json.description,
            pos,
            features
        );
    }
}

export class GetStationBuilder implements QueryBuilder {
    public getQuery(options: getStationOptions): string {
        return (
            "Things('" +
            options.id +
            "')?$select=@iot.id,name,description&$expand=Locations($select=location),Datastreams/ObservedProperty($select=@iot.id)"
        );
    }
}

export interface getStationOptions {
    id: string;
}

interface ObservationStationEntity {
    name: string;
    description: string;
    Datastreams: DatastreamsEntity[];
    Locations?: LocationsEntity[] | null;
    "@iot.id": string;
}
interface DatastreamsEntity {
    name: string;
    ObservedProperty: ObservedPropertyEntity;
}
interface ObservedPropertyEntity {
    "@iot.id": string;
}
interface LocationsEntity {
    location: LocationEntity;
}
interface LocationEntity {
    type: string;
    coordinates: number[];
}
