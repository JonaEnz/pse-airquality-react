import { Viewport } from "../../Model/Viewport";
import { Position } from "../../Model/Position";

var viewport = new Viewport(new Position(0, 0), 10);

test("Getter", () => {
    expect(viewport.getCenter().getCoordinates()).toStrictEqual({
        lat: 0,
        lng: 0,
    });
    expect(viewport.getZoom()).toBe(10);
    expect(viewport.getRadius()).toBe(10);
});

test("Setter", () => {
    viewport.setCenter(new Position(10, 5));
    expect(viewport.getCenter().getCoordinates()).toStrictEqual({
        lat: 10,
        lng: 5,
    });
    viewport.setZoom(2);
    expect(viewport.getZoom()).toBe(2);
    expect(viewport.getRadius()).toBe(2);
});

test("Zoom >= 1", () => {
    viewport.setZoom(0);
    var v2 = new Viewport(new Position(0, 0), -1);
    expect(viewport.getZoom()).toBe(1);
    expect(v2.getZoom()).toBe(1);
});
