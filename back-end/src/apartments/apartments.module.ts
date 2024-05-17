import { Module } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { ApartmentsController } from './apartments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Apartment } from './apartments.model';

@Module({
  providers: [ApartmentsService],
  controllers: [ApartmentsController],
  imports: [SequelizeModule.forFeature([Apartment])],
})
export class ApartmentsModule {}
