import { Position } from "../../Model/Position";

var pos = new Position(0, 0);

test("getString()", () => {
    expect(pos.getString()).toBe("0 °N 0 °O");
});

test("getCoordinates()", () => {
    expect(pos.getCoordinates()).toStrictEqual({ lat: 0, lng: 0 });
});

test("get Distance", () => {
    expect(pos.getDistance(new Position(2, 2))).toBe(Math.sqrt(8));
});

test("Invalid coordinates", () => {
    expect(() => new Position(100, -20)).toThrowError();
});
