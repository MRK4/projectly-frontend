import { User } from "./user";

export interface Team {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  members: User[];
}
