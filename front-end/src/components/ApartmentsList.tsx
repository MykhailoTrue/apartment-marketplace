import { FC } from 'react';
import { Apartment } from '../types/Apartment';
import ApartmentCard from './ApartmentCard';

interface ApartmentsListProps {
  apartments: Apartment[];
  deleteApartment: (id: number) => void;
}
const ApartmentsList: FC<ApartmentsListProps> = ({
  apartments,
  deleteApartment,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">
        Available apartments ({apartments.length})
      </h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {apartments.map((apartment) => (
          <ApartmentCard
            apartment={apartment}
            key={apartment.id}
            onDelete={deleteApartment}
          />
        ))}
      </div>
    </div>
  );
};

export default ApartmentsList;
