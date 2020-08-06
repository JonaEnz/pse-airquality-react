import { Observation } from "../../Model/Observation";
import { ObservationStation } from "../../Model/ObservationStation";
import { Position } from "../../Model/Position";
import { Feature } from "../../Model/Feature";
import { Scale } from "../../Model/Scale";

var feature = new Feature(
    "id",
    "nameId",
    "descId",
    new Scale(false, {}),
    "web",
    0,
    "uoM",
    [],
    "icon"
);
var station = new ObservationStation(
    "stationId",
    "name",
    "desc",
    new Position(0, 0),
    []
);
var now = Date.now();
var obs = new Observation(station, feature, 99, new Date(now));

test("getObsStation()", () => {
    expect(obs.getObservationStation()).toStrictEqual(station);
});

test("getFeature()", () => {
    expect(obs.getFeature()).toStrictEqual(feature);
});

test("getValue()", () => {
    expect(obs.getValue()).toBe(99);
});

test("getTimeStamp()", () => {
    expect(obs.getTimeStamp().getTime()).toBe(now);
});
