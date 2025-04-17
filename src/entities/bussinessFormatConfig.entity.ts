
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('tbl_bussiness_format_config')
export class BussinessFormatConfig {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    id_config_format: number;

    @Column()
    begin_chapter: number;

    @Column("text")
    desc_attribute: string;

    @Column("int")
    long_chapters: number;
}