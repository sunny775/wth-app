import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CityCard, { CityCardProps } from "../../src/components/CityCard";
import { queryKeys } from "../../src/utils/weather";
import { BrowserRouter } from "react-router";
import { fetchCity } from "../../src/utils/weather";
import { WeatherData } from "../../src/utils/shared-types";

const mockWeatherData = {
  location: { name: "New York", country: "USA", lat: 40.7128, lon: -74.006 },
  current: {
    temperature: 25,
    weather_icons: ["https://example.com/icon.png"],
    weather_descriptions: ["Sunny"],
  },
} as unknown as WeatherData;

jest.mock("../../src/utils/weather");

jest.mock("../../src/utils/constants", () => ({
  WEATHERSTACK_API_KEY: "test-api-key",
}));

const createQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

const renderWithQueryProvider = (props: Partial<CityCardProps> = {}) => {
  const queryClient = createQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CityCard
          city={{
            lat: "40.7128",
            lon: "-74.006",
            name: "New York",
            country: "United States Of America",
          }}
          toggleFavorite={jest.fn()}
          {...props}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe("CityCard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Renders loading state correctly", async () => {
    jest.mocked(fetchCity).mockResolvedValue(mockWeatherData);
    jest.mocked(queryKeys.city).mockReturnValue(["city-40.7128--74.006"]);

    renderWithQueryProvider();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("Renders weather data correctly", async () => {
    jest.mocked(fetchCity).mockResolvedValue(mockWeatherData);
    jest.mocked(queryKeys.city).mockReturnValue(["city-40.7128--74.006"]);

    renderWithQueryProvider();

    expect(await screen.findByText("New York")).toBeInTheDocument();
    expect(screen.getByText("USA")).toBeInTheDocument();
    expect(screen.getByText("25°C")).toBeInTheDocument();
    expect(screen.getByAltText("Sunny")).toHaveAttribute(
      "src",
      "https://example.com/icon.png"
    );
  });

  test("Handles query error correctly", async () => {
    jest.mocked(fetchCity).mockRejectedValue(new Error("Failed to fetch"));

    renderWithQueryProvider();

    expect(await screen.findByText("Failed to fetch")).toBeInTheDocument();
  });

  test("Calls toggleFavorite on favorite button click", async () => {
    jest.mocked(fetchCity).mockResolvedValue(mockWeatherData);
    jest.mocked(queryKeys.city).mockReturnValue(["city-40.7128--74.006"]);

    const toggleFavorite = jest.fn();
    renderWithQueryProvider({ toggleFavorite });

    await waitFor(() =>
      expect(screen.getByText("New York")).toBeInTheDocument()
    );

    const button = screen.getByTitle("Toggle Favorite");
    fireEvent.click(button);

    expect(toggleFavorite).toHaveBeenCalledTimes(1);
  });

  test("Calls deleteInitialCity on delete button click", async () => {
    const deleteInitialCity = jest.fn();
    renderWithQueryProvider({ isFavorite: false, deleteInitialCity });

    const button = await screen.findByTitle("Delete City");
    fireEvent.click(button);

    expect(deleteInitialCity).toHaveBeenCalledTimes(1);
  });

  test("Matches snapshot", async () => {
    const { container } = renderWithQueryProvider();
    await screen.findByText("New York"); // Wait for data
    expect(container).toMatchSnapshot();
  });
});
