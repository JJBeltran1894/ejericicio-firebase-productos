import "./App.css";
import ProductoForm from "./components/ProductoForm";
import { ProductoLista } from "./components/ProductoLista";
import { useState } from "react";
import type { Producto } from "./services/productoService"

function App() {

  const [productoEditar, setProductoEditar] = useState<Producto | null>(null);

  return (
    <div className="app-wrapper">
      <h1 className="app-title">Registro de productos</h1>
      <ProductoForm key={productoEditar?.id?? "nuevo" } productoEditar={productoEditar} />
      <ProductoLista onEditar={setProductoEditar}/>
    </div>
  );
}

export default App;
