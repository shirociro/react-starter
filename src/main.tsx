import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/app/App";

import { Provider } from "react-redux";
import { store, persistor } from "@/app/store"; // ✅ make sure persistor is imported

import { PersistGate } from "redux-persist/integration/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/app/bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/index.css";
import "@App.css";

// Optional: For debug, check if store & persistor are valid
console.log("Redux store:", store);
console.log("Persistor:", persistor);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  // You can temporarily remove StrictMode if PersistGate errors continue in dev
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
