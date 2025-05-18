import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  onClick: () => void;
}

export default function FloatingButton({ onClick }: Props) {
  return (
    <Fab
      color="success"
      onClick={onClick}
      sx={{ position: 'fixed', bottom: 24, right: 24 }}
      aria-label="add"
    >
      <AddIcon />
    </Fab>
  );
}
