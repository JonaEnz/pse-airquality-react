import { shallow } from "enzyme";
import React from "react";
import { Map } from "../../../View/MapPage/Map";
import { Viewport } from "../../../Model/Viewport";
import { Position } from "../../../Model/Position";
import { MapPin } from "../../../Model/MapPin";
import TestHelper from "../../TestHelper";
import { Polygon } from "../../../Model/Polygon";

test("Render", () => {
    var onViewChange = jest.fn();
    var popupMock = jest.fn();
    var viewport = new Viewport(new Position(0, 0), 5);
    var nextViewport = new Viewport(new Position(0, 0), 6);
    var pin = new MapPin(
        "icon-home-1",
        new Position(0, 0),
        1,
        TestHelper.getTestColor()
    );
    var polygon = new Polygon(
        [
            TestHelper.getTestObservationStation(0, 0),
            TestHelper.getTestObservationStation(1, 0),
            TestHelper.getTestObservationStation(0, 1),
        ],
        TestHelper.getTestColor()
    );

    var mapRender = shallow(
        <Map
            onViewportChange={onViewChange}
            handlePopup={popupMock}
            viewport={viewport}
            pins={[pin]}
            polygons={[polygon]}
        />
    );

    expect(mapRender.find("#mapPin-icon-home-1").exists()).toBeTruthy();
    expect(mapRender.find("#leafletMap").exists()).toBeTruthy();

    mapRender.find("#mapPin-icon-home-1").simulate("click");

    expect(mapRender.find(".popup").exists()).toBeTruthy();

    mapRender.find(".popup").simulate("open");
    jest.useFakeTimers();
    mapRender.find("#leafletMap").simulate("viewportChange", nextViewport);
    mapRender.find("#leafletMap").simulate("viewportChange", nextViewport);
    jest.runAllTimers();
});
