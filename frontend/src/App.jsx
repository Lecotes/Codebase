import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";
import "./App.css";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
