import React from "react";
import Button from "@mui/material/Button";

interface ButtonCustomProps {
  variant: "crear" | "cancelar";
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({
  variant,
  onClick,
  disabled,
  children,
}) => {
  const styles =
    variant === "crear"
      ? { backgroundColor: "green", color: "white", borderRadius: 100 }
      : {
          backgroundColor: "white",
          color: "green",
          borderRadius: 100,
          border: "none", // Sin borde para cancelar
          boxShadow: "none", // Para evitar sombras si existieran
        };

  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      style={styles}
      size="medium"
    >
      {children}
    </Button>
  );
};

export default ButtonCustom;
