import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient } from "@tanstack/react-query";
import {
  PersistQueryClientProvider,
  removeOldestQuery,
} from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "./components/layout/Layout";
import NotFound404 from "./components/pages/NotFound404";
import FullScreen from "./components/FullScreen";

const Home = lazy(() => import("./components/pages/Home"));
const CityDetails = lazy(() => import("./components/pages/CityDitails"));

export default function App() {
  const persister = createSyncStoragePersister({
    storage: window.localStorage,
    retry: removeOldestQuery,
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 1, // 1 minute
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
        networkMode: "offlineFirst",
        refetchOnReconnect: "always",
      },
      mutations: {
        networkMode: "offlineFirst",
      },
    },
  });

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <BrowserRouter>
        <Suspense fallback={<FullScreen />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index path="/" element={<Home />} />
              <Route path=":lat/:lon" element={<CityDetails />} />
              <Route path="*" element={<NotFound404 />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen />
    </PersistQueryClientProvider>
  );
}
