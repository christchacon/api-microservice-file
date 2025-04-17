import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BussinessFormatConfig } from "src/entities/bussinessFormatConfig.entity";
import { Long, Repository } from "typeorm";

@Injectable()
export class BussinessFormatConfigService {

  constructor(
    @InjectRepository(BussinessFormatConfig)
    private BussinesFormatConfigRepository: Repository<BussinessFormatConfig>,
  ) {}

  findAll(id_config_format: number){
    return this.BussinesFormatConfigRepository.find({
      where: {
          id_config_format: id_config_format
      },
    });
  }

  async findOne(id: number): Promise<BussinessFormatConfig | null> {
    console.log('Method findOne. id: '+id)
    const bfc = await this.BussinesFormatConfigRepository.findOneBy({ id });
    return bfc;
  }

  async remove(id: number): Promise<void> {
    await this.BussinesFormatConfigRepository.delete(id);
  }

//   findAllBy(id_config_format: Long): Promise<BussinesFormatConfig[]>{
//     return this.BussinesFormatConfigRepository.find({ where: { id_config_format } });
//   }
} 