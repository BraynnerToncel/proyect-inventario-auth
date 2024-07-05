import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalInformation } from '@entity/api/personal-information/personal-information.entity';
import { PersonalInformationService } from './personal-information.service';
import { PersonalInformationController } from './personal-information.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalInformation])],
  controllers: [PersonalInformationController],
  providers: [PersonalInformationService],
})
export class SalesmanModule {}
