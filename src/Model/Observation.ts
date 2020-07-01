import { ObservationStation } from './ObservationStation';
import { Feature } from './Feature';

export class Observation {
    private observationStation: ObservationStation;
    private feature: Feature;
    private value: number;
    private timestamp: Date;

    constructor(observationStation: ObservationStation, feature: Feature, value: number, timestamp: Date) {
        this.observationStation = observationStation;
        this.feature = feature;
        this.value = value;
        this.timestamp = timestamp;
    }

    public getObservationStation(): ObservationStation {
        return this.observationStation;
    }

    public getFeature(): Feature {
        return this.feature;
    }

    public getValue(): number {
        return this.value;
    }

    public getTimeStamp(): Date {
        return this.timestamp;
    }
}