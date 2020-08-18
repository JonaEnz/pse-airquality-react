import { GetLatestObservationsFactory, GetLatestObservationsBuilder, GetLatestObservationsConverter } from "../../../../Controller/Frost/factories/GetLatestObservations";
import { ObservationStation } from "../../../../Model/ObservationStation";
import { Position } from "../../../../Model/Position";
import { Feature } from "../../../../Model/Feature";
import { Scale } from "../../../../Model/Scale";
import { Observation } from "../../../../Model/Observation";

test("GetLatestObservations constructor and getter Methods", () => {
    let ff = new GetLatestObservationsFactory();
    expect(ff.getConverter()).toStrictEqual(new GetLatestObservationsConverter());
    expect(ff.getQueryBuilder()).toStrictEqual(new GetLatestObservationsBuilder());
});

test("GetLatestObservationsBuilder", () => {
    let b = new GetLatestObservationsBuilder();
    let query = b.getQuery(mockOptions);
    expect(query).toMatch(/mockID/);
    expect(query).toMatch(/(9 9)/);
    expect(query).toMatch(/3/);
});

test("GetLatestObservationsConverter", () => {
    let c = new GetLatestObservationsConverter();
    let obs: Observation[] = c.convert(testJson, { center: new Position(9, 9), radius: 3, feature: new Feature("mockID", "", "", new Scale(true, {}), "", 0, "", [], "") });
    expect(obs[2].getValue()).toBe(testJson.value[3].Observations[0].result);
    expect(obs[0].getObservationStation().getId()).toBe(testJson.value[1].Thing["@iot.id"]);
    expect(obs[5].getFeature().getId()).toBe(mockOptions.feature.getId());
    expect(obs[4].getObservationStation().getDescription()).toBe(testJson.value[5].Thing.description);
    expect(obs[1].getTimeStamp()).toStrictEqual(new Date(testJson.value[2].Observations[0].phenomenonTime));
    expect(c.convert(testJsonFail, mockOptions)).toStrictEqual([]);
});

const mockOptions = { center: new Position(9, 9), radius: 3, feature: new Feature("mockID", "", "", new Scale(true, {}), "", 0, "", [], "") };


