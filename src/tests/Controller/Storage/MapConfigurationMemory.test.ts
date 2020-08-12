import MapConfigurationMemory from "../../../Controller/Storage/MapConfigurationMemory";
import FeatureProvider from "../../../Controller/FeatureProvider";
import StationConfiguration from "../../../Controller/MapPage/StationConfiguration";
import { Viewport } from "../../../Model/Viewport";
import { Position } from "../../../Model/Position";
import TestHelper from "../../TestHelper";

var getItem = localStorage.getItem;

test("Nothing in storage", () => {
    localStorage.removeItem("mapconf");

    expect(
        MapConfigurationMemory.load()[1].getCenter().getCoordinates()
    ).toStrictEqual({ lat: 49, lng: 8.4 });
});

test("Feature does not exist", () => {
    localStorage.setItem(
        "mapconf",
        "{type:'NearConfiguration', feature:'invalidFeature', view:''}"
    );

    expect(() => {
        MapConfigurationMemory.load();
    }).toThrow();
});

function createConf(type: string): string {
    return JSON.stringify({
        type: type,
        feature: "saqn:op:ta",
        view: {
            center: {
                latitude: 1,
                longitude: 2,
            },
            zoom: 7,
        },
    });
}

test("All configurations", () => {
    var confs = [
        "StationConfiguration",
        "NearConfiguration",
        "PolygonConfiguration",
        "TestConfiguration",
    ];

    confs.forEach((c) => {
        localStorage.setItem("mapconf", createConf(c));
        expect(MapConfigurationMemory.load()[0].getId()).toStrictEqual(c);
    });
});

localStorage.getItem = getItem;

test("Save", () => {
    MapConfigurationMemory.save(
        new StationConfiguration(TestHelper.getTestFeature()),
        new Viewport(new Position(0, 0), 7)
    );
});
