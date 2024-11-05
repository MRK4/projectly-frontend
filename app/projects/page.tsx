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
import { Project } from "@/types/project";
import { User } from "@/types/user";
import Link from "next/link";

export default function ProjectsPage() {
  const { user, loading } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (user?._id) {
        try {
          setIsLoading(true);
          const response = await axiosInstance.get(
            `/projects/user/${user?._id}`
          );
          setProjects(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      }
    };

    fetchProjects();
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
              <p>Loading projects...</p>
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
                    <CardTitle>My projects</CardTitle>
                    <CardDescription>
                      {projects.length} projects found
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full h-full">
                    {projects.map((project) => (
                      <Link href={`/projects/${project._id}`} key={project._id}>
                        <Card className="transition-all ease-in-out dark:hover:bg-muted hover:bg-muted flex flex-col">
                          <CardHeader>
                            <CardTitle>{project.name}</CardTitle>
                            <CardDescription>
                              {project.description}
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
