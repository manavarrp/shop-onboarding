"use client";

import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { createPaymentService, getPaymentsService, getPaymentByIdService } from "@/service";

// Crear pago
export const UseCreatePayment = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createPayment = useCallback(
    async (data: { orderId: string; amount: number; method: string; token: string; customerEmail: string }) => {
      try {
        setIsLoading(true);
        const response = await createPaymentService(data);
        toast.success("Pago realizado exitosamente");
        return response;
      } catch (error: unknown) {
        if (isAxiosError(error) && error.response) {
          toast.error(error.response.data.message || "Error inesperado al procesar pago");
        } else {
          toast.error("Error inesperado al procesar pago");
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { createPayment, isLoading };
};