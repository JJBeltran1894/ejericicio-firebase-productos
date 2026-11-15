import "./App.css";
import ProductoForm from "./components/ProductoForm";
import { ProductoLista } from "./components/ProductoLista";
import { Toast, type ToastTipo } from "./components/Toast";
import { useCallback, useState } from "react";
import type { Producto } from "./services/productoService";

function App() {
  const [productoEditar, setProductoEditar] = useState<Producto | null>(null);
  const [recargar, setRecargar] = useState(0);
  const [toast, setToast] = useState<{ texto: string; tipo: ToastTipo } | null>(null);

  const cerrarToast = useCallback(() => setToast(null), []);

  const notificar = (mensaje: string, tipo: ToastTipo, refrescar = true) => {
    if (refrescar) {
      setProductoEditar(null);
      setRecargar((prev) => prev + 1);
    }
    setToast({ texto: mensaje, tipo });
  };

  return (
    <div className="app-wrapper">
      <h1 className="app-title">Registro de productos</h1>
      <ProductoForm
        key={productoEditar?.id ?? "nuevo"}
        productoEditar={productoEditar}
        onNotificar={notificar}
      />
      <ProductoLista
        onEditar={setProductoEditar}
        onNotificar={notificar}
        recargar={recargar}
      />

      {toast && (
        <Toast
          texto={toast.texto}
          tipo={toast.tipo}
          onCerrar={cerrarToast}
        />
      )}
    </div>
  );
}

export default App;