import spinnerGif from "../img/spinner.gif"

export default function PageLoader() {
	return (
		<div className="flex justify-content-center align-items-center p-20 page-loader">
      <img src={spinnerGif} alt="Loading..." />
    </div>
	);
}
