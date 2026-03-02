"use client";

import { getProductsService } from "@/service";
import { useCallback, useEffect, useState } from "react";

export const UseGetProducts = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any[]>([]);

  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getProductsService();
      setResult(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return { loading, result, getProducts };
};