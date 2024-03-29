import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "components/Layout/Layout";
import Alert from "components/UIElements/Alert";
import TabsWrapper from "components/Content/TabsWrapper";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
    },
  },
});

const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/:symbol?" element={<TabsWrapper />} />
          <Route path="*" element={<Alert text="404 Not Found" />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
