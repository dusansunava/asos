export type User = {
  id: string,
  username: string,
  email: string,
  role: "USER" | "ADMIN",
  createdAt: string,
  updatedAt: string
};