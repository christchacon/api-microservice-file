import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule as RedisIoModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    RedisIoModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type:'single',
        host: config.get('REDIS_HOST'),
        port: parseInt(config.get('REDIS_PORT')),
        //password: config.get('REDIS_PASSWORD'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class RedisModule {}