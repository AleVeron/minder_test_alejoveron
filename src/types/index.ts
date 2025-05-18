export interface Task {
  id: string;
  title: string;
  description?: string | null;
  category_id: string;
  completed: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string | null;
}
