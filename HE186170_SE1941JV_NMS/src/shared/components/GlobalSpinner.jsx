import React from "react";
import { Spinner } from "react-bootstrap";
import "./GlobalSpinner.scss";
import { useLoadingStore } from "../store.js/loading.store";

const GlobalSpinner = () => {
	// Lắng nghe trạng thái isLoading từ store
	const isLoading = useLoadingStore((state) => state.isLoading);

	if (!isLoading) return null;
	return (
		<div className="global-spinner-overlay">
			<div className="spinner-content">
				<Spinner animation="border" variant="warning" />
				<p className="mt-2 text-white fw-bold">Đang xử lý...</p>
			</div>
		</div>
	);
};

export default GlobalSpinner;
