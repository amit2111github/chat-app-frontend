import "../style/cardStyle.css"
export const errorMessage = (error) => {
	return (
		<div className="alert alert-warning messages">
			<h4>{error}</h4>
		</div>
	);
};
export const successMessage = (success) => {
	return (
		<div className="alert alert-success messages">
			<h2>{success}</h2>
		</div>
	);
};
export const loadingMessage = (loading) => {
	return (
		<div className="loaderforloading container mt-2"></div>
	);
};
export const loader = () => {
	return (
		<div className="loader container mt-2"></div>
	)
}