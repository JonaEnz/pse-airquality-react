import { Polygon } from "../../Model/Polygon";
import { ObservationStation } from "../../Model/ObservationStation";
import { Position } from "../../Model/Position";
import { Color } from "../../Model/Color";
import { Observation } from "../../Model/Observation";
import TestHelper from "../TestHelper";

function getObservation(a: number, b: number, value: number) {
    return new Observation(
        getStation(a, b),
        TestHelper.getTestFeature(),
        value,
        new Date()
    );
}

function getStation(a: number, b: number): ObservationStation {
    return new ObservationStation(a + ":" + b, "", "", new Position(a, b), []);
}

var obs: Observation[] = [];

obs.push(getObservation(0, 0, 0));
obs.push(getObservation(1, 0, 1));
obs.push(getObservation(1, 1, 2));

var color = new Color(100, 100, 100);

var poly = new Polygon(obs, color);

test("Color", () => {
    expect(poly.getColor()).toStrictEqual(color);
    color = new Color(0, 0, 10);
    poly.setColor(color);
    expect(poly.getColor().getRGB()).toStrictEqual({ r: 0, g: 0, b: 10 });
});

test("Observation", () => {
    expect(poly.getObservations()).toStrictEqual(obs);
});

test("Average", () => {
    expect(poly.getAverageValue()).toBe(1);
    var emptyPoly = new Polygon([], TestHelper.getTestColor());
    expect(emptyPoly.getAverageValue()).toBe(0);
});
test("Stations", () => {
    var stations = obs.map((s) => s.getObservationStation());
    expect(poly.getStations()).toStrictEqual(stations);
});
