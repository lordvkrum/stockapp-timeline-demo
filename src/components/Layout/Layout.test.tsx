import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";

describe("Layout", () => {
  it("adds class when button is pressed", () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    expect(baseElement).toBeDefined();
    expect(screen.getByTestId("side-content")).not.toHaveClass("transform-none");

    act(() => {
      fireEvent.click(screen.getByTestId("toggle-side-button"));
    });
    expect(screen.getByTestId("side-content")).toHaveClass("transform-none");
  });
});
