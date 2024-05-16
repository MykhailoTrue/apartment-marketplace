import { FC, useEffect, useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import TextArea from './ui/TextArea';
import {
  validatePrice,
  validateRoomsNumber,
  validateTextArea as validateDescription,
  validateName,
} from '../utils/validators';
import { ApartmentToCreate } from '../types/Apartment';

interface ApartmentFormProps {
  onSubmit: (apartment: ApartmentToCreate) => void;
  initialValues?: ApartmentToCreate;
}

const ApartmentForm: FC<ApartmentFormProps> = ({ onSubmit, initialValues }) => {
  const [formData, setFormData] = useState({
    name: '',
    roomsNumber: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    if (initialValues) {
      setFormData({
        name: initialValues.name,
        roomsNumber: initialValues.rooms.toString(),
        price: initialValues.price.toString(),
        description: initialValues.description,
      });
    }
  }, [initialValues]);

  const [formErrors, setFormErrors] = useState({
    name: validateName(formData.name),
    roomsNumber: validateRoomsNumber(formData.roomsNumber),
    price: validatePrice(formData.price),
    description: validateDescription(formData.description),
  });

  const [formValid, setFormValid] = useState(false);

  const [formDirty, setFormDirty] = useState({
    name: false,
    roomsNumber: false,
    price: false,
    description: false,
  });

  useEffect(() => {
    if (
      formErrors.description ||
      formErrors.price ||
      formErrors.roomsNumber ||
      formErrors.name
    ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [formErrors]);

  useEffect(() => {
    setFormErrors({
      name: validateName(formData.name),
      roomsNumber: validateRoomsNumber(formData.roomsNumber),
      price: validatePrice(formData.price),
      description: validateDescription(formData.description),
    });
  }, [formData]);

  const clearForm = () => {
    setFormData({
      name: '',
      roomsNumber: '',
      price: '',
      description: '',
    });
    setFormDirty({
      name: false,
      roomsNumber: false,
      price: false,
      description: false,
    });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setFormErrors((prevFormErrors) => {
      const error = validateName(name);
      return {
        ...prevFormErrors,
        name: error,
      };
    });
    setFormData((prevFormData) => ({ ...prevFormData, name }));
  };

  const handleRoomsNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormErrors((prevFormErrors) => {
      const roomsNumberError = validateRoomsNumber(event.target.value);
      return {
        ...prevFormErrors,
        roomsNumber: roomsNumberError,
      };
    });
    setFormData((prevFormData) => ({
      ...prevFormData,
      roomsNumber: event.target.value,
    }));
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormErrors((prevFormErrors) => {
      const priceError = validatePrice(event.target.value);
      return {
        ...prevFormErrors,
        price: priceError,
      };
    });
    setFormData((prevFormData) => ({
      ...prevFormData,
      price: event.target.value,
    }));
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const description = event.target.value;
    setFormErrors((prevFormErrors) => {
      const descriptionError = validateDescription(description);
      return {
        ...prevFormErrors,
        description: descriptionError,
      };
    });
    setFormData((prevFormData) => ({ ...prevFormData, description }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formValid) {
      return;
    }
    const apartmentToUpdate = {
      name: formData.name,
      rooms: +formData.roomsNumber,
      price: +formData.price,
      description: formData.description,
    };
    onSubmit(apartmentToUpdate);
    clearForm();
  };

  const handleBlur = (
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement>
  ) => {
    const { name } = event.target;
    setFormDirty((prevFormDirty) => ({ ...prevFormDirty, [name]: true }));
  };

  const handleFocus = (
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement>
  ) => {
    const { name } = event.target;
    setFormDirty((prevFormDirty) => ({ ...prevFormDirty, [name]: false }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <Input
        label="Name"
        type="text"
        value={formData.name}
        onChange={handleNameChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        name="name"
        error={formDirty.name ? formErrors.name : undefined}
      />
      <Input
        label="Rooms Number"
        type="number"
        value={formData.roomsNumber}
        onChange={handleRoomsNumberChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        name="roomsNumber"
        error={formDirty.roomsNumber ? formErrors.roomsNumber : undefined}
      />
      <Input
        label="Price"
        type="number"
        value={formData.price}
        onChange={handlePriceChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        name="price"
        error={formDirty.price ? formErrors.price : undefined}
      />
      <TextArea
        label="Description"
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={formData.description}
        onChange={handleDescriptionChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        name="description"
        error={formDirty.description ? formErrors.description : undefined}
      />
      <Button disabled={!formValid} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default ApartmentForm;
