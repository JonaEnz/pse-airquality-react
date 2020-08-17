import MapConfiguration from "../MapPage/MapConfiguration";
import { Viewport } from "../../Model/Viewport";
import { Position } from "../../Model/Position";
import NearConfiguration from "../MapPage/NearConfiguration";
import FeatureProvider from "../FeatureProvider";
import PolygonConfiguration from "../MapPage/PolygonConfiguration";
import StationConfiguration from "../MapPage/StationConfiguration";
import { Feature } from "../../Model/Feature";
import { isNullOrUndefined } from "util";

const LOCALSTORAGE_MAPCONF = "mapconf";
const DEFAULT_CONF = new StationConfiguration(
    FeatureProvider.getInstance().getFeature("saqn:op:ta") as Feature
);
const DEFAULT_VIEWPORT = new Viewport(new Position(49, 8.4), 7);

export default class MapConfigurationMemory {
    static save(conf: MapConfiguration, view: Viewport) {
        localStorage.setItem(
            LOCALSTORAGE_MAPCONF,
            JSON.stringify({
                type: conf.getId(),
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
            if (isNullOrUndefined(feature)) {
                throw new Error(
                    "Feature " + obj.feature + " is not supported."
                );
            }
            if (obj.type === "NearConfiguration") {
                return [new NearConfiguration(feature), view];
            } else if (obj.type === "PolygonConfiguration") {
                return [new PolygonConfiguration(feature), view];
            } else if (obj.type === "StationConfiguration") {
                return [new StationConfiguration(feature), view];
            } else {
                throw new Error("Invalid configuration: " + obj.type);
            }
        }
        return [DEFAULT_CONF, DEFAULT_VIEWPORT];
    }
}
