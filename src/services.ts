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
