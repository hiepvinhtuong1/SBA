import React from "react";
import { Button, Modal, Stack } from "react-bootstrap";

const DeleteCategoryModal = ({ show, handleClose, category, onDelete }) => {
	const handleConfirmDelete = () => {
		onDelete(category.id);
		handleClose();
	};
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					Delete{" "}
					<span className="text-fpt-orange">
						{category?.CategoryName}
					</span>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="py-3">
				<p className="mb-1">
					Are you sure you want to delete this category:
				</p>
				<h5 className="fw-bold text-fpt-orange">
					"{category?.CategoryName}"?
				</h5>
				<p className="text-muted small mb-0">
					This action cannot be undone. All data related to this
					category will be permanently removed.
				</p>
			</Modal.Body>
			<Modal.Footer>
				<Stack direction="horizontal" gap={2} className="ms-auto">
					<Button
						variant="light"
						onClick={handleClose}
						className="px-4"
					>
						Cancel
					</Button>
					<Button
						variant="danger"
						onClick={handleConfirmDelete}
						className="px-4 shadow-sm btn"
					>
						Yes, Delete it
					</Button>
				</Stack>
			</Modal.Footer>
		</Modal>
	);
};

export default DeleteCategoryModal;
