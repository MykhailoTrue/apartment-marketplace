import { FC } from 'react';
import Select from './ui/Select/Select';
import RoomsFilter from './RoomsFilter';
import { SelectOption } from '../types/SelectOption';

interface ApartmentFilterProps {
  availableRooms: number[];
  selectedRooms: number[];
  setSelectedRooms: (roomsCounts: number[]) => void;
  selectOption: SelectOption;
  setSelectOption: (option: SelectOption) => void;
  selectOptions: SelectOption[];
}

const ApartmentFilter: FC<ApartmentFilterProps> = ({
  availableRooms,
  selectedRooms,
  setSelectedRooms,
  selectOption,
  selectOptions,
  setSelectOption,
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold">Filters</h2>
      <h3 className="text-sm font-bold text-gray-500">Sort by</h3>
      <Select
        value={selectOption}
        options={selectOptions}
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
    </>
  );
};

export default ApartmentFilter;
