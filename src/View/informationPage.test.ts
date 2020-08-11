import React from "react";
import Language from "../Controller/Storage/Language";
import "./informationPage.css";
import AboutPage from "./About";
import PirvacyPolicy from "./PrivacyPolicy";
import ErrorPage from "./ErrorPage";
import { shallow, mount, render } from 'enzyme';

let language = Language.getInstance();

let about = AboutPage;

test("Empty test to make this test suite valid", () => {
    let text = render(about);
});
