import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Col, Form, FormControl, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Place } from '../types';
import './Places.css';

function Places() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const { data } = await axios.get<Place[]>('/api/places', {
          params: { search: searchTerm },
        });
        setPlaces(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlaces();
  }, [searchTerm]);

  return (
    <>
      <Form className="mt-4 my-2">
        <Row>
          <Col>
            <FormControl
              type="text"
              placeholder="Search by name or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
        </Row>
      </Form>
      <Row>
        {places.length ? (
          places.map((place) => (
            <Col key={place.name} md={6} className="my-3">
              <Link
                to={`/${place.id}`}
                className="text-decoration-none text-reset"
              >
                <Card className="place-card">
                  <Card.Body className="p-4">
                    <Card.Title>{place.name}</Card.Title>
                    <Card.Subtitle className="my-4 text-muted">
                      {place.address}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))
        ) : (
          <div className="container-fluid py-5">
            <p className="fs-5 text-center">No places found</p>
          </div>
        )}
      </Row>
    </>
  );
}

export default Places;
