import { Task, Category } from "@/types";
import TaskItem from "./TaskItem";
import { Typography, Stack, Divider } from "@mui/material";

interface Props {
  tasks: Task[];
  categories: Category[];
  onToggle: (task: Task) => void;
}

export default function TaskList({ tasks, categories, onToggle }: Props) {
  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const getCategory = (categoryId: string) =>
    categories.find((cat) => cat.id === categoryId);

  return (
    <Stack sx={{
      padding:10
    }} spacing={4}>
      <Typography variant="h3" fontSize={36} fontWeight={600} gutterBottom>
        Lista de tareas
      </Typography>
      {/* Tareas pendientes */}
      {pendingTasks.length > 0 && (
        <div>
          <Typography variant="h5" fontSize={20} fontWeight={500} gutterBottom>
            Pendientes
          </Typography>

          <Stack spacing={2}>
            {pendingTasks.map((task) => {
              console.log(task, "TASK PENDING");
              return (
                <TaskItem
                  key={task.id}
                  task={task}
                  category={getCategory(task.category_id)}
                  onToggle={onToggle}
                />
              );
            })}
          </Stack>
        </div>
      )}
      {pendingTasks.length > 0 && <Divider />}

      {/* Tareas Terminadas */}
      {completedTasks.length > 0 && (
        <div>
          <Typography variant="h5" fontSize={20} fontWeight={500} gutterBottom>
            Terminadas
          </Typography>
          <Stack spacing={2}>
            {completedTasks.map((task) => {
              console.log(task, "TASK COMPLETED");

              return (
                <TaskItem
                  key={task.id}
                  task={task}
                  category={getCategory(task.category_id)}
                  onToggle={onToggle}
                />
              );
            })}
          </Stack>
        </div>
      )}
    </Stack>
  );
}
