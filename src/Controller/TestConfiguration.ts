import MapConfiguration from "./MapConfiguration";
import { Viewport } from "../Model/Viewport";
import { Scale } from "../Model/Scale";
import { MapPin } from "../Model/MapPin";
import { Polygon } from "../Model/Polygon";
import { Feature } from "../Model/Feature";
import { Color } from "../Model/Color";

export default class TestConfiguration extends MapConfiguration {
    getPins(view: Viewport): MapPin[] {
        return [
            new MapPin(
                view.getCenter().getString(),
                view.getCenter(),
                10,
                new Color(
                    Math.random() * 255,
                    Math.random() * 255,
                    Math.random() * 255
                )
            ),
        ];
    }

    getPolygons(view: Viewport): Polygon[] {
        return [];
    }

    getScale(): Scale {
        return this.getFeatures()[0].getRelatedScale();
    }

    getFeatures(): Feature[] {
        return [
            new Feature(
                "",
                "",
                "",
                new Scale(false, { 0: "#FFFFFF", 20: "#000000" }),
                "",
                10,
                "",
                []
            ),
        ];
    }
}
