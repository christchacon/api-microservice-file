import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { BussinesFormatConfigModule } from './modules/bussinessFormatConfig.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BussinessFormatConfigService } from './services/BussinessFormatConfig.service';
import { DataSource } from 'typeorm';
import { PayInstructionModule } from './modules/payInstruction.module';
import { RedisService } from './services/redis.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from './modules/redis.module';
import { OrmModule } from './modules/typeOrm.module';

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
    RedisModule,
    OrmModule
   ],
  controllers: [AppController],
  providers: [AppService, BussinessFormatConfigService, RedisService]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

