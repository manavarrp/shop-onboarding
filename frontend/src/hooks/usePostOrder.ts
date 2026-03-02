"use client";

import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { createOrderService, getOrdersService, getOrderByIdService } from "@/service";

// Crear orden
export const UseCreateOrder = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createOrder = useCallback(async (data: { items: any[]; total: number }) => {
    try {
      setIsLoading(true);
      const response = await createOrderService(data);
      toast.success("Orden creada exitosamente");
      return response;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Error inesperado al crear orden");
      } else {
        toast.error("Error inesperado al crear orden");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { createOrder, isLoading };
};