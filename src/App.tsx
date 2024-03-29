import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout/Layout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/:symbol?" element={<div>MAIN CONTENT</div>} />
          <Route path="*" element={<div>404 NOT FOUND</div>} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
