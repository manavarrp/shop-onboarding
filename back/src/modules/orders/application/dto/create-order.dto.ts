export class CreateOrderDTO {
  items: {
    productId: number;
    quantity: number;
  }[];
}