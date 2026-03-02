import axios from 'axios';

export interface WompiPaymentRequest {
  amount_in_cents: number;
  currency: string;
  payment_method: 'CARD' | 'PSE' | 'CASH' | 'TRANSFER';
  source_id: string; 
  customer_email: string;
}

export interface WompiPaymentResponse {
  data: {
    id: string;
    status: 'APPROVED' | 'PENDING' | 'DECLINED' | 'FAILED';
    amount_in_cents: number;
    reference: string;
  };
}

export class WompiClient {
  private apiUrl: string;
  private publicKey: string; 

  constructor() {
    this.apiUrl = process.env.WOMPI_API_URL!;
    this.publicKey = process.env.WOMPI_PUBLIC_KEY!; 
  }

  async createPayment(request: WompiPaymentRequest): Promise<WompiPaymentResponse> {
    const res = await axios.post(
      `${this.apiUrl}/transactions`,
      request,
      {
        headers: {
          Authorization: `Bearer ${this.publicKey}`, 
          'Content-Type': 'application/json',
        },
      },
    );

    return res.data;
  }
}