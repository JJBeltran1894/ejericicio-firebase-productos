import { useState, type SyntheticEvent } from "react";
import { actualizarProducto, crearProducto, type Producto } from "../services/productoService";
import type { ToastTipo } from "./Toast";

interface Props {
  productoEditar: Producto | null;
  onNotificar: (mensaje: string, tipo: ToastTipo, refrescar?: boolean) => void;
}

const ProductoForm = ({ productoEditar, onNotificar }: Props) => {
  const [nombre, setNombre] = useState(productoEditar?.nombre ?? "");
  const [precio, setPrecio] = useState(productoEditar?.precio.toString() ?? "");
  const [stock, setStock] = useState(productoEditar?.stock.toString() ?? "");
  const [guardando, setGuardando] = useState(false);

  const guardarProducto = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nombre.trim() || precio === "" || stock === "") {
      onNotificar("Completa todos los campos antes de guardar", "error", false);
      return;
    }

    setGuardando(true);
    try {
      if (productoEditar) {
        await actualizarProducto(
          productoEditar.id,
          nombre.trim(),
          Number(precio),
          Number(stock)
        );
        onNotificar(`Producto "${nombre}" actualizado`, "editar", true);
      } else {
        await crearProducto(nombre.trim(), Number(precio), Number(stock));
        setNombre("");
        setPrecio("");
        setStock("");
        onNotificar(`Producto "${nombre}" guardado`, "crear", true);
      }
    } catch (error) {
      console.error("Error en Firestore:", error);
      onNotificar("Error de permisos o conexión con Firebase", "error", false);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <form onSubmit={guardarProducto} className="form-card">
      <input
        type="text"
        placeholder="Nombre del producto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="number"
        step="any"
        min="0"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />
      <input
        type="number"
        min="0"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <button type="submit" disabled={guardando}>
        {guardando ? "Procesando..." : productoEditar ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
};

export default ProductoForm;