import { FC } from 'react';
import Checkbox from './ui/Checkbox';

interface RoomsFilterProps {
  availableRooms: number[];
  selectedRooms: number[];
  setSelectedRooms: (roomsCounts: number[]) => void;
}

const RoomsFilter: FC<RoomsFilterProps> = ({
  availableRooms,
  selectedRooms,
  setSelectedRooms,
}) => {
  return (
    <div className="flex flex-col">
      {availableRooms.map((r) => (
        <Checkbox
          key={r}
          label={`${r} rooms`}
          value={selectedRooms.includes(r)}
          onChange={() =>
            setSelectedRooms(
              selectedRooms.includes(r)
                ? selectedRooms.filter((s) => s !== r)
                : [...selectedRooms, r]
            )
          }
        />
      ))}
    </div>
  );
};

export default RoomsFilter;
