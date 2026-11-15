import { obtenerProductos, eliminarProducto, type Producto } from "../services/productoService";
import { useEffect, useState } from "react";
import type { ToastTipo } from "./Toast";

interface Props {
  onEditar: (producto: Producto) => void;
  onNotificar: (mensaje: string, tipo: ToastTipo, refrescar?: boolean) => void;
  recargar: number;
}

export const ProductoLista = ({ onEditar, onNotificar, recargar }: Props) => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const datos = await obtenerProductos();
        setProductos(datos);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        onNotificar("No se pudieron cargar los productos", "error", false);
      }
    };
    cargarProductos();
  }, [recargar]);

  const handleEliminar = async (producto: Producto) => {
    try {
      await eliminarProducto(producto.id);
      onNotificar(`Producto "${producto.nombre}" eliminado`, "error");
    } catch (error) {
      console.error("Error al eliminar:", error);
      onNotificar("Error al eliminar (revisa reglas de Firebase)", "error", false);
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