import { GetObservationsFactory, GetObservationsBuilder, GetObservationsConverter } from "../../../../Controller/Frost/factories/GetObservations";
import { ObservationStation } from "../../../../Model/ObservationStation";
import { Position } from "../../../../Model/Position";
import { Scale } from "../../../../Model/Scale";
import { Feature } from "../../../../Model/Feature";
import { Observation } from "../../../../Model/Observation";

test("GetObservationsFactory constructor and getter Methods", () => {
    let ff = new GetObservationsFactory();
    expect(ff.getConverter()).toStrictEqual(new GetObservationsConverter());
    expect(ff.getQueryBuilder()).toStrictEqual(new GetObservationsBuilder());
});

test("GetObservationsBuilder", () => {
    let b = new GetObservationsBuilder();
    let query = b.getQuery(mockOptions);
    expect(query).toMatch(/Thing\/@iot.id eq 'mockID'/);
    expect(query).toMatch(/ObservedProperty\/@iot.id eq 'mockID'/);
});

test("GetObservationsConverter", () => {
    let c = new GetObservationsConverter();
    let obs: Observation[] = c.convert(testJson, mockOptions);
    expect(obs[0].getValue()).toBe(testJson.value[0].Observations[0].result);
    expect(obs[1].getTimeStamp()).toStrictEqual(new Date(testJson.value[0].Observations[1].phenomenonTime));
    expect(obs[0].getFeature()).toBe(mockFeature);
    expect(obs[2].getObservationStation()).toBe(mockOptions.station);
    expect(() => c.convert(testJsonFail, mockOptions)).toThrowError();
});

const mockFeature = new Feature("mockID", "", "", new Scale(true, {}), "", 0, "", [], "");
const mockOptions = { station: new ObservationStation("mockID", "mockName", "", new Position(9, 9), [mockFeature]), feature: mockFeature, start: new Date(), end: new Date() }


const testJson = {
    "value": [{
        "Observations": [{
            "phenomenonTime": "2020-08-07T22:11:28.000Z",
            "resultTime": "2020-08-07T22:11:28.000Z",
            "result": 17.4,
            "@iot.id": "saqn:o:g309660069fb156e1facc3bbc2113a14fbf4dd917",
            "@iot.selfLink": "https://api.smartaq.net/v1.0/Observations('saqn%3Ao%3Ag309660069fb156e1facc3bbc2113a14fbf4dd917')"
        }, {
            "phenomenonTime": "2020-08-07T22:06:28.000Z",
            "resultTime": "2020-08-07T22:06:28.000Z",
            "result": 17.4,
            "@iot.id": "saqn:o:g11c5222bca714b175a68aed281dce415aceb9690",
            "@iot.selfLink": "https://api.smartaq.net/v1.0/Observations('saqn%3Ao%3Ag11c5222bca714b175a68aed281dce415aceb9690')"
        }, {
            "phenomenonTime": "2020-08-07T22:01:27.000Z",
            "resultTime": "2020-08-07T22:01:27.000Z",
            "result": 17.6,
            "@iot.id": "saqn:o:g7f169d1158fc62d9cfb408e1ea9f223e71431f5e",
            "@iot.selfLink": "https://api.smartaq.net/v1.0/Observations('saqn%3Ao%3Ag7f169d1158fc62d9cfb408e1ea9f223e71431f5e')"
        }],
        "@iot.id": "saqn:ds:db248ac"
    }]
}

const testJsonFail = { "hello am wrong json": "lul" };