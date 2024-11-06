"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/users/login", {
        username,
        password,
      });

      if (response.status === 200) {
        router.push("/dashboard");
      } else {
        toast({
          title: "An error occurred",
          description: "Please check your credentials and try again",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      // get the error message from the response
      const message = error.response.data.message;
      toast({
        title: "An error occurred",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleLogin}>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your login details</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="gap-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              defaultValue=""
              placeholder="test"
              disabled={loading}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              defaultValue=""
              placeholder="**********"
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          {loading ? (
            <Button className="w-full" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button className="w-full" type="submit">
              Login
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};
