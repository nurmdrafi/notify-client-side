import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import { AuthUserContextProvider } from "./context/AuthUserContext";
import { AxiosInterceptor } from "./network/AxiosInterceptor";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthUserContextProvider>
          <AxiosInterceptor>
            <App />
          </AxiosInterceptor>
        </AuthUserContextProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </React.StrictMode>
  </BrowserRouter>
);
