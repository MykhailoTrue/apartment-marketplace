import { useEffect, useState } from 'react';
import ApartmentsList from './components/ApartmentsList';
import {
  Apartment,
  ApartmentToCreate,
  ApartmentToUpdate,
} from './types/Apartment';
import { SortedOptions } from './types/SortedOptions';
import { useApartments, useApartmentsRooms } from './hooks/useApartments';
import Button from './components/ui/Button';
import Modal from './components/ui/Modal/Modal';
import ApartmentFilter from './components/ApartmentFilter';
import ApartmentForm from './components/ApartmentForm';
import { useFetching } from './hooks/useFetching';
import {
  getApartments,
  deleteApartment as deleteApartmentService,
  createApartment,
  updateApartment as updateApartmentService,
} from './services/apartmentService';
import Loader from './components/ui/Loader';

const options = [
  { label: 'Price Ascending', value: SortedOptions.PriceAscending },
  { label: 'Price Descending', value: SortedOptions.PriceDescending },
  { label: 'Rooms Number', value: SortedOptions.RoomsNumber },
];

function App() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const [selectOption, setSelectOption] = useState(options[0]);
  const [modalOpened, setModalOpened] = useState(false);
  const [apartmentToUpdate, setApartmentToUpdate] = useState<Apartment | null>(
    null
  );

  const { fetching: fetchApartments, isLoading: isApartmentsLoading } =
    useFetching(async () => {
      const apartments = await getApartments();
      setApartments(apartments);
    });

  useEffect(() => {
    fetchApartments();
  }, []);

  const availableRooms = useApartmentsRooms(apartments);
  const filteredAndSortedApartments = useApartments(
    apartments,
    selectOption.value,
    selectedRooms
  );

  const { fetching: deleteApartment } = useFetching(async (id: number) => {
    await deleteApartmentService(id);
    const filtered = apartments.filter((apartment) => apartment.id !== id);
    setApartments(filtered);
  });

  const { fetching: updateApartment, isLoading: isApartmentUpdating } =
    useFetching(async (id: number, apartment: ApartmentToUpdate) => {
      const updated = (await updateApartmentService(
        id,
        apartment
      )) as Apartment;
      setApartments(
        apartments.map((apartment) =>
          apartment.id === id ? updated : apartment
        )
      );
    });

  const { fetching: addApartment, isLoading: isApartmentAdding } = useFetching(
    async (apartment: ApartmentToCreate) => {
      const createdApartment = (await createApartment(apartment)) as Apartment;
      console.log(apartment);
      setApartments([...apartments, createdApartment]);
    }
  );

  if (isApartmentsLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

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
          onSubmit={async (apartment) => {
            await addApartment(apartment);
            setModalOpened(false);
          }}
          isLoading={isApartmentAdding}
        />
      </Modal>
      <Modal
        opened={!!apartmentToUpdate}
        onClose={() => setApartmentToUpdate(null)}
      >
        <ApartmentForm
          onSubmit={async (apartment) => {
            await updateApartment(apartmentToUpdate?.id as number, apartment);
            setApartmentToUpdate(null);
          }}
          isLoading={isApartmentUpdating}
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
