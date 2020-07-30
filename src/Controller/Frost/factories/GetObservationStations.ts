import QueryBuilder from '../QueryBuilder';
import FrostFactory from '../FrostFactory';
import { ObservationStation } from '../../../Model/ObservationStation';
import ResultModelConverter from '../ResultModelConverter';
import { Position } from '../../../Model/Position';
import { Feature } from '../../../Model/Feature';
import FeatureProvider from '../../FeatureProvider';

export class GetObservationStationsFactory extends FrostFactory<ObservationStation[]> {
    constructor() {
        super(new GetObservationStationsConverter(), new GetObservationStationsBuilder());
    }
}

export class GetObservationStationsConverter implements ResultModelConverter<ObservationStation[]> {
    public convert(json: ResultList, options: GetObservationStationsOptions): ObservationStation[] {
        let stations: ObservationStation[] = [];
        json.obsStations?.forEach(element => {
            let coord: number[] = element.locations[0].location.coordinates;
            let pos: Position = new Position(coord[0], coord[1]);

            let features: Feature[] = [];
            let fp: FeatureProvider = FeatureProvider.getInstance();
            element.datastreams?.forEach(stream => {
                let feat: Feature | undefined = fp.getFeature(stream.ObservedProperty["@iot.id"]);
                if (feat !== undefined) {
                    features.push(feat);
                }
            })
            stations.push(new ObservationStation(element["@iot.id"], element.name, element.description, pos, []));
        })

        return stations;
    }
}


export class GetObservationStationsBuilder implements QueryBuilder {

    public getQuery(options: GetObservationStationsOptions): string {
        return "Things?$filter=geo.distance(Locations/location,geography'POINT({" + options.middle.getLongitude() + "} {" + options.middle.getLatitude() + "})') lt {" + options.radius + "} and overlaps(Datastreams/phenomenonTime,(now() sub duration'P1d'))&$expand=Locations($select=location),Datastreams($select=name)/ObservedProperty($select=@iot.id)";
    }
}

export interface GetObservationStationsOptions {
    middle: Position;
    radius: number;
}

export interface ResultList {
    obsStations?: (StationEntity)[] | null;
}
export interface StationEntity {
    name: string;
    description: string;
    properties?: Properties | null;
    "Datastreams@iot.navigationLink": string;
    datastreams?: (DatastreamsEntity)[] | null;
    "MultiDatastreams@iot.navigationLink": string;
    "Locations@iot.navigationLink": string;
    locations: (LocationsEntity)[];
    "HistoricalLocations@iot.navigationLink": string;
    "@iot.id": string;
    "@iot.selfLink": string;
}
export interface Properties {
    "hardware.id": string;
    shortname: string;
    "operator.domain": string;
    station_active_from?: string | null;
    station_setting_name?: string | null;
    "station type name"?: string | null;
    "station_no"?: number | null;
    documentation?: string | null;
}
export interface DatastreamsEntity {
    name: string;
    ObservedProperty: ObservedProperty;
}
export interface ObservedProperty {
    "@iot.id": string;
}
export interface LocationsEntity {
    location: Location;
}
export interface Location {
    type: string;
    coordinates: (number)[];
}

