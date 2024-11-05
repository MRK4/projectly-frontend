"use client";

import { use, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import axiosInstance from "@/lib/axiosInstance";
import { Team } from "@/types/team";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
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
import { Project } from "@/types/project";

export default function TeamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const projectId = unwrappedParams.id;
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log(projectId);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/projects/${projectId}`);
        setProject(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch project data");
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

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
                  <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{project?.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl">{project?.name}</CardTitle>
                    <CardDescription>{project?.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              {/* <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold">Team</span>
                    <div className="flex flex-row gap-4">
                      {project?.team.map((team: Team) => (
                        <Badge key={team.id} variant="outline">
                          {team.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold">Members</span>
                    <div className="flex flex-row gap-4">
                      {project?.members.map((member) => (
                        <Badge key={member.id} variant="outline">
                          {member.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent> */}
            </Card>
          </div>
        )}
      </main>
    </SidebarProvider>
  );
}
