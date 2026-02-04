import { RouterProvider } from "react-router-dom";
import AdminLayouts from "./layouts/AdminLayouts";
import routes from "./routes/routes";
import { ToastContainer } from "react-toastify";
import GlobalSpinner from "@/shared/components/GlobalSpinner";

function App() {
	return (
		<>
			<GlobalSpinner />
			<RouterProvider router={routes}></RouterProvider>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				theme="colored"
			/>
		</>
	);
}

export default App;
