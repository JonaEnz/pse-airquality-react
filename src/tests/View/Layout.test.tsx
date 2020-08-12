import React from "react";
import Layout from "../../View/Layout/Layout";
import PageMenu from "../../View/Layout/PageMenu";
import { shallow, mount, render } from 'enzyme';
import Language from "../../Controller/Storage/Language";

test("Layout renders", () => {
    let wrapped = shallow(<Layout />);
    expect(wrapped.exists()).toBe(true);
});

test("PageMenu renders", () => {
    let wrapped = shallow(<PageMenu language={Language.getInstance()} />);
    expect(wrapped.exists()).toBe(true);
});