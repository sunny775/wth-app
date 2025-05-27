import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchBar from "../../src/components/search/SearchBar";
import { fetchSearchResults } from "../../src/utils/weather";

const mockSearchResults = {
  request: { query: "lon", results: 3 },
  results: [
    {
      country: "United Kingdom",
      lat: "51.517",
      lon: "-0.106",
      name: "London",
      region: "City of London, Greater London",
      timezone_id: "Europe/London",
      utc_offset: "0.0",
    },
    {
      country: "Canada",
      lat: "42.983",
      lon: "-81.250",
      name: "London",
      region: "Ontario",
      timezone_id: "America/Toronto",
      utc_offset: "-4.0",
    },
    {
      country: "United States of America",
      lat: "42.865",
      lon: "-71.374",
      name: "Londonderry",
      region: "New Hampshire",
      timezone_id: "America/New_York",
      utc_offset: "-4.0",
    },
  ],
};

jest.mock("../../src/utils/weather", () => ({
  fetchSearchResults: jest.fn(),
  queryKeys: {
    search: (query: string) => ["search", query],
  },
  removeDuplicateCities: (results: unknown) => results,
}));

const queryClient = new QueryClient();

const renderComponent = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <SearchBar
        id="search-bar"
        isDropdown
        renderSearchResults={({ results, query, isLoading, error }) => (
          <div data-testid="results">
            {isLoading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            {results && results.length > 0
              ? results.map((res, i) => (
                  <div key={i}>
                    <p>{res.name}</p>
                    <p>{res.country}</p>
                  </div>
                ))
              : query.length > 2 && <p>No results found</p>}
          </div>
        )}
      />
    </QueryClientProvider>
  );

describe("SearchBar", () => {
  test("renders without crashing", () => {
    renderComponent();
    expect(screen.getByRole("search")).toBeInTheDocument();
  });

  test("handles input changes correctly", async () => {
    renderComponent();
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.input(input, { target: { value: "New York" } });
    expect(input).toHaveValue("New York");
  });

  test("does not trigger API call when input length is less than 3", async () => {
    renderComponent();
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.input(input, { target: { value: "NY" } });
    await waitFor(() => expect(fetchSearchResults).not.toHaveBeenCalled());
  });

  test("triggers API call when input length is 3 or more", async () => {
    renderComponent();
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.input(input, { target: { value: "New" } });

    await waitFor(() => expect(fetchSearchResults).toHaveBeenCalled());
  });

  test("shows loading state while fetching", async () => {
    jest
      .mocked(fetchSearchResults)
      .mockImplementation(() => new Promise(() => {}));

    renderComponent();
    fireEvent.input(screen.getByPlaceholderText("Search..."), {
      target: { value: "London" },
    });

    const loader = await screen.findByText("Loading...");

    expect(loader).toBeInTheDocument();
  });

  test("displays error message when API fails", async () => {
    jest
      .mocked(fetchSearchResults)
      .mockRejectedValueOnce(new Error("API error"));

    renderComponent();
    fireEvent.input(screen.getByPlaceholderText("Search..."), {
      target: { value: "Paris" },
    });

    await screen.findByText("API error");
  });

  test("shows results when API returns data", async () => {
    jest.mocked(fetchSearchResults).mockResolvedValueOnce(mockSearchResults);

    renderComponent();
    fireEvent.input(screen.getByPlaceholderText("Search..."), {
      target: { value: "lon" },
    });

    expect(await screen.findByText("United Kingdom")).toBeInTheDocument();
    expect(await screen.findAllByText("London")).toHaveLength(2);
    expect(await screen.findByText("Londonderry")).toBeInTheDocument();
  });
});
