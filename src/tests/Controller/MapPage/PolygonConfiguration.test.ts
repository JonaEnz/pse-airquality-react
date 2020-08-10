import PolygonConfiguration from "../../../Controller/MapPage/PolygonConfiguration";
import TestHelper from "../../TestHelper";
import { Scale } from "../../../Model/Scale";
import { Viewport } from "../../../Model/Viewport";
import { Position } from "../../../Model/Position";
import DataProvider from "../../../Controller/Frost/DataProvider";
import { Observation } from "../../../Model/Observation";

var conf = new PolygonConfiguration(TestHelper.getTestFeature());

test("getFeatures", () => {
    expect(conf.getFeatures()[0].getId()).toStrictEqual(TestHelper.FEATURE_ID);
});

test("getId", () => {
    expect(conf.getId()).toStrictEqual("PolygonConfiguration");
});

test("getScale", () => {
    expect(conf.getScale()).toBeInstanceOf(Scale);
});

test("getPins/Polygons", async () => {
    var view = new Viewport(new Position(0, 0), 5);

    expect(await conf.getPins(view)).toStrictEqual([]);

    var glo = DataProvider.getLatestObservations;
    DataProvider.getLatestObservations = jest.fn(async () => {
        var now = Date.now();
        return [
            new Observation(
                TestHelper.getTestObservationStation(0, 0),
                TestHelper.getTestFeature(),
                1,
                new Date(now)
            ),
            new Observation(
                TestHelper.getTestObservationStation(0, 1),
                TestHelper.getTestFeature(),
                1,
                new Date(now)
            ),
            new Observation(
                TestHelper.getTestObservationStation(1, 0),
                TestHelper.getTestFeature(),
                1,
                new Date(now)
            ),
        ];
    });

    expect(await conf.getPolygons(view)).toHaveLength(1);

    DataProvider.getLatestObservations = glo;
});
