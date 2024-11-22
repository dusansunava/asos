export type Portfolio = {
  name: string;
  value: number;
  owner_id: string;
  competition_id: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
}

export type Food = {
  id: string;
  user: User;
  user_id: number;
  foodItem: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}