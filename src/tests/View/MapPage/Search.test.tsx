import { render, screen } from "@testing-library/react";
import Search from "../../../View/MapPage/Search";
import React from "react";
import Language from "../../../Controller/Storage/Language";
import { Position } from "../../../Model/Position";

let language = Language.getInstance();

test("Render test", () => {
    var search = render(
        <Search onSearch={() => {}} updatePosition={() => {}} />
    );
    expect(
        search.getByPlaceholderText(language.getText("search"))
    ).not.toBeNull();
});

test("Call event mocks", () => {
    var searchFn = jest.fn((searchTerm: string) => {});
    var positionFn = jest.fn((pos: Position) => {});
    var search = render(
        <Search onSearch={() => searchFn} updatePosition={() => positionFn} />
    );
    screen.getByTestId("searchButton").click(); //Should not crash
    screen.getByTestId("locationButton").click();
});
