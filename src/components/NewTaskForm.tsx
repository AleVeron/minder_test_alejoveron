import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Box,
  FormHelperText,
} from "@mui/material";
import ButtonCustom from "./ButtonCustom";
import { Category } from "@/types";

interface LabeledFieldProps {
  label: string;
  children: React.ReactNode;
}

const LabeledField = ({ label, children }: LabeledFieldProps) => (
  <Box>
    <Box component="label" sx={{ fontSize: 14, color: "#666", mb: 0.5 }}>
      {label}
    </Box>
    {children}
  </Box>
);

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (data: {
    title: string;
    description?: string | null;
    category_id: string;
  }) => void;
  categories: Category[];
}

export default function NewTaskForm({
  open,
  onClose,
  onCreate,
  categories,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");

  // Estado para saber si ya intentó enviar para mostrar errores
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  // Validaciones del titulo y categoria
  const titleError = attemptedSubmit && title.trim() === "";
  const categoryError = attemptedSubmit && categoryId === "";

  const isFormValid = title.trim() !== "" && categoryId !== "";

  const handleSubmit = () => {
    setAttemptedSubmit(true);
    if (!isFormValid) return;

    onCreate({
      title: title.trim(),
      description: description.trim() || null,
      category_id: categoryId,
    });

    // Reseto del formulario y estado de intento
    setTitle("");
    setDescription("");
    setCategoryId("");
    setAttemptedSubmit(false);
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setCategoryId("");
    setAttemptedSubmit(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 3,
        },
      }}
    >
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <LabeledField label="Título *">
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              inputProps={{ maxLength: 40 }}
              fullWidth
              variant="standard"
              error={titleError}
              helperText={titleError ? "El título es obligatorio." : ""}
            />
          </LabeledField>

          <LabeledField label="Descripción">
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              inputProps={{ maxLength: 100 }}
              multiline
              fullWidth
              variant="standard"
            />
          </LabeledField>

          <LabeledField label="Categoría *">
            <FormControl fullWidth required error={categoryError} variant="standard">
              <Select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
              {categoryError && (
                <FormHelperText>Debe seleccionar una categoría.</FormHelperText>
              )}
            </FormControl>
          </LabeledField>
        </Box>
      </DialogContent>

      <DialogActions sx={{ mb: 2, px: 3 }}>
        <ButtonCustom variant="cancelar" onClick={handleCancel}>
          CANCELAR
        </ButtonCustom>
        <ButtonCustom
          variant="crear"
          onClick={handleSubmit}
        >
          CREAR
        </ButtonCustom>
      </DialogActions>
    </Dialog>
  );
}