const testJson = {
    "value": [{
        "name": "PM2.5 Datastream of Crowdsensing Node (SDS011, 181804)",
        "Thing": {
            "name": "Crowdsensing Node (SDS011, 181804)",
            "description": "Low Cost Node Measuring Particulate Matter",
            "Datastreams": [{
                "name": "Relative Humidity Datastream of Crowdsensing Node (BME280, 181804)",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:hur"
                }
            }, {
                "name": "Air Temperature Datastream of Crowdsensing Node (BME280, 181804)",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:ta"
                }
            }, {
                "name": "PM2.5 Datastream of Crowdsensing Node (SDS011, 181804)",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm2p5"
                }
            }, {
                "name": "Atmospheric Pressure Datastream of Crowdsensing Node (BME280, 181804)",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:plev"
                }
            }, {
                "name": "PM10 Datastream of Crowdsensing Node (SDS011, 181804)",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm10"
                }
            }],
            "Locations": [{
                "location": {
                    "type": "Point",
                    "coordinates": [10.89808, 48.33591]
                }
            }],
            "@iot.id": "saqn:t:e82832a"
        },
        "Observations": [],
        "@iot.id": "saqn:ds:0017e98"
    }, {
        "name": "PM2.5 Datastream",
        "Thing": {
            "name": "Crowdsensing Node IGUA, SDS011, saqn:t:154390b",
            "description": "Low Cost Node Measuring Particulate Matter",
            "Datastreams": [{
                "name": "Relative Humidity Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:hur"
                }
            }, {
                "name": "Air Temperature Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:ta"
                }
            }, {
                "name": "PM2.5 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm2p5"
                }
            }, {
                "name": "PM10 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm10"
                }
            }],
            "Locations": [{
                "location": {
                    "type": "Point",
                    "coordinates": [10.898084509677506, 48.33590800003596, 3.8]
                }
            }],
            "@iot.id": "saqn:t:154390b"
        },
        "Observations": [{
            "phenomenonTime": "2020-08-18T21:15:00.000Z",
            "result": 1.3
        }],
        "Observations@iot.nextLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A0461ecf')/Observations?$top=1&$skip=1&$select=result,phenomenonTime&$filter=%28phenomenonTime+gt+%28now%28%29+sub+duration%27P1D%27%29%29&$orderby=phenomenonTime+desc",
        "@iot.id": "saqn:ds:0461ecf"
    }, {
        "name": "Grimm EDM80NEPH PM2.5 Datastream",
        "Thing": {
            "name": "Scientific Scout EDM80 NEPH SN17023",
            "description": "Mid Cost Device Measuring Particulate Matter",
            "Datastreams": [{
                "name": "Grimm EDM80NEPH Ambient Relative Humidity Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:hur"
                }
            }, {
                "name": "Grimm EDM80NEPH Device Temperature Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:td"
                }
            }, {
                "name": "Grimm EDM80NEPH Ambient Temperature Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:ta"
                }
            }, {
                "name": "Grimm EDM80NEPH PM1 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm1"
                }
            }, {
                "name": "Grimm EDM80NEPH PM2.5 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm2p5"
                }
            }, {
                "name": "Grimm EDM80NEPH PM4 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm4"
                }
            }, {
                "name": "Grimm EDM80NEPH PM10 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm10"
                }
            }, {
                "name": "No Zero",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:cal_edm80neph_no_zero"
                }
            }, {
                "name": "Zero N-1",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:cal_edm80neph_zero_N-1"
                }
            }, {
                "name": "Offset-Bestimmung (Auto-Zero)",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:cal_edm80neph_zero_det"
                }
            }],
            "Locations": [{
                "location": {
                    "type": "Point",
                    "coordinates": [10.907003, 48.308047]
                }
            }],
            "@iot.id": "saqn:t:grimm-aerosol.com:EDM80NEPH:SN17023"
        },
        "Observations": [{
            "phenomenonTime": "2020-08-18T13:59:08.000Z",
            "result": 25.9
        }],
        "Observations@iot.nextLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A068f0e8')/Observations?$top=1&$skip=1&$select=result,phenomenonTime&$filter=%28phenomenonTime+gt+%28now%28%29+sub+duration%27P1D%27%29%29&$orderby=phenomenonTime+desc",
        "@iot.id": "saqn:ds:068f0e8"
    }, {
        "name": "PM2.5 Datastream of Crowdsensing Node (SDS011)",
        "Thing": {
            "name": "Crowdsensing Node (SDS011, 5684389, IGUA)",
            "description": "Low Cost Node Measuring Particulate Matter",
            "Datastreams": [{
                "name": "Relative Humidity Datastream of Crowdsensing Node (BME280)",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:hur"
                }
            }, {
                "name": "Air Temperature Datastream of Crowdsensing Node (BME280)",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:ta"
                }
            }, {
                "name": "PM2.5 Datastream of Crowdsensing Node (SDS011)",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm2p5"
                }
            }, {
                "name": "PM10 Datastream of Crowdsensing Node (SDS011)",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm10"
                }
            }],
            "Locations": [{
                "location": {
                    "type": "Point",
                    "coordinates": [10.838060049, 48.348615458, 2.0]
                }
            }],
            "@iot.id": "saqn:t:94d5923"
        },
        "Observations": [{
            "phenomenonTime": "2020-08-18T21:16:17.000Z",
            "result": 750.28
        }],
        "Observations@iot.nextLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A077a3ec')/Observations?$top=1&$skip=1&$select=result,phenomenonTime&$filter=%28phenomenonTime+gt+%28now%28%29+sub+duration%27P1D%27%29%29&$orderby=phenomenonTime+desc",
        "@iot.id": "saqn:ds:077a3ec"
    }, {
        "name": "PM2.5 Datastream",
        "Thing": {
            "name": "Crowdsensing Node IGUA, SDS011, saqn:t:052903d",
            "description": "Low Cost Node Measuring Particulate Matter",
            "Datastreams": [{
                "name": "Relative Humidity Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:hur"
                }
            }, {
                "name": "Air Temperature Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:ta"
                }
            }, {
                "name": "PM10 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm10"
                }
            }, {
                "name": "PM2.5 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm2p5"
                }
            }],
            "Locations": [{
                "location": {
                    "type": "Point",
                    "coordinates": [10.898084509677506, 48.33590800003596, 3.8]
                }
            }],
            "@iot.id": "saqn:t:052903d"
        },
        "Observations": [{
            "phenomenonTime": "2020-08-18T21:18:20.000Z",
            "result": 1.35
        }],
        "Observations@iot.nextLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A0898f28')/Observations?$top=1&$skip=1&$select=result,phenomenonTime&$filter=%28phenomenonTime+gt+%28now%28%29+sub+duration%27P1D%27%29%29&$orderby=phenomenonTime+desc",
        "@iot.id": "saqn:ds:0898f28"
    }, {
        "name": "PM2.5 Datastream",
        "Thing": {
            "name": "Scientific Scout EDM80 OPC SN19001",
            "description": "Mid Cost Device Measuring Particulate Matter",
            "Datastreams": [{
                "name": "Air Temperature Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:ta"
                }
            }, {
                "name": "Relative Humidity Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:hur"
                }
            }, {
                "name": "PM1 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm1"
                }
            }, {
                "name": "PM2.5 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm2p5"
                }
            }, {
                "name": "PM10 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm10"
                }
            }, {
                "name": "Number concentration PM10 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:ncpm10"
                }
            }],
            "Locations": [{
                "location": {
                    "type": "Point",
                    "coordinates": [10.856162, 48.389605, 83.7]
                }
            }],
            "@iot.id": "saqn:t:grimm-aerosol.com:crowdsensor:SN19001"
        },
        "Observations": [{
            "phenomenonTime": "2020-08-18T18:25:06.000Z",
            "result": 3.92
        }],
        "Observations@iot.nextLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A08af5f5')/Observations?$top=1&$skip=1&$select=result,phenomenonTime&$filter=%28phenomenonTime+gt+%28now%28%29+sub+duration%27P1D%27%29%29&$orderby=phenomenonTime+desc",
        "@iot.id": "saqn:ds:08af5f5"
    }, {
        "name": "PM2.5 Datastream",
        "Thing": {
            "name": "Scientific Scout EDM80 OPC SN19013",
            "description": "Mid Cost Device Measuring Particulate Matter",
            "Datastreams": [{
                "name": "Number concentration PM10 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:ncpm10"
                }
            }, {
                "name": "Relative Humidity Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:hur"
                }
            }, {
                "name": "PM2.5 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm2p5"
                }
            }, {
                "name": "PM10 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm10"
                }
            }, {
                "name": "Air Temperature Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:ta"
                }
            }, {
                "name": "PM1 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm1"
                }
            }],
            "Locations": [{
                "location": {
                    "type": "Point",
                    "coordinates": [10.894782, 48.347965, 7.3]
                }
            }],
            "@iot.id": "saqn:t:grimm-aerosol.com:crowdsensor:SN19013"
        },
        "Observations": [{
            "phenomenonTime": "2020-08-18T11:55:06.000Z",
            "result": 1.71
        }],
        "Observations@iot.nextLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A0e78f05')/Observations?$top=1&$skip=1&$select=result,phenomenonTime&$filter=%28phenomenonTime+gt+%28now%28%29+sub+duration%27P1D%27%29%29&$orderby=phenomenonTime+desc",
        "@iot.id": "saqn:ds:0e78f05"
    }, {
        "name": "PM2.5 Datastream",
        "Thing": {
            "name": "Scientific Scout EDM80 OPC SN19018",
            "description": "Mid Cost Device Measuring Particulate Matter",
            "Datastreams": [{
                "name": "Number concentration PM10 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:ncpm10"
                }
            }, {
                "name": "Air Temperature Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:ta"
                }
            }, {
                "name": "Relative Humidity Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:hur"
                }
            }, {
                "name": "PM1 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm1"
                }
            }, {
                "name": "PM2.5 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm2p5"
                }
            }, {
                "name": "PM10 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm10"
                }
            }, {
                "name": "Number concentration PM10 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:ncpm10"
                }
            }, {
                "name": "Relative Humidity Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:hur"
                }
            }, {
                "name": "Air Temperature Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:ta"
                }
            }, {
                "name": "PM1 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm1"
                }
            }, {
                "name": "PM2.5 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm2p5"
                }
            }, {
                "name": "PM10 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm10"
                }
            }],
            "Locations": [{
                "location": {
                    "type": "Point",
                    "coordinates": [10.905035, 48.30988, 1.5]
                }
            }],
            "@iot.id": "saqn:t:grimm-aerosol.com:crowdsensor:SN19018"
        },
        "Observations": [{
            "phenomenonTime": "2020-08-18T16:10:06.000Z",
            "result": 3.44
        }],
        "Observations@iot.nextLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A0f19952')/Observations?$top=1&$skip=1&$select=result,phenomenonTime&$filter=%28phenomenonTime+gt+%28now%28%29+sub+duration%27P1D%27%29%29&$orderby=phenomenonTime+desc",
        "@iot.id": "saqn:ds:0f19952"
    }, {
        "name": "PM2.5 Datastream",
        "Thing": {
            "name": "Crowdsensing Node IGUA, SDS011, saqn:t:d6c4339",
            "description": "Low Cost Node Measuring Particulate Matter",
            "Datastreams": [{
                "name": "Relative Humidity Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:hur"
                }
            }, {
                "name": "Air Temperature Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:ta"
                }
            }, {
                "name": "PM2.5 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm2p5"
                }
            }, {
                "name": "PM10 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm10"
                }
            }],
            "Locations": [{
                "location": {
                    "type": "Point",
                    "coordinates": [10.898084509677506, 48.33590800003596, 3.8]
                }
            }],
            "@iot.id": "saqn:t:d6c4339"
        },
        "Observations": [{
            "phenomenonTime": "2020-08-18T21:18:13.000Z",
            "result": 1.08
        }],
        "Observations@iot.nextLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A0fc76f7')/Observations?$top=1&$skip=1&$select=result,phenomenonTime&$filter=%28phenomenonTime+gt+%28now%28%29+sub+duration%27P1D%27%29%29&$orderby=phenomenonTime+desc",
        "@iot.id": "saqn:ds:0fc76f7"
    }, {
        "name": "PM2.5 Datastream of Crowdsensing Node (SDS011)",
        "Thing": {
            "name": "Crowdsensing Node (SDS011, 5683179, IGUA)",
            "description": "Low Cost Node Measuring Particulate Matter",
            "Datastreams": [{
                "name": "Air Temperature Datastream of Crowdsensing Node (BME280)",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:ta"
                }
            }, {
                "name": "PM2.5 Datastream of Crowdsensing Node (SDS011)",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm2p5"
                }
            }, {
                "name": "Relative Humidity Datastream of Crowdsensing Node (BME280)",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:hur"
                }
            }, {
                "name": "PM10 Datastream of Crowdsensing Node (SDS011)",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm10"
                }
            }],
            "Locations": [{
                "location": {
                    "type": "Point",
                    "coordinates": [10.88693929740329, 48.37138743037297, 3.8]
                }
            }],
            "@iot.id": "saqn:t:efc7ebb"
        },
        "Observations": [{
            "phenomenonTime": "2020-08-18T21:17:00.000Z",
            "result": 1.12
        }],
        "Observations@iot.nextLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A12e37c4')/Observations?$top=1&$skip=1&$select=result,phenomenonTime&$filter=%28phenomenonTime+gt+%28now%28%29+sub+duration%27P1D%27%29%29&$orderby=phenomenonTime+desc",
        "@iot.id": "saqn:ds:12e37c4"
    }, {
        "name": "PM2.5 Datastream of Crowdsensing Node (SDS011)",
        "Thing": {
            "name": "Crowdsensing Node (SDS011, 3874647, IGUA)",
            "description": "Low Cost Node Measuring Particulate Matter",
            "Datastreams": [{
                "name": "Relative Humidity Datastream of Crowdsensing Node (BME280)",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:hur"
                }
            }, {
                "name": "Air Temperature Datastream of Crowdsensing Node (BME280)",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:ta"
                }
            }, {
                "name": "PM2.5 Datastream of Crowdsensing Node (SDS011)",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm2p5"
                }
            }, {
                "name": "PM10 Datastream of Crowdsensing Node (SDS011)",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm10"
                }
            }],
            "Locations": [{
                "location": {
                    "type": "Point",
                    "coordinates": [10.940840979291359, 48.346737738365995, 3.8]
                }
            }],
            "@iot.id": "saqn:t:b10758c"
        },
        "Observations": [{
            "phenomenonTime": "2020-08-18T21:16:23.000Z",
            "result": 0.9
        }],
        "Observations@iot.nextLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A163efc3')/Observations?$top=1&$skip=1&$select=result,phenomenonTime&$filter=%28phenomenonTime+gt+%28now%28%29+sub+duration%27P1D%27%29%29&$orderby=phenomenonTime+desc",
        "@iot.id": "saqn:ds:163efc3"
    }, {
        "name": "PM2.5 Datastream",
        "Thing": {
            "name": "edm_164 with id saqn:t:grimm-aerosol.com:EDM164:@@@SRISS",
            "description": "EDM 164 OPC",
            "Datastreams": [{
                "name": "Air Presure",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:plev"
                }
            }, {
                "name": "Relative Humidity Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:hur"
                }
            }, {
                "name": "Air Temperature Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:ta"
                }
            }, {
                "name": "Number concentration PM10 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:ncpm10"
                }
            }, {
                "name": "PM4 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm4"
                }
            }, {
                "name": "PM1 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm1"
                }
            }, {
                "name": "PM2.5 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm2p5"
                }
            }, {
                "name": "PM10 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm10"
                }
            }],
            "Locations": [{
                "location": {
                    "type": "Point",
                    "coordinates": [10.90686, 48.358303, 490.0]
                }
            }],
            "@iot.id": "saqn:t:grimm-aerosol.com:EDM164:@@@SRISS"
        },
        "Observations": [{
            "phenomenonTime": "2020-08-18T18:57:34.000Z",
            "result": 4.1
        }],
        "Observations@iot.nextLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A16f9aa2')/Observations?$top=1&$skip=1&$select=result,phenomenonTime&$filter=%28phenomenonTime+gt+%28now%28%29+sub+duration%27P1D%27%29%29&$orderby=phenomenonTime+desc",
        "@iot.id": "saqn:ds:16f9aa2"
    }, {
        "name": "PM2.5 Datastream of Crowdsensing Node (SDS011)",
        "Thing": {
            "name": "Crowdsensing Node (SDS011, 5673347, IGUA)",
            "description": "Low Cost Node Measuring Particulate Matter",
            "Datastreams": [{
                "name": "Relative Humidity Datastream of Crowdsensing Node (BME280)",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:hur"
                }
            }, {
                "name": "Air Temperature Datastream of Crowdsensing Node (BME280)",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:ta"
                }
            }, {
                "name": "PM10 Datastream of Crowdsensing Node (SDS011)",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm10"
                }
            }, {
                "name": "PM2.5 Datastream of Crowdsensing Node (SDS011)",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm2p5"
                }
            }],
            "Locations": [{
                "location": {
                    "type": "Point",
                    "coordinates": [10.938672930494013, 48.3557625440523, 9.4]
                }
            }],
            "@iot.id": "saqn:t:114f0d7"
        },
        "Observations": [{
            "phenomenonTime": "2020-08-18T21:16:34.000Z",
            "result": 1.3
        }],
        "Observations@iot.nextLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A188b777')/Observations?$top=1&$skip=1&$select=result,phenomenonTime&$filter=%28phenomenonTime+gt+%28now%28%29+sub+duration%27P1D%27%29%29&$orderby=phenomenonTime+desc",
        "@iot.id": "saqn:ds:188b777"
    }, {
        "name": "PM2.5 Datastream",
        "Thing": {
            "name": "Crowdsensing Node IGUA, SDS011, saqn:t:4c18f4d",
            "description": "Low Cost Node Measuring Particulate Matter",
            "Datastreams": [{
                "name": "Relative Humidity Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:hur"
                }
            }, {
                "name": "Air Temperature Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:ta"
                }
            }, {
                "name": "PM2.5 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm2p5"
                }
            }, {
                "name": "PM10 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm10"
                }
            }],
            "Locations": [{
                "location": {
                    "type": "Point",
                    "coordinates": [10.898084509677506, 48.33590800003596, 3.8]
                }
            }],
            "@iot.id": "saqn:t:4c18f4d"
        },
        "Observations": [{
            "phenomenonTime": "2020-08-18T21:18:26.000Z",
            "result": 15.36
        }],
        "Observations@iot.nextLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A189e3d3')/Observations?$top=1&$skip=1&$select=result,phenomenonTime&$filter=%28phenomenonTime+gt+%28now%28%29+sub+duration%27P1D%27%29%29&$orderby=phenomenonTime+desc",
        "@iot.id": "saqn:ds:189e3d3"
    }]
};


const testJsonFail = {
    "value": [{ //has no location
        "name": "PM2.5 Datastream",
        "Thing": {
            "name": "Crowdsensing Node IGUA, SDS011, saqn:t:154390b",
            "description": "Lul hallo, ich bin ein Easter Egg",
            "Datastreams": [{
                "name": "Relative Humidity Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:hur"
                }
            }, {
                "name": "Air Temperature Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:ta"
                }
            }, {
                "name": "PM2.5 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm2p5"
                }
            }, {
                "name": "PM10 Datastream",
                "ObservedProperty": {
                    "@iot.id": "saqn:op:mcpm10"
                }
            }],
            "Locations": [],
            "@iot.id": "saqn:t:154390b"
        },
        "Observations": [{
            "result": 1.02,
            "phenomenonTime": "2020-08-18T21:18:26.000Z"
        }],
        "Observations@iot.nextLink": "https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A0461ecf')/Observations?$top=1&$skip=1&$select=result&$filter=%28phenomenonTime+gt+%28now%28%29+sub+duration%27P1D%27%29%29&$orderby=phenomenonTime+desc",
        "@iot.id": "saqn:ds:0461ecf"
    }]
};