import { Team } from "@/types/team";

export interface Project {
  _id: string;
  name: string;
  description: string;
  teamId: Team[];
  createdAt: string;
  updatedAt: string;
}
