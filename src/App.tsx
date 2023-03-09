import React, { Suspense, useCallback } from "react";
import PageLoader from "./components/PageLoader";
import "./css/style.css";

const Home = React.lazy(() => import("./pages/Home"));

function App() {
	const clearBodyStyles = useCallback(() => {
		document.body.style.removeProperty("position");
		document.body.style.removeProperty("width");
	}, []);

	return (
		<>
			<Suspense fallback={<PageLoader />}>
				<Home clearBodyStyles={clearBodyStyles} />
			</Suspense>
		</>
	);
}

export default App;
