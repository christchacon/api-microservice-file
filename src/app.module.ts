import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { BussinesFormatConfigModule } from './modules/bussinessFormatConfig.module';
import { BussinessFormatConfigService } from './services/BussinessFormatConfig.service';
import { DataSource } from 'typeorm';
import { PayInstructionModule } from './modules/payInstruction.module';
import { ConfigModule } from '@nestjs/config';
import { OrmModule } from './modules/typeOrm.module';
import { KeyvModule } from './modules/keyv.module';
import { KeyvService } from './services/keyv.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './files',
      }),
    }),
    BussinesFormatConfigModule,
    PayInstructionModule,
    OrmModule,
    KeyvModule
   ],
  controllers: [AppController],
  providers: [AppService, BussinessFormatConfigService, KeyvService]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

