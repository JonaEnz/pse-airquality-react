import { GetStationFactory, GetStationBuilder, GetStationConverter } from "../../../../Controller/Frost/factories/GetStation";
import { ObservationStation } from "../../../../Model/ObservationStation";

test("GetStationFactory constructor and getter Methods", () => {
    let ff = new GetStationFactory();
    expect(ff.getConverter()).toStrictEqual(new GetStationConverter());
    expect(ff.getQueryBuilder()).toStrictEqual(new GetStationBuilder());
});

test("GetStationBuilder", () => {
    let b = new GetStationBuilder();
    expect(b.getQuery({ id: "mockID" })).toMatch(/mockID/);
});

test("GetStationConverter", () => {
    let c = new GetStationConverter();
    let obs: ObservationStation = c.convert(testJson, { id: "mockID" });
    expect(obs.getDescription()).toBe(testJson.description);
    expect(obs.getFeatures()[0].getId()).toBe(testJson.Datastreams[0].ObservedProperty["@iot.id"]);
    expect(obs.getPosition().getLatitude()).toBe(testJson.Locations[0].location.coordinates[1]);
    expect(() => c.convert(testJsonFail, { id: "mockID" })).toThrowError();
});



const testJson = {
    "name": "Crowdsensing Node (SDS011, 179552)",
    "description": "Low Cost Node Measuring Particulate Matter",
    "Datastreams": [{
        "name": "PM2.5 Datastream of Crowdsensing Node (SDS011, 179552)",
        "description": "Datastream for recording Particulate Matter",
        "properties": {
            "license": {
                "type": "CC0 1.0",
                "owner": "TECO",
                "metadata": "https://creativecommons.org/publicdomain/zero/1.0/deed.de"
            }
        },
        "observationType": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
        "observedArea": {
            "type": "Point",
            "coordinates": [8.4158, 49.01262]
        },
        "phenomenonTime": "2019-07-02T15:23:52.000Z/2019-09-20T14:17:17.000Z",
        "resultTime": "2019-07-02T15:23:52.000Z/2019-09-20T14:17:17.000Z",
        "unitOfMeasurement": {
            "name": "microgram per cubic meter",
            "symbol": "ug/m^3",
            "definition": "http://www.qudt.org/qudt/owl/1.0.0/unit/Instances.html#KilogramPerCubicMeter"
        },
        "ObservedProperty": {
            "@iot.id": "saqn:op:mcpm2p5"
        },
        "@iot.id": "saqn:ds:7540858",
        "@iot.selfLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A7540858')"
    }, {
        "name": "Air Temperature Datastream of Crowdsensing Node (BME280, 179552)",
        "description": "Datastream for recording temperature",
        "properties": {
            "license": {
                "type": "CC0 1.0",
                "owner": "TECO",
                "metadata": "https://creativecommons.org/publicdomain/zero/1.0/deed.de"
            }
        },
        "observationType": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
        "observedArea": {
            "type": "Point",
            "coordinates": [8.4158, 49.01262]
        },
        "phenomenonTime": "2019-07-02T15:23:52.000Z/2019-09-20T14:17:17.000Z",
        "resultTime": "2019-07-02T15:23:52.000Z/2019-09-20T14:17:17.000Z",
        "unitOfMeasurement": {
            "name": "Degree Celsius",
            "symbol": "degC",
            "definition": "http://www.qudt.org/qudt/owl/1.0.0/unit/Instances.html#DegreeCelsius"
        },
        "ObservedProperty": {
            "@iot.id": "saqn:op:ta"
        },
        "@iot.id": "saqn:ds:0b4ae62",
        "@iot.selfLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A0b4ae62')"
    }, {
        "name": "Relative Humidity Datastream of Crowdsensing Node (BME280, 179552)",
        "description": "Datastream for recording relative humidity",
        "properties": {
            "license": {
                "type": "CC0 1.0",
                "owner": "TECO",
                "metadata": "https://creativecommons.org/publicdomain/zero/1.0/deed.de"
            }
        },
        "observationType": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
        "observedArea": {
            "type": "Point",
            "coordinates": [8.4158, 49.01262]
        },
        "phenomenonTime": "2019-07-02T15:23:52.000Z/2019-09-20T14:17:17.000Z",
        "resultTime": "2019-07-02T15:23:52.000Z/2019-09-20T14:17:17.000Z",
        "unitOfMeasurement": {
            "name": "percent",
            "symbol": "%",
            "definition": "http://www.qudt.org/qudt/owl/1.0.0/unit/Instances.html#Percent"
        },
        "ObservedProperty": {
            "@iot.id": "saqn:op:hur"
        },
        "@iot.id": "saqn:ds:9421df3",
        "@iot.selfLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A9421df3')"
    }, {
        "name": "Atmospheric Pressure Datastream of Crowdsensing Node (BME280, 179552)",
        "description": "Datastream for recording pressure",
        "properties": {
            "license": {
                "type": "CC0 1.0",
                "owner": "TECO",
                "metadata": "https://creativecommons.org/publicdomain/zero/1.0/deed.de"
            }
        },
        "observationType": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
        "observedArea": {
            "type": "Point",
            "coordinates": [8.4158, 49.01262]
        },
        "phenomenonTime": "2019-07-02T15:23:52.000Z/2019-09-20T14:17:17.000Z",
        "resultTime": "2019-07-02T15:23:52.000Z/2019-09-20T14:17:17.000Z",
        "unitOfMeasurement": {
            "name": "Hectopascal",
            "symbol": "hPa",
            "definition": "http://www.qudt.org/qudt/owl/1.0.0/unit/Instances.html#Pascal"
        },
        "ObservedProperty": {
            "@iot.id": "saqn:op:plev"
        },
        "@iot.id": "saqn:ds:fad3ed9",
        "@iot.selfLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3Afad3ed9')"
    }, {
        "name": "PM10 Datastream of Crowdsensing Node (SDS011, 179552)",
        "description": "Datastream for recording Particulate Matter",
        "properties": {
            "license": {
                "type": "CC0 1.0",
                "owner": "TECO",
                "metadata": "https://creativecommons.org/publicdomain/zero/1.0/deed.de"
            }
        },
        "observationType": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
        "observedArea": {
            "type": "Point",
            "coordinates": [8.4158, 49.01262]
        },
        "phenomenonTime": "2019-07-02T15:23:52.000Z/2019-09-20T14:17:17.000Z",
        "resultTime": "2019-07-02T15:23:52.000Z/2019-09-20T14:17:17.000Z",
        "unitOfMeasurement": {
            "name": "microgram per cubic meter",
            "symbol": "ug/m^3",
            "definition": "http://www.qudt.org/qudt/owl/1.0.0/unit/Instances.html#KilogramPerCubicMeter"
        },
        "ObservedProperty": {
            "@iot.id": "saqn:op:mcpm10"
        },
        "@iot.id": "saqn:ds:23bc103",
        "@iot.selfLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A23bc103')"
    }],
    "Datastreams@iot.count": 5,
    "Locations": [{
        "location": {
            "type": "Point",
            "coordinates": [8.4158, 49.01262]
        }
    }],
    "@iot.id": "saqn:t:7bd2cd3"
};

