import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthUserContextProvider } from "./context/AuthUserContext";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthUserContextProvider>
          <App />
        </AuthUserContextProvider>
      </QueryClientProvider>
    </React.StrictMode>
  </BrowserRouter>
);
