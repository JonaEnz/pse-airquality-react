import { GetLatestObservationFactory, GetLatestObservationBuilder, GetLatestObservationConverter } from "../../../../Controller/Frost/factories/GetLatestObservation";
import { ObservationStation } from "../../../../Model/ObservationStation";
import { Position } from "../../../../Model/Position";
import { Feature } from "../../../../Model/Feature";
import { Scale } from "../../../../Model/Scale";
import { Observation } from "../../../../Model/Observation";



test("GetLatestObservation constructor and getter Methods", () => {
    let ff = new GetLatestObservationFactory();
    expect(ff.getConverter()).toStrictEqual(new GetLatestObservationConverter());
    expect(ff.getQueryBuilder()).toStrictEqual(new GetLatestObservationBuilder());
});

test("GetLatestObservationBuilder", () => {
    let b = new GetLatestObservationBuilder();
    let query = b.getQuery(mockOptions);
    expect(query).toMatch(/Thing\/@iot.id eq 'ObsMockID'/);
    expect(query).toMatch(/ObservedProperty\/@iot.id eq 'FeatMockID'/);
});

test("GetLatestObservationConverter", () => {
    let c = new GetLatestObservationConverter();
    let obs: Observation = c.convert(testJson, mockOptions);
    expect(obs.getValue()).toEqual(testJson.value[0].Observations[0].result);
    expect(obs.getTimeStamp()).toEqual(new Date(testJson.value[0].Observations[0].phenomenonTime));
    expect(() => c.convert(testJsonFail, mockOptions)).toThrowError();
});


const mockFeature = new Feature("FeatMockID", "", "", new Scale(true, {}), "", 0, "", [], "");
const mockOptions = { station: new ObservationStation("ObsMockID", "mockName", "", new Position(9, 9), [mockFeature]), feature: mockFeature };

const testJson = {
    "value": [{
        "Observations": [{
            "phenomenonTime": "2020-08-27T04:15:06.000Z",
            "result": 0.22
        }],
        "Observations@iot.nextLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3Ac07efb5')/Observations?$top=1&$skip=1&$select=result,phenomenonTime&$orderby=phenomenonTime+desc",
        "@iot.id": "saqn:ds:c07efb5"
    }]
};
const testJsonFail = { "hello am wrong json": "lul" };