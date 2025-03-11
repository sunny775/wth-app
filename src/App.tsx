import { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient } from "@tanstack/react-query";
import {
  PersistQueryClientProvider,
  removeOldestQuery,
} from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "./components/Layout";
import PageLoader from "./components/loaders/PageLoader";

const Home = lazy(() => import("./pages/Home"));
const CityDetails = lazy(() => import("./pages/CityDitails"));

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    return (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  const persister = createSyncStoragePersister({
    storage: window.localStorage,
    retry: removeOldestQuery,
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 600, // 1 hr cache
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
        networkMode: "offlineFirst",
      },
    },
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout toggleTheme={toggleTheme} />}>
              <Route index path="/" element={<Home />} />
              <Route path="city" element={<CityDetails />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen />
    </PersistQueryClientProvider>
  );
}
