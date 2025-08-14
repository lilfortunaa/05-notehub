import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60,
      refetchOnWindowFocus: false,
      retry: 1,
      onError: (error) => {
        console.log("Query error", error);
      },
    },
    mutations: {
      retry: 0,
      onError: (error) => {
        console.log("Mutation error", error);
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
