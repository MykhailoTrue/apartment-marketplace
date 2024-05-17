import { Injectable, OnModuleInit } from '@nestjs/common';
import { Apartment } from './apartments.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';

@Injectable()
export class ApartmentsService implements OnModuleInit {
  constructor(
    @InjectModel(Apartment) private apartmentRepository: typeof Apartment,
  ) {}
  async onModuleInit() {
    const apartments = await this.apartmentRepository.findAll();
    if (apartments.length < 4) {
      await this.apartmentRepository.bulkCreate([
        {
          name: 'Apartment 1',
          rooms: 2,
          price: 1000,
          description: 'Apartment 1 description',
        },
        {
          name: 'Apartment 2',
          rooms: 3,
          price: 2000,
          description: 'Apartment 2 description',
        },
        {
          name: 'Apartment 3',
          rooms: 4,
          price: 3000,
          description: 'Apartment 3 description',
        },
        {
          name: 'Apartment 4',
          rooms: 5,
          price: 4000,
          description: 'Apartment 4 description',
        },
      ]);
    }
  }

  async findAll(order?: string, rooms?: number): Promise<Apartment[]> {
    let orderBy = '';
    if (order && order.toLocaleUpperCase() === 'DESC') {
      orderBy = 'DESC';
    } else if (order && order.toLocaleUpperCase() === 'ASC') {
      orderBy = 'ASC';
    }
    return await this.apartmentRepository.findAll({
      where: rooms ? { rooms } : {},
      order: [orderBy ? ['price', orderBy] : ['id', 'ASC']],
    });
    return await this.apartmentRepository.findAll();
  }

  async findOne(id: number): Promise<Apartment> {
    return await this.apartmentRepository.findOne({ where: { id } });
  }

  async create(apartment: CreateApartmentDto): Promise<Apartment> {
    return await this.apartmentRepository.create(apartment);
  }

  async update(id: number, apartment: UpdateApartmentDto): Promise<Apartment> {
    await this.apartmentRepository.update(apartment, { where: { id } });
    return await this.apartmentRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.apartmentRepository.destroy({ where: { id } });
  }
}
