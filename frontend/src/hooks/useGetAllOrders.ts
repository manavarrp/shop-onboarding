"use client";

import { getOrdersService } from "@/service";
import { useCallback, useEffect, useState } from "react";

export const UseGetOrders = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any[]>([]);

  const getOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getOrdersService();
      setResult(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return { loading, result, getOrders };
};