import React from "react";
import { shallow } from "enzyme";
import Marker from "./Marker";

describe("Marker", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Marker />);
    expect(wrapper).toMatchSnapshot();
  });
});
