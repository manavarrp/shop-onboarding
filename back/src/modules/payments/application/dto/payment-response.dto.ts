import { PaymentStatus } from "prisma/generated/prisma/enums";


export class PaymentResponseDTO {
  id!: string;
  orderId!: string;
  status!: PaymentStatus;
  amount!: number;
  transactionId?: string;
  createdAt!: Date;
}