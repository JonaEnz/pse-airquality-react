import { MapController } from "../../../Controller/MapPage/MapController";
import { Color } from "../../../Model/Color";
import Language from "../../../Controller/Storage/Language";
import { Position } from "../../../Model/Position";
import MapConfiguration from "../../../Controller/MapPage/MapConfiguration";
import { Viewport } from "../../../Model/Viewport";
import { Scale } from "../../../Model/Scale";
import StationConfiguration from "../../../Controller/MapPage/StationConfiguration";
import TestHelper from "../../TestHelper";
import { MapPin } from "../../../Model/MapPin";
import { Polygon } from "../../../Model/Polygon";
import DataProvider from "../../../Controller/Frost/DataProvider";
import MapConfigurationMemory from "../../../Controller/Storage/MapConfigurationMemory";
jest.mock("../../../Controller/Frost/DataProvider");

var controller = new MapController(false); //New controller with default data
Language.getInstance();

test("constructor", () => {
    var loadOriginal = MapConfigurationMemory.load;
    MapConfigurationMemory.load = jest.fn(() => {
        return [
            new StationConfiguration(TestHelper.getTestFeature()),
            new Viewport(new Position(0, 0), 7),
        ];
    });
    var useMemTrue = new MapController(); //defaults to true
    expect(useMemTrue.getFeatureSelectConf()).toStrictEqual({
        conf: "StationConfiguration",
        feature: TestHelper.FEATURE_ID,
    });

    var useMemFalse = new MapController(false); //should not crash

    var mockConf = new StationConfiguration(TestHelper.getTestFeature());
    mockConf.getFeatures = jest.fn(() => {
        return [];
    });
    MapConfigurationMemory.load = jest.fn(() => {
        return [mockConf, new Viewport(new Position(0, 0), 7)];
    });
    expect(() => {
        new MapController(true);
    }).toThrow();

    //Restore
    MapConfigurationMemory.load = loadOriginal;
});

test("Valid default viewport", () => {
    var vp = controller.getViewport();
    var center = vp.getCenter();
    expect(Math.abs(center.getLatitude())).toBeLessThanOrEqual(90);
    expect(Math.abs(center.getLongitude())).toBeLessThanOrEqual(180);
    expect(vp.getZoom()).toBeGreaterThan(0);
    expect(vp.getRadius()).toBeGreaterThanOrEqual(0);
});

test("check scale", () => {
    var scale = controller.getScale();
    expect(scale.getColor(-10)).toBeInstanceOf(Color);
    expect(scale.getColor(0)).toBeInstanceOf(Color);
    expect(scale.getColor(100)).toBeInstanceOf(Color);
});

test("Configuration", () => {
    var conf = new StationConfiguration(TestHelper.getTestFeature());
    var pinSpy = jest.fn(
        async (): Promise<MapPin[]> => {
            return [];
        }
    );
    var polySpy = jest.fn(
        async (): Promise<Polygon[]> => {
            return [];
        }
    );
    conf.getPins = pinSpy;
    conf.getPolygons = polySpy;
    controller.onConfigurationChange(conf);
    controller.getPins();
    controller.getPolygons();
    expect(pinSpy).toBeCalled();
    expect(polySpy).toBeCalled();
});

test("handlePopup", async () => {
    var pin = new MapPin(
        "mapPin",
        new Position(0, 0),
        1,
        TestHelper.getTestColor()
    );
    await controller.handlePopup(pin);
    expect(DataProvider.getStation).toBeCalled();
    expect(DataProvider.getLatestObservation).toBeCalled();
});

test("handleViewportChange", () => {
    var view = new Viewport(new Position(0, 0), 7);
    var viewSmallZoom = new Viewport(new Position(1, 1), 3);

    controller.handleViewportChange(view);
    expect(
        controller.getViewport().getCenter().getCoordinates()
    ).toStrictEqual({ lat: 0, lng: 0 });
    expect(controller.getViewport().getZoom()).toBe(7);
    controller.handleViewportChange(viewSmallZoom);
    expect(
        controller.getViewport().getCenter().getCoordinates()
    ).toStrictEqual({ lat: 1, lng: 1 });
    expect(controller.getViewport().getZoom()).toBe(5);
});

test("Feature/getFeatureConf", () => {
    var conf = new StationConfiguration(TestHelper.getTestFeature());
    controller.onConfigurationChange(conf);
    expect(controller.getFeatureSelectConf()).toStrictEqual({
        conf: conf.getId(),
        feature: TestHelper.FEATURE_ID,
    });

    expect(controller.getSelectedFeature().getId()).toStrictEqual(
        TestHelper.FEATURE_ID
    );
    var confList = [
        "StationConfiguration",
        "NearConfiguration",
        "PolygonConfiguration",
    ];
    confList.forEach((c) => {
        conf.getId = jest.fn(() => {
            return c;
        });
        controller.onConfigurationChange(conf);
        controller.changeFeature(TestHelper.getTestFeature());
        expect(controller.getFeatureSelectConf().conf).toStrictEqual(c);
    });
    conf.getId = jest.fn(() => {
        return "InvalidName";
    });
    controller.onConfigurationChange(conf);
    expect(() => {
        controller.changeFeature(TestHelper.getTestFeature());
    }).toThrow();
});

test("updateCurrentPosition", () => {
    controller.updateCurrentPosition(new Position(1, 2));
    expect(
        controller.getViewport().getCenter().getCoordinates()
    ).toStrictEqual({ lat: 1, lng: 2 });
});

test("Search", async () => {
    //Create mock
    var updatePositionSpy = jest.fn((position: Position) => {});
    var updateCurrentPosition = controller.updateCurrentPosition;

    controller.updateCurrentPosition = updatePositionSpy;
    await controller.search("Karlsruhe");
    expect(updatePositionSpy).toBeCalled();

    updatePositionSpy.mockClear();

    expect(await controller.search("")).toBeUndefined();

    //Restore original function
    controller.updateCurrentPosition = updateCurrentPosition;
});

test("City", async () => {
    controller.handleViewportChange(new Viewport(new Position(49, 8.4), 5)); //Karlsruhe
    expect(await controller.getCityName()).toStrictEqual("Karlsruhe");
    controller.handleViewportChange(new Viewport(new Position(48.9, -9.3), 5)); //in the ocean
    expect(await controller.getCityName()).toStrictEqual("?");
});
