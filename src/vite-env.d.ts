/// <reference types="vite/client" />
declare type Producto = {
  key: string;
  codigo: string;
  nombre: string;
  marca: string;
  stock: number;
  precio: number;
};
declare type VentaItem = {
  key: string;
  cantidad: number;
  producto: Producto;
}
declare type Venta = {
  id: number;
  fecha: string;
  items: VentaItem[];
  cantidad: number;
  total: number;
}
declare type  Marca = {
  id: number;
  marca: string
}