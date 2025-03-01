import React from "react";
import { render, screen } from "@testing-library/react";
import CityCard from "../../src/components/CityCard";
import { createRoutesStub } from "react-router";

describe("CityCard", () => {
  test("renders city name and temperature", () => {
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: () => (
          <CityCard
            city="London"
            toggleFavorite={jest.fn}
          />
        ),
      },
    ]);

    render(<Stub />);

    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("Temperature: 10°C")).toBeInTheDocument();
  });
});
