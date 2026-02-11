// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./app/App";
// import { Provider } from "react-redux";
// import { store } from "./app/store";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { queryClient } from "./app/bootstrap";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "./index.css";
// import "./App.css";
// import { Button } from "flowbite-react";

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement,
// );

// root.render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </QueryClientProvider>
//   </React.StrictMode>,
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { Provider } from "react-redux";
// import { store, persistor } from "./shared/stores/store"; // make sure persistor is imported
import { store } from "./app/store"; // make sure persistor is imported

import { PersistGate } from "redux-persist/integration/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./app/bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./App.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} 
        // persistor={persistor}
        >
          <App />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
);
