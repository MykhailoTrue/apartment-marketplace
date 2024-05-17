import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { Apartment } from './apartments.model';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';

@Controller('apartments')
export class ApartmentsController {
  constructor(private apartmentsService: ApartmentsService) {}

  @Get()
  async findAll(
    @Query('order') order?: string,
    @Query('rooms', new ParseIntPipe({ optional: true }))
    rooms?: number | undefined | null,
  ): Promise<Apartment[]> {
    return await this.apartmentsService.findAll(order, rooms);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Apartment> {
    const apartment = await this.apartmentsService.findOne(id);
    if (!apartment) {
      throw new NotFoundException('Apartment Not Found');
    }
    return apartment;
  }

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() apartment: CreateApartmentDto): Promise<Apartment> {
    return await this.apartmentsService.create(apartment);
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() apartment: UpdateApartmentDto,
  ): Promise<Apartment> {
    const updated = await this.apartmentsService.update(id, apartment);
    if (!updated) {
      throw new NotFoundException('Apartment Not Found');
    }
    return updated;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    if (!id) {
      throw new NotFoundException('Apartment Not Found');
    }
    await this.apartmentsService.delete(id);
  }
}
