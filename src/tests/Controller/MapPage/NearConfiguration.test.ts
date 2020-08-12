import NearConfiguration from "../../../Controller/MapPage/NearConfiguration";
import TestHelper from "../../TestHelper";
import { Scale } from "../../../Model/Scale";
import { Viewport } from "../../../Model/Viewport";
import { Position } from "../../../Model/Position";
import DataProvider from "../../../Controller/Frost/DataProvider";

var conf = new NearConfiguration(TestHelper.getTestFeature());

test("getFeatures", () => {
    expect(conf.getFeatures()[0].getId()).toStrictEqual(TestHelper.FEATURE_ID);
});

test("getId", () => {
    expect(conf.getId()).toStrictEqual("NearConfiguration");
});

test("getScale", () => {
    expect(conf.getScale()).toBeInstanceOf(Scale);
});

test("getPins/Polygons", async () => {
    var view = new Viewport(new Position(0, 0), 5);

    expect(await conf.getPolygons(view)).toStrictEqual([]);

    var glo = DataProvider.getLatestObservations;
    DataProvider.getLatestObservations = jest.fn(async () => {
        return [TestHelper.getTestObservation(12)];
    });

    expect(await conf.getPins(view)).toHaveLength(1);

    DataProvider.getLatestObservations = glo;
});
