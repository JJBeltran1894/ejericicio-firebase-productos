import { db } from "../firebase.ts";
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";

export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  stock: number;
}

export const crearProducto = async (
  nombre: string,
  precio: number,
  stock: number,
) => {
  try {
    const docRef = await addDoc(collection(db, "productos"), {
      nombre,
      precio,
      stock,
    });

    console.log("Producto creado: ", docRef.id);
    return docRef;
  } catch (error) {
    console.log("error: " + error);
    throw error;
  }
};

export const obtenerProductos = async (): Promise<Producto[]> => {
  const querySnapshot = await getDocs(collection(db, "productos"));

  const productos = querySnapshot.docs.map((docs) => ({
    id: docs.id,
    ...docs.data(),
  })) as Producto[];

  return productos;
};

export const actualizarProducto = async (
  id: string,
  nombre: string,
  precio: number,
  stock: number
)=> {
  const productRef = doc(db,"productos", id);

  await updateDoc(productRef, {
    nombre,
    precio,
    stock
  })
}
