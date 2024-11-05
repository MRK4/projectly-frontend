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

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/users/signup", {
        email,
        username,
        password,
      });
      console.log("Réponse du serveur:", response);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleRegister}>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Enter your registration details</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="gap-1">
            <Label htmlFor="email">Email adress</Label>
            <Input
              id="email"
              defaultValue=""
              placeholder="your@mail.test"
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
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
              Create an account
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};
