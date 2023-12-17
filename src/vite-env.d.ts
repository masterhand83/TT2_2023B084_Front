/// <reference types="vite/client" />
declare type Producto = {
  key: string;
  codigo: string;
  nombre: string;
  marca: string;
  existencias: number;
  precio_unitario: number;
  activo?: boolean = true;
};
declare type ProductoInput = {
  key: string;
  codigo: string;
  nombre: string;
  marca: number;
  existencias: number;
  precio_unitario: number;
  activo?: boolean = true;
};
declare type VentaItem = {
  key: string;
  cantidad: number;
  registro_precio: number;
  producto: Producto;
}
declare type Venta = {
  id: number;
  fecha: string;
  items: VentaItem[];
  cantidad: number;
  total: number;
}
declare type VistaVentaItem = {
  codigo_producto: string;
  nombre: string;
  cantidad: number;
  registro_precio: number;
  subtotal: number;
}
declare type VistaVenta = {
  id_venta: string;
  fecha: string;
  items: VentaVistaItem[]
  total: number;
  cantidad: number;
}
declare type Perdida = {
  id: number;
  fecha: string;
  producto: Producto;
  cantidad: number;
  total: number;
}
declare type  Marca = {
  id: number;
  marca: string
}
declare type PronosticoVentas =
  {
    periodoInicio: string;
    periodoFin: string;
    ventas: number;
  }[]
