"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface RecentActivity {
  id: number;
  name: string;
  task: string;
  project: string;
  timestamp: string;
}

interface DashboardRecentActivityListProps {
  recentActivity: RecentActivity[];
}

export const DashboardRecentActivityList: React.FC<
  DashboardRecentActivityListProps
> = ({ recentActivity }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="inline-flex w-full justify-between items-baseline">
          <span>Recent Activity</span>
          <Button className="text-primary" variant={"ghost"} asChild>
            <Link href="/activity">View all activity</Link>
          </Button>
        </CardTitle>
        <CardDescription>See what's happening in your projects</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="w-full">
          {recentActivity.map((activity) => (
            <li
              key={activity.id}
              className="flex flex-col w-full items-center justify-center gap-4"
            >
              <div className="w-full inline-flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src={activity.name} alt={activity.name} />
                  <AvatarFallback className="bg-white text-primary">
                    {activity.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col w-full gap-2">
                  <span className="inline-flex items-center gap-2">
                    <Badge
                      variant={"secondary"}
                      className="text-sm text-muted-foreground leading-none font-light"
                    >
                      {activity.name}
                    </Badge>
                  </span>
                  <div className="inline-flex items-baseline gap-4">
                    <p className="items-baseline">
                      <span className="font-semibold">{activity.task}</span>{" "}
                      <span className="text-xs">in</span>{" "}
                      <Badge variant={"outline"}>{activity.project}</Badge>
                    </p>
                    <p className="text-xs font-light text-muted-foreground">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              </div>
              {activity.id !== recentActivity[recentActivity.length - 1].id && (
                <Separator className="w-full mb-4" />
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
