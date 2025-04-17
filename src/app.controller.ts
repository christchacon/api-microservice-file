import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, MessagePattern, NatsContext, Payload } from '@nestjs/microservices';
import { PayInstruction } from './entities/payInstruction.entity';
import { fileDto } from './dto/fileDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @MessagePattern({ cmd: 'file' })
  async getPayInstructions(@Payload() payLoad: fileDto, @Ctx() context: NatsContext): Promise<PayInstruction[]>{
    //console.log('Hello1');
    const pi: PayInstruction[] = await this.appService.getPayInstructions(payLoad);
    return await this.appService.savePayInstructions(pi);
  }
  
  @MessagePattern({ cmd: 'hello' })
  getHello(@Payload() hello: string, @Ctx() context: NatsContext) {
    //console.log('Subject: '+context.getSubject.name); // e.g. "time.us.east"
    return this.appService.getHello(hello);
  }

  @MessagePattern({ cmd: 'hello2' })
  getHello2(@Payload() hello: string, @Ctx() context: NatsContext) {
    //console.log('Subject: '+context.getSubject.name); // e.g. "time.us.east"
    return this.appService.getHello2(hello);
  }

  @MessagePattern({ cmd: 'getPayInstruction' })
  getPayInstruction(@Payload() id: number, @Ctx() context: NatsContext): Promise<PayInstruction>{
    //console.log('Subject: '+context.getSubject.name); // e.g. "time.us.east"
    return this.appService.getPayInstruction(id);
  }
}
