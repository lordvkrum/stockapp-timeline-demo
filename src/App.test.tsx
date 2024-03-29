import React from "react";
import { BrowserRouter } from "react-router-dom";
import { renderWrapper } from "testHelpers";
import App from "./App";

describe("App", () => {
  it("renders App shell", () => {
    const { baseElement } = renderWrapper(<App />);
    expect(baseElement).toBeDefined();
  });
});
