import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const CityDetails = lazy(() => import("./pages/CityDitails"));

export default function App() {

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60, // 1 minute cache
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="cities/:city" element={<CityDetails />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
    </QueryClientProvider>
  );
}
