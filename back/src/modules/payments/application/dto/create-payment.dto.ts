import { PaymentMethod } from "prisma/generated/prisma/enums";


export class CreatePaymentDTO {
  orderId!: string;
  amount!: number;
  method!: PaymentMethod;
  token?: string; 
}