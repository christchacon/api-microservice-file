

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BussinessFormatConfig } from 'src/entities/bussinessFormatConfig.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BussinessFormatConfig])],
  exports: [TypeOrmModule]
})
export class BussinesFormatConfigModule {}