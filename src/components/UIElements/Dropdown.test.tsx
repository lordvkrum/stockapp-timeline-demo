import React from "react";
import { act, fireEvent, screen } from "@testing-library/react";
import { renderWrapper } from "testHelpers";
import Dropdown from "./Dropdown";

describe("Dropdown", () => {
  it("shows options when button is pressed", () => {
    const { baseElement } = renderWrapper(
      <Dropdown
        text="Test"
        value=""
        options={[
          {
            key: "option-1",
            text: "Option 1",
            onClick: jest.fn(),
          },
          {
            key: "option-2",
            text: "Option 2",
            onClick: jest.fn(),
          },
        ]}
      />
    );
    expect(baseElement).toBeDefined();
    expect(screen.queryByTestId("option-1-button")).toBeNull();

    act(() => {
      fireEvent.click(screen.getByTestId("dropdown-button"));
    });
    expect(screen.getByTestId("option-1-button")).toBeDefined();
  });

  it("hides menu when option is pressed", () => {
    const { baseElement } = renderWrapper(
      <Dropdown
        text="Test"
        value=""
        options={[
          {
            key: "option-1",
            text: "Option 1",
            onClick: jest.fn(),
          },
          {
            key: "option-2",
            text: "Option 2",
            onClick: jest.fn(),
          },
        ]}
      />
    );
    act(() => {
      fireEvent.click(screen.getByTestId("dropdown-button"));
    });
    expect(screen.getByTestId("option-1-button")).toBeDefined();

    act(() => {
      fireEvent.click(screen.getByTestId("option-1-button"));
    });
    expect(screen.queryByTestId("option-1-button")).toBeNull();
  });
});
