import { ThemeToggler } from "@/components/ThemeToggler";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiTestButton } from "@/components/ApiTestButton";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col w-full items-center justify-center gap-4">
      <ThemeToggler />
      <ApiTestButton />
      <h1 className="text-4xl font-bold text-center">Welcome to Projectly</h1>
      <Tabs className="w-full max-w-md" defaultValue="login">
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="login">
            Login
          </TabsTrigger>
          <TabsTrigger className="w-full" value="register">
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </main>
  );
}
