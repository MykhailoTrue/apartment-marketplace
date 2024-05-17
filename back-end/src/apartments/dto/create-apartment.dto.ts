import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateApartmentDto {
  @IsString({ message: 'Name must be a string' })
  @Length(0, 99, { message: 'Name must be at least 3 characters long' })
  name: string;

  @IsNumber({ allowNaN: false }, { message: 'Rooms must be a number' })
  @Min(1, { message: 'Rooms must be at least 1' })
  rooms: number;

  @IsNumber({ allowNaN: false }, { message: 'Price must be a number' })
  @Min(1, { message: 'Price must be at least 1' })
  price: number;

  @IsString({ message: 'Description must be a string' })
  @Length(0, 999, { message: 'Description can be at most 999 characters' })
  description: string;
}
