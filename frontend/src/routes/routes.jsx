import { useRoutes } from "react-router-dom";
import Uploads from "../pages/uploads";

const AppRoutes = () => {
  // Sets up routes
  let element = useRoutes([
    {
      path: "/uploads",
      element: <Uploads />,
    },
  ]);

  return element;
};

export default AppRoutes;
