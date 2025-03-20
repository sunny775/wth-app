import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";
import { useFavorites } from "../../src/hooks/useFavorites";
import { City } from "../../src/utils/shared-types";

jest.mock("../../src/utils/constants", () => ({
  WEATHERSTACK_API_KEY: "test-api-key",
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useFavorites Hook", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  const sampleCity: City = {
    name: "New York",
    country: "United States",
    lat: "40.714",
    lon: "-74.006",
  };

  test("initially returns empty favorites", async () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    await waitFor(() => {
      expect(result.current.favoritesQuery.data).toEqual([]);
    });
  });

  test("initially returns largest cities as initialCities", async () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    await waitFor(() => {
      expect(result.current.initialCitiesQuery.data).not.toBeUndefined();
      expect(result.current.initialCitiesQuery.data?.length).toBe(5);
    });
  });

  test("adds a city to favorites and removes it from initial cities", async () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    result.current.addFavorite.mutate(sampleCity);

    await waitFor(() => {
      expect(result.current.favoritesQuery.data).toContainEqual(sampleCity);
    });

    await waitFor(() => {
      expect(result.current.initialCitiesQuery.data).not.toContainEqual(
        sampleCity
      );
    });
  });

  test("removes a city from favorites", async () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    result.current.addFavorite.mutate(sampleCity);

    await waitFor(() => {
      expect(result.current.favoritesQuery.data).toContainEqual(sampleCity);
    });

    result.current.removeFavorite.mutate(sampleCity);

    await waitFor(() => {
      expect(result.current.favoritesQuery.data).not.toContainEqual(sampleCity);
    });
  });

  test("checks if a city is a favorite", async () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    expect(result.current.isFavorite(sampleCity)).toBe(false);

    result.current.addFavorite.mutate(sampleCity);

    await waitFor(() => {
      expect(result.current.isFavorite(sampleCity)).toBe(true);
    });
  });

  test("toggles favorite status", async () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    result.current.toggleFavorite(sampleCity);

    await waitFor(() => {
      expect(result.current.isFavorite(sampleCity)).toBe(true);
    });

    result.current.toggleFavorite(sampleCity);

    await waitFor(() => {
      expect(result.current.isFavorite(sampleCity)).toBe(false);
    });
  });
});
