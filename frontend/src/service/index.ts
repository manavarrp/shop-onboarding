import axios from "axios";


// =========================
// PRODUCTS
// =========================
export const createProductService = async (data: { name: string; description?: string; price: number }) => {
  const response = await axios.post("/products", data);
  return response.data;
};

export const getProductsService = async () => {
  const response = await axios.get("/products");
  return response.data;
};

export const getProductByIdService = async (id: string) => {
  const response = await axios.get(`/products/${id}`);
  return response.data;
};

// =========================
// ORDERS
// =========================
export const createOrderService = async (data: { items: any[]; total: number }) => {
  const response = await axios.post("/orders", data);
  return response.data;
};

export const getOrdersService = async () => {
  const response = await axios.get("/orders");
  return response.data;
};

export const getOrderByIdService = async (id: string) => {
  const response = await axios.get(`/orders/${id}`);
  return response.data;
};

// =========================
// PAYMENTS
// =========================
export const createPaymentService = async (data: {
  orderId: string;
  amount: number;
  method: string;
  token: string;
  customerEmail: string;
}) => {
  const response = await axios.post("/payments", data);
  return response.data;
};

export const getPaymentsService = async () => {
  const response = await axios.get("/payments");
  return response.data;
};

export const getPaymentByIdService = async (id: string) => {
  const response = await axios.get(`/payments/${id}`);
  return response.data;
};