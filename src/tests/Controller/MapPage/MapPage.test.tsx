import MapPage from "../../../View/MapPage/MapPage";
import { shallow, mount } from "enzyme";
import React from "react";
import { MapController } from "../../../Controller/MapPage/MapController";
import { Viewport } from "../../../Model/Viewport";
import { Position } from "../../../Model/Position";
import TestHelper from "../../TestHelper";
import { render, fireEvent } from "@testing-library/react";
import StationConfiguration from "../../../Controller/MapPage/StationConfiguration";
import { MapPin } from "../../../Model/MapPin";

jest.mock("../../../Controller/MapPage/MapController");
test("Render", () => {
    var viewport = new Viewport(new Position(0, 0), 5);

    MapController.prototype.getPins = jest.fn(async () => {
        return [];
    });

    var viewportChange = jest.fn();
    MapController.prototype.handleViewportChange = viewportChange;

    MapController.prototype.getPolygons = jest.fn(async () => {
        return [];
    });
    MapController.prototype.getViewport = jest.fn(() => {
        return viewport;
    });
    MapController.prototype.getSelectedFeature = jest.fn(() => {
        return TestHelper.getTestFeature();
    });
    MapController.prototype.getScale = jest.fn(() => {
        return TestHelper.getTestScale();
    });

    var searchMock = jest.fn(async () => {});
    MapController.prototype.search = searchMock;

    var popupHandlerMock = jest.fn(async () => {
        return TestHelper.getTestObservation(10);
    });
    MapController.prototype.handlePopup = popupHandlerMock;

    var mapPage = mount(<MapPage />);

    //@ts-ignore
    mapPage.find("#map").props().onViewportChange(viewport);
    expect(viewportChange).toBeCalled();

    //@ts-ignore
    mapPage
        .find("#map")
        .props()
        .handlePopup(
            new MapPin(
                "newPin",
                new Position(1, 1),
                1,
                TestHelper.getTestColor()
            )
        );
    expect(popupHandlerMock).toBeCalled();

    var conf = new StationConfiguration(TestHelper.getTestFeature());

    //@ts-ignore
    mapPage.find("#featureSelect").props().onConfigurationChange(conf);

    var event = { preventDefault: jest.fn() };
    //@ts-ignore
    mapPage.find("#search").props().onSearch(event, "testTerm");
    expect(searchMock).toBeCalledWith("testTerm");

    //@ts-ignore
    mapPage.find("#search").props().updatePosition(new Position(1, 1));

    //@ts-ignore
    mapPage
        .find("#map")
        .props()
        .handlePopup(
            new MapPin(
                "icon-home-1",
                new Position(1, 1),
                1,
                TestHelper.getTestColor()
            )
        );
});
