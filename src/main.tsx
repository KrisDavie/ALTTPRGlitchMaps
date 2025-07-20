import React from "react";
import { createRoot } from "react-dom/client";
import "semantic-ui-css/semantic.min.css";
import App from "./App.tsx";
import Guide from "./components/Guide.tsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";

const container = document.getElementById("root");

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/guide",
    element: <Guide />,
  }
]);

if (container) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>
  );
} else {
  throw new Error("No root element found");
}
