import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../Button";

describe("btn component", () => {
  test("renders btn with children", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  test("renders with default variant", () => {
    render(<Button>Default variant</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-[#ff8000]");
  });

  test("applies secondary variant classes when specified", () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-gray-100");
  });

  test("applies outline variant classes when specified", () => {
    render(<Button variant="outline">Outline Button</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("border-[#ff8000]");
  });

  test("applies full width class when fullWidth is true", () => {
    render(<Button fullWidth>Full Width Button</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("w-full");
  });

  test("displays loading spinner when isLoading is true", () => {
    render(<Button isLoading>Loading Button</Button>);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByText("Loading Button")).not.toBeInTheDocument();
  });

  test("calls onClick when button is clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
