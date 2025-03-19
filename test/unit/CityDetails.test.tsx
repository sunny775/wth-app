import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useFavorites } from "../../src/hooks/useFavorites";
import CityDetails from "../../src/components/pages/CityDitails";

jest.mock("@tanstack/react-query");
jest.mock("react-router", () => ({
  useParams: jest.fn(),
}));
jest.mock("../../src/utils/weather", () => ({
  fetchCity: jest.fn(),
  queryKeys: { city: jest.fn() },
}));
jest.mock("../../src/hooks/useFavorites", () => ({
  useFavorites: jest.fn(() => ({
    isFavorite: jest.fn(),
    toggleFavorite: jest.fn(),
  })),
}));
jest.mock("../../src/components/loaders/PageLoader", () => () => (
  <div data-testid="page-loader">Loading...</div>
));
jest.mock("../../src/components/FullScreen", () => ({ children }) => (
  <div data-testid="full-page">{children}</div>
));

describe("CityDetails Component", () => {
  const mockWeatherData = {
    location: { name: "London", country: "UK", lat: "51.5074", lon: "-0.1278" },
    current: {
      temperature: 15,
      wind_speed: 10,
      pressure: 1012,
      precip: 0.5,
      humidity: 80,
      cloudcover: 50,
      feelslike: 14,
      uv_index: 3,
      visibility: 10,
      weather_icons: ["icon-url"],
      weather_descriptions: ["Partly cloudy"],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({
      lat: "51.5074",
      lon: "-0.1278",
    });
  });

  test("displays loader when fetching data", () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });
    render(<CityDetails />);
    expect(screen.getByTestId("page-loader")).toBeInTheDocument();
  });

  test("displays error message if fetching fails", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error("Failed to fetch"),
    });
    render(<CityDetails />);
    expect(screen.getByTestId("full-page")).toHaveTextContent(
      "Failed to fetch"
    );
  });

  test("displays weather data when fetched successfully", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockWeatherData,
    });
    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: jest.fn().mockReturnValue(false),
      toggleFavorite: jest.fn(),
    });

    render(<CityDetails />);

    expect(await screen.findByText("LONDON")).toBeInTheDocument();
    expect(screen.getByText("UK")).toBeInTheDocument();
    expect(screen.getByText("Partly cloudy")).toBeInTheDocument();
  });

  test("toggles favorite when star button is clicked", async () => {
    const mockToggleFavorite = jest.fn();
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockWeatherData,
    });
    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: jest.fn().mockReturnValue(false),
      toggleFavorite: mockToggleFavorite,
    });

    render(<CityDetails />);

    const favoriteButtons = screen.getAllByTitle("Toggle Favorite");
    fireEvent.click(favoriteButtons[0]);

    expect(mockToggleFavorite).toHaveBeenCalledWith(mockWeatherData.location);
  });

  test("renders notes section", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockWeatherData,
    });
    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: jest.fn().mockReturnValue(false),
      toggleFavorite: jest.fn(),
    });

    render(<CityDetails />);

    expect(
      await screen.findByPlaceholderText(
        "Enter informative notes about this city..."
      )
    ).toBeInTheDocument();
  });
});
