import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/orchids/';

const ListOfOrchids = () => {
  const [orchids, setOrchids] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const fetchOrchids = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setOrchids(response.data);
    } catch (error) {
      toast.error('Failed to fetch orchids');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrchids();
  }, []);

  const handleClose = () => {
    setShowModal(false);
    reset();
  };
  const handleShow = () => setShowModal(true);

  const onSubmit = async (data) => {
    try {
      const newOrchid = {
        ...data,
        isNatural: data.isNatural || false
      };
      
      await axios.post(API_URL, newOrchid);
      toast.success('Orchid added successfully!');
      handleClose();
      fetchOrchids();
    } catch (error) {
      toast.error('Failed to add orchid');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this orchid?')) {
      try {
        await axios.delete(`${API_URL}${id}`);
        toast.success('Orchid deleted successfully!');
        fetchOrchids();
      } catch (error) {
        toast.error('Failed to delete orchid');
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>List Of Orchids</h2>
        <Button variant="primary" onClick={handleShow}>
          <i className="bi bi-plus-circle me-2"></i>
          Add new orchid
        </Button>
      </div>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover className="align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Image</th>
                <th>Natural</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orchids.length > 0 ? (
                orchids.map((orchid) => (
                  <tr key={orchid.id}>
                    <td>{orchid.id}</td>
                    <td>{orchid.orchidName}</td>
                    <td>
                      {orchid.image ? (
                        <img 
                          src={orchid.image} 
                          alt={orchid.orchidName} 
                          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/80?text=No+Image'; }}
                        />
                      ) : (
                        'No image'
                      )}
                    </td>
                    <td>
                      {orchid.natural ? (
                        <span className="badge bg-success">Yes</span>
                      ) : (
                        <span className="badge bg-secondary">No</span>
                      )}
                    </td>
                    <td>
                      <Link to={`/edit/${orchid.id}`} className="btn btn-sm btn-warning me-2">
                        <i className="bi bi-pencil-square"></i> Edit
                      </Link>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(orchid.id)}>
                        <i className="bi bi-trash"></i> Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No orchids found. Try adding one!
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}

      {/* Add New Orchid Modal */}
      <Modal show={showModal} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add New Orchid</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Orchid Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter orchid name"
                {...register("orchidName", { required: "Name is required" })}
                isInvalid={!!errors.orchidName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.orchidName?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control 
                type="url" 
                placeholder="https://example.com/image.jpg"
                {...register("image", { required: "Image URL is required" })}
                isInvalid={!!errors.image}
              />
              <Form.Control.Feedback type="invalid">
                {errors.image?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check 
                type="switch"
                id="isNatural-switch"
                label="Is this a natural orchid?"
                {...register("isNatural")}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Orchid
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ListOfOrchids;
