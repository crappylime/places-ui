import axios from 'axios';
import { capitalize, isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { DAYS, Place } from '../types';

function PlaceDetails() {
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<Place | null>(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const { data } = await axios.get<Place>(`/api/places/${id}`);
        setPlace(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlace();
  }, [id]);

  let groupedOpeningHours: [string, string[]][] = [];
  if (place) {
    groupedOpeningHours = DAYS.reduce(
      (
        acc: [
          { dayFrom: string; dayTo?: string },
          { start: string; end: string }[] | undefined
        ][],
        day,
        index
      ) => {
        const currDayHours = place.openingHours[day];
        const prevDayHours = place.openingHours[DAYS[index - 1]];

        if (index === 0 || !isEqual(currDayHours, prevDayHours)) {
          acc.push([{ dayFrom: day }, currDayHours]);
        } else {
          acc[acc.length - 1][0].dayTo = day;
        }

        return acc;
      },
      []
    ).map(([days, hours]) => [
      `${capitalize(days.dayFrom)}${
        days.dayTo ? ' - ' + capitalize(days.dayTo) : ''
      }`,
      hours ? hours.map(({ start, end }) => `${start} - ${end}`) : ['Closed'],
    ]);
  }

  return place ? (
    <>
      <Row>
        <Col>
          <h2 className="mt-4">{place?.name}</h2>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>Address:</h4>
          <p className="ms-4">{place?.address}</p>
          <h4>Website:</h4>
          {place?.websites?.map((website) => (
            <p key={website.link} className="ms-4">
              <a href={website.link} target="_blank" rel="noopener noreferrer">
                {website.label}
              </a>
            </p>
          ))}
          <h4>Phone:</h4>
          {place?.phoneNumbers?.map((phone) => (
            <p key={phone.link} className="ms-4 mb-0">
              <a href={`tel:${phone.link}`}>{phone.label}</a>
            </p>
          ))}
        </Col>
        <Col>
          <h4>Opening Hours:</h4>
          <div className="ms-4">
            {place?.openingHours ? (
              groupedOpeningHours.map(([days, hours]) => (
                <Row key={days}>
                  <Col md={4}>
                    <span>{days}</span>
                  </Col>
                  <Col md={8}>
                    {hours.map((i) => (
                      <p key={i} className="mb-0">
                        {i}
                      </p>
                    ))}
                  </Col>
                </Row>
              ))
            ) : (
              <p>Not available</p>
            )}
          </div>
        </Col>
      </Row>
      <hr />
    </>
  ) : (
    <div className="container-fluid py-5">
      <p className="fs-5 text-center">
        Place with provided id is not available
      </p>
    </div>
  );
}

export default PlaceDetails;
