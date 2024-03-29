import React from "react";
import { act, fireEvent, screen } from "@testing-library/react";
import { renderWrapper } from "testHelpers";
import Layout from "./Layout";

describe("Layout", () => {
  it("adds class when button is pressed", () => {
    renderWrapper(<Layout />);
    expect(screen.getByTestId("side-content")).not.toHaveClass(
      "transform-none"
    );

    act(() => {
      fireEvent.click(screen.getByTestId("toggle-side-button"));
    });
    expect(screen.getByTestId("side-content")).toHaveClass("transform-none");
  });
});
