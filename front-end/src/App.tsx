import { useState } from 'react';
import ApartmentsList from './components/ApartmentsList';
import Select from './components/ui/Select/Select';
import { Apartment } from './types/Apartment';
import RoomsFilter from './components/RoomsFilter';
import { SortedOptions } from './types/SortedOptions';
import { useApartments, useApartmentsRooms } from './hooks/useApartments';

const options = [
  { label: 'Price Ascending', value: SortedOptions.PriceAscending },
  { label: 'Price Descending', value: SortedOptions.PriceDescending },
  { label: 'Rooms Number', value: SortedOptions.RoomsNumber },
];

const initialApartments: Apartment[] = [
  {
    id: 1,
    rooms: 2,
    name: 'Apartment 1',
    price: 100,
    description: 'Apartment 1 description',
  },
  {
    id: 2,
    rooms: 3,
    name: 'Apartment 2',
    price: 200,
    description: 'Apartment 2 description',
  },
  {
    id: 3,
    rooms: 4,
    name: 'Apartment 3',
    price: 300,
    description: 'Apartment 3 description',
  },
  {
    id: 4,
    rooms: 5,
    name: 'Apartment 4',
    price: 400,
    description: 'Apartment 4 description',
  },
  {
    id: 5,
    rooms: 5,
    name: 'Apartment 5',
    price: 200,
    description: 'Apartment 5 description',
  },
];

function App() {
  const [apartments, setApartments] = useState(initialApartments);
  const availableRooms = useApartmentsRooms(apartments);

  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const [selectOption, setSelectOption] = useState(options[0]);

  const filteredAndSortedApartments = useApartments(
    apartments,
    selectOption.value,
    selectedRooms
  );

  const deleteApartment = (id: number) => {
    const filtered = apartments.filter((apartment) => apartment.id !== id);
    setApartments(filtered);
  };

  return (
    <div>
      <div className="flex">
        <div className="flex flex-col gap-2 mx-2 basis-[200px]">
          <h2 className="text-2xl font-bold">Filters</h2>
          <h3 className="text-sm font-bold text-gray-500">Sort by</h3>
          <Select
            value={selectOption}
            options={options}
            onChange={(option) => {
              setSelectOption(option);
            }}
          />
          <hr />
          <h3 className="text-sm font-bold text-gray-500">Rooms</h3>
          <RoomsFilter
            availableRooms={availableRooms}
            selectedRooms={selectedRooms}
            setSelectedRooms={setSelectedRooms}
          />
        </div>
        <div className="grow">
          <ApartmentsList
            apartments={filteredAndSortedApartments}
            deleteApartment={deleteApartment}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
