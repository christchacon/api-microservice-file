import { Module } from '@nestjs/common';
import { KeyvService } from 'src/services/keyv.service';
 
@Module({
  providers: [KeyvService],
  exports: [KeyvService],
})
export class KeyvModule {}