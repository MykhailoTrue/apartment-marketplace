import { Model, Table, Column, DataType } from 'sequelize-typescript';

interface ApartmentCreationAttrs {
  name: string;
  rooms: number;
  price: number;
  description: string;
}

@Table({ tableName: 'apartments' })
export class Apartment extends Model<Apartment, ApartmentCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rooms: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;
}
