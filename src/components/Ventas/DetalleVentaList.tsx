import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useState } from 'react';
type DetalleVentaListProps = {
  selectedVenta: Venta | null;
};
type VentaProps = {
  selectedVenta: Venta;
};
const getFechaHours = (fecha: string) => {
  const fechaDate = new Date(fecha);
  return new Date(fechaDate).toLocaleTimeString();
};

const getFormatedFecha = (fecha: string) => {
  const date = new Date(fecha);
  // Get day, month, and year components from the Date object
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
  const year = date.getFullYear();
  // Create the formatted date string in DD/MM/YYYY format
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};
const DetalleVenta = ({ selectedVenta }: VentaProps) => (
  <>
    <div className="w-full">
      <div className="w-full flex">
        <span>Fecha:</span>
        <span className="ml-auto">{getFormatedFecha(selectedVenta.fecha)}</span>
      </div>
      <div className="flex">
        <span>Hora:</span>
        <span className="ml-auto">{getFechaHours(selectedVenta.fecha)}</span>
      </div>
    </div>
  </>
);
export default function DetalleVentaList({
  selectedVenta,
}: DetalleVentaListProps) {
  const [openModal, setOpenModal] = useState(false);
  const ListHeader = () => (
    <div className="px-6 py-4">
      <Divider />
      <h1 className="text-2xl font-bold my-4">Detalles de la venta</h1>
      <Divider />
    </div>
  );

  return (
    <div className="flex flex-col h-full space-y-2">
      <div className="flex-none">
        <ListHeader />
      </div>
      <div className="px-10 py-1">
        {selectedVenta ? (
          <DetalleVenta selectedVenta={selectedVenta} />
        ) : (
          <div></div>
        )}
      </div>
      <div className="px-10 py-1 overflow-y-auto">
        <TableContainer sx={{ backgroundColor: 'transparent', maxHeight: 340 }}>
          <Table size="small" aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <span className="font-bold">Código</span>
                </TableCell>
                <TableCell>
                  <span className="font-bold">Producto</span>
                </TableCell>
                <TableCell>
                  <span className="font-bold">Cantidad</span>
                </TableCell>
                <TableCell>
                  <span className="font-bold">Precio Unitario</span>
                </TableCell>
                <TableCell>
                  <span className="font-bold">Subtotal</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedVenta?.items.map(({ producto, key, cantidad }) => (
                <TableRow key={key}>
                  <TableCell>{producto.codigo}</TableCell>
                  <TableCell>{producto.nombre}</TableCell>
                  <TableCell>{cantidad}</TableCell>
                  <TableCell>${producto.precio}</TableCell>
                  <TableCell>
                    ${(cantidad * producto.precio).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="flex px-[6rem]">
        <div className="ml-auto space-x-6 text-xl">
          <span className='font-bold'>Total:</span>
          <span>${selectedVenta?.total}</span>
        </div>
      </div>
    </div>
  );
}
