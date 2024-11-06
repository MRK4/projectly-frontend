"use client";

import axiosInstance from "../lib/axiosInstance";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const ApiTestButton = () => {
  const { toast } = useToast();

  const handleTestApi = async () => {
    try {
      const response = await axiosInstance.get("/");
      toast({
        title: `API Test - ${response.status}`,
        description: response.data,
      });
      console.log(response.data);
    } catch (error: any) {
      const message = error.response.data;
      toast({
        title: "An error occurred",
        description: message,
        variant: "destructive",
      });
    }
  };

  return <Button onClick={handleTestApi}>Test the API</Button>;
};
