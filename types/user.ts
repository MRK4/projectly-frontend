export interface User {
  _id: string;
  avatarUrl: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: "user" | "admin";
}
