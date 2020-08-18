import RequestReducer from "../../Controller/DiagramController/RequestReducer";
import DataProvider from "../../Controller/Frost/DataProvider";
import TestHelper from "../TestHelper";
import { Observation } from "../../Model/Observation";

var mockProvider = jest.mock("../../Controller/Frost/DataProvider");

DataProvider.getObservations = jest.fn(
    async (station, feature, start: Date, end: Date) => {
        var date = new Date(start.getTime());
        var observations: Observation[] = [];
        var value = Math.floor(Math.random() * 1000) / 10;
        while (date < end) {
            observations.push(new Observation(station, feature, value, date));

            value += (Math.random() * 100) / 10 - 5;
            date.setMinutes(date.getMinutes() + 5);
        }
        return observations;
    }
);

test("GetDataForDay", async () => {
    var day = await RequestReducer.GetDataForDay(
        new Date(),
        TestHelper.getTestObservationStation(),
        TestHelper.getTestFeature()
    );
    expect(day.length).toBe(3);
});

test("GetDataForMonth", async () => {
    var day = await RequestReducer.getDataByMonth(
        new Date(),
        TestHelper.getTestObservationStation(),
        TestHelper.getTestFeature()
    );
    expect(day.length).toBeGreaterThanOrEqual(3 * 28);
    expect(day.length).toBeLessThanOrEqual(3 * 33);
});

test("GetDataForYear", async () => {
    var day = await RequestReducer.getDataByYear(
        new Date(),
        TestHelper.getTestObservationStation(),
        TestHelper.getTestFeature()
    );
    expect(day.length).toBe(3 * 4 * 12);
});

test("Data request empty", async () => {
    DataProvider.getObservations = jest.fn(
        async (station, feature, start: Date, end: Date) => {
            return [];
        }
    );
    var day = await RequestReducer.GetDataForDay(
        new Date(),
        TestHelper.getTestObservationStation(),
        TestHelper.getTestFeature()
    );
    expect(day.length).toBe(0);
});
