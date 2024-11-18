import { useRoutes } from "react-router-dom";
import Uploads from "../pages/UploadsPage";
import TextAnnotations from "../components/TextAnnotator";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
  // Sets up routes
  let element = useRoutes([
    {
      path: "/uploads",
      element: <Uploads />,
    },
    {
      path: "/annotations",
      element: <TextAnnotations />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);

  return element;
};

export default AppRoutes;
