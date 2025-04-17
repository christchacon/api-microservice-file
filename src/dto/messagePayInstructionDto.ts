import { PayInstruction } from "src/entities/payInstruction.entity";

export class MessagePayInstructionDto{
    message: string;
    status: number;
    payInstruction: PayInstruction;
}