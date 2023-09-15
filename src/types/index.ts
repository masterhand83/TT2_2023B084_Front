export type Producto = {
  key: string;
  codigo: string;
  nombre: string;
  marca: string;
  stock: number;
  precio: number;
};
export type VentaItem = {
  key: string;
  cantidad: number;
  producto: Producto;
}
export type  Marca = {
  id: number;
  marca: string
}