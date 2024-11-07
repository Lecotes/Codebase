import { BrowserRouter, useRoutes } from "react-router-dom";
import Uploads from "./pages/uploads";
import "./App.css";
import "./index.css";
function AppRoutes() {
  // Sets up routes
  let element = useRoutes([
    {
      path: "/uploads",
      element: <Uploads />,
    },
  ]);

  return element;
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
