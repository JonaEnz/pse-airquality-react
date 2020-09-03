import React from "react";
import Language from "../../Controller/Storage/Language";
import "../../View/informationPage.css";
import AboutPage from "../../View//About";
import ErrorPage from "../../View//ErrorPage";
import HowItWorks from "../../View/HowItWorks";
import { shallow, mount, render } from 'enzyme';
import PrivacyPolicyPage from "../../View/PrivacyPolicy";

let language = Language.getInstance();


test("AboutPage renders", () => {
    let wrapped = shallow(<AboutPage />);
    expect(wrapped.exists()).toBe(true);
});

test("PrivcyolicyPage renders", () => {
    let wrapped = shallow(<PrivacyPolicyPage />);
    expect(wrapped.exists()).toBe(true);
});

test("ErrorPage renders", () => {
    let wrapped = shallow(<ErrorPage code={404} message={"Page not found"} />);
    expect(wrapped.exists()).toBe(true);
});

test("Instruction renders", () => {
    let wrapped = shallow(<HowItWorks />);
    expect(wrapped.exists()).toBe(true);
});