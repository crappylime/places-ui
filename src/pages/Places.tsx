import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Card, Col, Form, FormControl, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Place } from '../types';
import './Places.css';

function Places() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchPlaces = async (searchTerm='') => {
    setIsLoading(true);
    try {
      const { data } = await axios.get<Place[]>('/api/places', {
        params: { search: searchTerm },
      });
      setPlaces(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(async () => {
      if (!value || (value && value.length >= 2)) {
        fetchPlaces(value);
      }
    }, 450);
  };

  const searchElement = (
    <Form className="mt-4 my-2">
      <Row>
        <Col>
          <FormControl
            type="text"
            placeholder="Search by name or address..."
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
        </Col>
      </Row>
    </Form>
  )

  return (
    <>
      {searchElement}
      <Row>
        {isLoading && (
          <div className="text-center py-5">
            <Spinner />
          </div>  
          )}

        {!isLoading && places.length === 0 && (
          <div className="container-fluid py-5">
            <p className="fs-5 text-center">No places found</p>
          </div>
        )}

        {!isLoading && places.length && (
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
        )}
      </Row>
    </>
  );
}

export default Places;
