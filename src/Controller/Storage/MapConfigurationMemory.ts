import MapConfiguration from "../MapConfiguration";
import { Viewport } from "../../Model/Viewport";
import { Position } from "../../Model/Position";
import TestConfiguration from "../TestConfiguration";
import { Feature } from "../../Model/Feature";
import { Scale } from "../../Model/Scale";
import NearConfiguration from "../NearConfiguration";
import FeatureProvider from "../FeatureProvider";
import PolygonConfiguration from "../MapPage/PolygonConfiguration";
import StationConfiguration from "../StationConfiguration";

const LOCALSTORAGE_MAPCONF = "mapconf";

export default class MapConfigurationMemory {
    static save(conf: MapConfiguration, view: Viewport) {
        localStorage.setItem(
            LOCALSTORAGE_MAPCONF,
            JSON.stringify({
                type: conf.constructor.name,
                feature: conf.getFeatures()[0].getId(),
                view: view,
            })
        );
    }

    static load(): [MapConfiguration, Viewport] {
        var ls = localStorage.getItem(LOCALSTORAGE_MAPCONF);
        if (
            ls &&
            (JSON.parse(ls) as {
                type: string;
                feature: string;
                view: Viewport;
            })
        ) {
            //return configuration if it exists
            var obj = JSON.parse(ls) as {
                type: string;
                feature: string;
                view: any;
            };
            var view = new Viewport(
                new Position(
                    obj.view.center.latitude,
                    obj.view.center.longitude
                ),
                obj.view.zoom
            );
            var feature = FeatureProvider.getInstance().getFeature(obj.feature);
            if (obj.type === "NearConfiguration") {
                return [new NearConfiguration(feature), view];
            } else if (obj.type === "PolygonConfiguration") {
                return [new PolygonConfiguration(feature), view];
            } else if (obj.type === "StationConfiguration") {
                return [new StationConfiguration(feature), view];
            } else {
                return [new TestConfiguration(feature), view];
            }
        }
        //TODO: Get default data elsewhere.
        return [
            new TestConfiguration(
                new Feature(
                    "",
                    "",
                    "",
                    new Scale(false, { 0: "#FFFFFF", 20: "#000000" }),
                    "",
                    10,
                    "",
                    []
                )
            ),
            new Viewport(new Position(49, 8.4), 5),
        ];
    }
}
