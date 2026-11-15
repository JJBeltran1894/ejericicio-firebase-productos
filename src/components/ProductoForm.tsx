import { useState, type SyntheticEvent } from "react";
import { actualizarProducto, crearProducto, type Producto } from "../services/productoService";

interface Props {
  productoEditar: Producto | null;
  onGuardado: (mensaje: string, tipo: "crear" | "editar") => void;
}

const ProductoForm = ({ productoEditar, onGuardado }: Props) => {
  const [nombre, setNombre] = useState(productoEditar?.nombre ?? "");
  const [precio, setPrecio] = useState(productoEditar?.precio.toString() ?? "");
  const [stock, setStock] = useState(productoEditar?.stock.toString() ?? "");

  const guardarProducto = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();

    try {
      if (productoEditar) {
        await actualizarProducto(
          productoEditar.id,
          nombre,
          Number(precio),
          Number(stock)
        );

        setNombre("");
        setPrecio("");
        setStock("");
        onGuardado(`Producto "${nombre}" actualizado correctamente`, "editar");
      } else {
        await crearProducto(nombre, Number(precio), Number(stock));

        setNombre("");
        setPrecio("");
        setStock("");
        onGuardado(`Producto "${nombre}" guardado con éxito`, "crear");
      }
    } catch (error) {
      console.log("error: " + error);
    }
  };

  return (
    <div>
      <form onSubmit={guardarProducto} className="form-card">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <button type="submit">{productoEditar ? "Actualizar" : "Guardar"}</button>
      </form>
    </div>
  );
};

export default ProductoForm;