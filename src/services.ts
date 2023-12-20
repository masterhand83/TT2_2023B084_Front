import axios from 'axios';
const DIRECCION_API = 'https://2023b084.azurewebsites.net/api/'
// const DIRECCION_API = 'http://192.168.0.102:7071/api/'
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
export async function editarProducto(producto: Partial<ProductoInput>) {
  const result = await axios.post(`${DIRECCION_API}edit-producto`, producto)
  return result.data;
}

export async function addStockProduct(params: StockInput) {
  const result = await axios.post(`${DIRECCION_API}add-stock`, params)
  return result.data;
}
export async function removeStock(params: MermaInput) {
  const result = await axios.post(`${DIRECCION_API}remove-stock`, params)
  return result.data;
}
export async function desactivarProducto(codigo: string) {
  const result = await axios.post(`${DIRECCION_API}desactivar-producto`, {codigo})
  return result.data;
}
export async function addMarcaToList(marca: string) {
  const result = await axios.post(`${DIRECCION_API}add-marca`, {marca})
  return result.data;
}
export async function hacerCompra(params: VentaItem[]){
  console.log(params)
  const result = await axios.post(`${DIRECCION_API}hacer-compra`, params)
  return result.data;
}
export async function getVentas() {
  const result = await axios.get(`${DIRECCION_API}get-lista-ventas`)
  return result.data;
}
export async function getMermas() {
  const result = await axios.get(`${DIRECCION_API}get-lista-mermas`)
  return result.data;
}
export async function getExistencias(codigo:string) {
  const result = await axios.get(`${DIRECCION_API}get-lista-existencias?codigo=${codigo}`)
  return result.data;
}
export async function getVistaVentas(): Promise<VistaVenta[]> {
  const result = await axios.get(`${DIRECCION_API}get-vista-ventas`)
  return result.data;
}
