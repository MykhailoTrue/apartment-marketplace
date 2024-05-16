export type Apartment = {
  id: number;
  rooms: number;
  name: string;
  price: number;
  description: string;
  image?: string;
};

export type ApartmentToCreate = Omit<Omit<Apartment, 'id'>, 'image'>;
