import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayInstruction } from 'src/entities/payInstruction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PayInstruction])],
  exports: [TypeOrmModule]
})
export class PayInstructionModule {}