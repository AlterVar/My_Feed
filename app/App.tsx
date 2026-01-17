import { RouterProvider } from "react-router-dom";
import AppProviders from "./providers/AppProviders";
import "./styles/index.scss";
import { router } from "./providers/router/router";

function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

export default App;
