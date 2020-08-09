import { render, screen, waitForElement } from "@testing-library/react";
import Search from "../../../View/MapPage/Search";
import React from "react";
import Language from "../../../Controller/Storage/Language";
import ReactDOM from "react-dom";
import { Position } from "../../../Model/Position";

let language = Language.getInstance();

test("Render test", async () => {
    render(<Search onSearch={() => {}} updatePosition={() => {}} />);
    await waitForElement(() => screen.getByTestId("searchButton"));
    expect(
        screen.getByPlaceholderText(language.getText("search"))
    ).not.toBeNull();
});

test("Call event mocks", () => {
    var searchFn = jest.fn((searchTerm: string) => {});
    var positionFn = jest.fn((pos: Position) => {});
    render(
        <Search onSearch={() => searchFn} updatePosition={() => positionFn} />
    );
    screen.getByTestId("searchButton").click(); //Should not crash
    screen.getByTestId("locationButton").click();
});
