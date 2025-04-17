import { Inject, Injectable, Logger } from '@nestjs/common';
import { BussinessFormatConfig } from './entities/bussinessFormatConfig.entity';
import { PayInstruction } from './entities/payInstruction.entity';
import { BussinessFormatConfigService } from './services/BussinessFormatConfig.service';
import { fileDto } from './dto/fileDto';
import { readFileSync } from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Decimal128, Double, Repository } from 'typeorm';
import { MessagePayInstructionDto } from './dto/messagePayInstructionDto';
import { RedisService } from './services/redis.service';

@Injectable()
export class AppService {
  constructor(
      private readonly appBussinessFormatConfig: BussinessFormatConfigService,
      private readonly redisService: RedisService,
      @InjectRepository(PayInstruction)
      private payInstructionRepository: Repository<PayInstruction>,
  ) {}
  logger = new Logger('AppService');
  
  getHello(hello: string): string {
    
    this.logger.log('[INFO][hello] '+hello);
    return 'Hello World on Microservice app! '+hello;
  }

  getHello2(hello: string): string {
    this.logger.log('[INFO][hello2] '+hello);
    return 'Hello World on Microservice app 2! '+hello;
  }

  async getPayInstructions(payLoad: fileDto): Promise<PayInstruction[]>{
    this.logger.log("[getPayInstructions]: Inicio parser archivo: "+payLoad.nameFile+ " cantidad registrosos: "+payLoad.countLines);
    //console.log(payLoad);
    const txtFile = payLoad.file;
    //console.log('File: '+file);
    const idFormat = payLoad.idFormat;
    console.log('idFormat: '+idFormat);
    const lbfc = await this.appBussinessFormatConfig.findAll(idFormat);
    const arrayPayInstruction = [];
    console.log((lbfc).length);
    if((lbfc).length > 0){
        const array = txtFile.split(/\r?\n/);
        array.forEach( (line) => {
            const pi = new PayInstruction();
            (lbfc).forEach( (bfc) =>{
                if(bfc.desc_attribute.toString() == "rut"){
                    pi.rut = line.substring(bfc.begin_chapter, bfc.begin_chapter + bfc.long_chapters).trim();
                }else if(bfc.desc_attribute.toString() == "names"){
                    pi.names = line.substring(bfc.begin_chapter, bfc.begin_chapter + bfc.long_chapters).trim();
                }else if(bfc.desc_attribute.toString() == "last_names"){
                    pi.last_names = line.substring(bfc.begin_chapter, bfc.begin_chapter + bfc.long_chapters).trim();
                }else if(bfc.desc_attribute.toString() == "age"){
                    pi.age = Number.parseInt(line.substring(bfc.begin_chapter, bfc.begin_chapter + bfc.long_chapters));
                }else if(bfc.desc_attribute.toString() == "bank"){
                    pi.bank = line.substring(bfc.begin_chapter, bfc.begin_chapter + bfc.long_chapters).trim();
                }else if(bfc.desc_attribute.toString() == "account_type"){
                    pi.account_type = line.substring(bfc.begin_chapter, bfc.begin_chapter + bfc.long_chapters).trim();
                }else if(bfc.desc_attribute.toString() == "account_number"){
                    pi.account_number = line.substring(bfc.begin_chapter, bfc.begin_chapter + bfc.long_chapters).trim();
                }else {
                    pi.amount = Number.parseInt(line.substring(bfc.begin_chapter, bfc.begin_chapter + bfc.long_chapters));
                }
            });
            arrayPayInstruction.push(pi);
        });
    }
    // }else{
    //     console.log('Else PayInstruction');
    //     throw new NotFoundException('Bussiness Format Config: '+idFormat+' not found');
    // }
    this.logger.log("[getPayInstructions]: Fin parser archivo: "+payLoad.nameFile);
    return arrayPayInstruction;
  }

async savePayInstructions(payInstructions: PayInstruction[]): Promise<PayInstruction[]>{
    this.logger.log("[savePayInstructions]: Inicio Persistencia de "+payInstructions.length+ " Payinstructions");
    //console.log(payInstruction);
    const result = await this.payInstructionRepository.save(payInstructions);
    this.logger.log("[savePayInstructions]: Fin Persistencia de "+payInstructions.length+ " PayInstructions");
return  result;
}

async getPayInstruction(id: number): Promise<PayInstruction | null>{
    
    const cacheKey = `payInstruction:${id}`;
    //Consulta a cache
    const cached = await this.redisService.get(cacheKey);

    if (cached) {
        this.logger.log("[getPayInstruction]: Pay instruction: "+id+ " get cache")
        return JSON.parse(cached); // retorna desde Redis
    }

    const pi = await this.payInstructionRepository.findOneBy({ id });
    if(pi){
        //Guardar en cache
        await this.redisService.set(cacheKey, pi, 60);
        this.logger.log("[getPayInstruction]: Pay instruction: "+id+ " found")
    }else{
        this.logger.log("[getPayInstruction]: Pay instruction: "+id+ " not found");
    }
    return pi;
}

}
