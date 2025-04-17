import { Column, Double, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tbl_beneficiaries')
export class PayInstruction{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rut: string;

    @Column()
    names: string;

    @Column()
    last_names: string;

    @Column()
    age: number;

    @Column()
    bank: string;

    @Column()
    account_type: string;

    @Column()
    account_number: string;

    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0.00 })
    amount: number;

}