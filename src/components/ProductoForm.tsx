import { useState, type SyntheticEvent } from "react";
import {actualizarProducto, crearProducto, type Producto} from "../services/productoService";


interface Props {
  productoEditar: Producto | null;

}

const ProductoForm = ({productoEditar}:Props) => {
  const [nombre, setNombre] = useState(productoEditar?.nombre ?? "");
  const [precio, setPrecio] = useState(productoEditar?.precio.toString() ?? "");
  const [stock, setStock] = useState(productoEditar?.stock.toString() ?? "");

  const guardarProducto = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();

    try {

      if(productoEditar){

        await actualizarProducto(
          productoEditar.id,
          nombre,
          Number(precio),
          Number(stock)
        );
        
        console.log("Prodcuto actualizado");
        setNombre("");
        setPrecio("");
        setStock("");

      }else{
        const id = await crearProducto(nombre, Number(precio), Number(stock));

        console.log("Producto creado: ", id);
        setNombre("");
        setPrecio("");
        setStock("");

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
