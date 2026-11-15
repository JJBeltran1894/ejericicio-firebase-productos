import { useEffect } from "react";

export type ToastTipo = "crear" | "editar" | "error";

interface Props {
  texto: string;
  tipo: ToastTipo;
  onCerrar: () => void;
  duracion?: number;
}

export const Toast = ({ texto, tipo, onCerrar, duracion = 3000 }: Props) => {
  useEffect(() => {
    const timer = setTimeout(onCerrar, duracion);
    return () => clearTimeout(timer);
  }, [texto, tipo, duracion, onCerrar]);

  return (
    <div className={`toast-banner is-${tipo}`} role="status">
      <span>{texto}</span>
      <button
        type="button"
        className="toast-close"
        onClick={onCerrar}
        aria-label="Cerrar notificación"
      >
        ×
      </button>
    </div>
  );
};