import QueryBuilder from '../QueryBuilder';
import FrostFactory from '../FrostFactory';
import { Observation } from '../../../Model/Observation';
import ResultModelConverter from '../ResultModelConverter';
import { Position } from '../../../Model/Position';
import { ObservationStation } from '../../../Model/ObservationStation';
import { Feature } from '../../../Model/Feature';

export class GetLatestObservationsFactory extends FrostFactory<Observation[]> {
    constructor() {
        super(new GetLatestObservationsConverter(), new GetLatestObservationsBuilder());
    }
}

export class GetLatestObservationsConverter implements ResultModelConverter<Observation[]> {
    public convert(json: any, options: GetLatestObservationsOptions): Observation[] {
        return [];
    }
}


export class GetLatestObservationsBuilder implements QueryBuilder {

    public getQuery(options: GetLatestObservationsOptions): string {
        return "Datastreams?$select=@iot.id,name&$filter=geo.distance(Thing/Locations/location,geography'POINT(" + options.center.getLongitude() + " " + options.center.getLatitude() + ")') lt " + options.radius + " and overlaps(phenomenonTime,(now() sub duration'P1d')) and ObservedProperty/@iot.id eq '" + options.feature.getId() + "'&$expand=Thing($select=name,@iot.id;$expand=Locations($select=location)),Observations($select=result;$filter=phenomenonTime gt now() sub duration'P1D';$orderby=phenomenonTime desc;$top=1)";
    }
}

export interface GetLatestObservationsOptions {
    center: Position;
    radius: number;
    feature: Feature;
}
