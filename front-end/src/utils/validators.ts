export const validatePrice = (price: string) => {
  const priceNumber = +price;
  let priceError = '';
  if (!price) {
    priceError = 'Price cannot be empty';
  } else if (priceNumber < 1) {
    priceError = 'Price must be at least 1';
  }
  return priceError;
};

export const validateRoomsNumber = (roomsNumber: string) => {
  const roomsNumberNumber = +roomsNumber;
  let roomsNumberError = '';
  if (!roomsNumber) {
    roomsNumberError = 'Rooms number cannot be empty';
  } else if (roomsNumberNumber < 1) {
    roomsNumberError = 'Rooms number must be at least 1';
  }
  return roomsNumberError;
};

export const validateTextArea = (description: string) => {
  let descriptionError = '';
  if (description.length > 999) {
    descriptionError = 'Description too long';
  }
  return descriptionError;
};

export const validateName = (name: string) => {
  let nameError = '';
  if (!name) {
    nameError = 'Name cannot be empty';
  } else if (name.length > 99) {
    nameError = 'Name must be at least 3 characters long';
  }
  return nameError;
};
