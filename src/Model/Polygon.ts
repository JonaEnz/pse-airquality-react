import { ObservationStation } from "./ObservationStation";
import { Color } from "./Color";
import { Observation } from "./Observation";

export class Polygon {
    private obs: Observation[];
    private color: Color;
    constructor(obs: Observation[], color: Color) {
        this.obs = obs;
        this.color = color;
    }
    getColor(): Color {
        return this.color;
    }
    setColor(color: Color) {
        this.color = color;
    }

    getObservations(): Observation[] {
        return this.obs;
    }

    getStations(): ObservationStation[] {
        return this.obs.flatMap((o) => o.getObservationStation());
    }

    getAverageValue(): number {
        return this.obs.length === 0
            ? 0
            : this.obs.reduce((a, b) => {
                  return a + b.getValue();
              }, 0) / this.obs.length;
    }
}
