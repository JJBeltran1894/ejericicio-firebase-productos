import { db } from "../firebase.ts";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";

export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  stock: number;
}

export const suscribirProductos = (
  onDatos: (productos: Producto[]) => void,
  onError?: (error: Error) => void
): Unsubscribe => {
  const productosRef = collection(db, "productos");

  const unsubscribe = onSnapshot(
    productosRef,
    (querySnapshot) => {
      const productos = querySnapshot.docs.map((documento) => ({
        id: documento.id,
        ...documento.data(),
      })) as Producto[];

      onDatos(productos);
    },
    (error) => {
      console.error("Error en la suscripción de productos:", error);
      onError?.(error);
    }
  );

  return unsubscribe;
};

export const crearProducto = async (
  nombre: string,
  precio: number,
  stock: number
) => {
  const docRef = await addDoc(collection(db, "productos"), {
    nombre,
    precio,
    stock,
  });
  return docRef;
};

export const obtenerProductos = async (): Promise<Producto[]> => {
  const querySnapshot = await getDocs(collection(db, "productos"));
  return querySnapshot.docs.map((docs) => ({
    id: docs.id,
    ...docs.data(),
  })) as Producto[];
};

export const actualizarProducto = async (
  id: string,
  nombre: string,
  precio: number,
  stock: number
) => {
  const productRef = doc(db, "productos", id);
  await updateDoc(productRef, {
    nombre,
    precio,
    stock,
  });
};

export const eliminarProducto = async (id: string) => {
  const productoRef = doc(db, "productos", id);
  await deleteDoc(productoRef);
};