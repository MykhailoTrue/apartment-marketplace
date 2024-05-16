import { useMemo } from 'react';
import { Apartment } from '../types/Apartment';
import { SortedOptions } from '../types/SortedOptions';

export function useApartmentsRooms(apartments: Apartment[]) {
  const availableRooms = useMemo(
    () =>
      apartments
        .map((a) => a.rooms)
        .filter((value, index, array) => array.indexOf(value) === index)
        .sort((r1, r2) => r1 - r2),
    [apartments]
  );
  return availableRooms;
}

export function useSortedPosts(apartments: Apartment[], sort: SortedOptions) {
  const sortedPosts = useMemo(() => {
    const sortStrategies = {
      [SortedOptions.PriceAscending]: (a1: Apartment, a2: Apartment) =>
        a1.price - a2.price,
      [SortedOptions.PriceDescending]: (a1: Apartment, a2: Apartment) =>
        a2.price - a1.price,
      [SortedOptions.RoomsNumber]: (a1: Apartment, a2: Apartment) =>
        a1.rooms - a2.rooms,
    };
    return [...apartments].sort(sortStrategies[sort]);
  }, [sort, apartments]);
  return sortedPosts;
}

export function useApartments(
  apartments: Apartment[],
  sort: SortedOptions,
  selectedRooms: number[]
) {
  const sortedApartments = useSortedPosts(apartments, sort);
  const sortedAndFilteredApartments = useMemo(() => {
    return sortedApartments.filter((a) => {
      if (selectedRooms.length === 0) {
        return true;
      }
      return selectedRooms.includes(a.rooms);
    });
  }, [sortedApartments, selectedRooms]);

  return sortedAndFilteredApartments;
}