const testJsonFail = {
    "name": "Crowdsensing Node (SDS011, 179552)",
    "description": "Low Cost Node Measuring Particulate Matter",
    "Datastreams": [{
        "name": "PM2.5 Datastream of Crowdsensing Node (SDS011, 179552)",
        "description": "Datastream for recording Particulate Matter",
        "properties": {
            "license": {
                "type": "CC0 1.0",
                "owner": "TECO",
                "metadata": "https://creativecommons.org/publicdomain/zero/1.0/deed.de"
            }
        },
        "observationType": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
        "observedArea": {
            "type": "Point",
            "coordinates": [8.4158, 49.01262]
        },
        "phenomenonTime": "2019-07-02T15:23:52.000Z/2019-09-20T14:17:17.000Z",
        "resultTime": "2019-07-02T15:23:52.000Z/2019-09-20T14:17:17.000Z",
        "unitOfMeasurement": {
            "name": "microgram per cubic meter",
            "symbol": "ug/m^3",
            "definition": "http://www.qudt.org/qudt/owl/1.0.0/unit/Instances.html#KilogramPerCubicMeter"
        },
        "ObservedProperty": {
            "@iot.id": "saqn:op:mcpm2p5"
        },
        "@iot.id": "saqn:ds:7540858",
        "@iot.selfLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A7540858')"
    }, {
        "name": "Air Temperature Datastream of Crowdsensing Node (BME280, 179552)",
        "description": "Datastream for recording temperature",
        "properties": {
            "license": {
                "type": "CC0 1.0",
                "owner": "TECO",
                "metadata": "https://creativecommons.org/publicdomain/zero/1.0/deed.de"
            }
        },
        "observationType": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
        "observedArea": {
            "type": "Point",
            "coordinates": [8.4158, 49.01262]
        },
        "phenomenonTime": "2019-07-02T15:23:52.000Z/2019-09-20T14:17:17.000Z",
        "resultTime": "2019-07-02T15:23:52.000Z/2019-09-20T14:17:17.000Z",
        "unitOfMeasurement": {
            "name": "Degree Celsius",
            "symbol": "degC",
            "definition": "http://www.qudt.org/qudt/owl/1.0.0/unit/Instances.html#DegreeCelsius"
        },
        "ObservedProperty": {
            "@iot.id": "saqn:op:ta"
        },
        "@iot.id": "saqn:ds:0b4ae62",
        "@iot.selfLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A0b4ae62')"
    }, {
        "name": "Relative Humidity Datastream of Crowdsensing Node (BME280, 179552)",
        "description": "Datastream for recording relative humidity",
        "properties": {
            "license": {
                "type": "CC0 1.0",
                "owner": "TECO",
                "metadata": "https://creativecommons.org/publicdomain/zero/1.0/deed.de"
            }
        },
        "observationType": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
        "observedArea": {
            "type": "Point",
            "coordinates": [8.4158, 49.01262]
        },
        "phenomenonTime": "2019-07-02T15:23:52.000Z/2019-09-20T14:17:17.000Z",
        "resultTime": "2019-07-02T15:23:52.000Z/2019-09-20T14:17:17.000Z",
        "unitOfMeasurement": {
            "name": "percent",
            "symbol": "%",
            "definition": "http://www.qudt.org/qudt/owl/1.0.0/unit/Instances.html#Percent"
        },
        "ObservedProperty": {
            "@iot.id": "saqn:op:hur"
        },
        "@iot.id": "saqn:ds:9421df3",
        "@iot.selfLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A9421df3')"
    }, {
        "name": "Atmospheric Pressure Datastream of Crowdsensing Node (BME280, 179552)",
        "description": "Datastream for recording pressure",
        "properties": {
            "license": {
                "type": "CC0 1.0",
                "owner": "TECO",
                "metadata": "https://creativecommons.org/publicdomain/zero/1.0/deed.de"
            }
        },
        "observationType": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
        "observedArea": {
            "type": "Point",
            "coordinates": [8.4158, 49.01262]
        },
        "phenomenonTime": "2019-07-02T15:23:52.000Z/2019-09-20T14:17:17.000Z",
        "resultTime": "2019-07-02T15:23:52.000Z/2019-09-20T14:17:17.000Z",
        "unitOfMeasurement": {
            "name": "Hectopascal",
            "symbol": "hPa",
            "definition": "http://www.qudt.org/qudt/owl/1.0.0/unit/Instances.html#Pascal"
        },
        "ObservedProperty": {
            "@iot.id": "saqn:op:plev"
        },
        "@iot.id": "saqn:ds:fad3ed9",
        "@iot.selfLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3Afad3ed9')"
    }, {
        "name": "PM10 Datastream of Crowdsensing Node (SDS011, 179552)",
        "description": "Datastream for recording Particulate Matter",
        "properties": {
            "license": {
                "type": "CC0 1.0",
                "owner": "TECO",
                "metadata": "https://creativecommons.org/publicdomain/zero/1.0/deed.de"
            }
        },
        "observationType": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
        "observedArea": {
            "type": "Point",
            "coordinates": [8.4158, 49.01262]
        },
        "phenomenonTime": "2019-07-02T15:23:52.000Z/2019-09-20T14:17:17.000Z",
        "resultTime": "2019-07-02T15:23:52.000Z/2019-09-20T14:17:17.000Z",
        "unitOfMeasurement": {
            "name": "microgram per cubic meter",
            "symbol": "ug/m^3",
            "definition": "http://www.qudt.org/qudt/owl/1.0.0/unit/Instances.html#KilogramPerCubicMeter"
        },
        "ObservedProperty": {
            "@iot.id": "saqn:op:mcpm10"
        },
        "@iot.id": "saqn:ds:23bc103",
        "@iot.selfLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A23bc103')"
    }],
    "Datastreams@iot.count": 5,
    "Locations": [],
    "@iot.id": "saqn:t:7bd2cd3"
};
