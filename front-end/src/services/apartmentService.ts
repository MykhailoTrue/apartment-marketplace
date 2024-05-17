import { ApartmentToCreate, ApartmentToUpdate } from '../types/Apartment';
import axiosService from './axiosService';

export const getApartments = async (order?: string, rooms?: number) => {
  const response = await axiosService.get('apartments', {
    params: { order, rooms },
  });
  return response.data;
};

export const getApartment = async (id: number) => {
  const response = await axiosService.get(`apartments/${id}`);
  return response.data;
};

export const createApartment = async (apartment: ApartmentToCreate) => {
  const response = await axiosService.post('apartments', apartment);
  return response.data;
};

export const updateApartment = async (
  id: number,
  apartment: ApartmentToUpdate
) => {
  const response = await axiosService.put(`apartments/${id}`, apartment);
  return response.data;
};

export const deleteApartment = async (id: number) => {
  console.log('deleteApartment', id);
  const response = await axiosService.delete(`apartments/${id}`);
  return response.data;
};
