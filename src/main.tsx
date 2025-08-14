import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: Error) => {
      console.log("Query error", error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: Error) => {
      console.log("Mutation error", error);
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      gcTime: 1000 * 60,
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: 0,
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
