//Imports
import { useEffect, useState } from "react";
import { Task, Category } from "@/types";
import {
  getTasks,
  getCategories,
  updateTask,
  createTask,
} from "@/services/api";
import { Container, CircularProgress } from "@mui/material";
import TaskList from "@/components/TaskList";
import FloatingButton from "@/components/FloatingButton";
import NewTaskForm from "@/components/NewTaskForm";

export default function App() {
  //Estados
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  //Fetch data de la base local de tareas y categorias
  useEffect(() => {
    async function fetchData() {
      try {
        const [tasksRes, categoriesRes] = await Promise.all([
          getTasks(),
          getCategories(),
        ]);
        setTasks(tasksRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error("Error al obtener datos:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  //Funcion para actualizar una tarea a pendiente o completada
  const handleToggleTask = async (task: Task) => {
    try {
      const updated = { completed: !task.completed };
      await updateTask(task.id, updated);
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, ...updated } : t))
      );
    } catch (err) {
      console.error("Error al actualizar tarea:", err);
    }
  };

  //Funcion para crear una tarea en estado pendiente por defecto
  const handleCreateTask = async (data: Omit<Task, "id" | "completed">) => {
    try {
      const newTask = { ...data, completed: false };
      const res = await createTask(newTask);
      setTasks((prev) => [...prev, res.data]);
      setShowForm(false);
    } catch (err) {
      console.error("Error al crear tarea:", err);
    }
  };



  if (loading) {
    return (
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ py: 0, backgroundColor: "#F9FAFF" }}>
      <TaskList
        tasks={tasks}
        categories={categories}
        onToggle={handleToggleTask}
      />
      <FloatingButton onClick={() => setShowForm(true)} />
      <NewTaskForm
        open={showForm}
        onClose={() => setShowForm(false)}
        onCreate={handleCreateTask}
        categories={categories}
      />
    </Container>
  );
}
