import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/orchids/';

const EditOrchid = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchOrchid = async () => {
      try {
        const response = await axios.get(`${API_URL}${id}`);
        // Pre-populate the form
        reset(response.data);
      } catch (error) {
        toast.error('Failed to load orchid data');
        console.error(error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrchid();
    }
  }, [id, reset, navigate]);

  const onSubmit = async (data) => {
    try {
      // Create payload matching expected database schema
      const updateData = {
        ...data,
        isNatural: data.isNatural || false // ensure boolean
      };

      await axios.put(`${API_URL}${id}`, updateData);
      toast.success('Orchid updated successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to update orchid');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading data...</p>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <Card className="shadow-sm">
          <Card.Header className="bg-white border-bottom-0 pt-4 pb-0 text-center">
            <h3>Edit Orchid #{id}</h3>
          </Card.Header>
          <Card.Body className="p-4">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label>Orchid Name</Form.Label>
                <Form.Control 
                  type="text" 
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
                  {...register("image", { required: "Image URL is required" })}
                  isInvalid={!!errors.image}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.image?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Check 
                  type="switch"
                  id="isNatural-switch-edit"
                  label="Is this a natural orchid?"
                  {...register("isNatural")}
                />
              </Form.Group>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link to="/" className="btn btn-secondary me-md-2">
                  Cancel
                </Link>
                <Button variant="primary" type="submit">
                  Update Orchid
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default EditOrchid;
