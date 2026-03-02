"use client";

import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { createProductService, getProductsService, getProductByIdService } from "@/service";

// Crear producto
export const UseCreateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createProduct = useCallback(async (data: { name: string; description?: string; price: number }) => {
    try {
      setIsLoading(true);
      const response = await createProductService(data);
      toast.success("Producto creado exitosamente");
      return response;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Error inesperado al crear producto");
      } else {
        toast.error("Error inesperado al crear producto");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { createProduct, isLoading };
};