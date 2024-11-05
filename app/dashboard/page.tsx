"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { useUser } from "@/context/UserContext";
import { DashboardHeader } from "./(components)/DashboardHeader";
import { DashboardRecentActivityList } from "./(components)/DashboardRecentActivityList";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const { user, loading } = useUser();
  const [recentActivity, setRecentActivity] = useState<
    {
      id: number;
      name: string;
      task: string;
      project: string;
      timestamp: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        const data = [
          {
            id: 1,
            name: "John Doe",
            task: "Created a new task",
            project: "Project X",
            timestamp: "2 hours ago",
          },
          {
            id: 2,
            name: "Jane Doe",
            task: "Assigned a task to John Doe",
            project: "Project Y",
            timestamp: "1 day ago",
          },
          {
            id: 3,
            name: "Alice Doe",
            task: "Completed a task",
            project: "Project Z",
            timestamp: "2 days ago",
          },
        ];
        setRecentActivity(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecentActivity();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="py-4 px-2 min-h-screen flex flex-col w-full items-center justify-center gap-4">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-4xl font-bold text-center">Chargement...</p>
          </div>
        ) : (
          <section className="h-full flex flex-col w-full gap-2">
            <div className="flex flex-col w-full gap-4">
              <div className="px-2 flex flex-col h-fit w-fit gap-2">
                <h2>
                  Hello{" "}
                  <span className="text-primary">{user?.username} 👋</span>
                </h2>
                <p>
                  This is your dashboard. <br /> Here you can see all your teams
                  and projects.
                </p>
              </div>
              <DashboardHeader />
            </div>
            <div className="w-full grid gap-2 lg:grid-cols-2">
              <DashboardRecentActivityList recentActivity={recentActivity} />
              <DashboardRecentActivityList recentActivity={recentActivity} />
            </div>
          </section>
        )}
      </main>
    </SidebarProvider>
  );
}
