"use client";

import { useState, useEffect, useCallback } from "react";
import Dashboard from "@/src/modules/Dashboard/components/Dashboard";
import { getMetrics } from "@/src/modules/Dashboard";

const DashboardPage = () => {
  const [metricsData, setMetricsData] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (typeof window != "undefined") {
      const tokenValue = document.cookie
        .split("; ")
        .find(row => row.startsWith("token="))
        ?.split("=")[1] || '';
      setToken(tokenValue);
    }
  }, []);

  const getAppMetrics = useCallback(async () => {
    if (!token) return;
    try {
      const response = await getMetrics(token);
      if (response) {
        setMetricsData(response.data);
      }
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  }, [token]);

  useEffect(() => {
    getAppMetrics();
  }, [getAppMetrics]);

  if (!metricsData) {
    return <div>Loading...</div>;
  }

  return <Dashboard metricsData={metricsData} />;
};

export default DashboardPage;
