import { MapPin } from "../../Model/MapPin";
import TestHelper from "../TestHelper";
import { Position } from "../../Model/Position";

var mapPin = new MapPin(
    "testId",
    new Position(3, 4),
    20,
    TestHelper.getTestColor()
);

test("Getters", () => {
    expect(mapPin.getId()).toStrictEqual("testId");
    expect(mapPin.getPosition().getCoordinates()).toStrictEqual({
        lat: 3,
        lng: 4,
    });
    expect(mapPin.getValue()).toBe(20);
    expect(mapPin.getColor().getRGB()).not.toBeNull();
});

test("Setters", () => {
    var rnd = Math.random() * 100;
    mapPin.setValue(rnd);
    expect(mapPin.getValue()).toBe(rnd);
    mapPin.setPosition(new Position(12, 34));
    expect(mapPin.getPosition().getCoordinates()).toStrictEqual({
        lat: 12,
        lng: 34,
    });
});
