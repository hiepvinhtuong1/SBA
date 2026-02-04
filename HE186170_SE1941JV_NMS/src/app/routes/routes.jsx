import { createBrowserRouter } from "react-router-dom";
import adminRoutes from "./admin.routes";

const routes = createBrowserRouter([...adminRoutes]);

export default routes;
