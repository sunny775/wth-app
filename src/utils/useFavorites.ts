import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {queryKeys, initialLargestCities} from "./weather";
import { City } from "./types";
import { useCallback } from "react";

export const useFavorites = () => {
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery<City[]>({
    queryKey: queryKeys.favorites(),
    staleTime: 2000,
    gcTime: Infinity, // never gabbage-collected
    initialData: [],
  });

  const initialCitiesQuery = useQuery<City[]>({
    queryKey: queryKeys.initialCities(),
    staleTime: 2000,
    gcTime: Infinity, // never gabbage-collected
    initialData: initialLargestCities(),
  });

  const deleteInitialCity = useMutation({
    mutationKey: queryKeys.initialCities(),
    mutationFn: async (city: City) => {
      const previousData =
        queryClient.getQueryData<City[]>(queryKeys.initialCities()) || [];

      const updatedData = previousData.filter(
        (c) => c.lat !== city.lat || c.lon !== city.lon
      );

      return updatedData;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<City[]>(queryKeys.initialCities(), data);
    },
  });

  const addFavorite = useMutation({
    mutationKey: queryKeys.favorites(),
    mutationFn: async (city: City) => {
      const previousData =
        queryClient.getQueryData<City[]>(queryKeys.favorites()) || [];

      return [...previousData, city];
    },
    onSuccess: (data, city) => {
      const initialCitiesData =
        queryClient.getQueryData<City[]>(queryKeys.initialCities()) || [];

      queryClient.setQueryData<City[]>(queryKeys.favorites(), data);

      queryClient.setQueryData<City[]>(
        queryKeys.initialCities(),
        initialCitiesData.filter(
          (c) => c.lat !== city.lat || c.lon !== city.lon
        )
      );
    },
  });

  const removeFavorite = useMutation({
    mutationKey: queryKeys.favorites(),
    mutationFn: async (city: City) => {
      const previousData =
        queryClient.getQueryData<City[]>(queryKeys.favorites()) || [];

      const updatedData = previousData.filter(
        (c) => c.lat !== city.lat || c.lon !== city.lon
      );

      return updatedData;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<City[]>(queryKeys.favorites(), data);
    },
  });

  const toggleFavorite = useCallback((targetCity: City) => {
    const favorites = favoritesQuery.data;
    return favorites.some(
      city =>city.lat === targetCity.lat && city.lon === targetCity.lon
    )? removeFavorite.mutate(targetCity) : addFavorite.mutate(targetCity)

  }, [addFavorite, favoritesQuery.data, removeFavorite])


  return {
    favoritesQuery,
    initialCitiesQuery,
    deleteInitialCity,
    addFavorite,
    removeFavorite,
    toggleFavorite
  };
};

