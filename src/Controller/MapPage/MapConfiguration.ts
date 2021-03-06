import { Viewport } from "../../Model/Viewport";
import { Polygon } from "../../Model/Polygon";
import { MapPin } from "../../Model/MapPin";
import { Feature } from "../../Model/Feature";
import { Scale } from "../../Model/Scale";
import { ObservationStation } from "../../Model/ObservationStation";

export default abstract class MapConfiguration {
    protected buildMapPin(
        obsStation: ObservationStation,
        value: number
    ): MapPin {
        return new MapPin(
            obsStation.getId(),
            obsStation.getPosition(),
            value,
            this.getScale().getColor(value)
        );
    }
    abstract getId(): string;
    abstract async getPins(view: Viewport): Promise<MapPin[]>;
    abstract async getPolygons(view: Viewport): Promise<Polygon[]>;
    abstract getScale(): Scale;
    abstract getFeatures(): Feature[];
}
