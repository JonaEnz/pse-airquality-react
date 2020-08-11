import { Polygon } from "../../Model/Polygon";
import { ObservationStation } from "../../Model/ObservationStation";
import { Position } from "../../Model/Position";
import { Color } from "../../Model/Color";

function getStation(a: number, b: number): ObservationStation {
    return new ObservationStation(a + ":" + b, "", "", new Position(a, b), []);
}

var stations: ObservationStation[] = [];
stations.push(getStation(0, 0));
stations.push(getStation(1, 0));
stations.push(getStation(1, 1));

var color = new Color(100, 100, 100);

var poly = new Polygon(stations, color);

test("Color", () => {
    expect(poly.getColor()).toStrictEqual(color);
    color = new Color(0, 0, 10);
    poly.setColor(color);
    expect(poly.getColor().getRGB()).toStrictEqual({ r: 0, g: 0, b: 10 });
});

test("Stations", () => {
    expect(poly.getStations()).toStrictEqual(stations);
});
