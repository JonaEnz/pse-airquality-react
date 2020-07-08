import MapConfiguration from "../MapConfiguration";
import { Viewport } from "../../Model/Viewport";
import { Position } from "../../Model/Position";
import TestConfiguration from "../TestConfiguration";

const LOCALSTORAGE_MAPCONF = "mapconf";

export default class MapConfigurationMemory {
    static save(conf: MapConfiguration, view: Viewport) {
        localStorage.setItem(
            LOCALSTORAGE_MAPCONF,
            JSON.stringify([conf, view])
        );
    }

    static load(): [MapConfiguration, Viewport] {
        var ls = localStorage.getItem(LOCALSTORAGE_MAPCONF);
        if (ls && (JSON.parse(ls) as [MapConfiguration, Viewport])) {
            //return configuration if it exists
            return JSON.parse(ls) as [MapConfiguration, Viewport];
        }
        //TODO: Get default data elsewhere.
        return [
            new TestConfiguration(),
            new Viewport(new Position(49, 8.4), 5),
        ];
    }
}
