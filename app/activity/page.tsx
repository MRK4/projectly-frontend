"use client";

import { useEffect, useState } from "react";
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

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase } from "lucide-react";
import { useUser } from "@/context/UserContext";
import axiosInstance from "@/lib/axiosInstance";
import { Team } from "@/types/team";
import { User } from "@/types/user";
import Link from "next/link";

export default function ActivityPage() {
  const { user, loading } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      if (user?._id) {
        try {
          setIsLoading(true);
          const response = await axiosInstance.get(`/teams/user/${user?._id}`);
          setTeams(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      }
    };

    fetchTeams();
  }, [user?._id]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-2 min-h-screen flex flex-col w-full items-center justify-start gap-4">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-4xl font-bold text-center">Chargement...</p>
          </div>
        ) : (
          <div className="h-full w-full">
            {isLoading ? (
              <p>Chargement des équipes...</p>
            ) : (
              <div className="flex flex-col w-full">
                <Breadcrumb className="hidden md:block py-4">
                  <BreadcrumbList>
                    <BreadcrumbItem>...</BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Projects</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <Card className="flex flex-col h-full">
                  <CardHeader>
                    <CardTitle>Mes équipes</CardTitle>
                    <CardDescription>
                      {teams.length} équipes trouvées
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full h-full">
                    {teams.map((team) => (
                      <Link href={`/teams/${team._id}`} key={team._id}>
                        <Card className="transition-all ease-in-out dark:hover:bg-muted hover:bg-muted flex flex-col">
                          <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                              {team.name}
                              <Badge variant="secondary" className="ml-2">
                                <Users className="mr-1 h-3 w-3" />
                                {team.members.length}
                              </Badge>
                            </CardTitle>
                            <CardDescription>
                              {team.description}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </main>
    </SidebarProvider>
  );
}
