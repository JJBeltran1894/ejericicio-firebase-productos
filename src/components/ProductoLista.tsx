import {
  suscribirProductos,
  eliminarProducto,
  type Producto,
} from "../services/productoService";
import { useEffect, useState } from "react";
import type { ToastTipo } from "./Toast";

interface Props {
  onEditar: (producto: Producto) => void;
  onNotificar: (mensaje: string, tipo: ToastTipo) => void;
}

export const ProductoLista = ({ onEditar, onNotificar }: Props) => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const unsubscribe = suscribirProductos(
      (datos) => {
        setProductos(datos);
      },
      () => {
        onNotificar("Error al sincronizar productos en tiempo real", "error");
      }
    );

    // Limpieza obligatoria al desmontar el componente
    return () => unsubscribe();
  }, [onNotificar]);

  const handleEliminar = async (producto: Producto) => {
    try {
      await eliminarProducto(producto.id);
      onNotificar(`Producto "${producto.nombre}" eliminado`, "error");
    } catch (error) {
      console.error("Error al eliminar:", error);
      onNotificar("Error al eliminar el producto", "error");
    }
  };

  return (
    <div>
      <h2 className="section-subtitle">Lista de Productos</h2>
      <div className="productos-grid">
        {productos.map((producto) => (
          <article key={producto.id} className="producto-item">
            <span className="producto-id">ID: {producto.id}</span>
            <h3 className="producto-nombre">{producto.nombre}</h3>
            <div className="producto-meta">
              <span className="tag-precio">${producto.precio}</span>
              <span className="tag-stock">Stock: {producto.stock}</span>
            </div>
            <div className="producto-actions">
              <button
                type="button"
                className="btn-editar"
                onClick={() => onEditar(producto)}
              >
                Editar
              </button>
              <button
                type="button"
                className="btn-eliminar"
                onClick={() => handleEliminar(producto)}
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};