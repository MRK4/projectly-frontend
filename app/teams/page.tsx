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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase } from "lucide-react";
import { useUser } from "@/context/UserContext";
import axiosInstance from "@/lib/axiosInstance";
import { Team } from "@/types/team";
import { User } from "@/types/user";
import Link from "next/link";

export default function TeamsPage() {
  const { user, loading } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [teams, setTeams] = useState<Team[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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
  }, [user]);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-2 min-h-screen flex flex-col w-full items-center justify-start gap-4">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-4xl font-bold text-center">Loading...</p>
          </div>
        ) : (
          <div className="h-full w-full">
            {isLoading ? (
              <p>Loading teams...</p>
            ) : (
              <div>
                <Breadcrumb className="hidden md:block py-4">
                  <BreadcrumbList>
                    <BreadcrumbItem>...</BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Teams</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <Card className="flex flex-col h-full">
                  <CardHeader>
                    <CardTitle>My Teams</CardTitle>
                    <CardDescription>
                      {teams.length} teams found
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Input
                      type="text"
                      placeholder="Search teams..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="mb-4"
                    />
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full h-full">
                      {filteredTeams.map((team) => (
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
                    </div>
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
