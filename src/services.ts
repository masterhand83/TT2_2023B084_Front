import axios from 'axios';
const DIRECCION_API = 'http://192.168.100.85:7071/api/'
export async function getListaProductos() {
  const result = await axios.get(`${DIRECCION_API}get-lista-productos`)
  return result.data;
}
export async function getAllMarcas() {
  const result = await axios.get(`${DIRECCION_API}get-all-marcas`)
  return result.data;
}
//  {
//      "key": "1234",
//      "codigo": "123",
//      "nombre": "producto por añadir 3",
//      "marca": 1,
//      "stock": 123,
//      "precio": 500.05
//  }
export async function addProducto(producto: Producto) {
  const result = await axios.post(`${DIRECCION_API}add-producto`, producto)
  return result.data;
}
