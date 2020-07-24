import { ObservationStation } from "./ObservationStation";
import { Color } from "./Color";

export class Polygon {
    private stations: ObservationStation[];
    private color: Color;
    constructor(stations: ObservationStation[], color: Color) {
        this.stations = stations;
        this.color = color;
    }
    getColor(): Color {
        return this.color;
    }
    setColor(color: Color) {
        this.color = color;
    }
    getStations(): ObservationStation[] {
        return this.stations;
    }
}
