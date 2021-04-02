import React from "react";
import { shallow } from "enzyme";
import SettingsNav from "./SettingsNav";

describe("SettingsNav", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SettingsNav />);
    expect(wrapper).toMatchSnapshot();
  });
});
