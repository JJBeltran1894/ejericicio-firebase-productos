import { obtenerProductos, type Producto } from "../services/productoService";
import { useEffect, useState } from "react";

interface Props {
  onEditar: (producto: Producto) => void;
}

export const ProductoLista = ({onEditar}: Props) => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const datos = await obtenerProductos();
        setProductos(datos);
      } catch (error) {
        console.error("error al obtener productos: ", error);
      }
    };
    cargarProductos();
  }, []);

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
              <button className="btn-editar" onClick={()=> onEditar(producto)}>Editar</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};