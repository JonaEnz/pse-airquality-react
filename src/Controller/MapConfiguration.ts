import { Viewport } from "../Model/Viewport";
import { Polygon } from "../Model/Polygon";
import { MapPin } from "../Model/MapPin";
import { Feature } from "../Model/Feature";
import { Scale } from "../Model/Scale";

export default abstract class MapConfiguration {
    abstract getPins(view: Viewport): MapPin[];
    abstract getPolygons(view: Viewport): Polygon[];
    abstract getScale(): Scale;
    abstract getFeatures(): Feature[];
}
