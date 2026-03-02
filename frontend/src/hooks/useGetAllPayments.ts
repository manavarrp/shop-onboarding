"use client";

import { getPaymentsService } from "@/service";
import { useCallback, useEffect, useState } from "react";

export const UseGetPayments = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any[]>([]);

  const getPayments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getPaymentsService();
      setResult(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPayments();
  }, [getPayments]);

  return { loading, result, getPayments };
};