import { FC, useState } from 'react';
import { Apartment } from '../types/Apartment';
import apartmentImg from '../assets/apartment.jpg';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import Button from './ui/Button';

interface Props {
  apartment: Apartment;
  onDelete: (id: number) => Promise<void>;
  onUpdate: (apartment: Apartment) => void;
}

const ApartmentCard: FC<Props> = ({ apartment, onDelete, onUpdate }) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div
      className="max-w-[256px] rounded-md shadow-lg relative cursor-pointer"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <div
        className="h-64 bg-cover bg-center rounded-t-md"
        style={{ backgroundImage: `url(${apartment.image || apartmentImg})` }}
      ></div>
      <div className="flex flex-col px-2 py-4 ">
        <div className="text-lg font-bold">{apartment.name}</div>
        <div className="text-sm">Rooms: {apartment.rooms}</div>
        <div className="text-lg font-semibold">{apartment.price} EUR</div>
        {showDescription && (
          <div className="text-sm">{apartment.description}</div>
        )}
        <Button onClick={() => setShowDescription(!showDescription)}>
          {showDescription ? 'Hide description' : 'Show description'}
        </Button>
      </div>
      {mouseIsOver && (
        <>
          <Button
            useDefaultStyle={false}
            onClick={async (e) => {
              e.stopPropagation();
              await onDelete(apartment.id);
            }}
            className="stroke-white absolute right-[1px] top-[20px] -translate-y-1/2 bg-slate-600 p-2 rounded
          opacity-60 hover:opacity-100"
          >
            <IconTrash className="text-red-500" />
          </Button>
          <Button
            useDefaultStyle={false}
            onClick={(e) => {
              e.stopPropagation();
              onUpdate(apartment);
            }}
            className="stroke-white absolute right-[41px] top-[20px] -translate-y-1/2 bg-slate-600 p-2 rounded
        opacity-60 hover:opacity-100"
          >
            <IconEdit className="text-blue-500" />
          </Button>
        </>
      )}
    </div>
  );
};

export default ApartmentCard;
