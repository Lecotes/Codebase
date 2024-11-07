import { useRoutes } from "react-router-dom";
import Uploads from "../pages/uploads";
import TextAnnotations from "../components/TextAnnotator";

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
  ]);

  return element;
};

export default AppRoutes;
