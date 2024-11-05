"use client";

import axiosInstance from "../lib/axiosInstance";
import { Button } from "@/components/ui/button";

export const ApiTestButton = () => {
  const handleTest = async () => {
    try {
      const response = await axiosInstance.get("/");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return <Button onClick={handleTest}>Test the API</Button>;
};
