import React from "react";
import Language from "../../Controller/Storage/Language";
import "./informationPage.css";
import AboutPage from "../../View//About";
import ErrorPage from "../../View//ErrorPage";
import { shallow, mount, render } from 'enzyme';
import PrivacyPolicyPage from "../../View/PrivacyPolicy";

let language = Language.getInstance();


test("AboutPage renders", () => {
    let wrapped = shallow(<AboutPage />);
    expect(wrapped).toBe(true);
});

test("PrivcyolicyPage renders", () => {
    let wrapped = shallow(<PrivacyPolicyPage />);
    expect(wrapped).toBe(true);
});

//this test doesn't work yet, nneed to pass props to errorpage
/*test("ErrorPage renders", () => {
    let wrapped = shallow(<ErrorPage code />);
    expect(wrapped).toBe(true);
});*/