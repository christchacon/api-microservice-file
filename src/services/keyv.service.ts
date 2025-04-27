import KeyvRedis from '@keyv/redis';
import { Injectable } from '@nestjs/common';
import Keyv from 'keyv';

@Injectable()
export class KeyvService {
  private readonly keyv: Keyv;

  constructor() {
    const uri = process.env.REDIS_URI;
    const redisOptions = {
        url: uri, // The Redis server URL (use 'rediss' for TLS)
        //password: 'your_password', // Optional password if Redis has authentication enabled
        namespace: 'my-namespace',
        socket: {
          host: process.env.REDIS_HOST, // Hostname of the Redis server
          port: parseInt(process.env.REDIS_PORT),        // Port number
          reconnectStrategy: (retries: number) => Math.min(retries * 50, 2000), // Custom reconnect logic
      
          tls: false, // Enable TLS if you need to connect over SSL
          keepAlive: 30000, // Keep-alive timeout (in milliseconds)
        }
      };

    this.keyv = new Keyv(new KeyvRedis(redisOptions));

    this.keyv.on('error', err => console.error('Keyv error:', err));

  }

  async set(key: string, value: any, ttl: number): Promise<boolean> {
    return this.keyv.set(key, value, ttl);
  }

  async get<T>(key: string): Promise<T | undefined> {
    return this.keyv.get(key);
  }

  async delete(key: string): Promise<boolean> {
    return this.keyv.delete(key);
  }
}