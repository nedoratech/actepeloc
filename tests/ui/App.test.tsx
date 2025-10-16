import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../src/ui/App";

describe("App", () => {
  it("renders the main title", () => {
    render(<App />);

    expect(screen.getByText("Welcome to Actepeloc")).toBeInTheDocument();
  });

  it("renders the welcome message", () => {
    render(<App />);

    expect(screen.getByText("Your journey starts here")).toBeInTheDocument();
  });

  it("renders both buttons", () => {
    render(<App />);

    expect(screen.getByText("Click Me")).toBeInTheDocument();
    expect(screen.getByText("Or Me")).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    render(<App />);

    const title = screen.getByText("Welcome to Actepeloc");
    expect(title).toHaveClass("text-5xl", "font-bold", "text-gray-800");

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveClass("bg-blue-500", "hover:bg-blue-600");
    expect(buttons[1]).toHaveClass("bg-purple-500", "hover:bg-purple-600");
  });
});
