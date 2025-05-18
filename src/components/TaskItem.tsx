import { Box, Typography, Checkbox, Chip, Stack, Paper } from "@mui/material";
import { Task, Category } from "@/types";

interface Props {
  task: Task;
  category?: Category;
  onToggle: (task: Task) => void;
}

export default function TaskItem({ task, category, onToggle }: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 32,
        backgroundColor: category?.color || "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        opacity: task.completed ? 0.6 : 1,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" flex={1}>
        <Checkbox color="success" checked={task.completed} onChange={() => onToggle(task)} />

        <Box>
          <Typography fontSize={16} fontWeight={400}>{task.title}</Typography>
          {task.description && (
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
          )}
        </Box>
      </Stack>

      {category && (
        <Chip
          label={category.name}
          variant="outlined"
          color="success"
          sx={{ fontWeight: 500 }}
        />
      )}
    </Paper>
  );
}
