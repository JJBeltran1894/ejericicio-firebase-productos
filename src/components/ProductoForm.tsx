import { useState, type SyntheticEvent } from "react";
import { crearProducto } from "../services/productoService";

const ProductoForm = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");

  const guardarProducto = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();

    try {
      await crearProducto(nombre, Number(precio), Number(stock));

      setNombre("");
      setPrecio("");
      setStock("");
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
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default ProductoForm;
