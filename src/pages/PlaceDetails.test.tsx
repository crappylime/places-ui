import axios from 'axios';
import { render, screen } from '@testing-library/react';
import PlaceDetails from './PlaceDetails';
import { Place } from '../types';

test('renders place details page with no place founded', () => {
  render(<PlaceDetails />);
  const noPlaceElement = screen.getByText(
    'Place with provided id is not available'
  );
  expect(noPlaceElement).toBeInTheDocument();
});

test('renders place details page with place founded', async () => {
  const mockDayHours = {
    start: '09:00',
    end: '17:00',
    type: 'open',
  };
  jest.spyOn(axios, 'get').mockResolvedValueOnce({
    data: {
      id: '1',
      name: 'Café',
      address: '123 Main St',
      websites: [
        {
          label: 'Website',
          link: 'https://www.cafe.com',
        },
      ],
      phoneNumbers: [
        {
          label: '123 456 789',
          link: '123456789',
        },
      ],
      openingHours: {
        saturday: [mockDayHours],
        sunday: [mockDayHours],
      },
    } as Place,
  });

  render(<PlaceDetails />);

  const nameElement = await screen.findByText('Café');
  expect(nameElement).toBeInTheDocument();

  const addressElement = await screen.findByText('123 Main St');
  expect(addressElement).toBeInTheDocument();

  const phoneElement = await screen.findByText('123 456 789');
  expect(phoneElement).toBeInTheDocument();

  const openingHoursElement = await screen.findByText('Opening Hours:');
  expect(openingHoursElement).toBeInTheDocument();

  const mondayToFridayElement = screen.getByText('Monday - Friday');
  const saturdayToSundayElement = screen.getByText('Saturday - Sunday');

  expect(
    mondayToFridayElement.parentElement?.nextElementSibling?.textContent
  ).toEqual('Closed');
  expect(
    saturdayToSundayElement.parentElement?.nextElementSibling?.textContent
  ).toEqual('09:00 - 17:00');

  expect(axios.get).toHaveBeenCalledTimes(1);
});
