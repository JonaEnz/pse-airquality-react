import QueryBuilder from '../QueryBuilder';
import FrostFactory from '../FrostFactory';
import { ObservationStation } from '../../../Model/ObservationStation';
import ResultModelConverter from '../ResultModelConverter';
import { Position } from '../../../Model/Position';

export class GetStationFactory extends FrostFactory<ObservationStation> {
    constructor() {
        super(new GetStationConverter(), new GetStationBuilder());
    }
}

export class GetStationConverter implements ResultModelConverter<ObservationStation> {
    public convert(json: ObservationStationEntity): ObservationStation {
        let pos: Position;
        if (json.Locations === undefined || json.Locations === null) {
            pos = new Position(0, 0);
        } else {
            pos = new Position(json.Locations[0].location.coordinates[0], json.Locations[0].location.coordinates[1]);
        }



        return new ObservationStation(json["@iot.id"], json.name, json.description, pos, []);
    }
}


export class GetStationBuilder implements QueryBuilder {

    public getQuery(options: getStationOptions): string {
        return "Things('" + options.id + "')?$select=@iot.id,name,description&$expand=Locations($select=location),Datastreams/ObservedProperty($select=@iot.id)";
    }
}

export interface getStationOptions {
    id: string;
}


interface ObservationStationEntity {
    name: string;
    description: string;
    Datastreams?: (DatastreamsEntity)[] | null;
    Locations?: (LocationsEntity)[] | null;
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
    coordinates: (number)[];
}
