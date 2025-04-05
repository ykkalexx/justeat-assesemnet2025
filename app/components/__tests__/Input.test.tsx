import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "../Input";

describe("Input Component", () => {
  test("renders input element with label", () => {
    render(<Input label="Test label" />);
    expect(screen.getByText("Test label")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("reners error text", () => {
    render(<Input error="error error" />);
    expect(screen.getByText("error error")).toBeInTheDocument();
    expect(screen.getByText("error error")).toHaveClass("text-red-500");
  });

  test("shows error message when error prop is provided", () => {
    render(<Input error="This is an error" />);
    expect(screen.getByText("This is an error")).toBeInTheDocument();
    expect(screen.getByText("This is an error")).toHaveClass("text-red-500");
  });

  test("shows helper text when helperText prop is give", () => {
    render(<Input helperText="helper text" />);
    expect(screen.getByText("helper text")).toBeInTheDocument();
  });

  test("calls onChange when value is chganged", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test" },
    });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("displays start and end icons when provided", () => {
    render(
      <Input
        startIcon={<span data-testid="start-icon">Start</span>}
        endIcon={<span data-testid="end-icon">End</span>}
      />
    );

    expect(screen.getByTestId("start-icon")).toBeInTheDocument();
    expect(screen.getByTestId("end-icon")).toBeInTheDocument();
  });
});
