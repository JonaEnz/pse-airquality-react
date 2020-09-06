import DataProvider from '../../../Controller/Frost/DataProvider';
import { FrostResult } from '../../../Model/FrostResult';
import { Observation } from '../../../Model/Observation';
import { Position } from '../../../Model/Position';
import { ObservationStation } from '../../../Model/ObservationStation';
import { Feature } from '../../../Model/Feature';
import { Scale } from '../../../Model/Scale';
import { execPath } from 'process';


test("getLatestObservation()", () => {
    let fr = new FrostResult<Observation>(mockObservation, true, "");
    jest.spyOn(DataProvider.server, "request").mockImplementationOnce(() => Promise.resolve(fr));
    return DataProvider.getLatestObservation(mockObservationStation, mockFeature).then((res) => expect(res).toEqual(fr.getResult()));
});

test("getStation()", () => {
    let fr2 = new FrostResult<ObservationStation>(mockObservationStation, true, "");
    jest.spyOn(DataProvider.server, "request").mockImplementationOnce(() => Promise.resolve(fr2));
    return DataProvider.getStation("ObsMockID").then((res) => expect(res).toEqual(fr2.getResult()));
});

test("getLatestObservations()", () => {
    let fr = new FrostResult<Observation[]>([mockObservation], true, "");
    jest.spyOn(DataProvider.server, "request").mockImplementationOnce(() => Promise.resolve(fr));
    expect(DataProvider.getLatestObservations(mockPosition, 5, mockFeature).then((res) => expect(res).toEqual(fr)));
});

test("getObservations()", () => {
    let fr = new FrostResult<Observation[]>([mockObservation], true, "");
    jest.spyOn(DataProvider.server, "request").mockImplementationOnce(() => Promise.resolve(fr));
    return DataProvider.getObservations(mockObservationStation, mockFeature, mockDate, mockDate).then((res) => expect(res).toEqual(fr.getResult()));
});


const mockDate = new Date();
const mockPosition = new Position(9, 9);
const mockFeature = new Feature("FeatMockID", "", "", new Scale(true, {}), "", 0, "", [], "");
const mockObservationStation = new ObservationStation("ObsMockID", "mockName", "", mockPosition, [mockFeature]);
const mockObservation = new Observation(mockObservationStation, mockFeature, 5, mockDate);
