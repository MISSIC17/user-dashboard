export type TTodo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type TFilterStatus = "all" | "active" | "completed";
