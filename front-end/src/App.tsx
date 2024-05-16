import { useState } from 'react';
import ApartmentsList from './components/ApartmentsList';
import { Apartment, ApartmentToCreate } from './types/Apartment';
import { SortedOptions } from './types/SortedOptions';
import { useApartments, useApartmentsRooms } from './hooks/useApartments';
import Button from './components/ui/Button';
import Modal from './components/ui/Modal/Modal';
import ApartmentFilter from './components/ApartmentFilter';
import ApartmentForm from './components/ApartmentForm';

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
  {
    id: 6,
    rooms: 5,
    name: 'Apartment 6',
    price: 200,
    description: 'Apartment 6 description',
  },
];

function App() {
  const [apartments, setApartments] = useState(initialApartments);
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const [selectOption, setSelectOption] = useState(options[0]);
  const [modalOpened, setModalOpened] = useState(false);
  const [apartmentToUpdate, setApartmentToUpdate] = useState<Apartment | null>(
    null
  );

  const availableRooms = useApartmentsRooms(apartments);
  const filteredAndSortedApartments = useApartments(
    apartments,
    selectOption.value,
    selectedRooms
  );

  const deleteApartment = (id: number) => {
    const filtered = apartments.filter((apartment) => apartment.id !== id);
    setApartments(filtered);
  };

  const updateApartment = (id: number, apartment: ApartmentToCreate) => {
    const updated = apartments.map((a) =>
      a.id === id ? { ...a, ...apartment } : a
    );
    setApartments(updated);
  };

  const addApartment = (apartment: ApartmentToCreate) => {
    const newApartment: Apartment = {
      ...apartment,
      id: Math.max(...apartments.map((a) => a.id)) + 1,
    };
    setApartments([...apartments, newApartment]);
  };

  return (
    <div>
      <div className="m-4 flex">
        <h1 className="text-3xl text-center font-bold grow">Apartments</h1>
        <Button onClick={() => setModalOpened(true)}>Add apartment</Button>
      </div>
      <hr />
      <div className="flex ">
        <div className="flex flex-col gap-2 mx-2 basis-[200px] border-r">
          <ApartmentFilter
            {...{
              availableRooms,
              selectedRooms,
              setSelectedRooms,
              selectOption,
              setSelectOption,
              selectOptions: options,
            }}
          />
        </div>
        <div className="grow mx-4">
          <ApartmentsList
            apartments={filteredAndSortedApartments}
            deleteApartment={deleteApartment}
            updateApartment={(apartment) => setApartmentToUpdate(apartment)}
          />
        </div>
      </div>
      <Modal opened={modalOpened} onClose={() => setModalOpened(false)}>
        <ApartmentForm
          onSubmit={(apartment) => {
            addApartment(apartment);
            setModalOpened(false);
          }}
        />
      </Modal>
      <Modal
        opened={!!apartmentToUpdate}
        onClose={() => setApartmentToUpdate(null)}
      >
        <ApartmentForm
          onSubmit={(apartment) => {
            updateApartment(apartmentToUpdate?.id as number, apartment);
            setApartmentToUpdate(null);
          }}
          initialValues={
            apartmentToUpdate
              ? {
                  rooms: apartmentToUpdate?.rooms,
                  name: apartmentToUpdate?.name,
                  price: apartmentToUpdate?.price,
                  description: apartmentToUpdate?.description,
                }
              : undefined
          }
        />
      </Modal>
    </div>
  );
}

export default App;
