"use client";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import axiosInstance from "@/lib/axiosInstance";
import { Team } from "@/types/team";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { User } from "@/types/user";
import { TeamMember } from "./(components)/TeamMember";

export default function TeamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const teamId = unwrappedParams.id;
  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log(teamId);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/teams/${teamId}`);
        setTeam(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch team data");
        setIsLoading(false);
      }
    };

    fetchTeam();
  }, [teamId]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-2 min-h-screen flex flex-col w-full items-center justify-start gap-4 h-full">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-4xl font-bold text-center">Loading...</p>
          </div>
        ) : (
          <div className="flex flex-col w-full h-full justify-start">
            <Breadcrumb className="w-full hidden md:block py-4">
              <BreadcrumbList>
                <BreadcrumbItem>...</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/teams">Teams</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{team?.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl">{team?.name}</CardTitle>
                    <CardDescription>{team?.description}</CardDescription>
                  </div>
                  <Badge variant="secondary">
                    {team?.members.length} Members
                  </Badge>
                </div>
              </CardHeader>
            </Card>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                </CardHeader>
                <CardContent></CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Team Performance</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]"></CardContent>
              </Card>
            </div>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] w-full">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {team?.members.map((member: User, index: number) => (
                      <TeamMember key={index} {...member} />
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </SidebarProvider>
  );
}
