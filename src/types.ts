export const DAYS: DayNames[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export interface Place {
  id: string;
  name: string;
  address: string;
  websites: Contact[];
  phoneNumbers: Contact[];
  openingHours: DayOpeningHours;
}

interface Contact {
  label: string;
  link: string;
}

type DayNames =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

type DayOpeningHours = {
  [key in DayNames]?: { start: string; end: string; type: string }[];
};
